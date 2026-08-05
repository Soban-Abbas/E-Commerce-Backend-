const {pool}=require("../config/pool");

async function createproduct_CategoriesTable() {
    try {
        await pool.query(`
             create table if not exist product_categories (
              product_id INT REFERENCES products(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
             )
            `)
    } catch (error) {
        throw error
    }
}


module.exports = createproduct_CategoriesTable
