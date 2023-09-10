const router=require("express").Router();
const { getAllUsersController, getUserProfileController, updateUserProfileController, profilePhotoController, countUsersController } = require("../controllers/usersController");
const { photoUpload } = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const {verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyToken} = require("../middlewares/verifyToken");

//api/users/profile
// router.get('/profile',getAllUsersController)
router.route('/profile').get(verifyTokenAndAdmin,getAllUsersController)
//api/users/count-users
router.route('/count-users').get(verifyTokenAndAdmin,countUsersController);
//api/users/profile/profile-photo-upload
router.route('/profile/profile-photo-upload')
.post(verifyToken,photoUpload.single("image"),profilePhotoController)

//api/users/profile/:id
router.route('/profile/:id')
.get(validateObjectId,getUserProfileController)
.put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileController);


module.exports=router