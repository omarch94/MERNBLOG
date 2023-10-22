const router=require("express").Router();
const {registerController, loginUserController, verifyUserAccountController}=require('../controllers/authController');
const validateObjectId = require("../middlewares/validateObjectId");

//api/auth/register
router.post('/register',registerController);

//api/auth/login
router.post('/login',loginUserController)

//api/auth/:userId/verify/:verifyToken
router.get("/:userId/verify/:token",verifyUserAccountController)
module.exports=router