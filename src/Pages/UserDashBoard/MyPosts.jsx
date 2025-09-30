import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

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
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
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
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">
        My Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          You have not posted anything yet.
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                  <span>Votes: {post.upVote - post.downVote}</span>
                  <span>Comments: {post.commentCount || 0}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md transition-colors"
                  onClick={() =>
                    Swal.fire("Comments", "Feature not implemented yet", "info")
                  }
                >
                  Comment
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition-colors"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
