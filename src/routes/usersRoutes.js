const express=require("express");
const router=express.Router()
const userController=require("../controllers/userController")


router.get('/products',userController.getProducts)

module.exports=router;