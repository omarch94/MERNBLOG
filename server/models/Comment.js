const mongoose=require('mongoose');
const Joi=require("joi")
//comment schema

const commentSchema=new mongoose.Schema({
postId:{
    type:mongoose.Schema.ObjectId,
    ref:"Post",
    required:true
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
},
text:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true
}
}) 

const Comment=mongoose.model("Comment",commentSchema);
function validateCreateComment(obj){
    const schema=Joi.object({
        postId:Joi.string().required().label("Post ID"),
        text:Joi.string().required().label("Text"),

    })
    return schema.validate(obj)
}

function validateUpdateComment(obj){
    const schema=Joi.object({
        text:Joi.string().required().trim(),

    })
    return schema.validate(obj)
}
module.exports={
    Comment,validateCreateComment,validateUpdateComment
}
