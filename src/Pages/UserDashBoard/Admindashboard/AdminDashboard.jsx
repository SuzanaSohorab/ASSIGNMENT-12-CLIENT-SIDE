// src/pages/AdminDashboard/AdminLayout.jsx
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
        <nav className="p-4 space-y-2">
          <Link to="admin-profile" className="block p-2 rounded hover:bg-gray-200">Profile</Link>
          <Link to="manage-users" className="block p-2 rounded hover:bg-gray-200">Manage Users</Link>
          <Link to="reports" className="block p-2 rounded hover:bg-gray-200">Reported Activities</Link>
          <Link to="announcement" className="block p-2 rounded hover:bg-gray-200">Make Announcement</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* ✅ nested routes render here */}
      </main>
    </div>
  );
}
