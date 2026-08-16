
const {pool}=require("../config/pool");
exports.getUserByEmail=async(email)=>{
    try {
        const user=await pool.query('select id,name, email,password, role from users where email = $1',[email]);
if(user.rowCount>0){
    
    return user.rows
}else{
    const error = new Error();
    error.status=401;
    error.message="Invalid Email"
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
exports.registerNewUser=async(name,email,password,role)=>{
    try {
        const addNewuser=await pool.query(`insert into users (name,email,password,role) values($1,$2,$3,$4) returning *`,[name,email,password,role]);
        if(addNewuser.rowCount>0){
            return true
        }else{
            throw new Error("Error in Signup")
        }
    } catch (error) {
        if(error.code="23505"){
            error.status=409
            error.message="Email Already Registered"
        }
        throw error
    }
}
exports.login=async(email,password)=>{
    try {
        const login = await pool.query(`select * from users where email = $1 and password =$2`,[email,password]);
        if(login.rowCount>0){
            return login.rows[0]
        }else{
            const error = new Error("Wrong Email or Password");
            error.status=401;
            throw error
        }
    } catch (error) {
        throw error
    }
}

exports.getUserbyId=async(id)=>{
    try {
        const user=await pool.query(`select * from users where id = $1`,[id]);
        if(user.rowCount<1){
            const error = new Error("cutomer account deleted");
            error.status=404;
            throw error
        }
        return user.rows[0]
    } catch (error) {
        throw error
    }
}