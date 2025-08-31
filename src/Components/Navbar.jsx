import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  // Dummy user object (replace with your Firebase/AuthContext)
  const user = {
    name: "Suzana Sohorab",
    email: "suzana@example.com",
    photoURL: "https://i.pravatar.cc/150?img=3",
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    // TODO: implement firebase logout
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="demander logo"
              className="h-8 w-8"
            />
            <span className="font-bold text-xl text-blue-600">Demander</span>
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
                  src={user.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200"
                  onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border z-50">
                    <p className="px-4 py-2 text-gray-600 font-medium">{user.name}</p>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
