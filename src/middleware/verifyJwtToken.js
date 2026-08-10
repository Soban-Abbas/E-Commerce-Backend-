const jwt=require("jsonwebtoken");
const envVariable=require("../config/db.config")
exports.verifyToken=(req , res , next)=>{
    
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).json({
                error: "Please login First"
            })
        }
        const token = header.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                error: "Please login First"
            })
        }

        const decode = jwt.verify(token, envVariable.jwtSecretKey);
        const { id, role} = decode;
        req.user = { id, role};
        next();

    } 