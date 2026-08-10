const { user } = require('../config/db.config');
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