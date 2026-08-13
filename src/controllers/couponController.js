const couponService=require("../services/couponService")
exports.addNewCoupons=async(req ,res , next)=>{


    try {
        const coupon=req.body.coupon;
        const user_id=req.user.id;
        const addCoupon = await couponService.addCoupons(coupon);
        res.status(201).json({
            message : addCoupon
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}
exports.getCoupons=async(req ,res , next)=>{
    try {
        const getCoupons=await couponService.getCoupons();
        res.status(200).json({
            coupons:getCoupons
        })
    } catch (error) {
        next(error)
    }
}

exports.getCustomerCoupons=async(req ,res , next)=>{
try {
    const coupon = await couponService.getCoupons();
    console.log(coupon)
    const updateCoupon=coupon.map(c=>{
        if (c.is_active===true && c.expires_at>Date.now())
        return {
            code:c.code,
            dicountType: c.discount_type,
            dicountValue:c.discount_value,
            minOrderAmount: c.min_order_amount
        }
    });
    res.status(200).json({
        coupon:updateCoupon
    })
} catch (error) {
    next(error)
}
}

exports.applyCoupon=async(req ,res , next)=>{
    try {
        const code=req.params.couponCode;
        const user_id = req.user.id
        const applyCoupon=await couponService.applyCoupon(user_id,code);
        res.status(200).json({
            coupon:applyCoupon
        })
    } catch (error) {
        next(error)
    }
}