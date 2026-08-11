
const wishlistService=require('../services/wishlistService')
exports.addIntoWishlist=async(req,res,next) => {
    try {
        const sku=req.query?.sku??null;
        const user_id=req.user.id;

        const addToWishlist=await wishlistService.addToWishlist(user_id,sku);
        res.status(200).json({
            message:addToWishlist
        })
    } catch (error) {
        next(error)
    }
}
exports.getFavouriteProducts=async(req , res , next)=>{
    try {
        const page=req.query?.page??1;
        const limit=req.query?.items??5;
        const user_id=req.user.id
        const favouriteProduct=await wishlistService.getFavouriteProducts(page,limit,user_id);
        res.status(200).json({
            message:"Favourite Products",
            favouriteProduct
        })
    } catch (error) {
        next(error)
    }
}