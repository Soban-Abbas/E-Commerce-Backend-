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
exports.getFavouriteProducts=async(limit , offset , user_id)=>{
    try {
        const favproducts = await pool.query(`select wishlists.product_id , products.name , products.description, products.price,products.sku,products.image_url,categories.name as category, inventory.quantity  from wishlists
            inner join products
            on wishlists.product_id=products.id
            inner join product_categories
            on products.id=product_categories.product_id
            inner join categories
            on categories.id = product_categories.category_id
            inner join inventory
            on products.id=inventory.product_id

            where wishlists.user_id = $1
            
            limit $2 offset $3
            `,[user_id,limit,offset]);



            if(favproducts.rowCount>0){
                return favproducts.rows
            }
            else{
                const error = new Error ("No Product in Favourite");
                error.status=404;
                throw error
            }
    } catch (error) {
        throw error
    }
}