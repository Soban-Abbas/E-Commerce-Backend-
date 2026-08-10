const jwt = require("jsonwebtoken");
const envVeriables=require("../config/db.config")
exports.generateJwttoken = (id, role) => {
    const payload = {
        id: id,
        role: role
    }
    const secret = envVeriables.jwtSecretKey;
    const expiry = {
        expiresIn: '1h',
    }

    const token = jwt.sign(
        payload, secret, expiry
    )

    return token



}