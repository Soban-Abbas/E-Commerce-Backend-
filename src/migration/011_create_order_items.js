async function up(pool) {
    try {
        await pool.query(`
    CREATE TABLE if not exists order_items(
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK(quantity > 0),
    price_at_purchase DECIMAL(10, 2) NOT NULL
);            `)
    } catch (error) {
        throw error
    }
}


module.exports = {
    up: up
}









