

async function createPayment_statusType(pool) {
    try {
        await pool.query(`
            do $$
            begin
            create type payment_status as enum('pending','success','failed');
            create type payment_method as enum('easypaisa','jazzcash','bank','cod');
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
        await createPayment_statusType(pool)
        await pool.query(`
            

CREATE TABLE if not exists payments (
    id SERIAL PRIMARY KEY,
    order_id INT UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status payment_status NOT NULL DEFAULT 'pending',
    payment_method payment_method not null DEFAULT 'cod',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT now()
);  `)
    } catch (error) {
        throw error
    }
}
module.exports = {
    up: up
}




