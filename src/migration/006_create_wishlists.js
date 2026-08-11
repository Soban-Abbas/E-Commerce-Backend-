

async function up(pool) {
    try {
        await pool.query(`
CREATE TABLE if not exists wishlists(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(user_id, product_id)
); `)
    } catch (error) {
        throw error
    }
}
module.exports = {
    up: up
}



