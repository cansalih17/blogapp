import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { firestore, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditPost = () => {
  const { postId } = useParams(); // URL'den postId'yi al
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Firestore'dan postId'ye göre ilgili postu çek
    const loadPost = async () => {
      try {
        const postDoc = await getDoc(doc(firestore, "posts", postId));
        if (postDoc.exists()) {
          setPost({ id: postId, ...postDoc.data() });
          setEditedContent(postDoc.data().content);
          setEditedTitle(postDoc.data().title);
        } else {
          // Post bulunamazsa, başka bir sayfaya yönlendirin veya hata mesajı gösterin
          navigate("/"); // Örneğin ana sayfaya yönlendiriyoruz
        }
      } catch (error) {
        console.error("Hata:", error);
        // Hata durumunda kullanıcıyı uygun bir sayfaya yönlendirin veya hata mesajı gösterin
        navigate("/"); // Örneğin ana sayfaya yönlendiriyoruz
      }
    };

    loadPost();
  }, [postId, navigate]);

  const handleUpdate = async () => {
    try {
      // Firestore'da postu güncelle
      setIsLoading(true);
      const postRef = doc(firestore, "posts", postId);
      const updateData = {
        content: editedContent,
        title: editedTitle,
      };

      // Eğer yeni bir resim seçildiyse, resmi yükle ve imageURL güncelle
      if (editedImage) {
        const storageRef = ref(storage, `images/${postId}`);
        await uploadBytes(storageRef, editedImage);
        updateData.imageURL = await getDownloadURL(storageRef);
      } else {
        // Eğer yeni bir resim seçilmediyse, eski resim URL'sini kullan
        updateData.imageURL = post.imageURL;
      }

      await updateDoc(postRef, updateData);
      // Güncelleme tamamlandığında ana sayfaya yönlendirin veya istediğiniz sayfaya yönlendirin
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Güncelleme Hatası:", error);
    }
  };

  if (!post) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gönderiyi Düzenle</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Başlık:
        </label>
        <input
          type="text"
          id="title"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Resim:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setEditedImage(e.target.files[0])}
        />
      </div>
      <div className="mb-16 inline-block w-full">
        <label className="block text-gray-700 font-medium mb-2">İçerik:</label>
        <ReactQuill
          theme="snow"
          value={editedContent}
          onChange={setEditedContent}
          style={{ height: "300px" }}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleUpdate}
      >
        {isLoading ? "Güncelleniyor..." : "Güncelle"}
      </button>
    </div>
  );
};

export default EditPost;
