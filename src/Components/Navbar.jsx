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

  // Fetch announcement count from backend
  const fetchAnnouncementCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/announcements");
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
              to="/notifications"
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
              <div className="relative">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <p className="px-4 py-2 text-gray-700 font-semibold">
                      {user.displayName || user.email}
                    </p>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
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
                  className="px-4 py-1 rounded-md bg-green-400 text-white font-semibold hover:bg-green-500 transition-colors"
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
