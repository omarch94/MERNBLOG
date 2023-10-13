import React,{useEffect} from 'react'
import "./home.css"
import PostList from '../../components/posts/PostList'
import {categories} from "../../dummyData"
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {fetchPost} from "../../redux/apiCalls/postApiCall"
const Home = () => {
    const {posts}=useSelector(state=>state.post)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchPost(1))
    },[1])
  return (
   <section className='home'>
    <div className="home-hero-header">
        <div className="home-hero-header-layout">
            <h1 className="home-title">Welcome to blog</h1>
        </div>
    </div>
    <div className="home-latest-post">latest post</div>
        <div className="home-container">
         <PostList posts={posts}/>
         <Sidebar/>
        </div>
        <div className="home-see-posts-link">
            <Link to="/posts" className='home-link'>
            See All Posts 
            </Link>
        </div>
   </section>
 
  )
}

export default Home
