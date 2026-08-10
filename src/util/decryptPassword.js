const bcrypt=require('bcrypt');
async function decryptPassword(password,encryptedPassword) {
    try {
        
        const comparePassword=await bcrypt.compare(password,encryptedPassword)
        if(comparePassword){
            return true
        }else{
            const error = new Error("Wrong Email or Password");
            error.status=401;
            throw error

        }
    } catch (error) {
        throw error
    }
}
module.exports=decryptPassword