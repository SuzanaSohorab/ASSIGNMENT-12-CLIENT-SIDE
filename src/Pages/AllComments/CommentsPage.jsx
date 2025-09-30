import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export default function CommentsPage() {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [reported, setReported] = useState({});

  // Fetch comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://assignment-12-server-side-gilt.vercel.app/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    fetchComments();
  }, [postId]);

  // Handle feedback selection
  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedback((prev) => ({
      ...prev,
      [commentId]: feedback,
    }));
  };

  // Report comment
  const handleReport = async (comment) => {
    try {
      await axios.post("https://assignment-12-server-side-gilt.vercel.app/reports", {
        commentId: comment._id,
        postId,
        commentText: comment.commentText,       // fixed field
        commenterEmail: comment.authorEmail,    // fixed field
        reportedBy: user?.email,
        feedback: selectedFeedback[comment._id],
        createdAt: new Date(),
      });

      setReported((prev) => ({
        ...prev,
        [comment._id]: true,
      }));
    } catch (err) {
      console.error("Failed to report comment", err);
      alert("Failed to report this comment");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Comments on Post
      </h1>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          No comments yet on this post.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4">Commenter Email</th>
                <th className="py-3 px-4">Comment</th>
                <th className="py-3 px-4">Feedback</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {comment.authorEmail}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {comment.commentText}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      className="border border-gray-300 rounded-lg p-2 text-sm w-full"
                      value={selectedFeedback[comment._id] || ""}
                      onChange={(e) =>
                        handleFeedbackChange(comment._id, e.target.value)
                      }
                    >
                      <option value="">Select Feedback</option>
                      <option value="Offensive Language">
                        Offensive Language
                      </option>
                      <option value="Spam/Irrelevant">Spam/Irrelevant</option>
                      <option value="Harassment">Harassment</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        reported[comment._id]
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : selectedFeedback[comment._id]
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                      onClick={() => handleReport(comment)}
                      disabled={
                        !selectedFeedback[comment._id] || reported[comment._id]
                      }
                    >
                      {reported[comment._id] ? "Reported" : "Report"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
