import React from 'react'
import AdminSidebar from './AdminSidebar'
import "./admin-table.css"
import swal from "sweetalert"

const CommentsTable= () => {
     // delete Category handler
     const deleteCommentHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Comment  has been deleted!", {
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
        <h1 className="table-title">Comment</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Count</th>
                    <th>User</th>
                    <th>Comment</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {[1,2,3,4,5,6,7,8,].map((comment)=>(
                    <tr key={comment}>
                        <td >{comment}</td>
                        <td> 
                            <div className="table-image">
                                <img src="/images/user-avatar.png" 
                                alt="" 
                                className=' table-user-image'
                                />
                                <span className='table-username'>omar cherti</span>
                            </div>
                        </td>
                        <td>
                            Thank you for this post
                        </td>
                        <td>
                            <div className="table-button-group">
                                <button onClick={deleteCommentHandler}>Delete Comment
                                
                                     </button>
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

export default CommentsTable

