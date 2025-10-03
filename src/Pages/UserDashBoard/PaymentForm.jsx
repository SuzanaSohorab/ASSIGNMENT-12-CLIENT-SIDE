import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
 // ধরে নিচ্ছি তুমি auth context বানিয়েছো

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const { paymentId } = useParams();
  const axiosSecure = useAxiosSecure();
   const { user } = useContext(AuthContext); // logged in user email

  // ✅ Payment Info Load
  const { data: paymentInfo = {} } = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${paymentId}`);
      return res.data;
    },
  });

  console.log(paymentInfo);

  // ✅ Handle Payment Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    try {
      // 1️⃣ Create PaymentIntent from backend
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: 5000, // dynamic -> paymentInfo.amount
        currency: "usd",
      });

      const clientSecret = res.data.clientSecret;

      // 2️⃣ Confirm Payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: { email: user?.email || "guest@example.com" },
          },
        }
      );

      if (error) {
        setError(error.message || "Payment failed");
      } else if (paymentIntent.status === "succeeded") {
        setError("");
        alert("✅ Payment successful!");

        // 3️⃣ Update membership in DB
        await axiosSecure.post(`/payment/success`, {
          email: user?.email,
          membership: "premium",
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-semibold transition"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
