import React from 'react'
import "../header/header.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const NavBar = ({setToggle,toggle}) => {
  const {user}=useSelector(state=>state.auth)

  return (
    <div>
      <nav className="navbar" style={{clipPath:toggle&& "polygon(0 0, 100% 0, 100% 100%, 0 100%)"  }}>

<ul className="nav-links">
    <Link to="/"className="nav-link"  onClick={()=>setToggle(false)}>
                    <i class="bi bi-house"></i> Home
    </Link>
    <Link to="/posts" className="nav-link"onClick={()=>setToggle(false)}>
                    <i class="bi bi-stickies"></i>Posts 

    </Link>

    {
      user && (
    <Link to="/posts/create-post" className="nav-link"onClick={()=>setToggle(false)}>
<i class="bi bi-journal-plus"></i> Create Post
    </Link>
      )
    }

    {
      user?.isAdmin && (
    <Link to="/admin-dashboard" className="nav-link"onClick={()=>setToggle(false)}>
        <i class="bi bi-person-check"></i> Admin Dashboard
    </Link>

      )
    }
    
</ul>
</nav>
    </div>
  )
}

export default NavBar
