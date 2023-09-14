import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { firestore, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function PostShare() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const imageURL = await uploadImage(file);
        setImage(imageURL);
      } catch (error) {
        setError(error);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, "images/" + file.name);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      setError(error);
    }
  };

  const handleShare = async () => {
    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(firestore, "posts"), {
        title,
        content,
        imageURL: image,
        timestamp: new Date(),
      });

      setTitle("");
      setContent("");
      setImage(null);
      showToastMessage(true, "gönderi paylaşıldı");
    } catch (error) {
      showToastMessage(false, error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showToastMessage = (info, message) => {
    if (info) {
      toast.success(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Gönderi Paylaş</h2>
      {error && <p className="text-red-500 mb-4 mt-1">{error}</p>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Başlık:
        </label>
        <input
          type="text"
          id="title"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Resim:</label>
        <div
          {...getRootProps()}
          className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
        >
          <input {...getInputProps()} />
          {image ? (
            <img
              src={image}
              alt="Resim önizleme"
              className="w-32 h-32 object-cover"
            />
          ) : (
            <p>Resim Yüklemek için Buraya Tıklayın veya Sürükleyin</p>
          )}
        </div>
      </div>

      <div className="mb-16 inline-block w-full">
        <label className="block text-gray-700 font-medium mb-2">İçerik:</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ height: "300px" }}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleShare}
        disabled={isLoading}
      >
        {isLoading ? "Paylaşılıyor..." : "Paylaş"}
      </button>
    </div>
  );
}

export default PostShare;
