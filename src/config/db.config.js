
const envVariables = ['hostname', 'database', 'password', 'port', 'user', 'jwtSecretKey', 'adminEmail', 'adminPassword'];

const errors = []
function validateEnv() {
    for (const v of envVariables) {
        if (!process.env[v] || process.env[v].trim() === '') {
            errors.push(v);

        }

        if (errors.length > 0) {
            errors.forEach(element => {
                console.log(`missing environment variables ${element}`)
            });
            process.exit(1);
        }

        console.log("Env Variables enjected Successfully")
    }


}
validateEnv();


module.exports = {
    hostname: process.env.hostname,
    password: process.env.password,
    user: process.env.user,
    database: process.env.database,
    port: process.env.port,
    jwtSecretKey: process.env.jwtSecretKey,
    adminEmail: process.env.adminEmail,
    adminPassword: process.env.adminPassword,
    pool: {
        max: 10,
        connectionTimeoutMillis: 5000,//if req comes and not get conection because connection are already busy then it req fails after 5 sec
        idleTimeoutMillis: 10000 //if conection is not used for 10 sec it closes 
    }
}