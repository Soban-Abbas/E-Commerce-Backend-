

async function up(pool) {
    try {
        await pool.query(`
            

CREATE TABLE if not exists reviews(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK(rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(user_id, product_id)
);




            `)
    } catch (error) {
        throw error
    }
}


module.exports = {
    up: up
}









