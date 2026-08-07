const authService=require("../services/authService")
exports.forgetPassword=async(req, res , next)=>{
    try {

const email=req.body.email;

const result = await authService.forgetPassword(email)
res.status(200).json({
    message:"Check Email to to reset your Password "
})

    } catch (error) {
        next(error)
    }
}
exports.resetPassword=async (req ,res , next) => {
    try {
        const token = req.params.token;
        const password = req.body.password;
        const result = await authService.resetPassword(token,password);
        res.status(200).json({
            message:result
        })
    } catch (error) {
        throw error
    }
}