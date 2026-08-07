const express = require("express");
const authController=require('../controllers/authController')
const bodyParser = require('body-parser')
const router=express.Router();
const jsonParser = bodyParser.json()

router.post('/forget-password',jsonParser, authController.forgetPassword)
router.post('/reset-password/:token', jsonParser,authController. resetPassword)
module.exports=router