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

  // fetch  single post 
export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const res = await request.get(`/api/posts/${postId}`);
      dispatch(postActions.postDetailss(res.data));
      console.log("halpost",  res.data)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}


  // toggle  like post 
  export function toggleLikePost(postId) {
    return async (dispatch,getState) => {
      try {
        const res = await request.put(`/api/posts/like/${postId}`,{},{
          headers:{
            Authorization: "Bearer " + getState().auth.user.token
          }
        });
        console.log("lik",res)
        dispatch(postActions.setPostLikes(res.data));
        console.log("likes",  res.data)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }

  //Upload Post Foto

  export function updatePostImage(newImage,postId){
    return async(dispatch,getState)=>{
      try {
         await request.put(`/api/posts/update-image/${postId}`,newImage,{
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        })
        console.log("new image post updated")
        toast.success("New post image updated")

        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }
  
  //Upload Post Foto

  export function updatePost(newPost,postId){
    return async(dispatch,getState)=>{
      try {
        const res= await request.put(`/api/posts/${postId}`,newPost,{
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        })
        dispatch(postActions.postDetailss(res.data))
        toast.success(" post  updated")

        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }
  
  //delete post
  export function deletePost(postId){
    return async(dispatch,getState)=>{
      try {
        const res= await request.delete(`/api/posts/${postId}`,{
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        })
        dispatch(postActions.deletePost(res.data.postId))
        toast.success(res.data.message)

        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }

  // Get All Posts
export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}