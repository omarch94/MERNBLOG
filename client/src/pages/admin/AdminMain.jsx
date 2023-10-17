import React ,{useEffect}from 'react'
import "./admin.css"
import { Link } from 'react-router-dom'
import AddCategoryForm from './AddCategoryForm'
import {useSelector,useDispatch} from "react-redux"
import {fetchPost} from "../../redux/apiCalls/postApiCall"
import {fetchCategories} from "../../redux/apiCalls/categoryApiCall"
const AdminMain = () => {
    const {postsCount}=useSelector(state=>state.post)
    const {categories}=useSelector(state=>state.category)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchPost())
      },[fetchPost]);
      useEffect(()=>{
        dispatch(fetchCategories())
      },[fetchCategories]);
  return (
    <div className='admin-main'>
        <div className="admin-main-header">
            <div className="admin-main-card">
                <h5 className="admin-card-title"> Users </h5>
                <div className="admin-card-count">120</div>
                <div className="admin-card-link-wrapper">
                    <Link 
                    to="/admin-dashboard/users-table"
                    className='admin-card-link'
                    >
                    See all Users
                    </Link>
                    <div className="admin-card-icon">
                        <i className="bi bi-person"></i>
                    </div>
                </div>
            </div>
            <div className="admin-main-card">
                <h5 className="admin-card-title"> Posts </h5>
                <div className="admin-card-count">{postsCount?.length}</div>
                <div className="admin-card-link-wrapper">
                    <Link 
                    to="/admin-dashboard/posts-table"
                    className='admin-card-link'
                    >
                    See All Posts
                    </Link>
                    <div className="admin-card-icon">
                        <i className="bi bi-file-post"></i>
                    </div>
                </div>
            </div>
            <div className="admin-main-card">
                <h5 className="admin-card-title"> Categories </h5>
                <div className="admin-card-count">{categories?.length}</div>
                <div className="admin-card-link-wrapper">
                    <Link 
                    to="/admin-dashboard/categories-table"
                    className='admin-card-link'
                    >
                    See all Categories
                    </Link>
                    <div className="admin-card-icon">
                        <i className="bi bi-person"></i>
                    </div>
                </div>
            </div>
            <div className="admin-main-card">
                <h5 className="admin-card-title"> Comments </h5>
                <div className="admin-card-count">160</div>
                <div className="admin-card-link-wrapper">
                    <Link 
                    to="/admin-dashboard/comments-table"
                    className='admin-card-link'
                    >
                    See all Comments
                    </Link>
                    <div className="admin-card-icon">
                        <i className="bi bi-chat-left-text"></i>
                    </div>
                </div>
            </div>
        </div>
        <AddCategoryForm/>

    </div>
  )
}

export default AdminMain 
