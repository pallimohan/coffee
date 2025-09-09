import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Food = () => {
  const { token, API_URL, logout } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const res = await fetch(`${API_URL}/food`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
       
        setFoods(data);
      } else {
        alert("Failed to fetch foods.");
        if (res.status === 401) {
          logout();
        }
      }
    } catch (error) {
      console.error("Error fetching food:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;
    try {
      const res = await fetch(`${API_URL}/food/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert("Food item deleted.");
        fetchFoods();
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFoods();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl text-brown-900 text-center mb-4">Food Items</h1>
      {foods.length === 0 ? (
        <p className="text-center text-brown-800">No food items found.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {foods.map(food => (
            <div key={food._id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
               {food.image && (
  <img
    src={`https://coffee-backend-delta.vercel.app/${food.image}`}
    alt={food.name}
    className="w-24 h-24 object-cover rounded"
  />
)}
                {console.log(API_URL+""+food.image)}
                <div>
                  <h2 className="text-lg font-semibold">{food.name}</h2>
                  <p>Category: {food.category}</p>
                  <p>Price: ${food.price}</p>
                  <p>Quantity: {food.quantity}</p>
                  <p>Ingredients: {food.ingredients.join(', ')}</p>
                  {food.speciality && <p>Speciality: {food.speciality}</p>}
                  {food.description && <p>Description: {food.description}</p>}
                </div>
              </div>
              <button
                onClick={() => handleDelete(food._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Food;
