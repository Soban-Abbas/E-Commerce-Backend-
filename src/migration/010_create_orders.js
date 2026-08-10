async function createStatusType(pool) {
    try {
        await pool.query(`
            do $$
            begin
            create type order_status as enum('pending','shipped');
            exception
            when duplicate_object then null;
            end $$;
            `);
    } catch (error) {
        console.log(error)
    }
}





async function up(pool) {
    try {
        await createStatusType(pool)
        await pool.query(`
CREATE TABLE if not exists orders(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    coupon_id INT REFERENCES coupons(id) ON DELETE SET NULL,
    status order_status NOT NULL DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
       phone_number  character varying(16) not null check (phone_number ~ '^\\+[1-9][0-9]{7,14}$'),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);         `)
    } catch (error) {
        throw error
    }
}

module.exports = {
    up: up
}



