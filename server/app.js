const express=require('express');
//Connection to db
const connectDb=require('./config/connectDb')
// PORT
const port=process.env.PORT||8002;
require('dotenv').config();
const app=express();
//MIDLLEWARES
app.use(express.json())
//routes
app.use('/api/auth',require('./routes/authRoute'))
//CONNECTION DB
connectDb();
//RUN SERVER
app.listen(port,()=>{
    console.log("Server is running",port)
})