const express = require("express");
const productsController = require("../controllers/productController")
const { productsValidation } = require("../validators/productValidation")
const bodyParser = require("body-parser");
const { verifyToken }=require("../middleware/verifyJwtToken");
const {isAdmin}=require("../middleware/isAdmin")
const router = express.Router()
const jsonParser = bodyParser.json()

router.post("/products", jsonParser, verifyToken, isAdmin,productsValidation, productsController.uploadNewProducts)
router.get('/products',verifyToken,isAdmin, productsController.getProducts)
router.patch('/products/:sku',verifyToken,isAdmin, jsonParser, productsController.updateProduct);
router.delete('/products/:sku',verifyToken,isAdmin, productsController.deleteProduct)
module.exports = router;