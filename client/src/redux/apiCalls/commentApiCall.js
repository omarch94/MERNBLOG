import request from "../../utils/request";
import {toast} from "react-toastify"
import { postActions } from "../slices/postsSlice";
import { commentActions } from "../slices/commentSlice";

// create comment
export function createComment(newComment) {
    return async (dispatch,getState) => {
      try {
        const res = await request.post(`/api/comments`,newComment,{
            headers: {
                Authorization:"Bearer "+ getState().auth.user.token,
              },
        });
        console.log("comment data",res.data)
        dispatch(postActions.addComment(res.data));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }
 
  //update comment

  export function updateComment(commentId,comment) {
    return async (dispatch,getState) => {
      try {
        const res = await request.put(`/api/comments/${commentId}`,comment,{
            headers: {
                Authorization:"Bearer "+ getState().auth.user.token,
              },
        });
        console.log("comment data",res.data)
        dispatch(commentActions.updateComment(res.data));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }

  //delete comment
  export function deleteComment(commentId) {
    return async (dispatch,getState) => {
      try {
       await request.delete(`/api/comments/${commentId}`,{
            headers: {
                Authorization:"Bearer "+ getState().auth.user.token,
              },
        });
        dispatch(postActions.deleteCommentFromPost(commentId));
        dispatch(commentActions.deleteComment(commentId));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }

  // fetch all comments
  export function fetchAllcomments() {
    return async (dispatch,getState) => {
      try {
     const {data}=  await request.get(`/api/comments/`,{
            headers: {
                Authorization:"Bearer "+ getState().auth.user.token,
              },
        });
        dispatch(commentActions.setComment(data));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }

 
  