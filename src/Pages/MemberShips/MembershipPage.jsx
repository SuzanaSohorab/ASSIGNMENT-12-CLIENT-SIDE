// src/Pages/Membership/MembershipPage.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export default function MembershipPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const membershipFee = 500; // Example: 500 taka

  const handlePayment = async () => {
    try {
      const confirmed = window.confirm(`Pay ${membershipFee} Taka to become Gold member?`);
      if (!confirmed) return;

      alert("Payment successful! You are now a Gold member.");
      navigate(`/dashboard/membership/payment/${user._id}`);
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full transform transition duration-500 hover:scale-105">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#34656D] mb-2">Become a Gold Member</h2>
          <p className="text-gray-600 mb-6">
            Unlock premium benefits: Post more than 5 posts and earn your Gold badge.
          </p>
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold mb-6">
            Membership Fee: {membershipFee} Taka
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-700 transition duration-300"
        >
          Pay & Become Gold Member
        </button>

        <p className="text-gray-500 text-sm mt-4 text-center">
          Safe and secure payment. No hidden charges.
        </p>
      </div>
    </div>
  );
}
