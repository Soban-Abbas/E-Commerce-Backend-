const categoryModel = require("../models/categories.model")
exports.getCategoryId = async (category, client) => {
    try {
        const categoryId = await categoryModel.getCategoryId(category, client);
        return categoryId
    } catch (error) {
        throw error
    }
}
exports.addIntoProductcategory=async(categoryId,productId, client)=>{
    try {
        const add_into_product_category=await categoryModel.addIntoProductcategory(categoryId,productId,client);
        
    } catch (error) {
     throw error   
    }
}