import React,{useState} from 'react'
import "./update-comment.css"
import {toast} from "react-toastify"
import { useDispatch } from 'react-redux'
import { updateComment } from '../../redux/apiCalls/commentApiCall'
const UpdateCommentModal = ({setUpdateComment,commentForUpdate}) => {
  const dispatch=useDispatch()
    const[text,setText] =useState(commentForUpdate?.text);
 
    const updateCommentHandler=(e)=>{
        e.preventDefault();
        if(text.trim()===""){
                toast.error("please write something")
        }
        dispatch(updateComment(commentForUpdate?._id,{text}))
        setUpdateComment(false)
    }
    console.log("commentForUpdate:", commentForUpdate);
  console.log("commentForUpdate?.comment:", commentForUpdate?.text);
  console.log("text:", text);
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
             value={text}
             onChange={(e)=>setText(e.target.value)}
             />
             
            <button type="submit" className='update-comment-btn'>Update</button>
         </form>
         </div>
       
   
  )
}

export default UpdateCommentModal
