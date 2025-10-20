import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaRegUser ,
  FaPlus,
  FaClipboardList,
  FaUsers,
  FaFlag,
  FaBullhorn,
  FaBars,
  FaTimes,
  
} from "react-icons/fa";
import { LuArrowUpNarrowWide } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCardMembership ,MdOutlinePostAdd } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

export default function UserDashboard() {
  const location = useLocation();
  const { user: authUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      if (!authUser?.email) return;
      try {
        const res = await fetch(
          `https://assignment-12-server-side-gilt.vercel.app/users/${authUser.email}`
        );
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [authUser]);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex flex-col h-screen bg-[#F7F8FA]">
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-[#34656D] text-white px-5 py-4 shadow-md">
        <h2 className="text-lg font-bold">
          {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl focus:outline-none"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed md:static z-50 top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="bg-[#34656D] text-white p-6 text-2xl font-bold flex items-center gap-3">
            <FaRegUser  className="text-xl" />
            {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </div>

          <nav className="p-6 space-y-2 overflow-y-auto h-[calc(100%-4rem)]">
            <ul className="space-y-2">
              {/* Common Links */}
              {[
                { path: "my-profile", icon: <FaRegUser  />, label: "My Profile" },
                { path: "add-post", icon: <MdOutlinePostAdd />, label: "Add Post" },
                { path: "my-post", icon: <LuArrowUpNarrowWide />, label: "My Posts" },
                { path: "membership", icon: <MdOutlineCardMembership />, label: "Membership" },
                { path: "/", icon: <IoHomeOutline />, label: "Home" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-[#B6AE9F]/20 text-[#B6AE9F] font-semibold shadow-sm border-l-4 border-[#B6AE9F]"
                        : "text-gray-700 hover:bg-[#B6AE9F]/10 hover:text-[#B6AE9F]"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="text-lg">{item.icon}</span> {item.label}
                  </Link>
                </li>
              ))}

              {/* Admin-only Links */}
              {user?.role === "admin" && (
                <>
                  <li>
                    <Link
                      to="manage-users"
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive("manage-users")
                          ? "bg-[#B6AE9F]/20 text-[#B6AE9F] font-semibold shadow-sm border-l-4 border-[#B6AE9F]"
                          : "text-gray-700 hover:bg-[#B6AE9F]/10 hover:text-[#B6AE9F]"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <FaUsers className="text-lg" /> Manage Users
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="reported-comments"
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive("reported-comments")
                          ? "bg-[#B6AE9F]/20 text-[#B6AE9F] font-semibold shadow-sm border-l-4 border-[#B6AE9F]"
                          : "text-gray-700 hover:bg-[#B6AE9F]/10 hover:text-[#B6AE9F]"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <FaFlag className="text-lg" /> Reported Comments
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="announcement"
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive("announcement")
                          ? "bg-[#B6AE9F]/20 text-[#B6AE9F] font-semibold shadow-sm border-l-4 border-[#B6AE9F]"
                          : "text-gray-700 hover:bg-[#B6AE9F]/10 hover:text-[#B6AE9F]"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <FaBullhorn className="text-lg" /> Announcement
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main Content with Animation */}
        <main className="flex-1 p-4 md:p-8 overflow-auto transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
             
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white/80 rounded-2xl p-5 md:p-8 min-h-full shadow-sm"
            >
              <Outlet /> {/* Active route content */}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
