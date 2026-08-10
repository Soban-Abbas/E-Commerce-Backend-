async function up(pool) {
    try {

        await pool.query(`alter table cart_items 
            drop column price_snapshot `)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    up: up
}