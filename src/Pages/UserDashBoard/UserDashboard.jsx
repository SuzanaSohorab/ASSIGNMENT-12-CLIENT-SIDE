import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { FaUser, FaPlus, FaClipboardList } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
 // context providing logged-in user

export default function UserDashboard() {
  const location = useLocation();
  const { user: authUser } = useContext(AuthContext); // logged-in user from context
  const [user, setUser] = useState(null); // state for user fetched from backend

  // Fetch user info from backend to get correct role
  useEffect(() => {
    const fetchUser = async () => {
      if (!authUser?.email) return;
      try {
        const res = await fetch(`http://localhost:5000/users/${authUser.email}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [authUser]);

  // Helper to check active link
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border-r flex-shrink-0">
          <div className="p-6 text-2xl font-bold border-b text-yellow-600">
            {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </div>
          <nav className="p-6">
            <ul className="space-y-4">
              <li>
                <Link
                  to="my-profile"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-yellow-100 ${
                    isActive("my-profile") ? "bg-yellow-200 font-semibold" : ""
                  }`}
                >
                  <FaUser /> My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="add-post"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-yellow-100 ${
                    isActive("add-post") ? "bg-yellow-200 font-semibold" : ""
                  }`}
                >
                  <FaPlus /> Add Post
                </Link>
              </li>
              <li>
                <Link
                  to="my-post"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-yellow-100 ${
                    isActive("my-post") ? "bg-yellow-200 font-semibold" : ""
                  }`}
                >
                  <FaClipboardList /> My Posts
                </Link>
              </li>
              <li>
                <Link
                  to="membership"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-yellow-100 ${
                    isActive("membership") ? "bg-yellow-200 font-semibold" : ""
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
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-yellow-100 ${
                        isActive("manage-users") ? "bg-yellow-200 font-semibold" : ""
                      }`}
                    >
                      🛠 Manage Users
                    </Link>
                  </li>
                
                  <li>
                    <Link
                      to="reported-comments"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-yellow-100 ${
                        isActive("reported-comments") ? "bg-yellow-200 font-semibold" : ""
                      }`}
                    >
                       Reported Comments
                    </Link>
                  </li>
                
                  <li>
                    <Link
                      to="announcement"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-yellow-100 ${
                        isActive("announcemnet") ? "bg-yellow-200 font-semibold" : ""
                      }`}
                    >
                      Announcemnet
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow p-6 min-h-full">
            <Outlet /> {/* Render active route here */}
          </div>
        </main>
      </div>
    </div>
  );
}
