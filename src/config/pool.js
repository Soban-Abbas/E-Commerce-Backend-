const envVariables = require("./db.config");
const { Pool } = require("pg");
exports.pool = new Pool({
    user: envVariables.user,
    password: envVariables.password,
    host: envVariables.hostname,
    port: envVariables.port,
    database: envVariables.database,
    max:envVariables.pool.max,
    connectionTimeoutMillis: envVariables.pool.connectionTimeoutMillis,
    idleTimeoutMillis:envVariables.pool.idleTimeoutMillis
})