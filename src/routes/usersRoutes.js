const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
const jsonParser=bodyParser.json()
const userController=require("../controllers/userController")


router.get('/products',userController.getProducts)

module.exports=router;