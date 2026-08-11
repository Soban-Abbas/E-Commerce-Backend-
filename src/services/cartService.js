const cartModel=require("../models/carts.model");
const productService=require("../services/productservice")
exports.addToCart=async(user_id,sku,quantity)=>{
    try {
        const getCartId=await cartModel.getUserCartId(user_id);
        const product = await productService.getProductBySku(sku);
if(product[0].quantity<quantity ){
const error = new Error("Your selected quantity is higher then available stock");
error.status = 422;
throw error
}


const addTocartitems=await cartModel.addtocartItems(getCartId,product[0].id,quantity)

return "Product added to cart"

    } catch (error) {
        throw error
    }
}