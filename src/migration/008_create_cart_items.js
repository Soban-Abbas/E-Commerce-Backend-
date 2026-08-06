

async function up(pool) {
    try {
        await pool.query(`
            

CREATE TABLE if not exists cart_items(
    id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK(quantity > 0),
    price_snapshot DECIMAL(10, 2) NOT NULL,
    UNIQUE(cart_id, product_id)
);




            `)
    } catch (error) {
        throw error
    }
}


module.exports = {
    up: up
}



