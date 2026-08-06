async function up(pool) {
    try {
        await pool.query(`
             create table if not exists product_categories (
              product_id INT REFERENCES products(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
             )
            `)
    } catch (error) {
        throw error
    }
}



module.exports = {
    up: up
}
