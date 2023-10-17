import request from "../../utils/request";
import {toast} from "react-toastify"
import { categoryActions } from "../slices/categorySlice";

// fetch Categories
export function fetchCategories() {
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

  export function addCategory(){
    return async(dispatch,setState)=>{
      try {
        
      } catch (error) {
        
      }
    }
  }


 
  