const couponModel=require("../models/coupons.model");
const cartService=require("./cartService")
exports.addCoupons=async(coupons)=>{
    try {
        const addCoupon=await couponModel.addCoupon(coupons);
        return "Coupon Added"
    } catch (error) {
        throw error
    }
}
exports.getCoupons=async()=>{
    try {
        const coupon = await couponModel.getCoupons();
        return coupon
    } catch (error) {
        throw error
    }
}
exports.getCoupon=async(coupon)=>{
    try {
        const getcoupon = await couponModel.getCouponByCode(coupon);
        return getcoupon
    } catch (error) {
        throw error
    }
}
exports.applyCoupon=async(user_id,code)=>{
    try {
        const coupon= await this.getCoupon(code.trim());
        console.log(coupon)
        const orderItems = await cartService.getCartItems(user_id);
const totalBill= orderItems[orderItems.length-1].grandTotal;
let discountedPrice;
if(totalBill>=coupon[0].min_order_amount && coupon[0].discount_type==="percentage"){
    const discount = totalBill * (coupon[0].discount_value / 100);
    discountedPrice=totalBill-discount
}
if(totalBill>=coupon[0].min_order_amount && coupon[0].discount_type==='fixed'){
    discountedPrice=totalBill-coupon[0].discount_value
}

const discount=totalBill-discountedPrice;


return{

    couponId:coupon[0].id,
    totalBill:Number(totalBill.toFixed('2')),
    AfterDiscount:Number(discountedPrice.toFixed('2')),
    discount:Number(discount.toFixed('2'))
}

    } catch (error) {
        
    }
}
exports.getCouponById=async(id)=>{
    try {
        const coupon=await couponModel.getCouponById(id);
        return coupon
    } catch (error) {
        throw error
    }
}
exports.IncreaseCouponUse=async(id,client)=>{
    try {
        const increaseCount= await couponModel.increaseCount(id,client);
        return increaseCount
    } catch (error) {
        throw error
    }
}