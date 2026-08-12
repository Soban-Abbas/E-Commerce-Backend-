async function up(pool) {
    try {

        await pool.query(`alter type order_status add value if not exists 'paid';
            `);
        await pool.query(`alter type order_status add value if not exists 'delivered';
            `);
        await pool.query(`alter type order_status add value if not exists 'cancelled';
            `)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    up: up
}