exports.isAdmin=(req , res , next)=>{
    if(req.user.role==="admin"){
        next()
    }else{
     return   res.status(400).json({
            error :"only admin can access this route"
        })
    }
}