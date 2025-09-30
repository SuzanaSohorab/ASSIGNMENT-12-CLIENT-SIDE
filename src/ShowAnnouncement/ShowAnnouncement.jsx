import { useState, useEffect } from "react";
import axios from "axios";
import { FaBullhorn } from "react-icons/fa";

export default function ShowAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="max-w-5xl mx-auto m-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Announcements
      </h2>

      {announcements.length === 0 ? (
        // No announcements section
        <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-3xl py-20 shadow-md">
          <FaBullhorn size={60} className="text-gray-400 mb-6" />
          <p className="text-gray-600 text-xl font-semibold">
            No announcements yet
          </p>
          <p className="text-gray-400 text-sm mt-2 text-center max-w-xs">
            Our team hasn’t posted any announcements yet. Please check back later for updates.
          </p>
        </div>
      ) : (
        // List of announcements
        <ul className="space-y-6">
          {announcements.map((ann) => (
            <li
              key={ann._id}
              className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 flex flex-col md:flex-row md:items-start gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Author image */}
              {ann.authorImage && (
                <img 
                  src={ann.authorImage}
                  alt={ann.authorName}
                  className="w-14 h-14 rounded-full border border-gray-300 object-cover flex-shrink-0"
                />
              )}

              {/* Announcement content */}
              <div className="flex-1 m-10 ">
                <h3 className="text-lg font-bold text-gray-900">{ann.title}</h3>
                <p className="text-gray-700 mt-2">{ann.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  By <span className="font-medium">{ann.authorName || "Unknown"}</span> ({ann.authorEmail}) •{" "}
                  {new Date(ann.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
