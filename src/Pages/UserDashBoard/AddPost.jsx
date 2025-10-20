import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";

export default function AddPost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch user post count
  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-12-server-side-gilt.vercel.app/posts/count/${user.email}`)
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

    const res = await fetch("https://assignment-12-server-side-gilt.vercel.app/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

  // Restrict normal users to max 5 posts
  if (postCount >= 5) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Post Limit Reached
          </h2>
          <p className="text-gray-600 mb-6">
            You've reached your limit of 5 posts. Upgrade to a membership to add more!
          </p>
          <button
            onClick={() => navigate("/dashboard/membership")}
            className="bg-[#B6AE9F] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#9f9789] transition-all duration-300 transform hover:scale-105"
          >
            Become a Member
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-5xl w-full transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create a New Post
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column – Author Info */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Name
              </label>
              <input
                value={user?.displayName || ""}
                readOnly
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-600 cursor-not-allowed focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Email
              </label>
              <input
                value={user?.email || ""}
                readOnly
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-600 cursor-not-allowed focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Image URL
              </label>
              <input
                value={user?.photoURL || ""}
                readOnly
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-600 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column – Post Details */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                className={`w-full border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 focus:ring-2 focus:ring-[#B6AE9F] focus:border-[#B6AE9F] transition-all duration-200`}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">Title is required</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                className={`w-full border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 focus:ring-2 focus:ring-[#B6AE9F] focus:border-[#B6AE9F] transition-all duration-200 resize-none h-32`}
                placeholder="Enter post description"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  Description is required
                </p>
              )}
            </div>

            {/* Tag */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <select
                {...register("tag", { required: true })}
                className={`w-full border ${
                  errors.tag ? "border-red-500" : "border-gray-300"
                } rounded-lg p-3 focus:ring-2 focus:ring-[#B6AE9F] focus:border-[#B6AE9F] transition-all duration-200`}
              >
                <option value="">Select a tag</option>
                <option value="React">React</option>
                <option value="JavaScript">JavaScript</option>
                <option value="MongoDB">MongoDB</option>
                <option value="Node">Node.js</option>
              </select>
              {errors.tag && (
                <p className="text-red-500 text-sm mt-1">Tag is required</p>
              )}
            </div>
          </div>

          {/* Full-width Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="w-1/2 bg-[#34656D] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#9f9789] transition-all duration-300 transform hover:scale-105"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
