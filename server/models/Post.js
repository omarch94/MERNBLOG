const mongoose=require('mongoose');

//user schema

const postSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minLength:5,
        maxLength:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:8,
    },
    typeFoto:{
        type:Object,
       default:{
        url:"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
        publicId:null,
       }
    },
    bio:{
        type:Object,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isAccountVerified:{
        type:Boolean,
        default:false,
    }
},
{
timestamps:true,
})
const Post=mongoose.model("Post",userSchema);
module.exports={Post}