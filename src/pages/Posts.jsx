import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const navigate = useNavigate();

  function truncateText(html, maxLength) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let plainText = tempDiv.textContent || "";

    if (plainText.length > maxLength) {
      plainText = plainText.substring(0, maxLength - 3) + "...";
    }

    return plainText;
  }

  useEffect(() => {
    const q = query(collection(firestore, "posts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts = [];
      snapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(updatedPosts);
      setLoading(false);
      setTotalPages(Math.ceil(updatedPosts.length / 5));
    });

    return () => unsubscribe();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDoc(doc(firestore, "posts", selectedPostId));
      setShowDeleteModal(false);
      setSelectedPostId(null);
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const visiblePosts = posts.slice(startIndex, endIndex);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      border: "0px",
    },
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      İçerik
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Düzenle
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Sil
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visiblePosts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {post.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {post.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {truncateText(post.content, 50)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="text-green-300 hover:text-green-700"
                          variant="danger"
                          onClick={() => navigate(`/edit/${post.id}`)}
                        >
                          Güncelle
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="text-red-500 hover:text-red-700"
                          variant="danger"
                          onClick={() => handleDeleteClick(post.id)}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-2 rounded-md border m-1 ${
              currentPage === index + 1 ? "bg-blue-400 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        style={customStyles}
      >
        <div className="bg-white w-96 p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Gönderiyi Sil</h2>
          <p>Gönderiyi silmek istediğinizden emin misiniz?</p>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
              onClick={handleConfirmDelete}
            >
              Evet, Sil
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setShowDeleteModal(false)}
            >
              İptal
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
