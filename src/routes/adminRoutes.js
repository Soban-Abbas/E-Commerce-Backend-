const express = require("express");
const authController=require('../controllers/authController')
const bodyParser = require('body-parser')
const router=express.Router();
const jsonParser = bodyParser.json()

router.post('/reset-password',jsonParser, authController.resetPassword)

module.exports=router