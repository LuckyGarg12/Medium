import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { FullBlog } from "./pages/FullBlog";
import { Navigate } from "react-router-dom";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";


function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs/:id" element={<FullBlog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="*" element={<Navigate to={"/signin"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App