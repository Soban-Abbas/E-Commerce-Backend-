async function up(pool) {
    try {
        await pool.query(`
          ALTER TABLE categories
ADD CONSTRAINT categories_name_unique UNIQUE (name);
            `)
    } catch (error) {
        throw error
    }
}
module.exports = {
    up: up
}
