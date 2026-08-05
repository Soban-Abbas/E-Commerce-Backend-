const { pool } = require('../config/pool');

async function createRoleType() {
    try {
        await pool.query(`
            do $$
            begin
            create type role as enum('customer','admin');
            exception
            when duplicate_object then null;
            end $$;
            `);
    } catch (error) {
        console.log(error)
    }
}

async function createUserTable() {
    try {
        await createRoleType()
        await pool.query(`create table if not exists users (
             id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role role NOT NULL DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()

            )`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = createUserTable