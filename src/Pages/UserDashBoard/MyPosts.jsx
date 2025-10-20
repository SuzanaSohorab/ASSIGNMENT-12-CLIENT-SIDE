import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function MyPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  // Fetch user's posts
  const fetchPosts = () => {
    if (!user?.email) return;
    fetch(`https://assignment-12-server-side-gilt.vercel.app/posts/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  // Delete a post
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-12-server-side-gilt.vercel.app/posts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            fetchPosts();
          });
      }
    });
  };

  return (
    <div className="min-h-screen border-none py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-[#34656D] mb-10 drop-shadow-sm">
          My Posts
        </h2>

        {/* No Posts */}
        {posts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-600 text-center bg-white/60 backdrop-blur-md py-10 rounded-xl shadow-md"
          >
            You haven’t posted anything yet.
          </motion.p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all p-5 border border-white/30 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {post.description || "No description provided."}
                    </p>
                    <div className="flex gap-4 text-gray-500 text-sm mt-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        Votes: {post.upVote - post.downVote}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        Comments: {post.commentCount || 0}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-5">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
                      onClick={() =>
                        Swal.fire("Comments", "Feature not implemented yet", "info")
                      }
                    >
                      Comment
                    </button>
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
