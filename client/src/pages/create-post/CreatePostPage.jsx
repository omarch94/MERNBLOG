import React, { useState,useEffect } from 'react'
import "./create-post.css"
import {toast} from "react-toastify"
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../redux/apiCalls/postApiCall'
import{RotatingLines} from "react-loader-spinner"
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall'
const CreatePostPage = () => {
  const dispatch=useDispatch()
  const {categories}=useSelector((state)=>state.category)
  useEffect(()=>{
    dispatch(fetchCategories())
  },[])
  const {loading,isPostCreated}=useSelector(state=>state.post)
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [category,setCategory]=useState("")
  const [file,setFile]=useState(null)
const formSubmitHandler=(e)=>{
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
      if(!file){
        toast.error("image required")
      }
      const formData=new FormData()
      formData.append("image",file)
      formData.append("title",title)
      formData.append("category",category)
      formData.append("description",description)
        dispatch(createPost(formData))
}
const navigate=useNavigate()
useEffect(()=>{
  if(isPostCreated){
    navigate("/")
  }
},[isPostCreated,navigate])
  return (
   <div className="section create-post">
          <h1 className="create-post-title">
            Create Post
          </h1>
      <form action="" className="create-poste-form" onSubmit={formSubmitHandler}>
            <input 
            type="text" 
            className="create-post-input" 
            placeholder='Input Title'
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

            <textarea name="" id=""  rows="5" className="create-post-textarea" placeholder='Post Description'
             value={description}
             onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
            <input type="file" name='file' id="file" className='create-post-upload' 
            onChange={(e)=>setFile(e.target.files[0])}
            />
            <button type='submit' className='create-post-btn'>
            {loading ? 
            <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
            : 
            "Create" 
            }


            </button>
      </form>
   </div>
  )
}

export default CreatePostPage
