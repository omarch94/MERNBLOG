import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import {toast} from "react-toastify"
export function loginUser(user){
    return async (dispatch)=>{
            try{
            //     const response=await fetch("http://localhost:8002/api/auth/login",{
            //     method:"POST",
            //     body:JSON.stringify(user),
            //     headers:{
            //         "Content-Type":"application/json"
            //     }

            // })
            // const data=await response.json();
            const res=await request.post("/api/auth/login",user) 
                dispatch(authActions.login(res.data))
                localStorage.setItem("userInfo",JSON.stringify(res.data))
            
            }catch(error){
                toast.error(error.response.data.message)
                console.log(error)
            }
    }
}

export function logoutUser(){
    return  (dispatch)=>{
             dispatch(authActions.logout())
                localStorage.removeItem("userInfo")
    }
}

export function registerUser(user) {
    return async (dispatch) => {
      try {
        const { data } = await request.post("/api/auth/register",user);
        dispatch(authActions.register(data.message));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }