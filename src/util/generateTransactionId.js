const crypto=require("crypto");
exports.generateTransactionId=()=>{
    const id = crypto.randomBytes(8).toString('hex');
    return id
}