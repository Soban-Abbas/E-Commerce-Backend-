const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
const jsonParser=bodyParser.json()
const userController=require("../controllers/userController")


router.get('/products',userController.getProducts)
router.post('/signup',jsonParser,userController.signup)
module.exports=router;