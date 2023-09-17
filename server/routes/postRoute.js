const router=require("express").Router();
const {createPostController, getAllPostsController, getSinglePost, getNumberPosts, deletePostController}=require("../controllers/postController")
const {photoUpload} =require('../middlewares/photoUpload')
const {verifyToken, verifyTokenAndAdmin}=require('../middlewares/verifyToken');
const validateObjectId=require('../middlewares/validateObjectId')
//api/posts
router.route('/add-post')
.post(verifyToken,photoUpload.single("image"),createPostController);
router.route('/')
.get(getAllPostsController)
//api/posts/count
router.route("/count").get(getNumberPosts)
//api/posts/:id
router.route("/:id")
.get(validateObjectId,getSinglePost)
.delete(validateObjectId,verifyToken,deletePostController)


module.exports=router;