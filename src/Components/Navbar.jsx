import { useContext, useState,  } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBell } from "react-icons/fa";
import Logo from "./Logo";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";


const Navbar = () => {
  // // Dummy user object (replace with your Firebase/AuthContext)
  // const user = {
  //   name: "Suzana Sohorab",
  //   email: "suzana@example.com",
  //   photoURL: "https://i.pravatar.cc/150?img=3",
  // };
  const {user , logout} =useContext(AuthContext)
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);




    const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire("Error", "Logout failed. Please try again.", "error");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2">
         
            <Logo></Logo>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/membership"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Membership
            </NavLink>
            <NavLink to="/notifications" className="relative text-gray-600 hover:text-blue-600">
              <FaBell size={20} />
              {/* Example notification badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </NavLink>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
          {user ? (
          <div className="relative">
  <img
    src={user.photoURL || "/default-profile.png"}
    alt="Profile"
    className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow cursor-pointer"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  />

  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg py-2 z-50">
      <p className="px-4 py-2 text-gray-700 font-semibold">
        {user.displayName || user.email}
      </p>
      <Link
        to="/dashboard"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Dashboard
      </Link>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  )}
</div>

          ) : (
            <div className="flex gap-2 mt-2">
              <NavLink to="/login" className="px-4 py-1 rounded-md bg-blue-600 text-white text-sm font-semibold">Login</NavLink>
              <NavLink to="/register" className="px-4 py-1 rounded-md bg-green-400 text-white text-sm font-semibold">Join Us</NavLink>
            </div>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
