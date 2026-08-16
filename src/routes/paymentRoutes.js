const express = require("express");
const paymentController=require("../controllers/paymentController.js");
const { verifyToken } = require("../middleware/verifyJwtToken");
const { isCustomer } = require("../middleware/isCustomer");
const router = express.Router();
router.post('/customer/onlinepayment/:method/:orderId',verifyToken,isCustomer,paymentController.payOnline)


module.exports=router