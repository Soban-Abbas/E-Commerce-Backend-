const paymentService =require("../services/paymentService");

exports.payOnline=async(req, res , next)=>{
    try {
        const paymentMethod=req.params.method;
        const orderId=req.params.orderId;
        const userId=req.user.id
        const payOnline=await paymentService.payOnline(userId,orderId,paymentMethod);
res.status(200).json({
    payOnline
})

    } catch (error) {
        next(error)
    }
}