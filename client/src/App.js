import './App.css';
import Header from './components/header/header';
import {Route,Routes,BrowserRouter} from "react-router-dom";
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
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer theme='colored' position='top-center'/>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/register' element={<Register/>}> </Route>
        <Route path='/profile/:id' element={<Profile/>}> </Route>

        {/* <Route path='/posts' element={<PostPage/>}> </Route>
        <Route path='/posts/create-post' element={<CreatePostPage/>}> </Route>
        <Route path="/posts/details/:id" element={<PostDetails/>}></Route>
        <Route path="/posts/categories/:category" element={<Categorie/>}></Route>
       */}

       <Route path="posts">
            <Route  index  element={<PostPage/>}/> 
            <Route path='create-post' element={<CreatePostPage/>}> </Route>
            <Route path="details/:id" element={<PostDetails/>}></Route>
            <Route path="categories/:category" element={<Categorie/>}></Route>
       </Route>
       <Route path='admin-dashboard'>
        <Route index element={<AdminDashboard/>}/> 
        <Route path="users-table" element={<UsersTable/>}></Route>
        <Route path="posts-table" element={<PostsTable/>}></Route>
        <Route path="categories-table" element={<CategoriesTable/>}></Route>
        <Route path="comments-table" element={<CommentsTable/>}></Route>

       </Route>    

        {/* <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/admin-dashboard/users-table" element={<UsersTable/>}></Route>
        <Route path="/admin-dashboard/posts-table" element={<PostsTable/>}></Route>
        <Route path="/admin-dashboard/categories-table" element={<CategoriesTable/>}></Route>
        <Route path="/admin-dashboard/comments-table" element={<CommentsTable/>}></Route> */}


      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
