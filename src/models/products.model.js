
exports.productExists=async (name , client) => {
    try {
        const product = await client.query(`select * from products where name = $1`,[name])
        if(product.rowCount<1){
            return null
        }else{
            const error = new Error("product already exists you can update this product");
            error.status=409;
            throw error
        }
    } catch (error) {
        throw error
    }
}

exports.createnewProduct=async(product, client)=>{
    try {
        const addedProduct=await client.query('insert into products (name , description,price,sku, image_url,is_active ) values ($1,$2,$3,$4,$5,$6) returning * ',[product.Name,product.description, product.price , product.sku, product.img_url,product.active]);
        if(addedProduct.rowCount>0){
            return addedProduct.rows[0]
        }else{
            const error = new Error("failed to add new Product");
            throw error;
            return
        }
    } catch (error) {
        throw error
    }
}