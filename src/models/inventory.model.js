const {pool}=require("../config/pool");
exports.addQuantityIntoInventory=async(product_id, quantity , client)=>{
    try {
        const add_quantity_into_inventory=await client.query(`insert into inventory (product_id,quantity) values($1,$2) returning *`,[product_id,quantity]);
        if(add_quantity_into_inventory.rowCount<1){
            throw new Error("Failed to Update inventory")
        }
    } catch (error) {
        throw error
    }
}
exports.updateQuantity=async(quantity , id )=>{
try {
    const updateQuantity=await pool.query(`update inventory set quantity = $1 where product_id = $2 returning *`,[quantity,id]);
    if(updateQuantity.rowCount<1){
        throw new Error("failed to update Quantity");
        return 
    }else{
return true
    }
} catch (error) {
    throw error
}
}
exports.deleteQuantity=async(product_id,client)=>{
    try {
        const deleteQuantity=await client.query('delete from inventory where product_id=$1 returning *',[product_id]);

        if(deleteQuantity.rowCount>0){
            return true
        }else{
            throw new Error("Product Not Deleted")
        }
    } catch (error) {
        throw error
    }
}