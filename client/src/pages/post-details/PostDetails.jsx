import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import "./post-details.css";
import { toast } from "react-toastify";
import AddComments from "../../components/comments/AddComments";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./PostModalUpdate";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData,post["post"]?._id));
  };

  const navigate = useNavigate();

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post["post"]?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="post-details">
      {/* <>
        {post && (
            <div>
    <pre>{JSON.stringify(post, null, 2)}</pre>
  </div>
)}
      </> */}

{post ? (
    // <>
    // <h2>{JSON.stringify(post)}</h2>
    // <h2>{post["post"]?.title}</h2>

    // </>
      <>
        <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post["post"]?.image?.url}
          alt=""
          className="post-details-image"
          />
        {user?._id === post["post"]?.user?._id && (
          <form
          onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post["post"]?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post["post"]?.user?.profileFoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post["post"]?.user?._id}`}>{post["post"]?.user?.username}</Link>
          </strong>
          <span>{new Date(post["post"]?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post["post"]?.description}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
        reprehenderit, molestiae officia non corrupti iusto, molestias quod
        repellat, distinctio temporibus explicabo? Placeat, dolorum atque fugiat
        vitae suscipit ratione quo? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Vero est reprehenderit, molestiae officia non corrupti
        iusto, molestias quod repellat, distinctio temporibus explicabo?
        Placeat, dolorum atque fugiat vitae suscipit ratione quo?
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post["post"]?._id))}
              className={
                post["post"]?.likes?.includes(user?._id)
                ? "bi bi-hand-thumbs-up-fill"
                : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post["post"]?.likes?.length} likes</small>
        </div>
        {user?._id === post["post"]?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
              ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      {
        user ? <AddComments postId={post["post"]?._id} /> : 
        <p className="post-details-info-write">
        to write a comment you should login first
        </p>
      }
      
      <CommentList comments={post["post"]?.comments} />
      {updatePost && (
        <UpdatePostModal post={post["post"]} setUpdatePost={setUpdatePost} />
        )}
        
        </>
        )
      :
      <div>loading...</div>
      }
    </section>
  );
  
};
export default PostDetails;