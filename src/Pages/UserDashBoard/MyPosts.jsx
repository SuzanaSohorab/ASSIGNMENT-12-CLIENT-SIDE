import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

export default function MyPosts() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  // Fetch user's posts
  const fetchPosts = () => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/api/posts/user/${user.email}`)
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
        fetch(`http://localhost:5000/api/posts/${id}`, {
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
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">My Posts</h2>
      {posts.length === 0 ? (
        <p>You have not posted anything yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2">Votes</th>
              <th className="border px-4 py-2">Comments</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2 text-center">
                  {post.upVote - post.downVote}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() =>
                      Swal.fire("Comments", "Feature not implemented yet", "info")
                    }
                  >
                    Comment
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
