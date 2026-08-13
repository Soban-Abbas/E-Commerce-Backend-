const express = require("express");
const router=express.Router();
const orderController=require("../controllers/orderController")
const bodyParser=require("body-parser");
const jsonParser=bodyParser.json();
const {verifyToken}=require("../middleware/verifyJwtToken");
const {isCustomer}=require("../middleware/isCustomer");


router.post('/customer/order',jsonParser,
   verifyToken,isCustomer, orderController.postOrder)


module.exports=router