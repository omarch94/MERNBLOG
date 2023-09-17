const asyncHandler=require('express-async-handler');
const {Post,validateCreatePost,validateUpdatePost}=require("../models/Post");
const fs=require("fs");
const path=require("path");

const {cloudinaryUploadImage,cloudinaryRemoveImage}=require("../utils/cloudinary");

/**------------------------------------
 * @desc Create  New post
 * @route  api/posts
 * @method POST
 * @access private (only logged in users)
 -------------------------------------*/

 module.exports.createPostController=asyncHandler(async(req,res)=>{
    //1- validation for image
    if(!req.file){
        return res.status(400).json({message:"no image provided"})
    }
    //2- validate data
    const{error}=validateCreatePost(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    //3- Upload image
    const imagePath=path.join(__dirname,`../images/${req.file.filename}`);
    const result=await cloudinaryUploadImage(imagePath);
    //4-Create a new post in db
    const post=await Post.create({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        user:req.user.id,
        image:{
            url:result.secure_url,
            publicId:result.public_id
        },

    });
    //5-send response to client
    return res.status(201).json({post})
    //6- remove image from server
    fs.unlinkSync(imagePath)
 })
 /**------------------------------------
 * @desc get all posts
 * @route  api/posts
 * @method GET
 * @access public
 -------------------------------------*/

 module.exports.getAllPostsController=asyncHandler(async(req,res)=>{
    const POST_PER_PAGE = 3;
    const { pageNumber, category } = req.query;
    let posts;
    if (pageNumber) {
        posts = await Post.find()
          .skip((pageNumber - 1) * POST_PER_PAGE)
          .limit(POST_PER_PAGE)
          .sort({ createdAt: -1 })
          .populate("user", ["-password"]);
      } else if (category) {
        posts = await Post.find({ category })
          .sort({ createdAt: -1 })
          .populate("user", ["-password"]);
      } else {
        posts = await Post.find()
          .sort({ createdAt: -1 })
          .populate("user", ["-password"]);
      }
      res.status(200).json(posts);
    });
 /**------------------------------------
 * @desc get single post
 * @route  api/posts/:id
 * @method GET
 * @access public 
 -------------------------------------*/

 module.exports.getSinglePost=asyncHandler(async(req,res)=>{
  const post=await Post.findById(req.params.id).populate("user",["-password"])
  if(!post){
    return res.status(404).json({message:"No post found"})
  }
  return res.status(200).json({post})
 })

 /**------------------------------------
 * @desc Count Number of posts
 * @route  api/posts
 * @method GET
 * @access public (only logged in users)
 -------------------------------------*/
 module.exports.getNumberPosts=asyncHandler(async(req,res)=>{
  const numPost=await Post.count();
  if(numPost==null){
    return res.status(400).json({message:"there are no posts"})
  }
  return res.status(200).json(numPost)
 })

  /**------------------------------------
 * @desc Delete post
 * @route  api/posts
 * @method DELETE
 * @access private (only logged in users)
 -------------------------------------*/

 module.exports.deletePostController=asyncHandler(async(req,res)=>{
  // find the post in db
  const post=await Post.findById(req.params.id)
  if(!post){
    return res.status(400).json({message:"Post not found"})
  }
  if(req.user.isAdmin||req.user.id===post.user.toString()){
    await Post.findByIdAndDelete(req.params.id)
    await cloudinaryRemoveImage(post.image.publicId)
    
    res.status(200).json({
      message:"Post deleted successfuly",
      postId:post._id
    })
    }else{
      return res.status(403).json({message:"Forbiden access denied "})
    }

 })