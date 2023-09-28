import React from 'react'
import "../header/header.css"
import { Link } from 'react-router-dom'
const NavBar = ({setToggle,toggle}) => {

  return (
    <div>
      <nav className="navbar" style={{clipPath:toggle&& "polygon(0 0, 100% 0, 100% 100%, 0 100%)"  }}>

<ul className="nav-links">
    <Link to="/"className="nav-link"  onClick={()=>setToggle(false)}>
                    <i class="bi bi-house"></i> Home
    </Link>
    <Link to="/post" className="nav-link"onClick={()=>setToggle(false)}>
                    <i class="bi bi-stickies"></i>Posts 

    </Link>
    <Link to="/posts/create-post" className="nav-link"onClick={()=>setToggle(false)}>
<i class="bi bi-journal-plus"></i> Create Post


    </Link>
    <Link to="/admin" className="nav-link"onClick={()=>setToggle(false)}>
<i class="bi bi-person-check"></i> Admin Dashboard
    </Link>
</ul>
</nav>
    </div>
  )
}

export default NavBar
