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
        const { description, price, quantity, img_url, active } = product;
        const sku = `${Name.substring(0, 3).toUpperCase()}-${Date.now().toString().substring(7, 13)}`
        const productInfo = {
            Name, Category, description, sku, price, quantity, img_url, active
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