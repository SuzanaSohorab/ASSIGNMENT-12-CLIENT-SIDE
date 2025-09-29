// src/pages/AdminDashboard/Profile.jsx
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";


export default function AdminProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Role:</b> {user?.role}</p>
    </div>
  );
}
