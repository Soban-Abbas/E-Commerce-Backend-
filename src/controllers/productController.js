const productService=require("../services/productservice")
exports.uploadNewProducts=async(req , res , next)=>{
    try {
        const productDetails= req.body
    
        const addProduct=await productService.addNewProduct(productDetails);
        res.status(201).json({
            message:addProduct
        })
    } catch (error) {
        next(error)
    }
}