// src/pages/AddPost.jsx
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export default function AddPost() {
  const { user } = useContext(AuthContext);
  

  const [postCount, setPostCount] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 👉 Fetch user post count
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/posts/count/${user.email}`)
        .then((res) => res.json())
        .then((data) => setPostCount(data.count));
    }
  }, [user]);

  const onSubmit = async (data) => {
    const newPost = {
      title: data.title,
      description: data.description,
      tag: data.tag,
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorImage: user?.photoURL,
      upVote: 0,
      downVote: 0,
      createdAt: new Date(),
    };

    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    const result = await res.json();

    if (result.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Post Added!",
        text: "Your post has been successfully published.",
      });
      reset();
      setPostCount((prev) => prev + 1);
    }
  };

  // 👉 Restrict normal users to max 5 posts
  if (postCount >= 5) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold mb-4">
          You have reached your post limit (5).
        </h2>
        <p className="mb-6">Become a Member to add more posts!</p>
        <button
          onClick={() => navigate("/membership")}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Read-only Author Information */}
        <div>
          <label className="block text-sm font-medium">Author Name</label>
          <input
            value={user?.displayName || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Author Email</label>
          <input
            value={user?.email || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Author Image URL</label>
          <input
            value={user?.photoURL || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter post description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Tag */}
        <div>
          <label className="block text-sm font-medium">Tag</label>
          <select
            {...register("tag", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select a tag</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Node">Node.js</option>
          </select>
          {errors.tag && (
            <p className="text-red-500 text-sm">Tag is required</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}
