import React,{useState} from 'react'
import {toast} from "react-toastify"
import "./add-comment.css"
import {useDispatch} from "react-redux"
import { createComment } from '../../redux/apiCalls/commentApiCall'
const AddComments = ({postId}) => {
  console.log(postId)
  const dispatch=useDispatch();

    const[text,setText]=useState('')
    const addSubmitHandler=(e)=>{
        e.preventDefault();
        if(text.trim()===""){
                toast.error("please write something")
        }
        dispatch(createComment({text,postId}))
        setText("")
    }
  return (
    <form  className="add-comment" onSubmit={addSubmitHandler}>
        <input
            type="text" 
            placeholder='add Comment'
            className='add-comment-input' 
            value={text} 
            onChange={(e)=>setText(e.target.value)} 
        />
        <button type="submit" className='add-comment-btn'>Comment </button>
    </form>
  )
}

export default AddComments
