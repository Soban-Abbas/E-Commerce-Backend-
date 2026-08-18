# E-Commerce Backend

This is a **REST API backend** for an e-commerce store, built with Node.js and Express. It provides separate features for admins and customers — product management, cart, wishlist, coupons, orders, payments, and product reviews.

## Tech Stack

- **Runtime:** Node.js + Express 5
- **Database:** PostgreSQL (`pg` driver)
- **Authentication:** JWT (`jsonwebtoken`) + `bcrypt` for password hashing
- **Validation:** `express-validator` — used **only** on the product-creation endpoint (`POST /admin/products`); no other route has input validation
- **Email:** `nodemailer` (for forget/reset password emails)
- **Migrations:** Custom SQL migration scripts (`src/migration`)

## Folder Structure

```
E-Commerce-Backend-/
├── ecommerce-erd.png        # Database Entity Relationship Diagram
├── package.json
├── src/
│   ├── server.js            # App entry point — all routes are registered here
│   ├── config/               # DB connection and env config
│   │   ├── db.config.js
│   │   └── pool.js
│   ├── routes/                # Route definitions only (URL -> controller mapping)
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── usersRoutes.js
│   ├── controllers/           # Handle request/response, call the service layer
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── couponController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── reviewController.js
│   │   └── wishlistController.js
│   ├── services/               # Business logic (controllers call this layer)
│   │   ├── authService.js
│   │   ├── productservice.js
│   │   ├── cartService.js
│   │   ├── couponService.js
│   │   ├── orderService.js
│   │   ├── paymentService.js
│   │   ├── reviewService.js
│   │   ├── wishlistService.js
│   │   ├── categoryService.js
│   │   ├── inventoryService.js
│   │   └── CustomerService.js
│   ├── models/                 # Database queries (one model per table)
│   ├── middleware/             # Auth check, role check, error handling
│   │   ├── verifyJwtToken.js    # Verifies JWT, sets req.user
│   │   ├── isAdmin.js           # Allows only admin role
│   │   ├── isCustomer.js        # Allows only customer role
│   │   └── globalErrorMiddleware.js  # Final handler for all errors
│   ├── validators/             # express-validator rules (currently product-only)
│   │   └── productValidation.js
│   ├── migration/              # SQL migration files that create/alter tables
│   ├── scripts/                # Standalone scripts to run migrations and create an admin
│   └── util/                   # Helpers (password encrypt/decrypt, JWT generation, sending email, etc.)
```

## Response Format

Every API response is JSON.

**Success response** (shape varies slightly per controller, but generally):
```json
{
  "message": "result/status of whatever action happened",
  "...extra data (products, coupons, items, orderDetails, etc.)": "..."
}
```

**Failure response** — comes from two places:

1. Route-level validation failure (only on product creation):
```json
{
  "error": [ { "msg": "name cannot be empty", "path": "name", "...": "..." } ]
}
```
Status: `422`

2. Every other error passes through the global error handler:
```json
{
  "error": "some error message"
}
```
Status varies by error type (`401`, `400`, `404`, `500`, etc.)

Auth/role errors specifically return:
- No token → `401` `{ "error": "Please login First" }`
- Wrong role (e.g. a customer hitting an admin route, or vice versa) → `400` `{ "error": "only admin can access this route" }` / `{ "error": "only customer can access this route" }`

---

## API Endpoints

### Auth Routes (`/`)

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/signup` | Registers a new user (default role: `customer`) | Public |
| POST | `/login` | Logs in and returns a JWT token | Public |
| POST | `/forget-password` | Sends a password-reset link via email | Public |
| POST | `/admin/reset-password/:token` | Resets an admin's password using the emailed token | Public (token in URL) |
| POST | `/customer/reset-password/:token` | Resets a customer's password | Public (token in URL) |

**POST `/signup`**
- Input (body): `{ "name": "string", "email": "string", "password": "string", "role": "customer | admin (optional, default customer)" }`
- Success (201): `{ "message": "Registartion Successfull ! Please Login " }`
- Failure: `{ "error": "..." }`

**POST `/login`**
- Input (body): `{ "email": "string", "password": "string" }`
- Success (200): `{ "message": "Login Successfull", "name": "...", "email": "...", "token": "jwt-token" }`
- Failure: `{ "error": "..." }`

**POST `/forget-password`**
- Input (body): `{ "email": "string" }`
- Success (200): `{ "message": "Check Email to to reset your Password " }`
- Failure: `{ "error": "..." }`

**POST `/admin/reset-password/:token`** & **POST `/customer/reset-password/:token`**
- Input: URL param `token` (received via email), body: `{ "password": "string" }`
- Success (200): `{ "message": "Password changed Successfully" }`
- Failure: `{ "error": "..." }`

---

### Admin — Product Management (`/admin`)
All routes here require `verifyToken` + `isAdmin` (`Authorization: Bearer <token>` header).

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/admin/products` | Adds a new product |
| GET | `/admin/products` | Lists products (paginated) |
| PATCH | `/admin/products/:sku` | Updates a product (price/quantity/is_active) |
| DELETE | `/admin/products/:sku` | Deletes a product |

**POST `/admin/products`**
- Input (body): `{ "name": "string", "category": "string", "description": "string", "price": "number (0.01–99999999.99)", "quantity": "integer (1–100)", "is_active": "boolean", "imageUrl": "valid URL" }`
- This is the **only** endpoint with `express-validator` rules — if any field is missing/invalid it returns a `422` error.
- Success (201): `{ "message": "..." }`
- Failure (422 — validation): `{ "error": [ ...validation errors ] }`
- Failure (other): `{ "error": "..." }`

**GET `/admin/products`**
- Input (query params, optional): `?page=1&items=5&is_active=true`
- Success (200): `{ "message": "Product fetch Sucessfully", "product": [ ...products ] }`

**PATCH `/admin/products/:sku`**
- Input: URL param `sku`, body: `{ "price": "number", "quantity": "integer", "is_active": "boolean" }` (whichever fields need updating)
- Success (200): `{ "message": "..." }`

**DELETE `/admin/products/:sku`**
- Input: URL param `sku`
- Success (200): `{ "message": "..." }`

---

### Admin — Coupons (`/admin/coupon`)
Requires `verifyToken` + `isAdmin`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/admin/coupon` | Creates a new coupon |
| GET | `/admin/coupon` | Lists all coupons |

**POST `/admin/coupon`**
- Input (body): `{ "coupon": { ... coupon object (code, discount_type, discount_value, min_order_amount, expires_at, is_active, etc.) } }`
- No validation middleware on this route — the object is passed straight to the service.
- Success (201): `{ "message": "..." }`

**GET `/admin/coupon`**
- Success (200): `{ "coupons": [ ...coupons ] }`

---

### Customer — Products (`/customer`)

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | `/customer/products` | Lists active products | Public |

- Input (query params, optional): `?page=1&items=5`
- Success (200): `{ "message": "products fetch successfully", "products": [ ... ] }`

---

### Customer — Wishlist (`/customer/wishlist`)
Requires `verifyToken` + `isCustomer`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/customer/wishlist` | Adds a product to the wishlist |
| GET | `/customer/wishlist` | Lists wishlist products |

**POST `/customer/wishlist`**
- Input (query param): `?sku=PRODUCT_SKU`
- Success (200): `{ "message": "..." }`

**GET `/customer/wishlist`**
- Input (query params, optional): `?page=1&items=5`
- Success (200): `{ "message": "Favourite Products", "favouriteProduct": [ ... ] }`

---

### Customer — Cart (`/customer/cart`)
Requires `verifyToken` + `isCustomer`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/customer/cart` | Adds a product to the cart |
| GET | `/customer/cart` | Lists cart items |

**POST `/customer/cart`**
- Input (body): `{ "sku": "string", "quantity": "number" }`
- Success (200): `{ "message": "..." }`

**GET `/customer/cart`**
- Success (200): `{ "items": [ ...cart items ] }`

---

### Customer — Reviews (`/customer/reviews`)
Requires `verifyToken` + `isCustomer`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/customer/reviews` | Posts a review on a product |

- Input (body): `{ "productId": "number", "rating": "number", "comment": "string" }`
- Success (201): the review service's result is spread directly into the response.

---

### Customer — Coupons (`/customer/coupon`)
Requires `verifyToken` + `isCustomer`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/customer/coupon` | Lists active coupons |
| POST | `/customer/coupon/:couponCode` | Applies a coupon |

**GET `/customer/coupon`**
- Success (200): `{ "coupon": [ { "code", "dicountType", "dicountValue", "minOrderAmount" }, ... ] }` (only active, non-expired coupons)

**POST `/customer/coupon/:couponCode`**
- Input: URL param `couponCode`
- Success (200): `{ "coupon": { ...applied coupon details } }`

---

### Customer — Orders (`/customer/order`)
Requires `verifyToken` + `isCustomer`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/customer/order` | Places an order from the cart |

- Input (body): `{ "couponId": "optional", "address": "string", "paymentMethod": "cod (default) | other", "phoneNumber": "string" }`
- Success (201): `{ "orderDetails": { ... } }`

---

### Customer — Payment (`/customer/onlinepayment/:method/:orderId`)
Requires `verifyToken` + `isCustomer`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/customer/onlinepayment/:method/:orderId` | Makes an online payment for an order |

- Input: URL params `method` (payment method), `orderId`
- Success (200): the payment service's result is spread directly into the response.

---

## Authentication Note

Protected routes require this header:
```
Authorization: Bearer <jwt_token>
```
No/invalid token → `401 { "error": "Please login First" }`. Wrong role (e.g. a customer hitting an admin route) → `400 { "error": "only admin/customer can access this route" }`.
