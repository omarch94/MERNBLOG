const express=require('express');
//Connection to db
const connectDb=require('./config/connectDb');
const {errorHandler,notFound} = require('./middlewares/error');
const cors=require("cors");
// xss 
const xss=require("xss-clean")
//rate limiting
const rateLimiting=require("express-rate-limit")
const helmet=require('helmet')
const hpp=require("hpp")
// PORT
const port=process.env.PORT||8002;
require('dotenv').config();
const app=express();
//MIDLLEWARES
app.use(express.json())
// prevent xss atack
app.use(xss())
// rate limiting
app.use(rateLimiting({

    windowMs:10*60*1000, // 10 minutes
    max:2,
}
    ))

    // security headers (helmet)
app.use(helmet())
//prevent http param pollutioon
app.use(hpp())
//CORS Policy
app.use(cors({
    origin:"http://localhost:3000"
}))
//routes
app.use('/api/auth',require('./routes/authRoute'))
app.use('/api/users',require('./routes/usersRoute'))
app.use('/api/posts',require('./routes/postRoute'))
app.use('/api/comments',require('./routes/commentRoute'))
app.use('/api/categories',require('./routes/categoryRoute'))
app.use('/api/password',require('./routes/passwordRoute'))
// NOT FOUND ERROR HANDLER
app.use(notFound)
// Error Handler Midlleware
app.use(errorHandler)
//CONNECTION DB
connectDb();
//RUN SERVER
app.listen(port,()=>{
    console.log("Server is running",port)
})