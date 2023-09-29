import React, { useEffect } from 'react'
import PostList from '../../components/posts/PostList'
import Sidebar from '../../components/sidebar/Sidebar'
import { categories, posts } from '../../dummyData'
import "./postPage.css"
import Pagination from '../../components/pagination/Pagination'
const PostPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
   <>
   <section className='posts-page'>
    <PostList posts={posts}/>
    <Sidebar categories={categories}/>
   </section>
   <Pagination/>
   </>
  )
}

export default PostPage
