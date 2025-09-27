import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export default function PostDetails() {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);

  const shareUrl = `${window.location.origin}/post/${_id}`;

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/posts/${_id}`);
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

  const handleComment = async () => {
    if (!user) return alert("Please log in to comment");
    try {
      await axios.post(`http://localhost:5000/posts/${_id}/comments`, {
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

  const handleDeleteComment = async (commentId) => {
    if (!user) return alert("Please log in");
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`, {
        data: { userEmail: user.email },
      });
      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditStart = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
  };

  const handleEditSave = async (commentId) => {
    if (!user) return alert("Please log in");
    try {
      await axios.put(`http://localhost:5000/comments/${commentId}`, {
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

  const handleUpvote = async () => {
    if (!user) return alert("Please log in to vote");
    await axios.post(`http://localhost:5000/posts/${_id}/upvote`);
    fetchPost();
  };

  const handleDownvote = async () => {
    if (!user) return alert("Please log in to vote");
    await axios.post(`http://localhost:5000/posts/${_id}/downvote`);
    fetchPost();
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (!post) return <p className="text-center mt-20 text-red-500">Post not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Post Card */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.authorImage || "/default.png"}
            alt="author"
            className="w-12 h-12 rounded-full border-2 border-blue-400"
          />
          <div>
            <p className="font-semibold text-gray-800">{post.authorEmail}</p>
            <p className="text-gray-400 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
            {post.tag}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center mt-3">
          <button
            onClick={handleUpvote}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded shadow hover:from-green-500 hover:to-green-600 transition-all"
          >
            👍 Upvote ({post.upVote})
          </button>
          <button
            onClick={handleDownvote}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded shadow hover:from-red-500 hover:to-red-600 transition-all"
          >
            👎 Downvote ({post.downVote})
          </button>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={36} round />
          </FacebookShareButton>
        </div>
      </div>

      {/* Comment Section */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">
          Comments ({post.commentCount || 0})
        </h2>

        {post.comments.map((c) => (
          <div
            key={c._id}
            className="border-b last:border-b-0 py-3 flex gap-3 items-start"
          >
            <img
              src={c.authorImage || "/default.png"}
              alt="commenter"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <div className="flex-1">
              {editingCommentId === c._id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 border p-2 rounded"
                  />
                  <button
                    onClick={() => handleEditSave(c._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p>
                    <span className="font-semibold">{c.authorEmail}:</span>{" "}
                    {c.commentText}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </>
              )}
            </div>

            {/* Comment Actions */}
            {user &&
              (user.email === c.authorEmail || user.email === post.authorEmail) && (
                <div className="flex flex-col gap-1 text-right">
                  {user.email === c.authorEmail && editingCommentId !== c._id && (
                    <button className="text-blue-500 text-sm" onClick={() => handleEditStart(c._id, c.commentText)}>
                      Edit
                    </button>
                  )}
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => handleDeleteComment(c._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        ))}

        {/* Add Comment */}
        {user ? (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleComment}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-all"
            >
              Comment
            </button>
          </div>
        ) : (
          <p className="mt-4 text-gray-500 text-sm">
            Login to comment or vote
          </p>
        )}
      </div>
    </div>
  );
}
