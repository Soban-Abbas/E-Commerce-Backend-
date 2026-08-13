const { pool } = require("../config/pool");
const couponService = require("./couponService");

const cartService = require("./cartService")
exports.placeOrder = async (user_id, couponId, shippingAdress, paymentMethod) => {
    const client = await pool.connect()

    try {
        await client.query(`begin`);
        const getCartItems = await cartService.getCartItems(user_id);
        const sellingItems = getCartItems.filter(item => {
            if (item.inStock) {
                return item
            }
        })
        const totalBill = sellingItems.reduce((sum, value) => {
            return sum + value.subTotal
        }, 0)
        const resObj = {};
        let discountedBill;
        if (couponId) {
    
            const getCoupon = await couponService.getCoupon(couponId);
            if (getCoupon.length === 0) {
                resObj.couponStatus = "InValid"
            }
            else if (getCoupon.length > 0 && getCoupon[0].discount_type === "percentage") {

                discountedBill = totalBill * (getCoupon.discount_value / 100);


            }else{
                discountedBill=totalBill-getCoupon.discount_value
            }



        }









    } catch (error) {
        throw error
    }
}