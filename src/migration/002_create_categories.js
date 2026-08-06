async function up(pool) {
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
        throw error
    }
}



module.exports = {
    up: up
}
