import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Orders = () => {
  const { token, API_URL, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
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

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PATCH', // ✅ PATCH instead of PUT
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        alert("Order status updated.");
        fetchOrders();
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert("Order deleted.");
        fetchOrders();
      } else {
        alert("Failed to delete order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl text-brown-900 text-center mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-brown-800">No orders found.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{order.userName}</h2>
                <button onClick={() => handleDelete(order._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <p><strong>Address:</strong> {order.userAddress.fullAddress}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.userAddress.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-800"
                  title="View on Google Maps"
                >
                  <FaMapMarkerAlt size={20} />
                </a>
              </div>
              <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
              <p><strong>Total Cost:</strong> ${order.totalCost}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <div className="mt-2 space-x-2">
                {["pending", "order placed", "on delivery", "delivered"].map(statusOption => (
                  <button key={statusOption}
                    onClick={() => handleStatusChange(order._id, statusOption)}
                    className={`px-3 py-1 rounded ${order.status === statusOption ? 'bg-brown-800 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}>
                    {statusOption}
                  </button>
                ))}
              </div>
              <div className="mt-2">
                <strong>Items:</strong>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
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

export default Orders;
