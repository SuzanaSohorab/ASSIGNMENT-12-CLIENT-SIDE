// src/Pages/HomePage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, sort]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const url =
          sort === "popular"
            ? `https://assignment-12-server-side-gilt.vercel.app/posts/popular?page=${page}&limit=5`
            : `https://assignment-12-server-side-gilt.vercel.app/posts?page=${page}&limit=5`;

        const { data } = await axios.get(url);
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchPosts();
  }, [page, sort]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading posts...</p>
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto transition-all duration-500 ease-in-out">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1
          className="text-3xl font-extrabold"
          style={{ color: "#34656D" }}
        >
          Community Posts
        </h1>
        <button
          onClick={() => setSort(sort === "newest" ? "popular" : "newest")}
          className="px-5 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300"
          style={{
            backgroundColor: "#34656D",
          }}
        >
          {sort === "newest" ? "Sort by Popularity" : "Sort by Newest"}
        </button>
      </div>

      {/* Posts Grid */}
      <div
        className="grid gap-6 opacity-0 animate-fadeIn"
        key={`${page}-${sort}`}
      >
        {posts.map((post, i) => (
          <Link
            to={`/post/${post._id}`}
            key={post._id}
            className="block transform transition-transform hover:scale-[1.02]"
            style={{
              animationDelay: `${i * 0.1}s`,
              animation: "fadeInUp 0.6s ease forwards",
            }}
          >
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={post.authorImage || "/default.png"}
                  alt="author"
                  className="w-10 h-10 rounded-full border-2"
                  style={{ borderColor: "#34656D" }}
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {post.authorEmail}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Title & Description */}
              <h2
                className="text-xl font-bold mb-2"
                style={{ color: "#34656D" }}
              >
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">{post.description}</p>

              {/* Tags & Stats */}
              <div className="flex flex-wrap gap-3 mt-4 items-center">
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#E0F2F1", color: "#34656D" }}
                >
                  {post.tag}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                  💬 {post.commentCount || 0} Comments
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  👍 {post.upVote - post.downVote} Votes
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-10 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-40 transition-all"
          style={{
            backgroundColor: "#34656D",
            opacity: page === 1 ? 0.5 : 1,
          }}
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-40 transition-all"
          style={{
            backgroundColor: "#34656D",
            opacity: page === totalPages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
