const express=require("express");
const productsController=require("../controllers/productController")
const bodyParser=require("body-parser")
const router=express.Router()
const jsonParser = bodyParser.json()

router.post("/products",jsonParser,productsController.uploadNewProducts)
router.get('/products',productsController.getProducts)

module.exports=router;