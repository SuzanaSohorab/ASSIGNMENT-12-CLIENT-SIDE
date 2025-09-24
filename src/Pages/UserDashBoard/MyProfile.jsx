// src/Pages/UserDashboard/MyProfile.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export default function MyProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // Get user info
      axios.get(`http://localhost:5000/users/${user.email}`)
        .then((res) => setProfile(res.data));

      // Get recent 3 posts
      axios.get(`http://localhost:5000/posts/recent/${user.email}`)
        .then((res) => setRecentPosts(res.data));
    }
  }, [user]);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      {/* Profile Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>

          {/* Badges */}
          <div className="flex space-x-2 mt-2">
            {profile.role === "normal" && (
              <span className="px-3 py-1 bg-orange-400 text-white text-sm rounded-lg">
                🥉 Bronze Badge
              </span>
            )}
            {profile.role === "member" && (
              <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg">
                🥇 Gold Badge
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <h3 className="text-xl font-semibold mb-4">My Recent Posts</h3>
      <ul className="space-y-3">
        {recentPosts.map((post) => (
          <li
            key={post._id}
            className="p-3 border rounded-lg shadow-sm hover:bg-gray-50"
          >
            <h4 className="font-semibold">{post.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {post.description}
            </p>
            <p className="text-xs text-gray-400">Votes: {post.upVote - post.downVote}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
