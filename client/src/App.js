import './App.css';
import Header from './components/header/header';
import {Route,Routes,BrowserRouter} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from './pages/forms/Register';
import CreatePostPage from './pages/create-post/CreatePostPage';
import Admin from './pages/admin/Admin';
import PostPage from './pages/post/PostPage';
import Footer from './components/footer/Footer';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/register' element={<Register/>}> </Route>
        <Route path='/posts/create-post' element={<CreatePostPage/>}> </Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path='/posts' element={<PostPage/>}> </Route>

      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
