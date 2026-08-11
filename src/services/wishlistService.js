const productService=require("../services/productservice");
const wishlistModel=require("../models/wishlist.model")
exports.addToWishlist=async(user_id,sku)=>{
    try {
        if(!sku){
            return "failed to add product to favourite"
        }
        const getProductBySku=await productService.getProductBySku(sku);
        const existsFavourite=await wishlistModel.getProductByproductId_userId(user_id,getProductBySku[0].id)
        const addToWishlist=await wishlistModel.addToWishlist(user_id , getProductBySku[0].id);
        return addToWishlist
    } catch (error) {
        throw error
    }
}

exports.getFavouriteProducts=async(page , limit , user_id)=>{
    try {
        const offset= Number((page-1)*limit)
        const favouriteProducts=await wishlistModel.getFavouriteProducts(limit,offset,user_id);
        return favouriteProducts
    } catch (error) {
        throw error
    }
}