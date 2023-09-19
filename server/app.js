const express=require('express');
//Connection to db
const connectDb=require('./config/connectDb');
const {errorHandler,notFound} = require('./middlewares/error');
// PORT
const port=process.env.PORT||8002;
require('dotenv').config();
const app=express();
//MIDLLEWARES
app.use(express.json())
//routes
app.use('/api/auth',require('./routes/authRoute'))
app.use('/api/users',require('./routes/usersRoute'))
app.use('/api/posts',require('./routes/postRoute'))
app.use('/api/comments',require('./routes/commentRoute'))
app.use('/api/categories',require('./routes/categoryRoute'))

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