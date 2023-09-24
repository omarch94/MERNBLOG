import React from 'react'
import "../header/header.css"
const NavBar = ({setToggle,toggle}) => {

  return (
    <div>
      <nav className="navbar" style={{clipPath:toggle&& "polygon(0 0, 100% 0, 100% 100%, 0 100%)"  }}>

<ul className="nav-links">
    <li className="nav-link"  onClick={()=>setToggle(false)}>
                    <i class="bi bi-house"></i> Home
    </li>
    <li className="nav-link"onClick={()=>setToggle(false)}>
                    <i class="bi bi-stickies"></i>Posts 

    </li>
    <li className="nav-link"onClick={()=>setToggle(false)}>
<i class="bi bi-journal-plus"></i> Create Post


    </li>
<li className="nav-link"onClick={()=>setToggle(false)}>
<i class="bi bi-person-check"></i> Admin Dashboard


    </li>
</ul>
</nav>
    </div>
  )
}

export default NavBar
