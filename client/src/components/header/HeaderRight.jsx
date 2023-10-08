import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
const HeaderRight = () => {
  const { user}=useSelector(state=>state.auth)
  const [active,setActive]=useState(false)
  return (
    
    <div className="header-right">
    {/* <Link to="/login" className="header-right-link">
    <i class="bi bi-box-arrow-in-right"></i>
    <span>Login</span>
    </Link>
<Link to="/register" className="header-right-link">
    <i class="bi bi-person-plus"></i>
    <span>Register</span>
    </Link> */}
    {user ? 
    <>
    <div className="header-right-user-info">
      <span className="header-right-username" onClick={()=>setActive(prev=>!prev)}>{user.username}</span>
      <img src={user.profileFoto.url} alt="user foto" className='header-right-user-photo' />
      {
        active && (
    <div className="header-right-dropdown">
      <Link 
      className='header-dropdown-item'
       to={`/profile/${user._id}`}
       onClick={()=>setActive(false)}
       >
        <i className="bi bi-file-person"></i>
        <span>profile</span>
        <div className="header-dropdown-item">
          <i className="bi bi-box-arrow-in-left"></i>
          <span>logout</span>
        </div>
      </Link>
    </div>
)}
    </div>

     </>
    :
    (
      <>
      <Link to="/login" className="header-right-link">
    <i class="bi bi-box-arrow-in-right"></i>
    <span>Login</span>
    </Link>
<Link to="/register" className="header-right-link">
    <i class="bi bi-person-plus"></i>
    <span>Register</span>
    </Link> 
      </>
    )

  }
</div>
  )
}

export default HeaderRight
