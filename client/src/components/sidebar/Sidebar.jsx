import React from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom'
const Sidebar = ({categories}) => {
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
