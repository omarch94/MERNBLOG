import React, { useEffect,useState  } from 'react'
import PostList from '../../components/posts/PostList'
import Sidebar from '../../components/sidebar/Sidebar'
import "./postPage.css"
import Pagination from '../../components/pagination/Pagination'
import {useDispatch, useSelector} from "react-redux"
import {fetchPost,getPostCount} from "../../redux/apiCalls/postApiCall"
const POST_PER_PAGE=3
const PostPage = () => {
  const {postsCount,posts}=useSelector(state=>state.post)
  const dispatch=useDispatch()
  const[currentPage,setCurrentPage]=useState(1)
  const pages = Math.ceil(postsCount / POST_PER_PAGE);
  console.log(pages)
  useEffect(()=>{
    dispatch(getPostCount())
  },[])
  useEffect(()=>{
    dispatch(fetchPost(currentPage))
    window.scrollTo(0,0)
  },[currentPage])
  return (
   <>
   <section className='posts-page'>
    <PostList posts={posts}/>
    <Sidebar />
   </section>
   <Pagination
    pages={pages} 
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    />
   </>
  )
}

export default PostPage
