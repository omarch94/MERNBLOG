const asyncHandler=require('express-async-handler');
const bcrypt=require('bcryptjs');
const {User,validateRegisterUser,validateLoginUser}=require("../models/User");
/**------------------------------------
 * @desc register new user
 * @route  api/auth/register
 * @method post
 * @access Public
 -------------------------------------*/

 module.exports.registerController=asyncHandler(async(req,res)=>{
    // validation

   const {error}=validateRegisterUser(req.body)
   if (error){
            return res.status(400).json({message:error.details[0].message})
   }

   //is user already exists
   let user= await User.findOne({email:req.body.email})
   if (user){
         return res.status(400).json({message:"user already exists"})
   }

    //hash password
   const salt=await bcrypt.genSalt(10);
   const hashPassword=await bcrypt.hash(req.body.password,salt)
    //new user and save it to db
    user=new User({
      username:req.body.username,
      email:req.body.email,
      password:hashPassword,
    })
    await user.save();
    res.status(201).json({message:"you registred successfuly please log in"})
    //send response to client
 })

 /**------------------------------------
 * @desc Login  user
 * @route  api/auth/login
 * @method post
 * @access Public
 -------------------------------------*/

module.exports.loginUserController=asyncHandler(async(req,res)=>{
  //validation
  const {error}=validateLoginUser(req.body)
  if (error){
           return res.status(400).json({message:error.details[0].message})
  }
  //is user exist in db??
  let user= await User.findOne({email:req.body.email})
  if (!user){
        return res.status(400).json({message:"invalid email or password"})
  }
  //Password is correct or no. ?
const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
if (!isPasswordMatch){
  return res.status(400).json({message:"invalid  password"})
}
  //generate the token (JWT)
  const token=user.generateAuthToken()
  // response to client
  res.status(200).json({
    _id:user._id,
    isAdmin:user.isAdmin,
    profileFoto:user.profileFoto,
    token

  })

})