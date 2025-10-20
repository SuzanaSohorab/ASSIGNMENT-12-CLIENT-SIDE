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

  // 🔹 Fetch announcement count
  const fetchAnnouncementCount = async () => {
    try {
      const res = await axios.get(
        "https://assignment-12-server-side-gilt.vercel.app/announcements"
      );
      setAnnCount(res.data.length);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncementCount();

    // Optional: poll every 30 seconds
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
    <nav className="sticky top-0 z-50 shadow-md bg-[#B6AE9F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 🔹 Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl"
          >
            <Logo />
            {/* <span>MySite</span> */}
          </Link>

          {/* 🔹 Navigation Links */}
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

            {/* 🔹 Notification Icon */}
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

          {/* 🔹 User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div
                className="relative"
                onMouseLeave={() => {
                  closeTimeout = setTimeout(() => setIsDropdownOpen(false), 500);
                }}
                onMouseEnter={() => {
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
                {/* Dropdown Menu */}
{isDropdownOpen && (
  <div
    className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-md border border-gray-100 
               rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] py-3 z-50 
               transition-all duration-300 animate-fadeIn overflow-hidden"
  >
    {/* User Info */}
    <div className="px-4 pb-3 border-b border-gray-200">
      <p className="text-gray-900 font-semibold text-sm">
        {user.displayName || user.email}
      </p>
    
    </div>

    {/* Links */}
    <div className="py-2">
      <Link
        to="/dashboard"
        className="relative block px-4 py-2 text-gray-700 transition-all duration-200 mx-2 
                    items-center gap-2 after:content-[''] after:absolute after:left-4 
                   after:bottom-1 after:w-0 after:h-[2px] after:bg-indigo-600 
                   hover:after:w-[90%] after:transition-all after:duration-300"
      >
        
        Dashboard
      </Link>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 my-2"></div>

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="relative w-full text-left px-4 py-2 text-red-600 transition-all duration-200 
                 flex items-center gap-2 mx-2 after:content-[''] after:absolute after:left-4 
                 after:bottom-1 after:w-0 after:h-[2px] after:bg-red-600 
                 hover:after:w-[90%] after:transition-all after:duration-300"
    >Logout
    </button>
  </div>
)}

              </div>
            ) : (
              <div className="flex gap-2 mr-28">
                <NavLink
                  className="px-4 py-1 rounded-md bg-[#456882] text-white font-semibold hover:bg-[#BADFDB] transition-colors hover:text-black"
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
