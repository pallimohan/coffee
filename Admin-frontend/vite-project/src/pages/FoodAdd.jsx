import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FoodAdd = () => {
  const { token, API_URL, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    price: '',
    quantity: '',
    ingredients: '',
    speciality: '',
    description: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('category', formData.category);
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('quantity', formData.quantity);
    data.append('ingredients', JSON.stringify(formData.ingredients.split(',').map(i => i.trim())));
    data.append('speciality', formData.speciality);
    data.append('description', formData.description);
    if (image) {
      data.append('image', image);
    }

    try {
      const res = await fetch(`${API_URL}/food`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      if (res.ok) {
        const result = await res.json();
        alert(result.message);
        navigate('/food');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to add food item');
        if (res.status === 401) {
          logout();
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md border border-brown-800 max-w-md w-full">
        <h2 className="text-2xl font-bold text-brown-900 mb-4 text-center">Add Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="w-full px-4 py-2 border border-brown-800 rounded"/>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full px-4 py-2 border border-brown-800 rounded"/>
          <input type="number" name="price" placeholder="Price" onChange={handleChange} required className="w-full px-4 py-2 border border-brown-800 rounded"/>
          <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required className="w-full px-4 py-2 border border-brown-800 rounded"/>
          <input type="text" name="ingredients" placeholder="Ingredients (comma separated)" onChange={handleChange} required className="w-full px-4 py-2 border border-brown-800 rounded"/>
          <input type="text" name="speciality" placeholder="Speciality" onChange={handleChange} className="w-full px-4 py-2 border border-brown-800 rounded"/>
          <textarea name="description" placeholder="Description" rows="3" onChange={handleChange} className="w-full px-4 py-2 border border-brown-800 rounded"></textarea>
          <div>
            <label className="block text-brown-800 mb-1">Image</label>
            <input type="file" onChange={handleFileChange} className="w-full"/>
          </div>
          <button type="submit" className="w-full bg-brown-800 text-white py-2 rounded hover:bg-brown-700 transition">Add Food</button>
        </form>
      </div>
    </div>
  );
};

export default FoodAdd;
