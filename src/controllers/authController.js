const authService=require("../services/authService")
exports.resetPassword=async(req, res , next)=>{
    try {

const email=req.body.email;

const result = await authService.resetPassword(email)
res.status(200).json({
    message:"Check Email to to reset your Password "
})

        console.log("helo")
    } catch (error) {
        next(error)
    }
}