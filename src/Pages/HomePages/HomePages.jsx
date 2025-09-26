import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const url =
          sort === "popular"
            ? `http://localhost:5000/posts/popular?page=${page}&limit=5`
            : `http://localhost:5000/posts?page=${page}&limit=5`;

        const { data } = await axios.get(url);

        // Backend should return { posts, currentPage, totalPages }
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, sort]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">All Posts</h1>
        <button
          onClick={() => setSort(sort === "newest" ? "popular" : "newest")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {sort === "newest" ? "Sort by Popularity" : "Sort by Newest"}
        </button>
      </div>

      {posts.map((post) => (
        <div key={post._id} className="border p-3 mb-3 rounded">
          <div className="flex items-center gap-2">
            <img
              src={post.authorImage || "/default.png"}
              alt="author"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold">{post.authorEmail}</span>
          </div>
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <div className="flex gap-4 text-sm mt-2">
            <span>Tags: {post.tag}</span>
            <span>Comments: {post.commentCount}</span>
            <span>Votes: {post.upVote - post.downVote}</span>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
