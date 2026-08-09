async function up(pool) {
    try {
        
        await pool.query(`alter table products 
            add constraint unique_product_name unique(name) `)
    } catch (error) {
    console.log(error)
    }
}
module.exports={
    up:up
}