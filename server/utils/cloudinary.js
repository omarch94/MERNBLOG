const cloudinary=require("cloudinary").v2;
require("dotenv").config()
// config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    secure:true
  });

//CLOUDINARY UPLOAD IMAGE

const cloudinaryUploadImage=async(photoUpload)=>{
try {
    const data= await cloudinary.uploader.upload(photoUpload,{
        resource_type:'auto',
    });
    console.log("data",data)
    return data;
}catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (cloudinary)");
}}


//CLOUDINARY REMOVE IMAGE

const cloudinaryRemoveImage=async(imagePublicId)=>{
    try {
        const result= await cloudinary.uploader.destroy(imagePublicId);
        return result;
    }catch (error) {
        console.log(error);
        return error
    }
    }
    const cloudinaryRemoveMultipleImage = async (publicIds) => {
        try {
          const result = await cloudinary.v2.api.delete_resources(publicIds)
          return result;
        } catch (error) {
          console.log(error);
            throw new Error("Internal Server Error (cloudinary)");
        }
      };

    module.exports={cloudinaryUploadImage,cloudinaryRemoveImage,cloudinaryRemoveMultipleImage}