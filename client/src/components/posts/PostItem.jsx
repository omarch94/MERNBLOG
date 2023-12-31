import React from 'react'
import {Link} from "react-router-dom"
import "./posts.css"

const PostItem = ({post,username,userId}) => {
    const profileLink=userId? `/profile/${userId}`:`/profile/${post?.user?._id}`
  return (
    <div className='post-item'>
        <div className="post-item-image-wrapper">
            <img src={post?.image.url} className='post-item-image' alt={post.title}></img>
        </div>
        <div className="post-item-info-wrapper">
            <div className="post-item-info">
                <div className="post-item-author">
                    <strong>Author:</strong>
                    <Link to={profileLink}>{username?username:post?.user?.username}</Link>
                </div>
            <div className="post-item-date">
                    {new Date(post?.createdAt).toDateString()}
            </div>
            </div>
            <div className="post-item-details">
                <h4 className="post-item-title">{post?.title}</h4>
                <Link className='post-item-category' to={`/posts/categories/${post?.category}`}>
                {post?.category}
                </Link>
            </div>
            <p className="post-item-description">
                {post?.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, consequatur! Doloremque ab, rem odio odit nobis et consequatur blanditiis deserunt sapiente, nulla corporis aliquam eveniet suscipit placeat possimus dignissimos ad!
            </p>
            <Link to={`/posts/details/${post?._id}`} className='post-item-link'>
                Reade More...
            </Link>
            </div>
        </div>
  )
}

export default PostItem
