import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://assignment-12-server-side-gilt.vercel.app/reports");
      setReports(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch reports", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(`https://assignment-12-server-side-gilt.vercel.app/comments/${commentId}`);
      alert("Comment deleted successfully");
      fetchReports();
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment");
    }
  };

  const handleIgnoreReport = async (reportId) => {
    try {
      await axios.put(`https://assignment-12-server-side-gilt.vercel.app/reports/${reportId}`);
      alert("Report marked as reviewed");
      fetchReports();
    } catch (err) {
      console.error(err);
      alert("Failed to ignore report");
    }
  };

  const handleWarnUser = async (email) => {
    try {
      await axios.put(`https://assignment-12-server-side-gilt.vercel.app/users/warn/${email}`);
      alert("User warned successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to warn user");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Reported Comments</h1>

      {loading ? (
        <p className="text-gray-500">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">No reports yet</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center hover:shadow-lg transition"
            >
              <div className="flex items-start space-x-4 w-full md:w-2/3">
                {/* Reporter Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg">
                    {r.reporterName ? r.reporterName[0].toUpperCase() : "?"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-700 font-semibold">{r.reporterName || r.reporterEmail || "Unknown Reporter"}</p>
                  <p className="text-gray-500 text-sm mt-1"><span className="font-semibold">Reason:</span> {r.reason || "No reason provided"}</p>
                  <p className="text-gray-700 mt-1"><span className="font-semibold">Comment:</span> {r.commentText || "No text"}</p>
                  <p className="text-gray-500 text-sm mt-1"><span className="font-semibold">Commenter:</span> {r.commenterEmail || "Unknown"}</p>
                  <p className="text-gray-500 text-sm mt-1"><span className="font-semibold">Post:</span> {r.postTitle || "Unknown Post"}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={() => handleDeleteComment(r.commentId)}
                >
                  Delete Comment
                </button>
                <button
                  className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                  onClick={() => handleIgnoreReport(r._id)}
                >
                  Ignore
                </button>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  onClick={() => handleWarnUser(r.commenterEmail)}
                >
                  Warn User
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
