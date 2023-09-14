import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { collection, query, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = posts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(posts.length / productsPerPage);

  useEffect(() => {
    const q = query(collection(firestore, "posts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts = [];
      snapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(updatedPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 gap-y-10 mb-10">
        {currentProducts.map((post) => (
          <BlogCard post={post} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-12">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Önceki Sayfa
        </button>
        <span>
          Sayfa {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentProducts.length < productsPerPage}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            currentPage === totalPages ||
            currentProducts.length < productsPerPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Sonraki Sayfa
        </button>
      </div>
    </>
  );
};

export default Home;
