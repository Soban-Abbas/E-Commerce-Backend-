const express=require('express');
require("dotenv").config();
const { globalErrorMiddleware }=require("./middleware/globalErrorMiddleware")
const authRoutes=require("./routes/adminRoutes")
const productRoutes=require("./routes/productsRoutes")
const usersRoutes=require("./routes/usersRoutes")
const app=express();

app.use('/admin',authRoutes)
app.use('/admin',productRoutes)
app.use('/users', usersRoutes)
app.use(globalErrorMiddleware)
app.listen(3010,()=>{
    console.log("server is started at port 3000")
})

