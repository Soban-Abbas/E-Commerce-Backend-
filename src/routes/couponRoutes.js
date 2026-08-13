const express=require('express');
const router=express.Router();
const bodyParser=require("body-parser");
const jsonParser=bodyParser.json();
const {verifyToken}=require('../middleware/verifyJwtToken');
const couponController=require("../controllers/couponController")
const {isAdmin}=require("../middleware/isAdmin");
const { isCustomer } = require('../middleware/isCustomer');
router.post('/admin/coupon',jsonParser,verifyToken,isAdmin,couponController.addNewCoupons)
router.get('/admin/coupon',verifyToken,isAdmin,couponController.getCoupons);
router.get('/customer/coupon',verifyToken,isCustomer,couponController.getCustomerCoupons)
router.post('/customer/coupon/:couponCode',verifyToken, isCustomer,couponController.applyCoupon )
module.exports=router