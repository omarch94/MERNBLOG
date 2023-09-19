const router=require("express").Router();
const {createCategoryController, getAllCategoriesController, deleteCategoryController}=require("../controllers/categroriesController");
const {verifyTokenAndAdmin}=require("../middlewares/verifyToken")
const validateObjectId=require("../middlewares/validateObjectId")

router
.route("/")
.post(verifyTokenAndAdmin,createCategoryController)
.get(getAllCategoriesController)

router.route("/:id")
.delete(validateObjectId,verifyTokenAndAdmin,deleteCategoryController)

module.exports=router;