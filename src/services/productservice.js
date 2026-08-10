const categoryService = require('./categoryService');
const inventoryService = require("../services/inventoryService")
const productModel = require("../models/products.model")
const { pool } = require("../config/pool")
exports.addNewProduct = async (product) => {
    const client = await pool.connect();
    try {
        await client.query('begin')
        const Name = product.name.trim().toUpperCase();
        const Category = product.category.trim().toUpperCase();
        
        
        const { description, price, quantity, imageUrl, is_active } = product;
        const sku = `${Name.substring(0, 3).toUpperCase()}-${Date.now().toString().substring(7, 13)}`
        const productInfo = {
            Name, Category, description, sku, price, quantity, imageUrl, is_active
        }

        const productAlreadyExists = await productModel.productExists(productInfo.Name, client);
        const categoryId = await categoryService.getCategoryId(productInfo.Category, client);
     
        const createNewProduct = await productModel.createnewProduct(productInfo, client);

        const add_product_category = await categoryService.addIntoProductcategory(categoryId, createNewProduct.id, client)
        const add_into_inventory = await inventoryService.addQuantityIntoInventory(createNewProduct.id, productInfo.quantity, client);

        await client.query(`commit`);
        return "Product addded Successfully";


    } catch (error) {
        await client.query('rollback')
        throw error
    } finally {
        client.release()
    }
}
exports.getProducts=async(page,limit,is_active)=>{
try {
    const offset=(page-1)*limit;
    const products=await productModel.getProducts(limit,offset,is_active);
    console.log(products)
   const updateProductInfo=products.map(p=>{
        return{
        id:    p.id,
        category:p.category,
        name:p.name,
        description:p.description,
        sku:p.sku,
        image_url:p.image_url,
        price:p.price,
        quantity:p.quantity,
        is_active:p.is_active
        }
    })
    return updateProductInfo
} catch (error) {
    throw error
}
}
exports.updateProduct=async(sku,price,quantity,is_active)=>{
try {

    if(!sku){
        const error = new Error("product Not found")
        error.status=404;
        throw error
    }
   

    const productsFields=[];
    const productsValues=[];

    if(price){
        productsFields.push(`price = $${productsValues.length+1}`);
        productsValues.push(price)
    }

        productsFields.push(`is_active = $${productsValues.length+1}`);
        productsValues.push(is_active)

    let updateProduct
    if(productsFields.length>0){
        console.log("hello")
        updateProduct = await productModel.updateProduct(productsFields, productsValues,sku)

    }
    console.log(updateProduct)
if(typeof quantity==="number"){
        const updateQuantity = await inventoryService.updateInventory(quantity, updateProduct.id)
}
        
    

    return "product Updated Successfully"
   
} catch (error) {
    throw error
}
}
exports.deleteProduct=async(sku)=>{
    const client=await pool.connect();
    try {
        await client.query('begin')
        if(!sku){
            const error = new Error("product not found");
            error.status=404
            throw error;
            return
        }
        const deleteProduct=await productModel.deleteProduct(sku,client) ;
        console.log(deleteProduct);
        return
        const delete_quantity=await inventoryService.deleteQuantity(deleteProduct,client);
        await client.query("commit")
        return "product Deleted Successfully";
    } catch (error) {
        await client.query("rollback")
        throw error
    }finally{
        client.release()
    }
}