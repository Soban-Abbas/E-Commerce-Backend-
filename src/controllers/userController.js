const productService=require("../services/productservice")
const authService=require("../services/authService");

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
exports.signup=async(req , res , next)=>{
    try {
        const {name,email,password,role="customer"}=req.body;
        const regNewUser=await authService.signup(name,email,password,role);
        res.status(201).json({
            message:regNewUser
        })
    } catch (error) {
        next(error)
    }
}
exports.login=async(req , res , next)=>{
    try {
        const {email, password}=req.body;
const login=await authService.login(email, password);
res.status(200).json({
    ...login
})
    } catch (error) {
        throw error
    }
}
