
const {pool}=require("../config/pool")

exports.postnewReview=async(userid , productId , rating , comment)=>{
    try {
        const addnewReview=await pool.query(`insert into reviews (user_id , product_id , rating , comment) values ($1,$2,$3,$4) returning *`,[userid,productId,rating,comment]);
        if (addnewReview.rowCount>0){
            return addnewReview.rows[0]
        }else{
            throw new Error("Failed to add Review");

        }
    } catch (error) {
        throw error

    }
}
exports.alreadyRated=async(userid, productId)=>{
    try {
        const alreadyRated=await pool.query(`select id from reviews where user_id = $1 and product_id = $2`,[userid,productId]);
        if(alreadyRated.rowCount<1){
            return true
        }
        else{
            const error  = new Error("already reviewd");
            error.status=422;
            throw error
        }
    } catch (error) {
        throw error
    }
}