const {pool}=require("../config/pool")
exports.getUserCartId=async(user_id)=>{
    try {
        const cartid = await pool.query(`select id from carts where user_id = $1`, [user_id]);
        if (cartid.rowCount < 1) {
            const createCart = await pool.query(`insert into carts (user_id) values ($1) returning * `, [user_id]);
            return createCart.rows[0].id
        } else {
            return cartid.rows[0].id
        }
    } catch (error) {
        throw error
    }
   
}
exports.addtocartItems=async(cart_id,product_id,quanitty)=>{
const insertIncartItems=await pool.query(`insert into cart_items (cart_id,product_id,quantity) values($1,$2,$3) returning *`,[cart_id,product_id,quanitty]);
if(this.addtocartItems.rowCount<1){
    const error = new Error("failed to add product to cart");
    throw error
}else{
    return true
}
}
exports.getCartItems=async(cart_id)=>{
    try {
        const items=await pool.query(`select product_id , quantity from cart_items where cart_id = $1`,[cart_id]);
        if(items.rowCount<1){
            const error = new Error("No products in cart ");
            error.status=404;
            throw error
        }else{
            return items.rows
        }
    } catch (error) {
        throw error
    }
}

exports.clearCart=async(cart_id,products,client)=>{
    try {
const allProductDeleted=[]
        for(let i=0;i<products.length ; i++){
            const deleteFromcartItems = await client.query(`delete from cart_items where cart_id = $1 and  product_id = $2 returning *`, [cart_id, products[i].id]);

            allProductDeleted.push(deleteFromcartItems)
        }

        if(products.length===allProductDeleted.length){
            return true
        }else{
            throw new Error();
        }
      
    } catch (error) {
        throw error
    }
}