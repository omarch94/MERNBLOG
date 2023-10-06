import React, { useState } from 'react'
import {toast} from "react-toastify"
const AddCategoryForm = () => {
    const[category,setCategory]=useState("")
    const handleSubmit=(e)=>{
            e.preventDefault();

            if(category.trim()===""){
                toast.warning("you need to enter category")
            }
    }
  return (
    <div className='add-category'>
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={handleSubmit}>
            <div className="add-category-form-group">
                <label htmlFor="title">Category title</label>
                <input 
                type="text" 
                id="title"
                placeholder='Enter Category Title'
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                />
            </div>
            <button className='add-category-btn' type='submit'> Add</button>

      </form>
    </div>
  )
}

export default AddCategoryForm
