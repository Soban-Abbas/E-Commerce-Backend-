const {pool}=require('../config/pool');
exports.placeOrder = async (user_id, couponId, afterDiscount, shippingAdress, phoneNumber,client)=>{
    try {
        const placeOrder = await client.query(`insert into orders (user_id,coupon_id,total_amount,shipping_address,phone_number) values($1,$2,$3,$4,$5) returning *`,[user_id,couponId,afterDiscount,shippingAdress,phoneNumber]);

        if(placeOrder.rowCount>0){
            return placeOrder.rows[0]
        }else{
            throw new Error();
        }
    } catch (error) {
        throw error
    }
}


exports.updateOrderStatus=async(user_id,status,client)=>{
    try {
        const updateStatus=await client.query(`update orders set status = $1 where user_id = $2 returning status`,[status,user_id]);
        if(updateStatus.rowCount>0){
            return updateStatus.rows[0].status
        }else{
            throw new Error("Order failed")
        }
    } catch (error) {
        throw error
    }
}


exports.getOrderDetails=async(orderid)=>{
    try {
        const order= await pool.query('select * from orders');

        if(order.rowCount<1){
            const error =  new Error("Order Not Exist");
            error.status=404;
            throw error
        }
        return order.rows[0]
    } catch (error) {
        throw error
    }
}