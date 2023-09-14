import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  function truncateText(html, maxLength) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let plainText = tempDiv.textContent || "";

    if (plainText.length > maxLength) {
      plainText = plainText.substring(0, maxLength - 3) + "...";
    }

    return plainText;
  }

  function formatTimestamp(timestamp) {
    const date = timestamp.toDate();

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US");

    const formattedTimestamp = `${formattedDate} ${formattedTime}`;

    return formattedTimestamp;
  }

  const formattedTimestamp = formatTimestamp(post.timestamp);

  const truncatedContent = truncateText(post.content, 50);

  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden duration-300 hover:-translate-y-5">
      <img
        src={post?.imageURL}
        alt=""
        className="w-full h-[233px] object-cover"
      />
      <div className="mt-4 px-6 py-4 pb-8">
        <Link
          to={`/post-detail/${post.id}`}
          className="text-xl font-bold mt-2 capitalize"
        >
          {post?.title}
        </Link>
        <div className="text-sm text-gray-500 mt-2">{formattedTimestamp}</div>
        <p className="mt-4">{truncatedContent}</p>
      </div>
    </div>
  );
};

export default BlogCard;
