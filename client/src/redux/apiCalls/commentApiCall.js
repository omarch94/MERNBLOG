import request from "../../utils/request";
import {toast} from "react-toastify"
import { postActions } from "../slices/postsSlice";
import { commentActions } from "../slices/commentSlice";

// fetch Categories
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
        dispatch(commentActions.deleteCommentFromPost(commentId));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }
 
  