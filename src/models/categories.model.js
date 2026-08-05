const {pool}=require("../config/pool");

async function createCategoriesTable() {
    try {
        await pool.query(`
            CREATE TABLE if not exists categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    parent_category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT now()
);
            `)
    } catch (error) {
        console.log(error)
    }
}


module.exports=createCategoriesTable
