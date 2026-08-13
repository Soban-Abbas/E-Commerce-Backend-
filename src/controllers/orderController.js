
const orderService=require("../services/orderService")

exports.postOrder = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const coupon = req.body?.coupon_id ?? null;
        const shippingAdress = req.body?.address ?? null;
        const paymentMethod = req.body?.paymentMethod ?? 'cod';

        const placeOrder = await orderService.placeOrder(user_id, coupon_id, shippingAdress, paymentMethod);
        res.status(201).json({
            orderDetails: placeOrder
        })

    } catch (error) {
        next(error)
    }
}