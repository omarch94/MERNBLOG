import React,{useEffect} from 'react'
import AdminSidebar from './AdminSidebar'
import "./admin-table.css"
import swal from "sweetalert"
import {useSelector,useDispatch} from "react-redux"
import { deleteComment, fetchAllcomments } from '../../redux/apiCalls/commentApiCall'
const CommentsTable= () => {
    const dispatch=useDispatch()
    const {comments}=useSelector(state=>state.comment)
    useEffect(()=>{
        dispatch(fetchAllcomments())
    },[])
     // delete Category handler
     const deleteCommentHandler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
             dispatch(deleteComment(commentId))
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
                    <th>post</th>
                    <th>Comment</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {comments.map((comment,index)=>(
                    <tr key={comment._id}>
                        <td >{index+1}</td>
                        <td> 
                            <div className="table-image">
                                <img src={comment.user.profileFoto.url}
                                alt="" 
                                className=' table-user-image'
                                />
                                <span className='table-username'>{comment.user.username}</span>
                            </div>
                        </td>
                        {/* <td>{comment.post.title}</td> */}
                        <td>
                            {comment.text}
                        </td>
                        <td>
                            <div className="table-button-group">
                                <button onClick={()=>deleteCommentHandler(comment?._id)}>Delete Comment
                                
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

