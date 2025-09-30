import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

export default function PostDetails() {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const shareUrl = `${window.location.origin}/post/${_id}`;

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`https://assignment-12-server-side-gilt.vercel.app/posts/${_id}`);
      setPost(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [_id]);

  // --- Comment Add ---
  const handleComment = async () => {
    if (!user) return alert("Please log in to comment");
    try {
      await axios.post(`https://assignment-12-server-side-gilt.vercel.app/posts/${_id}/comments`, {
        authorEmail: user.email,
        authorImage: user.photoURL || "/default.png",
        commentText,
      });
      setCommentText("");
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Comment Delete ---
  const handleDeleteComment = async (commentId) => {
    if (!user) return alert("Please log in");
    try {
      await axios.delete(`https://assignment-12-server-side-gilt.vercel.app/comments/${commentId}`, {
        data: { userEmail: user.email },
      });
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Comment Edit ---
  const handleEditStart = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
  };

  const handleEditSave = async (commentId) => {
    if (!user) return alert("Please log in");
    try {
      await axios.put(`https://assignment-12-server-side-gilt.vercel.app/comments/${commentId}`, {
        commentText: editingText,
        userEmail: user.email,
      });
      setEditingCommentId(null);
      setEditingText("");
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Vote ---
  const handleUpvote = async () => {
    if (!user) return alert("Please log in to vote");
    await axios.post(`https://assignment-12-server-side-gilt.vercel.app/posts/${_id}/upvote`);
    fetchPost();
  };

  const handleDownvote = async () => {
    if (!user) return alert("Please log in to vote");
    await axios.post(`https://assignment-12-server-side-gilt.vercel.app/posts/${_id}/downvote`);
    fetchPost();
  };

  // --- Report Comment ---
  const handleReportComment = async (commentId) => {
    if (!user) return alert("Please log in to report");
    const { value: reason } = await Swal.fire({
      title: "Report Comment",
      input: "text",
      inputLabel: "Reason for reporting",
      inputPlaceholder: "Enter reason...",
      showCancelButton: true,
    });

    if (!reason) return;

    try {
      await axios.post("https://assignment-12-server-side-gilt.vercel.app/reports", {
        commentId,
        postId: post._id,
        reporterEmail: user.email,
        reason,
      });
      Swal.fire("Reported!", "This comment has been reported to admin.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not report the comment.", "error");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (!post)
    return <p className="text-center mt-20 text-red-500">Post not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Post Card */}
      <div className="bg-white shadow-xl rounded-xl border border-gray-200 p-6">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={post.authorImage || "/default.png"}
            alt="author"
            className="w-14 h-14 rounded-full border-2 border-blue-400"
          />
          <div>
            <p className="font-semibold text-gray-800">{post.authorEmail}</p>
            <p className="text-gray-400 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-700 text-lg mb-4">{post.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tag && (
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
              {post.tag}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 items-center mt-4">
          <button
            onClick={handleUpvote}
            className="px-5 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all flex items-center gap-2"
          >
            👍 Upvote ({post.upVote})
          </button>
          <button
            onClick={handleDownvote}
            className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all flex items-center gap-2"
          >
            👎 Downvote ({post.downVote})
          </button>

          {/* Facebook Share */}
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          {/* 🔥 View Comments Button */}
          <button
            onClick={() => navigate(`/dashboard/comments/${post._id}`)}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
          >
            💬 View Comments
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <div className="bg-white shadow-xl rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({post.commentCount || 0})
        </h2>

        {post.comments.map((c) => (
          <div
            key={c._id}
            className="border-b last:border-b-0 py-4 flex gap-4 items-start"
          >
            <img
              src={c.authorImage || "/default.png"}
              alt="commenter"
              className="w-12 h-12 rounded-full border-2 border-gray-300"
            />
            <div className="flex-1">
              {editingCommentId === c._id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => handleEditSave(c._id)}
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="px-4 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-800">
                    <span className="font-semibold">{c.authorEmail}:</span>{" "}
                    {c.commentText}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </>
              )}
            </div>

            {/* Comment Actions */}
            {user && (
              <div className="flex flex-col gap-1 text-right">
                {user.email === c.authorEmail && editingCommentId !== c._id && (
                  <button
                    className="text-blue-500 text-sm hover:underline"
                    onClick={() => handleEditStart(c._id, c.commentText)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => handleDeleteComment(c._id)}
                >
                  Delete
                </button>
                <button
                  className="text-orange-500 text-sm hover:underline"
                  onClick={() => handleReportComment(c._id)}
                >
                  Report
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Comment */}
        {user ? (
          <div className="mt-6 flex gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleComment}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
            >
              Comment
            </button>
          </div>
        ) : (
          <p className="mt-4 text-gray-500 text-sm">Login to comment or vote</p>
        )}
      </div>
    </div>
  );
}
