import React, { useState } from 'react'
import "./comment-list.css"
import swal from "sweetalert"
import UpdateCommentModal from './UpdateCommentModal'
const CommentList = () => {
  const [updateComment,setUpdateComment]=useState(false)
     // delete comment handler
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
    <div className='comment-list'>
      <h4 className="comment-list-count"> 2comment</h4>
      {[1,2].map((comment)=>
      (
      <div key={comment} className='comment-item'>
        <div className="comment-item-info">
        <div className="comment-item-username">
            Omar Cherti
        </div>
        <div className="comment-item-time">
            2 hours ago
        </div>
        </div>
        <p className="comment-item-text">
            Hello this is amazing
        </p>
        <div className="comment-item-icon-wrapper">
            <i className="bi bi-pencil-square" onClick={()=>setUpdateComment(true)}></i>
            <i className="bi bi-trash-fill" onClick={deleteCommentHandler}></i>

        </div>
      </div>
))}
{updateComment && <UpdateCommentModal setUpdateComment={setUpdateComment}/>}
     </div>
  )
}

export default CommentList 
