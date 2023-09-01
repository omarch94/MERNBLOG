const mongoose=require("mongoose");

module.exports=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongodb");
    }catch(err){
        console.log('Connection Failed',err)
    }
}