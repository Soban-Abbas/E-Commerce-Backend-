
const orderService = require("../services/orderService")

exports.postOrder = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const coupon = req.body?.couponId ?? null;
        const shippingAdress = req.body?.address ?? null;
        const paymentMethod = req.body?.paymentMethod ?? 'cod';
        const phoneNumber=req.body.phoneNumber
        const placeOrder = await orderService.placeOrder(user_id, coupon, shippingAdress, paymentMethod,phoneNumber);

        res.status(201).json({
            orderDetails: placeOrder
        })

    } catch (error) {
        next(error)
    }
}