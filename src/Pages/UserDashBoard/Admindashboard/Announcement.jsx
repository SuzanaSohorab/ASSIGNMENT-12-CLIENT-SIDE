import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import { FaTrash } from "react-icons/fa";

export default function Announcement() {
  const { user } = useContext(AuthContext); // logged-in admin user
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  // Fetch all announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Create announcement
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/announcements", {
        title,
        description,
        authorName: user?.displayName || user?.email,
        authorEmail: user?.email,
        authorImage: user?.photoURL || "/default-profile.png",
      });

      setTitle("");
      setDescription("");
      fetchAnnouncements(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to publish announcement");
    }
  };

  // Delete announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Make Announcement</h1>

      {/* Author Info */}
      {user && (
        <div className="flex items-center gap-4 mb-4 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
          <img
            src={user.photoURL || "/default-profile.png"}
            alt="Author"
            className="w-14 h-14 rounded-full border border-gray-300"
          />
          <div>
            <p className="font-semibold text-gray-800">{user.displayName || user.email}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <textarea
          placeholder="Announcement Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full p-3 border rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors w-full">
          Publish
        </button>
      </form>

      {/* Announcement List */}
      {announcements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Announcements ({announcements.length})
          </h2>
          <ul className="space-y-4">
            {announcements.map((ann) => (
              <li
                key={ann._id}
                className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-start hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4">
                  {ann.authorImage && (
                    <img
                      src={ann.authorImage}
                      alt={ann.authorName}
                      className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{ann.title}</h3>
                    <p className="text-gray-700 mt-1">{ann.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      By {ann.authorName || "Unknown"} ({ann.authorEmail}) •{" "}
                      {new Date(ann.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(ann._id)}
                  className="mt-4 md:mt-0 text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold transition-colors"
                >
                  <FaTrash /> Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
