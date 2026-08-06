const {pool}=require("../config/pool")
const encryptedPassword=require('../util/encryptPassword')
const envVariables=require('../config/db.config')
async function createAdmin(pool){
try {
  const admin=  await pool.query('select role from users where role=$1',['admin'])
if(admin.rowCount>0){
    const error =new Error("Admin Already Exist")
    error.status=409;
    throw error
    return
}



console.log(envVariables.adminName,envVariables.adminEmail,envVariables.adminPassword)

    const password = await encryptedPassword(envVariables.adminPassword)
    const createAdmin=await pool.query('insert into users (name , email , password) values($1,$2,$3) ',[envVariables.adminName,envVariables.adminEmail,password]);


    console.log("admin created Successfully")

} catch (error) {
    console.log(error)
}
}


createAdmin(pool);