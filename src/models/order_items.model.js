exports.addNewItems=async(user_id,order_id,products,client)=>{
    try {
    const allAddedProductData=[]
    for(let i=0;i<products.length;i++){
        const perItemCost=products[i].subTotal/products[i].quantity;
    
        const addProduct = await client.query(`insert into order_items (order_id,product_id,quantity,price_at_purchase) values ($1,$2,$3,$4) returning *`,[order_id,products[i].id,products[i].quantity,perItemCost]);
allAddedProductData.push(addProduct);
    }
if(allAddedProductData.length===products.length){
    return true
}else{
    throw new Error("Order Failed")
}
    } catch (error) {
        throw error
    }
}