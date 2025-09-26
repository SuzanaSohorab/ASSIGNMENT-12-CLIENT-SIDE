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
  const [loading, setLoading] = useState(true);

  const shareUrl = `${window.location.origin}/post/${_id}`;

  useEffect(() => {
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
    fetchPost();
  }, [_id]);

  const handleComment = async () => {
    if (!user) return alert("Please log in to comment");
    try {
      await axios.post(`http://localhost:5000/posts/${_id}/comments`, {
        authorEmail: user.email,
        commentText,
      });
      // Refresh post comments
      const { data } = await axios.get(`http://localhost:5000/posts/${_id}`);
      setPost(data);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpvote = async () => {
    if (!user) return alert("Please log in to vote");
    await axios.post(`http://localhost:5000/posts/${_id}/upvote`);
    const { data } = await axios.get(`http://localhost:5000/posts/${_id}`);
    setPost(data);
  };

  const handleDownvote = async () => {
    if (!user) return alert("Please log in to vote");
    await axios.post(`http://localhost:5000/posts/${_id}/downvote`);
    const { data } = await axios.get(`http://localhost:5000/posts/${_id}`);
    setPost(data);
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
        {post.comments.map((c, idx) => (
          <div key={idx} className="border-b py-2">
            <p>
              <span className="font-semibold">{c.authorEmail}:</span> {c.commentText}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </p>
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
