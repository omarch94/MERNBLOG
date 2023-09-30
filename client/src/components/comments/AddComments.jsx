import React,{useState} from 'react'
import {toast} from "react-toastify"
import "./add-comment.css"
const AddComments = () => {
    const[comment,setComment]=useState('')
    const addSubmitHandler=(e)=>{
        e.preventDefault();
        if(comment.trim()===""){
                toast.error("please write something")
        }
        setComment("")
    }
  return (
    <form  className="add-comment" onSubmit={addSubmitHandler}>
        <input
            type="text" 
            placeholder='add Comment'
            className='add-comment-input' 
            value={comment} 
            onChange={(e)=>setComment(e.target.value)} 
        />
        <button type="submit" className='add-comment-btn'>Comment </button>
    </form>
  )
}

export default AddComments
