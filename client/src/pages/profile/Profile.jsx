import React, { useEffect, useState } from 'react'
import "./profile.css"
import PostList from '../../components/posts/PostList'
// import { posts } from '../../dummyData'
import {toast} from "react-toastify"
import swal from "sweetalert"
import UpdateProfileModal from './UpdateProfileModal'
import { useDispatch,useSelector } from 'react-redux'
import { getUserProfile, uploadUserPhoto } from '../../redux/apiCalls/profileApiCall'
import { useParams } from 'react-router-dom'
import PostItem from '../../components/posts/PostItem'
const  Profile = () => {
    const dispatch=useDispatch();
    const {profile}=useSelector((state)=>state?.profile)
    const{posts}=useSelector((state)=>state.post)
    const {user}=useSelector((state)=>state.auth)
    const {id}=useParams();
    useEffect(() => {
        dispatch(getUserProfile(id));
        window.scrollTo(0, 0);
      }, [id]);
    const [updateProfile,setUpdateProfile]=useState(false)
    const [file,setFile]=useState(null)
    const handleFileSubmit=(e)=>{
        e.preventDefault();

    if(!file){
            toast.warning("No file uploaded")
    }
    const formData=new FormData();
    formData.append("image",file);
    dispatch(uploadUserPhoto(formData))
    }
   
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
            src={file? URL.createObjectURL(file):profile?.profileFoto.url}
            alt="" 
            className='profile-image'
            />

               {user?._id === profile?._id && (

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
                )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
            {profile?.bio}
        </p>
        <div className="user-date-joined">
            <strong>Date Joined: </strong>
            <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div> 
        {user?._id === profile?._id && (

          
          <button className='profile-update-btn'onClick={()=>setUpdateProfile(true)} >
            <i className="bi bi-file-person-fill"></i>
            Update profile
        </button>
          )}
        {updateProfile && (<UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile}/>)}
    </div>
    <div className="profile-posts-list">
        <h2>{profile?.username}</h2>
        {/* <PostList posts={posts}/> */}
      {profile?.posts.map(post=><PostItem key={post._id} post={post} username={profile.username} userId={profile?._id}/>)}
    </div>
    {user?._id === profile?._id && (
    <button className='delete-account-btn' onClick={deleteAccounttHandler}>
        Delete Account
    </button>
    )}
    </section>
  )
}
export default  Profile
