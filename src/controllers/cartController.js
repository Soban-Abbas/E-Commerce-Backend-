
const cartService=require("../services/cartService")
exports.addProductTocart=async(req , res , next)=>{
    try {
        
        const sku=req.body.sku;
        const quantity=req.body.quantity;
        const user_id=req.user.id
        const addtoCart = await cartService.addToCart(user_id,sku,quantity)
        res.status(200).json({
            message : addtoCart
        })
    } catch (error) {
     next(error)   
    }
}
exports.getCartItems=async(req ,res , next)=>{
    try {
    
        const user_id=req.user.id
        const getCartItems=await cartService.getCartItems(user_id);
res.status(200).json({
  items:  getCartItems
})
    } catch (error) {
        next(error)
    }
}