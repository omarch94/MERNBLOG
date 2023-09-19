const {Category, validateCreateCategory}=require("../models/Category");
const asyncHandler=require("express-async-handler");

/**-----------------------------------------------
 * @desc    Create New Comment
 * @route   /api/comments
 * @method  POST
 * @access  private (only admin)
 *  ------------------------------------------------*/

module.exports.createCategoryController=asyncHandler(async(req,res)=>{
    const {error}=validateCreateCategory(req.body)
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }
    const category=await Category.create({
            title:req.body.title,
            user:req.user.id

    })
    return res.status(201).json(category)
})


/**-----------------------------------------------
 * @desc    Get All categories
 * @route   /api/comments
 * @method  GET
 * @access  public
 *  ------------------------------------------------*/

module.exports.getAllCategoriesController=asyncHandler(async(req,res)=>{
    const categories=await Category.find()
    return res.status(200).json(categories)
})
/**-----------------------------------------------
 * @desc    Delete Category
 * @route   /api/comments/:id
 * @method  DELETE
 * @access  private (only admin)
 *  ------------------------------------------------*/

module.exports.deleteCategoryController=asyncHandler(async(req,res)=>{
const category=await Category.findById(req.params.id);
if(!category){
    return res.status(404).json({message:"Category not found"})
}
    await Category.findByIdAndDelete(req.params.id)

    return res.status(200).json({
        message: "category has been deleted successfully",
        categoryId: category._id,
    })



})