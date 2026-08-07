const crypto=require("crypto")
const userModel=require("../models/user.model")
const {sendEmail}=require("../util/sendEmail")
exports.resetPassword=async(email)=>{
    try {
        const user=await userModel.getUserByEmail(email)
        
        const token = crypto.randomBytes(20).toString('hex');
        const sendemail = await sendEmail(user[0].email,token)
        return sendemail
    } catch (error) {
        throw error
    }
}