const orderService=require('./orderService');
const reviewsModel=require("../models/reviews.model")
exports.postReview=async(userId , productId , rating , comment)=>{
    if(!productId ||!rating){
        const error = new Error("Product id or  rating is missing ");
        error.status =422;
        throw error
        return
    }

    const customerOrdered= await orderService.isCustomerOrdered(userId,productId)

    const checkAlreadyRated=await reviewsModel.alreadyRated(userId,productId)


    const postreview=await reviewsModel.postnewReview(userId , productId,rating,comment);



    return{
      review :  postreview
    }

}