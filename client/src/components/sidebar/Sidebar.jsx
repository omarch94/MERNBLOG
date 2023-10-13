import React,{useEffect} from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall'
const Sidebar = () => {
  const dispatch=useDispatch();
  const {categories}=useSelector((state)=>state.category)
  useEffect(()=>{
    dispatch(fetchCategories())
  },[])
  return (
    <div className='categories'>
      <h5 className="sidebar-title">
        CATEGORIES
      </h5>
      <ul className="categories-links">

      {categories.map(categorie=>
        <Link
        className='sidebar-link'
        key={categorie._id} to={`posts/categories/${categorie.title}`}>
      { categorie.title}        
      </Link>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
