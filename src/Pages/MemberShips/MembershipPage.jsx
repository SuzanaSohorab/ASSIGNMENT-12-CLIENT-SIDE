// src/Pages/Membership/MembershipPage.jsx
import { useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export default function MembershipPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const membershipFee = 500; // Example: 500 taka

  const handlePayment = async () => {
    try {
      // Simulate payment process
      const confirmed = window.confirm(`Pay ${membershipFee} Taka to become Gold member?`);
      if (!confirmed) return;

      // Update user membership status in backend
      await axios.put(`http://localhost:5000/users/membership/${user.email}`, {
        membership: "Gold",
      });

      // Update user in context (so UI updates immediately)
      setUser({ ...user, membership: "Gold" });

      alert("Payment successful! You are now a Gold member.");
      navigate("/"); // redirect to homepage or dashboard
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Become a Gold Member</h2>
      <p className="mb-4">
        As a Gold member, you can post more than 5 posts and get the Gold badge.
      </p>
      <p className="mb-4">Membership Fee: <strong>{membershipFee} Taka</strong></p>
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Pay & Become Gold Member
      </button>
    </div>
  );
}
