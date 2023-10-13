import React, { useState,useEffect } from 'react'
import {Link, useParams} from "react-router-dom";
import {posts} from "../../dummyData"
import "./post-details.css"
import {toast} from "react-toastify"
import AddComments from '../../components/comments/AddComments';
import CommentList from '../../components/comments/CommentList';
import swal from "sweetalert"
import PostModalUpdate from './PostModalUpdate';

const PostDetails = () => {
    const {id}=useParams();
    const post=posts.find(post=>post._id===parseInt(id));
    const [file,setFile]=useState(null)
    const [updatePost,setUpdatePost]=useState(false)
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    // update image submit handler
    const imageUpdateSubmitHandler=(e)=>{
        e.preventDefault();
        if (!file){
           return toast.warning("image required")
        }
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
          .then((willDelete) => {
            if (willDelete) {
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
    {/* {post.title} */}
    <div className="post-details-image-wrapper">
        <img src={file ? URL.createObjectURL(file):post?.image} alt={post.title} className="post-details-image"/>
        <form  className="update-post-image-form" onSubmit={imageUpdateSubmitHandler}>
            <label htmlFor="file" className="update-post-label">
                <i className="bi bi-image-fill"></i>
                Select New image
            </label>
            <input type="file" name='file' id='file' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])} />
            <button type="submit">upload</button>
        </form>
    </div>
    <h1 className="post-details-title">{post.title}</h1>
    <div className="post-details-user-info">
        <img src={post.user.image} alt="" className="post-details-user-image" />
        <div className="post-details-user">
            <strong>
                <Link to="/profile/1">{post.user.username}</Link>
            </strong>
            <span>{post.createdAt}</span>
        </div>
    </div>
    <p className="post-details-description">{post.description}
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus ratione sint unde. Nemo, beatae iure impedit quaerat eaque quasi libero esse laborum dolores reprehenderit, quidem totam veritatis reiciendis, corrupti consequatur!
    </p>
    <div className="post-details-icon-wrapper">
        <div>
                <i className="bi bi-hand-thumbs-up"></i>
                <small>{post.likes.length}likes</small>
        </div>
        <div>
            <i  className="bi bi-pencil-square" onClick={()=>setUpdatePost(true)}></i>
            <i className="bi bi-trash-fill" onClick={deletePostHandler}></i>
        </div>

    </div>
    {/* Add comment section */}
        <AddComments/>
   
        <CommentList/>
{updatePost&&<PostModalUpdate setUpdatePost={setUpdatePost} post={post}/>}
   </section>
  )
}

export default PostDetails
