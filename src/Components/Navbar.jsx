import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import Logo from "./Logo";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [annCount, setAnnCount] = useState(0);
  let closeTimeout;

  // Fetch announcement count from backend
  const fetchAnnouncementCount = async () => {
    try {
      const res = await axios.get("https://assignment-12-server-side-gilt.vercel.app/announcements");
      setAnnCount(res.data.length);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncementCount();

    // Optional: poll every 30 seconds for new announcements
    const interval = setInterval(fetchAnnouncementCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "Logout failed. Please try again.", "error");
    }
  };

  return (
    <nav className="sticky top-0 z-50 shadow-md bg-gradient-to-r from-blue-200 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <Logo />
            <span>MySite</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-white hover:text-yellow-300 transition-colors duration-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard/membership"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-white hover:text-yellow-300 transition-colors duration-300"
              }
            >
              Membership
            </NavLink>

            {/* Notification Icon */}
            <NavLink
              to="/show-announcement"
              className="relative text-white hover:text-yellow-300 transition-colors duration-300"
            >
              <FaBell size={20} />
              {annCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {annCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div
                className="relative"
  onMouseLeave={() => {
    // Delay closing by 500ms (0.5s)
    closeTimeout = setTimeout(() => setIsDropdownOpen(false), 500);
  }}
  onMouseEnter={() => {
    // Cancel closing if mouse comes back
    clearTimeout(closeTimeout);
  }}
              >
                {/* Profile Image */}
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300 shadow cursor-pointer hover:ring-2 hover:ring-yellow-400 transition-all duration-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-3 z-50">
                    {/* User Info */}
                    <p className="px-4 pb-2 text-gray-800 font-semibold border-b border-gray-100">
                      {user.displayName || user.email}
                    </p>

                    {/* Links */}
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors rounded-md mx-2"
                    >
                      Dashboard
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-md mx-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <NavLink
                  className="px-4 py-1 rounded-md bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition-colors"
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className="px-4 py-1 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
                  to="/register"
                >
                  Join Us
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
