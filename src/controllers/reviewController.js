const reviewService=require("../services/reviewService")
exports.postReviews=async(req ,res , next)=>{
    try {
        const productId=req.body.productId??null;
        const user_id=req.user.id;
        const rating=req.body.rating??null;
        const comment=req.body.comment??null;


        const postReview=await reviewService.postReview(user_id,productId,rating,comment);
        res.status(201).json({
           ...postReview
        })
    } catch (error) {
        next(error)
    }
}