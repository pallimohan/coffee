import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-brown-900 mb-4">Welcome to the Home Page</h1>
      <button
        onClick={logout}
        className="bg-brown-800 text-white px-4 py-2 rounded hover:bg-brown-700 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
