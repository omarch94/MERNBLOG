import request from "../../utils/request";
import {toast} from "react-toastify"
import { categoryActions } from "../slices/categorySlice";

// fetch Categories
export function fetchCategories(user) {
    return async (dispatch) => {
      try {
        const res = await request.get(`/api/categories`);
        dispatch(categoryActions.setcategory(res.data));
        console.log(res.data)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }
 
  //add Categories

  export function createCategory(newCategory){
    return async(dispatch,getState)=>{
      try {
        const res = await request.post(`/api/categories`,newCategory,{
          headers:{
            Authorization:"Bearer "+ getState().auth.user.token,
          }
        });
        dispatch(categoryActions.addCategory(res.data))

      } catch (error) {
        toast.error(error.response.data.message)
        
      }
    }
  }

//delete Categories

export function deteleteCategory(categoryId){
  return async(dispatch,getState)=>{
    try {
      const res= await request.post(`/api/categories/${categoryId}`,{
        headers:{
          Authorization:"Bearer "+ getState().auth.user.token,
        }
      });
      dispatch(categoryActions.deleteCategory(res.data.categoryId))

    } catch (error) {
      toast.error(error.response.data.message)
      
    }
  }
}
 
  