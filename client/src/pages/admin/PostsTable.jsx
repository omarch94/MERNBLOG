import React from 'react'
import AdminSidebar from './AdminSidebar'
import "./admin-table.css"
import { Link } from 'react-router-dom'
import swal from "sweetalert"
import { posts } from '../../dummyData'

const PostsTable = () => {
     // delete post handler
     const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Post  has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Something went wrong!");
            }
          });
          
      };
  return (
      <section className='table-container'>
       <AdminSidebar/>
    <div className="table-wrapper">
        <h1 className="table-title">Posts</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Count</th>
                    <th>User</th>
                    <th>Post title</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post,index)=>(
                    <tr key={post}>
                        <td >{index+1}</td>
                        <td> 
                            <div className="table-image">
                                <img src="/images/user-avatar.png" 
                                alt="" 
                                className=' table-user-image'
                                />
                                <span className='table-username'>{post.user.username}</span>
                            </div>
                        </td>
                        <td>{post.title}</td>
                        <td>
                            <div className="table-button-group">
                                <button>
                                    <Link to={`/posts/details/${post._id}`}>
                                    View Post
                                    </Link>
                                </button>
                                <button onClick={deletePostHandler}>Delete Post </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

   </section>
  )
}

export default PostsTable
