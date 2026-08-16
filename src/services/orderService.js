const { pool } = require("../config/pool");
const cartService = require("./cartService");
const paymentService=require("./paymentService");
const couponService = require("./couponService")
const orderModel=require("../models/orders.model");
const orderItemsModel=require("../models/order_items.model");
exports.placeOrder = async (user_id, couponId, shippingAdress, paymentMethod,phoneNumber) => {
    const client = await pool.connect()

    try {
        await client.query(`begin`);

        const cartItems = await cartService.getCartItems(user_id);
        const sellingProducts = cartItems.filter(item => {
            if (item.inStock) {
                return {
                    ...item
                }
            }
        })


       
let coupon = null;


        if(couponId){
            const getCoupon = await couponService.getCouponById(couponId);

            if(getCoupon.length===0){
                return{
                    error:"Coupon Expires or Invalid"
                }
            }else{
                coupon=getCoupon
            }
        }


        const totalBill=cartItems[cartItems.length-1].grandTotal;

        let afterDiscount =totalBill;

if(coupon!==null){
    const applyDiscount=await couponService.applyCoupon(user_id,coupon[0].code);

    afterDiscount = applyDiscount.AfterDiscount



}
const placeOrder=await orderModel.placeOrder(user_id,couponId,afterDiscount,shippingAdress,phoneNumber,client);
        const addIntoOrderItems = await orderItemsModel.addNewItems(user_id, placeOrder.id,sellingProducts,client)


if(paymentMethod==='cod'){
    const payment_status="pending";
    const payment_method="cod";
const transactionId=null
    const pay= await paymentService.payCod(placeOrder.id,placeOrder.total_amount,payment_status,payment_method,transactionId,client);

    const clearCart=await cartService.clearCart(user_id,sellingProducts,client)


    const increaseCouponCount= await couponService.IncreaseCouponUse(couponId,client);
const updateOrderStatus=await orderModel.updateOrderStatus(user_id,'shipped',client);
const orderStatus=updateOrderStatus
    const {status:Payment_Status,payment_method:paymentMethod}=pay;
    const {  total_amount, shipping_address, phone_number }=placeOrder
    await client.query('commit')
    return {
        orderStatus,
        total_amount,
        shipping_address,
        phone_number,
        Payment_Status,
        paymentMethod
    }


}
else{
    await client.query(`commit`)
    return{
    redirectUrl:`http://localhost:3010/customer/onlinepayment/${paymentMethod}/${placeOrder.id}`

    }
}

 } catch (error) {
        await client.query(`rollback`)
        throw error
    }finally{
        await client.release()
    }
}
exports.getOrderDetails=async(orderId)=>{
    try {
        const order=await orderModel.getOrderDetails(orderId);
        return order
    } catch (error) {
        throw error
    }
}