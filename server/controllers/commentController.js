const asyncHandler=require("express-async-handler");
const {validateCreateComment,validateUpdateComment,Comment}=require("../models/Comment");
const {User}=require("../models/User");


/**-----------------------------------------------
 * @desc    Create New Comment
 * @route   /api/comments
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
 module.exports.createCommentController=asyncHandler(async(req,res)=>{
    const {error}=validateCreateComment(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    const profile=await User.findById(req.user.id);

    const comment=await Comment.create({
        postId:req.body.postId,
        text:req.body.text,
        user:req.user.id,
        username:profile.username
    })
    return res.status(201).json(comment)
 })

 /**-----------------------------------------------
 * @desc     Get All Comment
 * @route   /api/comments
 * @method  GET
 * @access  private (only Admin)
 ------------------------------------------------*/
 module.exports.getAllCommentsController=asyncHandler(async(req,res)=>{
   
    const comments=await Comment.find().populate("user")
    return res.status(200).json(comments)
 })
  /**-----------------------------------------------
 * @desc     Delete Comment
 * @route   /api/comments
 * @method  DELETE
 * @access  private (Admin and user himself owner of the comment)
 ------------------------------------------------*/
 module.exports.deleteCommentController=asyncHandler(async(req,res)=>{
   
    const comments=await Comment.findById(req.params.id)
    if(!comments){
        return res.status(404).json({message:"comment not found"})
    }
    if(req.user.isAdmin || req.user.id === comments.user.toString()){
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Comment has been deleted "})
    }else{
        return res.status(403).json({message:"Access denied not allowed!"})
    }
 })

  /**-----------------------------------------------
 * @desc     Update Comment
 * @route   /api/comments
 * @method  PUT
 * @access  private (Admin and user himself owner of the comment)
 ------------------------------------------------*/
 module.exports.updateCommentController=asyncHandler(async(req,res)=>{
    const { error } = validateUpdateComment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const comment = await Comment.findById(req.params.id);
    if(!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    
    if(req.user.id !== comment.user.toString()) {
      return res.status(403)
        .json({ message: "access denied, only user himself can edit his comment" });
    }
  
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
      $set: {
        text: req.body.text,
      }
    }, { new : true });
    
    res.status(200).json(updatedComment);
 })