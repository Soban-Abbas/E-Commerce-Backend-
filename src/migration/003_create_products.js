
async function up(pool) {
    try {
        await pool.query(`CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    sku VARCHAR(64) UNIQUE NOT NULL,
    image_url text default null,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);`)
    } catch (error) {
        throw error
    }
}

module.exports = {
    up: up
}