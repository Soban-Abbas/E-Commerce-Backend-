const { pool } = require("../config/pool");
exports.savetoken = async (user_id, token) => {
    try {
        const save = await pool.query(`insert into tokens (user_id , token) values ($1 , $2) returning * `, [user_id, token])
        if (save.rowCount > 0) {
            return save.rows
        }

    } catch (error) {
        throw error
    }
}
exports.verifyToken = async (token) => {

    try {
        const verifyToken = await pool.query('select user_id  from tokens where token = $1 and expires_at > now()', [token])
        if (verifyToken.rowCount < 1) {
            const error = new Error("Token expires");
            error.status = 400;
            throw error;
            return
        }
        else {
            return verifyToken.rows
        }
    } catch (error) {

        throw error
    }
}