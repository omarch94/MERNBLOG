const asyncHandler=require('express-async-handler');
const {Post,validateCreatePost,validateUpdatePost}=require("../models/Post");
const fs=require("fs");
const path=require("path");

const {cloudinaryUploadImage,cloudinaryRemoveImage}=require("../utils/cloudinary");
const {Comment}=require("../models/Comment")
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
  .populate("comments"); 
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
 * @route  api/posts/:id
 * @method DELETE
 * @access private (only admin or  owner of the post)
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
    //Delete All the related Comments !
    await Comment.deletMany({
      postId:post._id
    })
    res.status(200).json({
      message:"Post deleted successfuly",
      postId:post._id
    })
    }else{
      return res.status(403).json({message:"Forbiden access denied "})
    }
 })
 /**------------------------------------
 * @desc Update post
 * @route  api/posts/:id
 * @method UPDATE
 * @access private (only    owner of the post)
 -------------------------------------*/
 module.exports.updatePostController=asyncHandler(async(req,res)=>{
 // 1. Validation
 const { error } = validateUpdatePost(req.body);
 if (error) {
   return res.status(400).json({ message: error.details[0].message });
 }
 // 2. Get the post from DB and check if post exist
 const post = await Post.findById(req.params.id);
 if (!post) {
   return res.status(404).json({ message: "post not found" });
 }
 // 3. check if this post belong to logged in user
 if (req.user.id !== post.user.toString()) {
  return res
     .status(403)
     .json({ message: "access denied, you are not allowed" });
 }
 // 4. Update post
 const updatedPost = await Post.findByIdAndUpdate(
   req.params.id,
   {
     $set: {
       title: req.body.title,
       description: req.body.description,
       category: req.body.category,
     },
   },
   { new: true }
 ).populate("user", ["-password"])
 .populate("Comment");

 // 5. Send response to the client
 res.status(200).json(updatedPost);
 })
/**-----------------------------------------------
 * @desc    Update Post Image
 * @route   /api/posts/upload-image/:id
 * @method  PUT
 * @access  private (only owner of the post)
 ------------------------------------------------*/
 module.exports.updateImagePostController=asyncHandler(async(req,res)=>{
   // 1. Validation
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }
  // 2. Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 3. Check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }

  // 4. Delete the old image
  await cloudinaryRemoveImage(post.image.publicId);

  // 5. Upload new photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // 6. Update the image field in the db
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  // 7. Send response to client
  res.status(200).json(updatedPost);

  // 8. Remvoe image from the server
  fs.unlinkSync(imagePath);
 })

 /**-----------------------------------------------
 * @desc    Toggle Like
 * @route   /api/posts/like/:id
 * @method  PUT
 * @access  private (only logged in user)
 ------------------------------------------------*/

 module.exports.toggleLikeController=asyncHandler(async(req,res)=>{
  const loggedInUser=req.user.id
  const {id:postId}=req.params;
  let post=await Post.findById(postId);
  if(!post){
    return res.status(400).json({message:"no post found"})
  }
  const isPostAlreadyLiked=post.likes.find(
    (user)=>user.toString()===loggedInUser
  )
  if(isPostAlreadyLiked){
    post=await Post.findByIdAndUpdate(
      postId,{
        $pull:{ 
          likes:loggedInUser
        },
      },
      {new:true}
    )
    
        }else{
          post=await Post.findByIdAndUpdate(
            postId,
            {
              $push:{
                likes:loggedInUser
    
              }
            },
            {new:true},
      )
    }
  res.status(200).json(post);
 })