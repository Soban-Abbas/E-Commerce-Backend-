const bcrypt=require('bcrypt');
async function encryptedPassword(password) {
    try {
        const encryptedPassword=await bcrypt.hash(password,10);
        return encryptedPassword
    } catch (error) {
        throw error
    }
}
module.exports=encryptedPassword