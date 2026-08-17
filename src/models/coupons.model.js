const {pool}=require("../config/pool")
exports.addCoupon=async(c)=>{
    try {


        console.log(c);
        const coupon=await pool.query(`insert into coupons (code , discount_type , discount_value , min_order_amount , max_uses, expires_at,is_active) values ($1,$2,$3,$4,$5,$6,$7) returning *`,[c.code , c.discountType, c.discountValue,c.minOrderAmount,c.maxUses,c.expiresAt,c.isActive]);
        if(coupon.rowCount>0){
            return true
        }
    } catch (error) {
        if (error.code ="23505"){
            error.message="Coupon Code Already Exist";
            error.status=409;

        }
        throw error
    }
}
exports.getCoupons=async()=>{
    try {
        const coupon = await pool.query(`select * from coupons `);
        if(coupon.rowCount>0){
            return coupon.rows
        }else{
            const error = new Error("No coupon found");
            error.status=404;
            throw error
        }
    } catch (error) {
        throw error
    }
}

exports.getCouponByCode=async(code)=>{
    try {
        const coupon=await pool.query(`select * from coupons where code = $1 and expires_at > now() and is_active = true and  used_count < max_uses `,[code]);
       return coupon.rows
    } catch (error) {
        throw error
    }
}
exports.getCouponById=async(id)=>{
    try {
        const coupon = await pool.query(`select * from coupons where id = $1 and expires_at>now() and used_count<max_uses `,[id]);
        return coupon.rows
    } catch (error) {
        throw error
    }
}

exports.increaseCount=async(id,client)=>{
    try {
        const increaseCount=await client.query(`
            UPDATE coupons 
SET used_count = used_count + 1 
WHERE id = $1 returning *`,[id]);

if(increaseCount.rowCount>0){
    return increaseCount.rows[0].used_count
}else{
    const error = new Error()
    throw error
}
        
    } catch (error) {
        throw error
    }
}
