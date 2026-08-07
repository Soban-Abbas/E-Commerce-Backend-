const {pool}=require("../config/pool");
exports.getUserByEmail=async(email)=>{
    try {
        const user=await pool.query('select email from users where email = $1',[email]);
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
