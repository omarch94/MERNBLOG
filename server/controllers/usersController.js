const asyncHandler=require('express-async-handler');
const {User}= require('../models/User')
/**------------------------------------
 * @desc Get  All users
 * @route  api/auth/profile
 * @method Get
 * @access only admin
 -------------------------------------*/

 module.exports.getAllUsersController=asyncHandler(async(req,res)=>{
    
    const users=await User.find();
    res.status(200).json(users)
 })