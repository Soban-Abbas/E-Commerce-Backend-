const express = require("express");
const adminController=require('../controllers/adminController')
const router=express.Router();


router.post('/reset-password',adminController.resetPassword)

module.exports=router