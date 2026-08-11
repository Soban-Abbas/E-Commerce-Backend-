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
exports.getCartItems=async(user_id)=>{
    try {
        const getCartId=await cartModel.getUserCartId(user_id);
        
        const getCartItems=await cartModel.getCartItems(getCartId)
        
        const productIds=getCartItems.map(p=>{
           return p.product_id
        })
        
        const products=await productService.getProductsByIds(productIds);

        
        const productForMap=products.map(p=>{
           return [p.id,p]
        })
        const mapproduct=new Map(productForMap);

        const ProductArray=getCartItems.map(item=>{
    
            const product=mapproduct.get(item.product_id);
            if(!product){
                return {
                    ...item,
                    error :"product sold out"
                }
            }
            const avaiableQuantity=product.quantity??0;
            const requestedQuantity=item.quantity
const inStock=avaiableQuantity>=requestedQuantity
            return{
            id:product.id,
            name:product.name,
            category:product.category,
            description:product.description,
            price:product.price,
            sku:product.sku,
            quantity:requestedQuantity,
            avaiableQuantity:avaiableQuantity,
            inStock:inStock,
            subTotal:inStock?item.quantity*product.price :0
            }



        }
   
    
    )
        const grandTotal =ProductArray.reduce((sum , value)=>{
            if(!value.inStock){
                return sum
            }
            return sum+value.subTotal

        },0)

        const total={
grandTotal:grandTotal
        }

        ProductArray.push(total);
        return ProductArray
        
    } catch (error) {
        throw error
    }
}