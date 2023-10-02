import React, { useEffect } from 'react'
import "./categorie.css"
import { useParams } from 'react-router-dom'
import PostList from '../../components/posts/PostList';
import { posts } from '../../dummyData';
const Categorie = () => {
  const {category}=useParams();
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
    return (
    <section  className='categorie'>
            <h1 className="category-title">Post Based on {category}</h1>
            <PostList posts={posts}/>
    </section>
  )
}

export default Categorie
