const {pool}=require("../config/pool");
exports.getUserByEmail=async(email)=>{
    try {
        const user=await pool.query('select id, email, role from users where email = $1',[email]);
if(user.rowCount>0){
    
    return user.rows
}else{
    const error = new Error();
    error.status=404;
    error.message="User Not Found"
    throw error 
}
    } catch (error) {
        throw error
    }
}
exports.resetpassword=async (user_id , password) => {
    try {
        const changePassword = await pool.query(`update users set password = $1 where id = $2`,[password,user_id]);
        if(changePassword.rowCount>0){
            return changePassword.rows
        }else{
            const error = new Error("password not changed");
            throw error
        }
    } catch (error) {
        throw error
    }
}

