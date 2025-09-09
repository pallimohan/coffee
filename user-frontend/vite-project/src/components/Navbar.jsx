import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../../public/vite.svg'; // Adjust the path if needed

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#1b1b1b] text-[#ffffff] px-6 py-4 shadow-md font-roboto">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <div className="text-2xl font-bold">
            <Link to="/">CoffeeShop</Link>
          </div>
        </div>

        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/menu" className="hover:text-gray-400">Menu</Link></li>
          <li><Link to="/chef" className="hover:text-gray-400">Chef</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-400">Gallery</Link></li>

          {token ? (
            <>
              <li><Link to="/items" className="hover:text-gray-400">Items List</Link></li>
              <li><Link to="/my-orders" className="hover:text-gray-400">My Orders</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-white text-[#1b1b1b] px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
              <li><Link to="/register" className="hover:text-gray-400">Register</Link></li>
            </>
          )}
        </ul>

        <div className="flex items-center space-x-2 md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="flex flex-col space-y-2 mt-4 md:hidden text-[#1b1b1b] bg-white rounded shadow-lg p-4">
          <li><Link to="/" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/menu" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Menu</Link></li>
          <li><Link to="/chef" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Chef</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Gallery</Link></li>

          {token ? (
            <>
              <li><Link to="/items" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Items List</Link></li>
              <li><Link to="/my-orders" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>My Orders</Link></li>
              <li>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="bg-[#1b1b1b] text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/register" className="hover:text-gray-600" onClick={() => setMenuOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
