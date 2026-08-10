const productService=require("../services/productservice")
exports.getProducts=async(req ,res ,next)=>{
    try {
        const page=req.query?.page??1;
        const limit = req.query?.items??5;
        const is_active=true;
const products=await productService.getProducts(page,limit,is_active);
res.status(200).json({
    message:"products fetch successfully",
    products
})
    } catch (error) {
        next(error)
    }
}