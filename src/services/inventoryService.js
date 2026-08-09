const inventroyModel=require("../models/inventory.model")
exports.addQuantityIntoInventory=async(productid, quantity,client)=>{
    try {
        const add_quantity_into_inventory=await inventroyModel.addQuantityIntoInventory(productid,quantity,client);

    } catch (error) {
        throw error
    }
}
exports.updateInventory=async(quantity,id)=>{
    try {
        const updateQuantity=await inventroyModel.updateQuantity(quantity,id);
        return updateQuantity
    } catch (error) {
        throw error
    }
}