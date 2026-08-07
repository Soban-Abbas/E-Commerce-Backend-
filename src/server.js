const express=require('express');
require("dotenv").config();
const { globalErrorMiddleware }=require("./middleware/globalErrorMiddleware")
const adminRoutes=require("./routes/adminRoutes")
const app=express();




app.use('/admin',adminRoutes)
app.use(globalErrorMiddleware)
app.listen(3010,()=>{
    console.log("server is started at port 3000")
})

