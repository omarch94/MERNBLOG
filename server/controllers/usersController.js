const asyncHandler=require('express-async-handler');
const {User, validateUpdateUser}= require('../models/User')
const bcrypt=require('bcryptjs')
const path=require('path');
const {cloudinaryUploadImage,cloudinaryRemoveImage}=require('../utils/cloudinary')
const fs=require("fs")
const{Post}=require("../models/Post")
const {Comment}=require("../models/Comment")
/**------------------------------------
 * @desc Get  All users
 * @route  api/auth/profile
 * @method Get
 * @access private (only admin)
 -------------------------------------*/

 module.exports.getAllUsersController=asyncHandler(async(req,res)=>{
    console.log(req.headers.authorization)
    const users=await User.find().select('-password').populate("posts");
    res.status(200).json(users)
 })



 /**------------------------------------
 * @desc Get   user profile
 * @route  api/users/profile/:id
 * @method Get
 * @access public (only admin)
 -------------------------------------*/

 module.exports.getUserProfileController=asyncHandler(async(req,res)=>{
    //dont show password to client 
   const user=await User.findById(req.params.id).select('-password').populate("posts");
   if(!user){
      return res.status(404).json({message:"user not found"})
   }else{
      return res.status(200).json(user)
   }
})

 /**------------------------------------
 * @desc Update user profile
 * @route  api/users/profile/:id
 * @method PUT
 * @access private (only user himself)
 -------------------------------------*/

 module.exports.updateUserProfileController=asyncHandler(async(req,res)=>{
   try {
      // Validate the request body
      const { error } = validateUpdateUser(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      // Check if the user exists in the database
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If the request includes a password, hash it
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
  
      // Update the user's profile
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio,
          },
        },
        { new: true }
      ).select('-password');
  
      // Check if the user was successfully updated
      if (!updatedUser) {
        return res.status(500).json({ message: 'User update failed' });
      }
  
      // Send the updated user data as a response
      res.status(200).json(updatedUser);
    } catch (error) {
      // Handle unexpected errors, e.g., database connection issues
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
 })

 /**------------------------------------
 * @desc Count Users
 * @route  api/users/profile/count-user
 * @method GET
 * @access public
 -------------------------------------*/

 module.exports.countUsersController=asyncHandler(async(req,res)=>{
  const count=await  User.count()
  res.status(200).json(count)
 })

 /**------------------------------------
 * @desc Profile photo Upload
 * @route  api/users/profile/profile-photo-upload
 * @method POST
 * @access private (only user himself)
 -------------------------------------*/

 module.exports.profilePhotoController=asyncHandler(async(req,res)=>{
  //1Validation
  console.log(req.file)
  if(!req.file){
    return res.status(400).json({message:"no file proivided"})
  }
  // 2- get the path to the image
  const imagePath=path.join(__dirname,`../images/${req.file.filename}`);
  //3-upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);
    console.log('resultat',result);
  //4-get the user from db
  const user=await User.findById(req.user.id)
  //5-delete the old profile if exists
  if(user.profileFoto.publicId!== null){
      await cloudinaryRemoveImage(user.profileFoto.publicId)
  }
  //6-change the profile photo field in the DB
  user.profileFoto={
    url:result.secure_url,
    publicId:result.publicId
  }
  await user.save();
  //7-Send Response to client
  res.status(200).json({message:"your profile photo is uploaded successfuly",
  profileFoto:
  {
    url:result.secure_url,
    publidId:result.publicId
  }
})
  //8-Remove image from the server 
  fs.unlinkSync(imagePath)
 })

 /**------------------------------------
 * @desc Delete user profile (Account)
 * @route  api/users/profile/:id
 * @method DELETE
 * @access private (only admin or user himself)
 -------------------------------------*/

 module.exports.deleteUserController=asyncHandler(async(req,res)=>{{
  // 1- get user from db
const user=await User.findById(req.params.id);
if(!user){
  return res.status(404).json({message:"No user"})
}
  //2- get all posts from db

  //3- get publicIds from posts
  //4- delete all image posts from cloudinary that belong to the user account
  //5-delete profile picture from cloudinary
  if(user.profileFoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profileFoto.publicId);
  } 
   //6- delete user posts and comments
      await Post.deleteMany({user:user._id});
      await Comment.deleteMany({user:user._id})

  //7-delete the user himself
  await User.findByIdAndDelete(req.params.id)
  //8-send the response to the client
  res.status(200).json({message:"you profile has been deleted"})
 }})