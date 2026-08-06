




async function createDiscountType(pool) {
    try {
        await pool.query(`
            do $$
            begin
            create type discount_type as enum('percentage','fixed');
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
        await createDiscountType(pool)
        await pool.query(`
            




CREATE TABLE if not exists coupons(
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type discount_type NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2) DEFAULT 0,
    max_uses INT,
    used_count INT DEFAULT 0,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);



            `)
    } catch (error) {
        throw error
    }
}


module.exports = {
    up: up
}










