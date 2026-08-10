const crypto = require("crypto")
const userModel = require("../models/user.model")
const { sendEmail } = require("../util/sendEmail")
const tokenModel = require("../models/token.model")
const { password } = require("../config/db.config")
const encryptPassword = require("../util/encryptPassword")
const decryptPassword=require("../util/decryptPassword");
const { generateJwttoken }=require("../util/generateJwt")
exports.forgetPassword = async (email) => {
    try {
        const user = await userModel.getUserByEmail(email)

        const token = crypto.randomBytes(20).toString('hex');

        const saveToken = await tokenModel.savetoken(user[0].id, token)

        const sendemail = await sendEmail(user[0].email, user[0].role, token)
        return sendemail
    } catch (error) {
        throw error
    }
}
exports.resetPassword = async (token, password) => {
    try {
        const validateToken = await tokenModel.verifyToken(token);

        const encryptedpassword = await encryptedPassword(password)
        console.log("hello")
        const resetPassword = await userModel.resetpassword(validateToken[0].user_id, encryptedpassword);
        return "Password changed Successfully";



    } catch (error) {
        throw error
    }
}

exports.signup=async(name,email,password,role)=>{
    try {
        const encryptedPassword=await encryptPassword(password);
        const registerNewUser=await userModel.registerNewUser(name,email,encryptedPassword,role);
        return "Registartion Successfull ! Please Login "
    } catch (error) {
        throw error
    }
}

exports.login=async(email, password)=>{
    try {
       
       const user= await userModel.getUserByEmail(email);
const comparePassword=await decryptPassword(password,user[0].password);
 const token = generateJwttoken(user[0].id,user[0].role);
 return {
    message:"Login Successfull",
    name:user[0].name,
    email:user[0].email,
    token:token
 }
    } catch (error) {
       throw error 
    }
}
