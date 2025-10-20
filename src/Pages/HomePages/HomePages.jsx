import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Smooth scroll to top whenever page or sort changes
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
        setTimeout(() => setLoading(false), 300); // slight delay for smooth transition
      }
    };

    fetchPosts();
  }, [page, sort]);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Loading...
      </p>
    );

  return (
    <div
      className="p-6 max-w-5xl mx-auto transition-all duration-500 ease-in-out"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blue-700">All Posts</h1>
        <button
          onClick={() => setSort(sort === "newest" ? "popular" : "newest")}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded shadow hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          {sort === "newest" ? "Sort by Popularity" : "Sort by Newest"}
        </button>
      </div>

      {/* Posts */}
      <div
        className="grid gap-6 opacity-0 animate-fadeIn"
        key={`${page}-${sort}`} // re-trigger animation on page/sort change
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
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-5 border border-gray-100">
              {/* Author */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={post.authorImage || "/default.png"}
                  alt="author"
                  className="w-10 h-10 rounded-full border-2 border-blue-400"
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
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">{post.description}</p>

              {/* Tags & Stats */}
              <div className="flex flex-wrap gap-3 mt-4 items-center">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {post.tag}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  Comments: {post.commentCount || 0}
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Votes: {post.upVote - post.downVote}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-8 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-all"
        >
          Prev
        </button>
        <span className="text-gray-600 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* 🪄 Add this CSS (e.g., in index.css or tailwind.css global section)
   for fadeIn + fadeInUp animations */
