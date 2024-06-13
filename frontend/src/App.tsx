import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import { Publish } from './pages/Publish';
import { Blogs } from './pages/Blogs';
import { PostedBlogs } from './pages/PostedBlogs';
import { EditBlogs } from './pages/EditBlogs';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path = "/blogs" element = {<Blogs />}/>
          <Route path="/publish" element= {<Publish/>}/>
          <Route path="/publishedpost/:id" element = {<PostedBlogs/>}/>
          <Route path="/edit/:id" element = {<EditBlogs/>}></Route>
          <Route path = "/" element = {<LandingPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App