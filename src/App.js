import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import PostShare from "./pages/PostShare";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import useAuth from "./custom-hooks/useAuth.js";
import PostDetail from "./pages/PostDetail";
import Posts from "./pages/Posts";
import EditPost from "./pages/EditPost";

function App() {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <div className="container mx-auto mt-16 mb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={currentUser ? <Posts /> : <Login />} />
          <Route path="/post-detail/:postId" element={<PostDetail />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route
            path="/post-share"
            element={currentUser ? <PostShare /> : <Login />}
          />
          <Route path="/login" element={currentUser ? <Home /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
