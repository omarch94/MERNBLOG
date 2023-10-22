const asyncHandler=require('express-async-handler');
const bcrypt=require('bcryptjs');
const {User,validateRegisterUser,validateLoginUser}=require("../models/User");
const { VerifyToken } = require('../models/verifyToken');
const crypto =require("crypto")
const sendEmail=require("../utils/sendEmail")
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

    //Creating new verification token and save it to database
    const verificationToken = new VerifyToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save()
    // making the link
    const link=`http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`
    
    // putting the link to html template
    const htmlTemplate=`
    <div>
    <p> Please Click on the link to verify you email</p>
    <a href="${link}">verify</a>
    </div>
    `
    // sending email to user
    await sendEmail(user.email,"verify you email",htmlTemplate);
    //Response to the client

    res.status(201).json({message:"we sent to you an email please verify your adress"})
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
if (!user.isAccountVerified){
  return res.status(400).json({message:"we sent to you an email please verify your adress"})

}
let verificationToken=await VerifyToken.findOne({
  userId:user.id,
})
if(!verificationToken){
  verificationToken=new VerifyToken({
    userId:user.id,
    token:crypto.randomBytes(32).toString("hex")
  })
  await verificationToken.save();
}
// making the link
const link=`http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`
    
// putting the link to html template
const htmlTemplate=`
<div>
<p> Please Click on the link to verify you email</p>
<a href="${link}">verify</a>
</div>
`
// sending email to user
await sendEmail(user.email,"verify you email",htmlTemplate);


  //generate the token (JWT)
  const token=user.generateAuthToken()
  // response to client
  res.status(200).json({
    _id:user._id,
    isAdmin:user.isAdmin,
    profileFoto:user.profileFoto,
    token,
    username:user.username

  })

})

/**------------------------------------
 * @desc Verify  user account
 * @route  api/auth/:userId/verify/:token
 * @method GET
 * @access Public
 -------------------------------------*/
module.exports.verifyUserAccountController=asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.userId);
  console.log("user",user)
  if(!user){
    return res.status(404).json({message:"invalid link"})
  }
  const verificationToken=await VerifyToken.findOne({
    userId:user.id,
    token:req.params.token,
  })
  console.log("verification",verificationToken)
  if(!verificationToken){
    return res.status(404).json({message:"invalid link"})
  }
  user.isAccountVerified=true
   await user.save();

   await VerifyToken.deleteOne({
    userId: user.id,
    token: req.params.token,
  });
     await res.status(200).json({message:"you account is verified"})
})