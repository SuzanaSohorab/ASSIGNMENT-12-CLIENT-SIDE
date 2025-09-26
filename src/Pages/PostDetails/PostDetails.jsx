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

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Post Details */}
      <div className="border p-4 rounded mb-6">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.authorImage || "/default.png"}
            alt="author"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">{post.authorEmail}</span>
        </div>
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="mt-2">{post.description}</p>
        <div className="flex gap-4 text-sm mt-2">
          <span>Tag: {post.tag}</span>
          <span>Time: {new Date(post.createdAt).toLocaleString()}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-4 items-center">
          <button
            onClick={handleUpvote}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Upvote ({post.upVote})
          </button>
          <button
            onClick={handleDownvote}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Downvote ({post.downVote})
          </button>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>

      {/* Comment Section */}
      <div className="border p-4 rounded">
        <h3 className="font-bold mb-2">Comments ({post.commentCount})</h3>

        {post.comments.map((c) => (
          <div key={c._id} className="border-b py-2 flex items-start gap-2">
            <img
              src={c.authorImage || "/default.png"}
              alt="commenter"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              {editingCommentId === c._id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 border p-1 rounded"
                  />
                  <button
                    onClick={() => handleEditSave(c._id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="px-2 py-1 bg-gray-400 text-white rounded"
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
                  <p className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            {user &&
              (user.email === c.authorEmail || user.email === post.authorEmail) && (
                <div className="flex gap-2">
                  {user.email === c.authorEmail && editingCommentId !== c._id && (
                    <button
                      onClick={() => handleEditStart(c._id, c.commentText)}
                      className="text-blue-500 text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteComment(c._id)}
                    className="text-red-500 text-sm"
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
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={handleComment}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Comment
            </button>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">Login to comment or vote</p>
        )}
      </div>
    </div>
  );
}
