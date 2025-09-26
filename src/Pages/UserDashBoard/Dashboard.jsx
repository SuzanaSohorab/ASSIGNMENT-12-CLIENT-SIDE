import { Link, Outlet } from "react-router"; // <-- make sure this is from react-router-dom, not react-router
import Navbar from "../../Components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar></Navbar>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
     
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-xl font-bold border-b">User Dashboard</div>
        <nav className="p-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="my-profile"
                className="block p-2 rounded hover:bg-gray-200"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="add-post"
                className="block p-2 rounded hover:bg-gray-200"
              >
                Add Post
              </Link>
            </li>
            <li>
              <Link
                to="my-post"
                className="block p-2 rounded hover:bg-gray-200"
              >
                My Posts
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />  {/* 👈 only the active route will render here */}
      </main>
    </div>
    </div>
  );
}
