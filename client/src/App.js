import {Route,Routes} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './Layout/LoginPage';
import MainPage from './Layout/MainPage';
import RegisterPage from './Layout/RegisterPage';
import { useEffect } from 'react';
import CreatPost from './Component/CreatPost/CreatPost';
import PostPage from './Component/PostPage/PostPage';
import EditPost from './Component/EditPage/EditPost';
import PostDisplay from './Layout/PostDisplay';
function App() {

  useEffect(() => {

  }, [])
  
  return (
  
      <Routes>
        <Route exact path='/' element={<MainPage></MainPage>} ></Route>
        <Route path='/login' element={<LoginPage></LoginPage>} ></Route>
        <Route path='/register' element={<RegisterPage></RegisterPage>} ></Route>
        <Route path='/createpost' element={<CreatPost></CreatPost>} ></Route>
        <Route path='/PostPage/:id' element={<PostDisplay></PostDisplay>} ></Route>
        <Route path='/editpost/:id' element={<EditPost></EditPost>} > </Route>
      </Routes>
   
  );
}

export default App;
