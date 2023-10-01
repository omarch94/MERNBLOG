import React, { useState } from 'react'
import "./update-post.css"
import {toast} from "react-toastify"
const PostModalUpdate = ({setUpdatePost,post}) => {
   const[title,setTitle] =useState(post.title);
   const[description,setDescription] =useState(post.description)
   const[category,setCategory] =useState(post.category)

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
    
   }
  return (
      <div className="update-post">
        <form className="update-post-form" onSubmit={upadatePostHandlet}>
            <abbr title="close">
                <i onClick={()=>setUpdatePost(false)} className="bi bi-x-circle-fill update-form-close"></i>
            </abbr>
            <h1 className='update-post-title'>Update post
            </h1>
            <input type="text" 
            className='update-post-input'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <select className='update-post-input' value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="" disabled>
                  Select A category
                </option>
                <option value="" >

                    Music               
                    </option>
                <option value="" >
                  Coffe
                </option>
            </select>
            <textarea name="" id=""  rows="5" className="update-post-textarea" placeholder='Post Description' value={description} onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
           <button type="submit" className='update-post-btn'>Update</button>
        </form>
        </div>
      
  )
}

export default PostModalUpdate
