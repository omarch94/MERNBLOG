import React, { useState,useEffect } from 'react'
import {Link, useParams} from "react-router-dom";
import "./post-details.css"
import {toast} from "react-toastify"
import AddComments from '../../components/comments/AddComments';
import CommentList from '../../components/comments/CommentList';
import swal from "sweetalert"
import PostModalUpdate from './PostModalUpdate';
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { deletePost, fetchSinglePost,toggleLikePost,updatePostImage } from '../../redux/apiCalls/postApiCall';
const PostDetails = () => {
    const dispatch=useDispatch();
    const {postSingle}=useSelector((state)=>state.post)
    const {user}=useSelector((state)=>state.auth)
    const {id}=useParams();
    const [file,setFile]=useState(null)
    const [updatePost,setUpdatePost]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(fetchSinglePost(id))
        window.scrollTo(0,0)
    },[id])
    // update image submit handler
    const imageUpdateSubmitHandler=(e)=>{
        e.preventDefault();
        if (!file){
           return toast.warning("image required")
        }
        const formData = new FormData();
        formData.append("image", file);
        dispatch(updatePostImage(formData,postSingle?.post?._id));
    }

    // delete post handler
    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
              dispatch(deletePost(postSingle?.post?._id))
              navigate(`/profile/${user?._id}`)
              swal("Post  has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Something went wrong!");
            }
          });
          
      };
  return (
    
      <section className="post-details">
        <>
        {postSingle && (
            <div>
    <pre>{JSON.stringify(postSingle, null, 2)}</pre>
  </div>
)}
      </>
      {postSingle && (

        <>
     <div className="post-details-image-wrapper">
      
    <img
          src={file ? URL.createObjectURL(file) : postSingle?.post?.image?.url}
          alt=""
          className="post-details-image"
          />
        {user?._id===postSingle?.post?.user?._id && (
           <form  className="update-post-image-form" onSubmit={imageUpdateSubmitHandler}>
            <label htmlFor="file" className="update-post-label">
                <i className="bi bi-image-fill"></i>
                Select New image
            </label>
            <input type="file" name='file' id='file' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])} />
            <button type="submit">upload</button>
        </form>
          )}
    </div>
    <h1 className="post-details-title">{postSingle?.post?.title}</h1>
    <div className="post-details-user-info">
        <img src={postSingle?.post?.user?.profileFoto.url} alt="" className="post-details-user-image" />
        <div className="post-details-user">
            <strong>
                <Link to={`/profile/${postSingle?.post?.user?._id}`}>{postSingle?.post?.user?.username}</Link>
            </strong>
            <span>{new Date(postSingle?.post?.createdAt).toDateString()}</span>
        </div>
    </div>
    <p className="post-details-description">{postSingle?.post?.description}
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus ratione sint unde. Nemo, beatae iure impedit quaerat eaque quasi libero esse laborum dolores reprehenderit, quidem totam veritatis reiciendis, corrupti consequatur!
    </p>

    <div className="post-details-icon-wrapper">
        <div>
          {user && (
          <i    className={
            postSingle?.post?.likes.includes(user?._id)
              ? "bi bi-hand-thumbs-up-fill"
              : "bi bi-hand-thumbs-up"
          } onClick={() => {
            // console.log("postSingle?.post?._id:", postSingle?.post?._id);
            dispatch(toggleLikePost(postSingle?.post?._id));
          }}></i>
          )}
                <small>{postSingle?.post?.likes?.length}likes</small>
        </div>
    {
    user?._id===postSingle?.post?.user?._id && (
        <div>
            <i  className="bi bi-pencil-square" onClick={()=>setUpdatePost(true)}></i>
            <i className="bi bi-trash-fill" onClick={deletePostHandler}></i>
        </div>
  )  }
     
    </div> 
    {/* Add comment section */}
        <AddComments/>
   
        <CommentList comments={postSingle?.post?.comments}/>
{updatePost&&<PostModalUpdate setUpdatePost={setUpdatePost} post={postSingle?.post}/>}
</>
      )}   
</section>
   
  )
}

export default PostDetails
