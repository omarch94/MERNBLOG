const router=require("express").Router();
const {createPostController, getAllPostsController}=require("../controllers/postController")
const {photoUpload} =require('../middlewares/photoUpload')
const {verifyToken}=require('../middlewares/verifyToken');

//api/posts
router.route('/add-post')
.post(verifyToken,photoUpload.single("image"),createPostController);
router.route('/')
.get(getAllPostsController);
module.exports=router;