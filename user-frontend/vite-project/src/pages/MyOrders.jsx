import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MyOrders = () => {
  const { token, API_URL, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/myorders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        alert("Failed to fetch orders.");
        if (res.status === 401) logout();
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-bold text-[#2a4a46] mb-8 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">You have not placed any orders yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Order ID: <span className="text-[#2a4a46]">{order._id}</span></h2>
                <span className={`px-3 py-1 rounded-full text-white font-semibold ${
                  order.status === 'pending' ? 'bg-yellow-500' :
                  order.status === 'order placed' ? 'bg-blue-500' :
                  order.status === 'on delivery' ? 'bg-orange-500' :
                  'bg-green-500'
                }`}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-gray-700">
                <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
                <p><strong>Total Cost:</strong> ${order.totalCost.toFixed(2)}</p>
                <p><strong>Address:</strong> {order.userAddress?.fullAddress || "Not available"}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-[#2a4a46]">Items Ordered:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {order.items.map(item => (
                    <li key={item._id}>
                      {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
