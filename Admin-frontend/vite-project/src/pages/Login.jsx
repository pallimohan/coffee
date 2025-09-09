import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, API_URL } = useContext(AuthContext); // Access API_URL globally
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, password: password })
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        navigate('/home');
      } else {
        // alert("Invalid credentials");
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full border border-brown-800">
        <h2 className="text-2xl font-bold text-brown-900 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-brown-800 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-brown-800 rounded focus:outline-none focus:ring-2 focus:ring-brown-600"
            />
          </div>
          <div>
            <label className="block text-brown-800 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-brown-800 rounded focus:outline-none focus:ring-2 focus:ring-brown-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brown-800 text-white py-2 rounded hover:bg-brown-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
