import { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Toggle role (Admin <-> User)
  const toggleRole = async (id, currentRole) => {
    try {
      const res = await fetch(`http://localhost:5000/users/toggle-role/${id}`, {
        method: "PUT",
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        // update UI instantly
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, role: data.role } : u
          )
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">Membership</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 capitalize">
                {user.role || "user"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => toggleRole(user._id, user.role)}
                  className={`px-3 py-1 rounded text-white ${
                    user.role === "admin"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                </button>
              </td>
                 
              <td className="border p-2">
                {user.membership === "normal" ? (
                  <span className="px-2 py-1 bg-yellow-400 text-white rounded">
                    🥇 Gold Member
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-orange-400 text-white rounded">
                    🥉 Bronze Member
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
