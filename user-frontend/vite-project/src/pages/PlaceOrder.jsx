import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cart, token, API_URL, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('cash');

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!address.trim()) return alert("Please enter your address.");

    try {
      if (paymentMode === 'cash') {
        const res = await fetch(`${API_URL}/orders`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            items: cart,
            totalCost: totalAmount,
            paymentMode,
            userAddress: { fullAddress: address }
          })
        });
        const data = await res.json();
        if (res.ok) {
          alert("Order placed successfully (Cash on Delivery).");
          navigate('/my-orders');
        } else {
          alert(data.message || "Failed to place order.");  
          if (res.status === 401) logout();
        


        }
      } else {
        const res = await fetch(`${API_URL}/orders`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            items: cart,
            totalCost: totalAmount,
            paymentMode,
            userAddress: { fullAddress: address }
          })
        });
        const data = await res.json();
        if (!res.ok) return alert(data.message || "Failed to initiate payment.");

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "CoffeeShop",
          description: "Order Payment",
          order_id: data.orderId,
          handler: async function (response) {
            const confirmRes = await fetch(`${API_URL}/orders/confirm`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                items: cart,
                totalCost: totalAmount,
                paymentMode,
                userAddress: { fullAddress: address },
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const confirmData = await confirmRes.json();
            if (confirmRes.ok) {
              alert("Payment successful! Order placed.");
              navigate('/myorders');
            } else {
              alert(confirmData.message || "Payment verification failed.");
            }
          },
          theme: { color: "#2a4a46" }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4">
      <h1 className="text-4xl font-bold text-[#2a4a46] mb-10 text-center">Place Your Order</h1>
      
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty. Add some delicious coffee to proceed!</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
          
          <div>
            {cart.map(item => (
              <div key={item._id} className="flex justify-between items-center py-3 border-b last:border-0">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.name} x {item.quantity}</p>
                </div>
                <div className="text-lg font-semibold text-[#2a4a46]">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-[#2a4a46]">Total: ${totalAmount.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <textarea 
              placeholder="Enter your full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a4a46]"
              rows={4}
            />

            <select 
              value={paymentMode} 
              onChange={(e) => setPaymentMode(e.target.value)} 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a4a46]"
            >
              <option value="cash">Cash on Delivery</option>
              <option value="upi">UPI Payment</option>
              <option value="card">Card Payment</option>
            </select>

            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-[#2a4a46] text-white py-3 rounded-lg hover:bg-[#1f3b36] transition-all duration-300 font-semibold"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
