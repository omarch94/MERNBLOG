import request from "../../utils/request";
import {toast} from "react-toastify"
import { passwordActions } from "../slices/passwordSlice";

export function forgetPassword(email){
    return async ()=>{
            try{
            const res=await request.post("/api/password/password-reset-link/",{email}) 
                        toast.success(res.data.message)
            }catch(error){
                toast.error(error.response.data.message)
                console.log(error)
            }
    }
}
//get reset password
export function getResetPassword(userId,token){
    return async(dispatch)=>{
        try {
            await request.get(`/api/password/reset-password/${userId}/${token}`)

        } catch (error) {
            console.log(error)
            dispatch(passwordActions.setError())
        }
    }
}

// reset password
export function resetPassword(newPassword,user){
    return async()=>{
        try {
          const {data} = await request.post(`/api/password/reset-password/${user.userId}/${user.token}`,
                {password:newPassword}
            )
        toast.success(data.message)

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
}