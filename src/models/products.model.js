const { errorMonitor } = require("nodemailer/lib/xoauth2");
const {pool}=require("../config/pool")
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
        const addedProduct=await client.query('insert into products (name , description,price,sku, image_url,is_active ) values ($1,$2,$3,$4,$5,$6) returning * ',[product.Name,product.description, product.price , product.sku, product.imageUrl,product.is_active]);
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

exports.getProducts=async(limit , offset , is_active)=>{
    try {
     console.log(limit,offset,is_active);
        const products = await pool.query(`select categories.name as category,products.* , inventory.quantity   from products 
        inner join product_categories 
        on products.id = product_categories.product_id 
        inner join categories
        on categories.id = product_categories.category_id
        inner join inventory
        on products.id = inventory.product_id
        
        
where products.is_active = $3
        limit $1 offset $2

        `,[limit,offset,is_active]);
        if(products.rowCount>0){
            return products.rows
        }else{
            const error = new Error("no product found");
            error.status=404;
            throw error
            return
        }
    } catch (error) {
        throw error
    }
}

exports.updateProduct=async(fields , values ,sku)=>{
    try {
        values.push(sku);
        console.log(fields);
        console.log(values);
        
        const updateProduct=await pool.query(`update products set ${fields.join(', ')} where sku=$${values.length} returning * `,values);
    
        if(updateProduct.rowCount>0){
            return updateProduct.rows[0]
        }else{
            throw new Error("failed to Update Product");
            return
        }
    } catch (error) {
        throw error
    }
}

exports.deleteProduct=async(sku,client)=>{
    try {
        const deleteProduct = await client.query('delete from products where sku=$1 returning *',[sku]);;
        if(deleteProduct.rowCount>0){
            return deleteProduct.rows[0].id
        }else{
            
            throw new Error("cannot delete product");
return
        }
        
    } catch (error) {
        throw error
    }
}

exports.getProductBySku=async(sku)=>{
    try {
        const product=await pool.query(`select products.*,inventory.quantity,categories.name as category from products
            inner join inventory
            on products.id=inventory.product_id
            inner join product_categories
            on products.id=product_categories.product_id
             inner join categories
            on categories.id = product_categories.category_id

             where products.sku=$1`,[sku]);
        if(product.rowCount<1){
            const error=new Error("product not Available");
            error.status=404;
            throw error
        }else{
            return product.rows
        }
    } catch (error) {
        throw error
    }
}