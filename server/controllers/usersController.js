const asyncHandler=require('express-async-handler');
const {User, validateUpdateUser}= require('../models/User')
const bcrypt=require('bcryptjs')

/**------------------------------------
 * @desc Get  All users
 * @route  api/auth/profile
 * @method Get
 * @access private (only admin)
 -------------------------------------*/

 module.exports.getAllUsersController=asyncHandler(async(req,res)=>{
    console.log(req.headers.authorization)
    const users=await User.find().select('-password');
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
   const user=await User.findById(req.params.id).select('-password');
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
  console.log(req.file)
  if(!req.file){
    return res.status(400).json({message:"no file proivided"})
  }
  res.status(200).json({message:"your profile photo is uploaded successfuly"})
 })