async function up(pool) {
    try {

        await pool.query(`alter table categories 
            drop column parent_category_id `)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    up: up
}