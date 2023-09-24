import HeaderLeft from "./header-left";
import "./header.css"
import { useState } from "react";
import NavBar from "./navBar";
import HeaderRight from "./HeaderRight";
const Header=()=>{
    const [toggle,setToggle]=useState(false)
return(
    <header className="header">
        {/* <div className="header-left"> 
        <div className="header-logo">
            <strong>BLOG</strong>
            <i class="bi bi-pencil"></i>
        </div>
        <div className="header-menu" onClick={()=>setToggle(prev=>!prev)}>
            {toggle ? <i className="bi bi-x-lg" ></i> : <i className="bi bi-list" ></i>

}
        </div>
        </div> */}
           <HeaderLeft toggle={toggle} setToggle={setToggle} />
      <NavBar toggle={toggle} setToggle={setToggle} />
        {/* <nav className="navbar" style={{clipPath:toggle&& "polygon(0 0, 100% 0, 100% 100%, 0 100%)"  }}>

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
        </nav> */}
{/* 
        <div className="header-right">
            <div className="header-right-link">
            <i class="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
            </div>
<div className="header-right-link">
            <i class="bi bi-person-plus"></i>
            <span>Register</span>
            </div>
        </div> */}
        <HeaderRight/>
    </header>
)
}

export default Header;