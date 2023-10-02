import React,{useState} from 'react'
import "./update-comment.css"
import {toast} from "react-toastify"
const UpdateCommentModal = ({setUpdateComment}) => {
  
    const[comment,setComment] =useState("this is great");
 
    const updateCommentHandler=(e)=>{
        e.preventDefault();
        if(comment.trim()===""){
                toast.error("please write something")
        }
    }
   return (
       <div className="update-comment">
         <form className="update-comment-form" onSubmit={updateCommentHandler}>
             <abbr title="close">
                 <i onClick={()=>setUpdateComment(false)} className="bi bi-x-circle-fill update-form-close"></i>
             </abbr>
             <h1 className='update-comment-title'>Update Comment
             </h1>
             <input type="text" 
             className='update-comment-input'
             value={comment}
             onChange={(e)=>setComment(e.target.value)}
             />
             
            <button type="submit" className='update-comment-btn'>Update</button>
         </form>
         </div>
       
   
  )
}

export default UpdateCommentModal
