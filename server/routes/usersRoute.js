const router=require("express").Router();
const { getAllUsersController } = require("../controllers/usersController");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

//api/users/profile
// router.get('/profile',getAllUsersController)
router.route('/profile').get(verifyTokenAndAdmin,getAllUsersController)
module.exports=router