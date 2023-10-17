import React, { useState,useEffect } from 'react'
import "./update-post.css"
import {toast} from "react-toastify"
import { useDispatch,useSelector } from 'react-redux'
import { updatePost } from '../../redux/apiCalls/postApiCall'
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall'

const UpdatePostModal = ({setUpdatePost,post}) => {
   const[title,setTitle] =useState(post.title);
   const[description,setDescription] =useState(post.description)
   const[category,setCategory] =useState(post.category)
const dispatch=useDispatch()
const {categories}=useSelector((state)=>state.category)
useEffect(()=>{
  dispatch(fetchCategories())
},[])
   const upadatePostHandlet=(e)=>{
        e.preventDefault();
        if(title.trim()===""){
            return toast.error(" title Required")
          }
          if(category.trim()===""){
            return toast.error(" category Required")
          }
          if(description.trim()===""){
            return toast.error(" description Required")
          }
          dispatch(updatePost({title,category,description},post?._id))
          setUpdatePost(false)
    
   }
  return (
      <div className="update-post">
        <form className="update-post-form" onSubmit={upadatePostHandlet}>
            <abbr title="close">
                <i onClick={()=>setUpdatePost(false)} className="bi bi-x-circle-fill update-form-close"></i>
            </abbr>
            <h1 className='update-post-title'>Update post
            </h1>
            <h2>{post._id}</h2>
            <input type="text" 
            className='update-post-input'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           <select
                  name=""
                  id=""
                  className="create-post-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                   <option value="" disabled>
                    Select A category
                  </option>
                  {
                    categories.map(category=>(
                  <option key={category._id} value={category.title}>{category.title}</option>
                    ))
                  }
                </select>
            <textarea name="" id=""  rows="5" className="update-post-textarea" placeholder='Post Description' value={description} onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
           <button type="submit" className='update-post-btn'>Update</button>
        </form>
        </div>
      
  )
}

export default UpdatePostModal
