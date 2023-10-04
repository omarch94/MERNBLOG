import React, { useState } from 'react'
import "./update-profile-modal.css"
const user={
    username:"omar",
    bio:"I am full stac web dev"
}
const UpdateProfileModal = ({setUpdateProfile}) => {
   const[username,setUsername] =useState(user.username);
   const[bio,setBio] =useState(user.bio)
   const[password,setPassword] =useState("")

   const upadateProfileHandler=(e)=>{
        e.preventDefault();
        const updatedUser={username,bio}
    if ( password.trim()!=="") {
      updatedUser.password=password
    } 
  
    
   }
  return (
      <div className="update-profile">
        <form className="update-profile-form" onSubmit={upadateProfileHandler}>
            <abbr title="close">
                <i onClick={()=>setUpdateProfile(false)} className="bi bi-x-circle-fill update-form-close"></i>
            </abbr>
            <h1 className='update-profile-title'>Update profile
            </h1>
            <input type="text" 
            className='update-profile-input'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='Username'
            />
            <input type="text" 
            className='update-profile-input'
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            placeholder='Bio'
            />
             <input type="password" 
            className='update-profile-input'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Password'
            />
          
           <button type="submit" className='update-profile-btn'>Update</button>
        </form>
        </div>
      
  )
}

export default UpdateProfileModal
