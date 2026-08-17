const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
const reviewController=require("../controllers/reviewController")
const { verifyToken } = require("../middleware/verifyJwtToken");
const { isCustomer } = require("../middleware/isCustomer");
const wishlistController=require("../controllers/wishlistController")
const jsonParser=bodyParser.json()
const userController=require("../controllers/userController")
const cartController=require("../controllers/cartController");


router.get('/products',userController.getProducts);
router.post('/wishlist',verifyToken,isCustomer,wishlistController.addIntoWishlist)
router.get('/wishlist',verifyToken,isCustomer,wishlistController.getFavouriteProducts)
router.post('/cart',jsonParser,verifyToken,isCustomer,cartController.addProductTocart)
router.get('/cart',verifyToken,isCustomer,cartController.getCartItems)
router.post('/reviews',jsonParser,verifyToken,isCustomer,reviewController.postReviews)
module.exports=router;