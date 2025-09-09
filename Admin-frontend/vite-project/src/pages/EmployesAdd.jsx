import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployesAdd = () => {
  const { token, API_URL, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    dateOfJoin: '',
    salary: '',
    type: 'waiter'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        navigate('/employes'); // Redirect to employee list after adding
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to add employee.");
        if (res.status === 401) {
          logout(); // Logout if unauthorized
        }
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md border border-brown-800 max-w-md w-full">
        <h2 className="text-2xl font-bold text-brown-900 mb-4 text-center">Add Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-brown-800 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-brown-800 rounded focus:outline-none focus:ring-2 focus:ring-brown-600"
            />
          </div>
          <div>
            <label className="block text-brown-800 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-brown-800 rounded focus:outline-none focus:ring-2 focus:ring-brown-600"
            />
          </div>
          <div>
            <label className="block text-brown-800 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-brown-800 rounded focus:outline-none focus:ring-2 focus:ring-brown-600"
            />
          </div>
          <div>
            <label className="block text-brown-800 mb-1">Date of Join</label>
            <input
              type="date"
              name="dateOfJoin"
              value={formData.dateOfJoin}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-brown-800 rounded focus:outline-none focus:ring-2 focus:ring-brown-600"
            />
          </div>
          <div>
            <label className="block text-brown-800 mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-brown-800 rounded focus:outline-none focus:ring-2 focus:ring-brown-600"
            />
          </div>
          <div>
            <label className="block text-brown-800 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-brown-800 rounded focus:outline-none focus:ring-2 focus:ring-brown-600"
            >
              <option value="waiter">Waiter</option>
              <option value="chef">Chef</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-brown-800 text-white py-2 rounded hover:bg-brown-700 transition duration-200"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployesAdd;