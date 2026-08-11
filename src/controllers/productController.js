const productService=require("../services/productservice");
const {validationResult}=require("express-validator");

exports.uploadNewProducts=async(req , res , next)=>{
    try {

        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).json({
                error:error.array()
            })
        }
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
        const page=Number(req.query?.page??1) 
        const limit=Number(req.query?.items??5)
        let is_active=req.query?.is_active??true
        if(is_active==="true"){
            is_active=true
        }if(is_active==="false"){
            is_active=false
        }
        const product=await productService.getProducts(page,limit,is_active);
        res.status(200).json({
            message:"Product fetch Sucessfully",
            product
        })
    } catch (error) {
        next(error)
    }
}
exports.updateProduct=async(req , res , next)=>{
    try {
        const sku=req.params.sku || null;
       const{price, quantity, is_active }=req.body;
    
        const updateProduct=await productService.updateProduct(sku,price,quantity,is_active) ;
        res.status(200).json({
            message:updateProduct
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteProduct=async(req ,res , next)=>{
    try {
        const sku=req.params.sku;
        
        const deleteProduct=await productService.deleteProduct(sku);
        res.status(200).json({
            message:deleteProduct
        })
    } catch (error) {
        next(error)
    }
}