import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p className="text-black">No order data found.</p>;
  }

  const { orderId, amount, paymentMode } = state;

  const handlePaymentSuccess = () => {
    alert("Payment successful!");
    navigate('/my-orders'); // redirect to orders
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl text-black mb-6 text-center">Payment</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
        <p className="text-black font-semibold">Order ID: {orderId}</p>
        <p className="text-black font-semibold">Amount: ${amount}</p>
        <p className="text-black font-semibold">Payment Mode: {paymentMode}</p>
        <button onClick={handlePaymentSuccess} className="w-full bg-brown-800 text-white py-2 rounded hover:bg-brown-700">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
