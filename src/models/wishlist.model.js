const {pool}=require("../config/pool");
exports.addToWishlist=async(user_id , product_id)=>{
    try {

        const addtoWishlist=await pool.query(`insert into wishlists (user_id,product_id) values($1,$2) returning *`,[user_id,product_id]);
        if(addtoWishlist.rowCount<1){
            const error = new Error("failed to add product to Favourite");
            throw error
        }else{
            return "Product Added to Favourite"
        }
        
    } catch (error) {
        throw error
    }
}
exports.getProductByproductId_userId=async(user_id,product_id)=>{
    try {
        const productExists=await pool.query(`select id from wishlists where user_id =$1 and product_id =$2`,[user_id,product_id]);
        if(productExists.rowCount>0){
            const error=new Error("Product Already Added to favourite");
            error.status=409;
            throw error
        }else{
            return true
        }
    } catch (error) {
        throw error
    }
}