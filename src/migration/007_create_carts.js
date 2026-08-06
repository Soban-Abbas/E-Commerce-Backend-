


async function up(pool) {
    try {
        await pool.query(`
            


CREATE TABLE if not exists carts(
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
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



