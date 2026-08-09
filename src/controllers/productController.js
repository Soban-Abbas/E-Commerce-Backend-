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
exports.getProducts=async(req , res , next)=>{
    try {
        const page=Number(req.query.page) || 1;
        const items=Number(req.query.items) || 5;
        const is_active= Boolean(req.query.is_active) || true;
        const product=await productService.getProducts(page,items,is_active);
        res.status(200).json({
            message:"Product fetch Sucessfully",
            product
        })
    } catch (error) {
        next(error)
    }
}