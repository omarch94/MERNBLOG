import request from "../../utils/request";
import {toast} from "react-toastify"
import { postActions } from "../slices/postsSlice";

// fetch post based on page number
export function fetchPost(pageNumber) {
    return async (dispatch) => {
      try {
        const res = await request.get(`/api/posts?pageNumber=${pageNumber}`);
        dispatch(postActions.setPost(res.data));
        console.log(res.data)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }

  // post Count

  export function getPostCount(){
    return async (dispatch)=>{
        try {
          const res=await request.get(`/api/posts`)
          dispatch(postActions.setPostCount(res.data))
        } catch (error) {
          toast.error(error.response.data.message);
        }
    }
  }

  //Post Categories based on category

  export function fetchPostBasedOnCategory(category){
    return async (dispatch)=>{
      try{
        const res=await request.get(`/api/posts?category=${category}`)
        dispatch(postActions.setPostCate(res.data))
    }catch(error){
      toast.error(error.response.data.message);

    }
  }
  }
  export function createPost(newPost) {
    return async (dispatch, getState) => {
      try {
        dispatch(postActions.setLoading());
        await request.post(`/api/posts/add-post`, newPost, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        });
  
        dispatch(postActions.setIsPostCreated());
        setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000); // 2s
      } catch (error) {
        toast.error(error.response.data.message);
        dispatch(postActions.clearLoading());
      }
    };
  }