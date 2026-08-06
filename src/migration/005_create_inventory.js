


async function up(pool) {
    try {
        await pool.query(`
           

CREATE TABLE if not exists inventory(
    id SERIAL PRIMARY KEY,
    product_id INT UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 0 CHECK(quantity >= 0),
    updated_at TIMESTAMP DEFAULT now()
);
            `)
    } catch (error) {
        throw error
    }
}

module.exports = {
    up: up
}
