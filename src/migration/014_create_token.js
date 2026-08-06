async function up(pool) {
    try {
        await pool.query(`
            CREATE TABLE if not exists tokens (
    id SERIAL PRIMARY KEY,
    token text NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE cascade,
    created_at TIMESTAMP DEFAULT now(),
    expires_at timestamp default (now()+ interval '1 hour')
);
            `)
    } catch (error) {
        throw error
    }
}



module.exports = {
    up: up
}
