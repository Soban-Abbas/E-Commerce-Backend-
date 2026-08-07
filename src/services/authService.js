const crypto = require("crypto")
const userModel = require("../models/user.model")
const { sendEmail } = require("../util/sendEmail")
const tokenModel = require("../models/token.model")
const encryptedPassword = require('../util/encryptPassword')
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