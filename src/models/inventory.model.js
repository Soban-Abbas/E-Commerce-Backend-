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