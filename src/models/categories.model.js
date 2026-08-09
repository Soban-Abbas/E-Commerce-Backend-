exports.getCategoryId=async(Category , client)=>{
    try {
        const category= await client.query(`select id from categories where name = $1 `,[Category]);
        if(category.rowCount<1){
            const createCategory= await client.query('insert into categories (name) values ($1) returning *',[Category])
                     
            return createCategory.rows[0].id
            
        }else{
            return category.rows[0].id
        }
    } catch (error) {
        throw error
    }
}

exports.createCategory=async(category, client)=>{
    try {
        const addCategory = await client.query(`insert into categories (name ) values ($1) returning * `,[category])
        if(addCategory.rowCount>0){
            return addCategory.rows[0]
        }else{
            const error = new Error("Category Not added ");
            throw error
        }
    } catch (error) {
        throw error
    }
}

exports.addIntoProductcategory=async(categoryId , productId , client)=>{
    try {
        const add_into_product_category=await client.query('insert into product_categories (product_id, category_id) values ($1,$2)',[productId,categoryId]);
        if(add_into_product_category.rowCount<1){
const error = new Error("failed to add product");
throw error;
return
        }
    } catch (error) {
        throw error
    }
}

