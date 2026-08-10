const express=require("express");
const productsController=require("../controllers/productController")
const { productsValidation }=require("../validators/productValidation")
const bodyParser=require("body-parser")
const router=express.Router()
const jsonParser = bodyParser.json()

router.post("/products", jsonParser,productsValidation,productsController.uploadNewProducts)
router.get('/products',productsController.getProducts)
router.patch('/products/:sku',jsonParser,productsController.updateProduct);
router.delete('/products/:sku',productsController.deleteProduct)
module.exports=router;