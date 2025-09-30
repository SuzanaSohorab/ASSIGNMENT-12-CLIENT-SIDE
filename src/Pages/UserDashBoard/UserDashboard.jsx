import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { FaUser, FaPlus, FaClipboardList, FaUsers, FaFlag, FaBullhorn } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext"; 

export default function UserDashboard() {
  const location = useLocation();
  const { user: authUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  // Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      if (!authUser?.email) return;
      try {
        const res = await fetch(`https://assignment-12-server-side-gilt.vercel.app/users/${authUser.email}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [authUser]);

  // Active link checker
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-xl border-r flex-shrink-0">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 text-2xl font-bold">
            {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </div>

          <nav className="p-6">
            <ul className="space-y-3">
              <li>
                <Link
                  to="my-profile"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive("my-profile")
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <FaUser /> My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="add-post"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive("add-post")
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <FaPlus /> Add Post
                </Link>
              </li>
              <li>
                <Link
                  to="my-post"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive("my-post")
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <FaClipboardList /> My Posts
                </Link>
              </li>
              <li>
                <Link
                  to="membership"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive("membership")
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  🏅 Membership
                </Link>
              </li>

              {/* Admin-only links */}
              {user?.role === "admin" && (
                <>
                  <li>
                    <Link
                      to="manage-users"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive("manage-users")
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <FaUsers /> Manage Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="reported-comments"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive("reported-comments")
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <FaFlag /> Reported Comments
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="announcement"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive("announcement")
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <FaBullhorn /> Announcement
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow-md p-6 min-h-full border">
            <Outlet /> {/* Render active route */}
          </div>
        </main>
      </div>
    </div>
  );
}
