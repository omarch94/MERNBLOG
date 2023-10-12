import request from "../../utils/request";
import {toast} from "react-toastify"
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";


export function getUserProfile(userId) {
    return async (dispatch) => {
      try {
        const { data } = await request.get(`/api/users/profile/${userId}`);
        dispatch(profileActions.setProfile(data));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }
 
  // Upload profile foto
  // new foto for user 
  export function uploadUserPhoto(newPhoto){
    return async (dispatch,getState)=>{
      try {
        // const state=getState()
        const res=await request.post(`/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers:{
            Authorization:"Bearer "+getState().auth.user.token,
            "Content-Type":"multipart/form-data"
          }
        })
        console.log("api data " ,res.data)

          dispatch(profileActions.setProfilePhoto(res.data.profileFoto));
          dispatch(authActions.setUserPhoto(res.data.profileFoto));
          toast.success(res.data.message)
          //modify user photo in localstorage
          const user=JSON.parse(localStorage.getItem("userInfo"))
          console.log(user,res.data)
          user.profileFoto=res.data?.profileFoto;
          localStorage.setItem("userInfo",JSON.stringify(user))
        
        toast.error("Failed to update user photo. Data is undefined.");

       } catch (error) {
        toast.error(error.response.res.data.message);
      }
    }
  }

   // Upload profile 
  export function updateProfile(userId,profile){
    return async (dispatch,getState)=>{
      try {
        // const state=getState()
        const res=await request.put(`/api/users/profile/${userId}`
        ,profile
        ,{
          headers:{
            Authorization:"Bearer "+getState().auth.user.token,
          }
        })
        console.log("api data " ,res.data)
          dispatch(profileActions.updateProfile(res.data));
          dispatch(authActions.setUsername(res.data.username));
          //modify user photo in localstorage
          const user=JSON.parse(localStorage.getItem("userInfo"))
          console.log(user,res.data)
          user.username=res.data?.username;
          localStorage.setItem("userInfo".JSON.stringify(user))
      }
         catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }