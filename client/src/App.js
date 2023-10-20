import './App.css';
import Header from './components/header/header';
import {Route,Routes,BrowserRouter,Navigate} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from './pages/forms/Register';
import CreatePostPage from './pages/create-post/CreatePostPage';
import PostPage from './pages/post/PostPage';
import Footer from './components/footer/Footer';
import PostDetails from './pages/post-details/PostDetails';
import { ToastContainer } from 'react-toastify';
import Categorie from './pages/categorie/Categorie';
import Profile from './pages/profile/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersTable from './pages/admin/UsersTable';
import PostsTable from './pages/admin/PostsTable';
import CategoriesTable from './pages/admin/CategoriesTable';
import CommentsTable from './pages/admin/CommentsTable';
import ForgotPassword from './pages/forms/ForgotPassword';
import ResetPassword from './pages/forms/ResetPassword';
import NotFound from './pages/not-found/NotFound';
import { useSelector } from 'react-redux';
import VerifyEmail from './pages/verify-email/VerifyEmail';
function App() {
  const {user}=useSelector(state=>state.auth)
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer theme='colored' position='top-center'/>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/login' element={!user?<Login/> : <Navigate to="/"/>}> </Route>
        <Route path='/register' element={!user?<Register/>:<Navigate to="/"/>}> </Route>
        <Route path='/users/:userId/verify/:token' element={!user?<VerifyEmail/>:<Navigate to="/"/>}> </Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}> </Route>
        <Route path='/reset-password' element={<ResetPassword/>}> </Route>

        <Route path='/profile/:id' element={<Profile/>}> </Route>

        {/* <Route path='/posts' element={<PostPage/>}> </Route>
        <Route path='/posts/create-post' element={<CreatePostPage/>}> </Route>
        <Route path="/posts/details/:id" element={<PostDetails/>}></Route>
        <Route path="/posts/categories/:category" element={<Categorie/>}></Route>
       */}

       <Route path="posts">
            <Route  index  element={<PostPage/>}/> 
            <Route path='create-post' element={user? <CreatePostPage/> : <Navigate to="/"/>}> </Route>
            <Route path="details/:id" element={<PostDetails/>}></Route>
            <Route path="categories/:category" element={<Categorie/>}></Route>
       </Route>
       <Route path='admin-dashboard'>
        <Route index element={user?.isAdmin? <AdminDashboard/> : <Navigate to ="/"/>}/> 
        <Route path="users-table" element={ user?.isAdmin? <UsersTable/>: <Navigate to ="/"/>}></Route>
        <Route path="posts-table" element={user?.isAdmin? <PostsTable/>: <Navigate to ="/"/>}></Route>
        <Route path="categories-table" element={user?.isAdmin? <CategoriesTable/>: <Navigate to ="/"/>}></Route>
        <Route path="comments-table" element={user?.isAdmin? <CommentsTable/>: <Navigate to ="/"/>}></Route>

       </Route>    

        {/* <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/admin-dashboard/users-table" element={<UsersTable/>}></Route>
        <Route path="/admin-dashboard/posts-table" element={<PostsTable/>}></Route>
        <Route path="/admin-dashboard/categories-table" element={<CategoriesTable/>}></Route>
        <Route path="/admin-dashboard/comments-table" element={<CommentsTable/>}></Route> */}
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
