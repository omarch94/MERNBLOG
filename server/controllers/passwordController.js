const asyncHandler=require('express-async-handler');
const bcrypt=require('bcryptjs');
const {User,validateEmail,validateNewPawssord}=require("../models/User");
const { VerifyToken } = require('../models/verifyToken');
const crypto =require("crypto")
const sendEmail=require("../utils/sendEmail")
/**------------------------------------
 * @desc send reset password link 
 * @route  api/password/reset-password-link
 * @method post
 * @access Public
 -------------------------------------*/

 module.exports.sendPasswordLinkController=asyncHandler(async(req,res)=>{
    //validation
    const {error}=validateEmail(req.body)
    if(error){
       return res.status(400).json({message:error.details[0].message})
    }
    //get user from db by email
    const user= await User.findOne({email:req.body.email})
    if (!user){
      return res.status(400).json({message:"No user found"})
    }
    // creating verification token
    let verificationToken=await VerifyToken.findOne({userId:user.id})
    if(!verificationToken){
      verificationToken=new VerifyToken({
         userId:user.id,
         token:crypto.randomBytes(32).toString("hex")
      })
      await verificationToken.save();
    }
    //creating link
    const link=`http://localhost:3000/reset-password/${user.id}/${verificationToken.token}`
    //creating html template
    const htmlTemplate=`
    <a href="${link}">Click here to reset your password</a>
    `
    //sending email
    await sendEmail(user.email,"Reset password",htmlTemplate)
    //response to client
    res.
    status(200).
    json({message:"password reset link sent to your email please check your inbox"})
 })

 /**------------------------------------
 * @desc get reset password link 
 * @route  api/password/reset-password/:userId/:token
 * @method get
 * @access Public
 -------------------------------------*/

 module.exports.getResetPasswordLinkController=asyncHandler(async(req,res)=>{

   const user=await User.findById(req.params.userId)
   if(!user){
      return res.status(400).json({messsage:"invalid link"})
   }
   const verificationToken = await VerifyToken.findOne({
      userId: user._id,
      token: req.params.token,
     });
        if(!verificationToken){
      return res.status(400).json({messsage:"invalid link"})
   }

   res.status(200).json({message:"valid Url"})

 })

  /**------------------------------------
 * @desc  reset password  
 * @route  api/password/reset-password/:userId/:token
 * @method post
 * @access Public
 -------------------------------------*/

 module.exports.getResetPasswordController=asyncHandler(async(req,res)=>{
   //validation
   const {error}=validateNewPawssord(req.body)
   if(error){
      return res.status(400).json({message:error.details[0].message})
   }
   //get user from db by email
const user= await User.findOne({_id:req.params.userId})
   if (!user){
     return res.status(400).json({message:"invalid link"})
   }
   const verificationToken=VerifyToken.findOne({userId:user._id,token:req.params.token})
   if(!verificationToken){
      return res.status(400).json({messsage:"invalid link"})
   }

   if(!user.isAccountVerified){
      user.isAccountVerified=true;
   }
//hashing password
   const salt=await bcrypt.genSalt(10);
   const hashPassword=await bcrypt.hash(req.body.password,salt)

   user.password=hashPassword
   await user.save()

   await VerifyToken.deleteOne({
      userId: user.id,
      token: req.params.token,
    });
   res.status(200).json({message:"password reset successfuly please login"})
})