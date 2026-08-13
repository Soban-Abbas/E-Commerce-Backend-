const express=require('express');
require("dotenv").config();
const { globalErrorMiddleware }=require("./middleware/globalErrorMiddleware")
const authRoutes=require("./routes/authRoutes");
const couponRoutes=require("./routes/couponRoutes")
const usersRoutes=require("./routes/usersRoutes")
const orderRoutes=require("./routes/orderRoutes")
const adminRoutes=require("./routes/adminRoutes")
const app=express();

app.use(authRoutes)
app.use('/admin',adminRoutes)
app.use(couponRoutes)
app.use('/customer', usersRoutes)
app.use(orderRoutes)
app.use(globalErrorMiddleware)
app.listen(3010,()=>{
    console.log("server is started at port 3010")
})

