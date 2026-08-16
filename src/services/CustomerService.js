const { user } = require("../config/db.config");
const userModel=require("../models/user.model");

exports.getUserById=async(id)=>{
    try {


        const user = await userModel.getUserbyId(id);
        return user
        
    } catch (error) {
        throw error
    }

}