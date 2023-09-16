const mongoose=require('mongoose');
const Joi=require('joi')

//user schema

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:50
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minLength:10,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    category:{
        type:String,
        required:true,

    },
    image:{
        type:Object,
       default:{
        url:"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
        publicId:null,
       }
    },
    likes:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        }
],
},
{
timestamps:true,
  toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
const Post=mongoose.model("Post",postSchema);
// validation
function validateCreatePost(obj){
    const schema=Joi.object({
        title:Joi.string().trim().min(2).max(200).required(),
        description:Joi.string().trim().min(10).required(),
        category:Joi.string().trim().required(),

    })
    return schema.validate(obj)
}

function validateUpdatePost(obj){
    const schema=Joi.object({
        title:Joi.string().trim().min(2).max(200),
        description:Joi.string().trim().min(10),
        category:Joi.string().trim(),

    })
    return schema.validate(obj)
}

module.exports={Post,validateCreatePost,validateUpdatePost}