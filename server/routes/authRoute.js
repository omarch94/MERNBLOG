const router=require("express").Router();
const {registerController, loginUserController}=require('../controllers/authController')

//api/auth/register
router.post('/register',registerController);

//api/auth/login
router.post('/login',loginUserController)
module.exports=router