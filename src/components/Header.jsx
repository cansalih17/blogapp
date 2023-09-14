import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="bg-white shadow-lg py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-semibold">
            SaloBlog
          </Link>
        </div>
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 hover:underline"
          >
            Ana Sayfa
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-800 hover:underline"
          >
            Hakkımızda
          </Link>
          {currentUser ? (
            <Link
              to="/post-share"
              className="text-gray-600 hover:text-gray-800 hover:underline"
            >
              Gönderi Paylaş
            </Link>
          ) : (
            ""
          )}
          {currentUser ? (
            <Link
              to="/posts"
              className="text-gray-600 hover:text-gray-800 hover:underline"
            >
              Gönderiler
            </Link>
          ) : (
            ""
          )}

          {currentUser ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 hover:underline"
            >
              Çıkış Yap
            </button>
          ) : (
            ""
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
