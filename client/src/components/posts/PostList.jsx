import React from 'react'
import PostItem from './PostItem'
import "./posts.css"
const PostList = ({posts}) => {
  return (
    <div className='post-item'>
      {
        posts.map(item=><PostItem post={item} key={item._id}/>)
      }
    </div>
  )
}

export default PostList
