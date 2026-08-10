const express = require("express");
const authController=require('../controllers/authController')
const bodyParser = require('body-parser');
const userController=require("../controllers/userController")
const router=express.Router();
const jsonParser = bodyParser.json()

router.post('/forget-password',jsonParser, authController.forgetPassword)
router.post('/reset-password/:token', jsonParser,authController. resetPassword)
router.post('/signup', jsonParser, userController.signup);
router.post('/login', jsonParser, userController.login);
module.exports=router