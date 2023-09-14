import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, doc, getDoc } from "firebase/firestore";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDocRef = doc(firestore, "posts", postId);
        const postDocSnap = await getDoc(postDocRef);
        if (postDocSnap.exists()) {
          setPost(postDocSnap.data());
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
      <div className="h-[500px]">
        <img
          src={post.imageURL}
          alt="Resim önizleme"
          className="w-full h-full object-contain"
        />
      </div>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

export default PostDetail;
