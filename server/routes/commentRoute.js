const router=require("express").Router();
const {createCommentController, getAllCommentsController, deleteCommentController, updateCommentController}=require("../controllers/commentController");
const validateObjectId=require("../middlewares/validateObjectId")
const {verifyToken,verifyAndAdmin, verifyTokenAndAdmin}=require("../middlewares/verifyToken")

router.route("/")
.post(verifyToken,createCommentController)
.get(verifyTokenAndAdmin,getAllCommentsController)

router.route("/:id")
.delete(validateObjectId,verifyToken,deleteCommentController)
.put(validateObjectId,verifyToken,updateCommentController)
module.exports=router