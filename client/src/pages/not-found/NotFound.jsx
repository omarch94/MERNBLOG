import React from 'react'
import { Link } from 'react-router-dom'
import "./not-found.css"
const NotFound = () => {
  return (
   <section className='not-found'>
        <div className="not-found-title">404</div>
        <h1 className="not-found-text">Page not found</h1>
        <Link to="/" className='not-found-link'>
            Go To Home Page
        </Link>
   </section>
  )
}

export default NotFound
