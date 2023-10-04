import React, { useEffect, useState } from 'react'
import "./profile.css"
import PostList from '../../components/posts/PostList'
import { posts } from '../../dummyData'
import {toast} from "react-toastify"
import swal from "sweetalert"

const  Profile = () => {
    const [file,setFile]=useState(null)
    const handleFileSubmit=(e)=>{
        e.preventDefault();

    if(!file){
            toast.warning("No file uploaded")
    }
    }
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    // Delete control handler 
    const deleteAccounttHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover the account!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Account  has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Something went wrong!");
            }
          });
          
      };
  return (
    <section className="profile">
    <div className='profile-header'> 
        <div className="profile-image-wrapper">
            <img 
            src={file? URL.createObjectURL(file):"/images/user-avatar.png"}
            alt="" 
            className='profile-image'
            />
            <form onSubmit={handleFileSubmit}>
                <abbr title="choose profile photo">
                    <label  
                    htmlFor="file" 
                    className='bi bi-camera-fill upload-profile-photo-icon'>
                    </label>
                </abbr>
                <input 
                style={{display:"none"}} 
                type="file" 
                name="file" 
                id="file" 
                onChange={(e)=>setFile(e.target.files[0])}
                />
                <button type="submit" className='upload-profile-photo-btn'>upload</button>
            </form>
        </div>
        <h1 className="profile-username">Omar cherti</h1>
        <p className="profile-bio">
            Hello my name is omar i am a web developer
        </p>
        <div className="user-date-joined">
            <strong>Date Joined: </strong>
            <span>Fri October</span>
        </div>
        <button className='profile-update-btn'>
            <i className="bi bi-file-person-fill"></i>
            Update profile
        </button>
    </div>
    <div className="profile-posts-list">
        <h2>omar cherti</h2>
        <PostList posts={posts}/>
    </div>
    <button className='delete-account-btn' onClick={deleteAccounttHandler}>
        Delete Account
    </button>
    </section>
  )
}

export default  Profile
