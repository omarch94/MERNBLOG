const mongoose=require('mongoose');
const Joi=require('joi')
const jwt=require('jsonwebtoken')
//user schema

const userSchema=new mongoose.Schema({
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
    profileFoto:{
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
//Generate Auth token 
userSchema.methods.generateAuthToken=function() {
    return jwt.sign({
        id:this._id,
        isAdmin:this.isAdmin
    },"privateKey")
}


const User=mongoose.model("User",userSchema);
//validate user in express js using Joi
function validateRegisterUser(obj){
const schema=Joi.object({
    username:Joi.string().trim().min(2).max(50).required(),
    email:Joi.string().trim().min(5).max(50).required(),
    password:Joi.string().trim().min(8).required()

});
return schema.validate(obj)
}

//validate user in express js using Joi
function validateLoginUser(obj){
    const schema=Joi.object({
        // username:Joi.string().trim().min(2).max(50).required(),
        email:Joi.string().trim().min(5).max(50).required(),
        password:Joi.string().trim().min(8).required()
    
    });
    return schema.validate(obj)
    }
module.exports={User,validateRegisterUser,validateLoginUser}