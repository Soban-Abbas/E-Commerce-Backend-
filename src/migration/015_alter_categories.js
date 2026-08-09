async function up(pool) {
    try {
        await pool.query(`
           alter table categories drop column description;
            `)
    } catch (error) {
        throw error
    }
}



module.exports = {
    up: up
}
