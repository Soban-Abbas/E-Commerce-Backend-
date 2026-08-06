const express=require('express');
require("dotenv").config();
const adminRoutes=require("./routes/adminRoutes")
const app=express();




app.use('/admin',adminRoutes)

app.listen(3010,()=>{
    console.log("server is started at port 3000")
})

