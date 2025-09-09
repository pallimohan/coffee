import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className=" text-white p-4 flex justify-between items-center bg-amber-950">
      <div className="flex space-x-4">
        <Link to="/home" className="hover:underline ">Home</Link>
        <Link to="/employes" className="hover:underline">Employees</Link>
        <Link to="/food" className="hover:underline">Food</Link>
        <Link to="/food/add" className="hover:underline">Add Food</Link>
        <Link to="/employee/add" className="hover:underline">Add Employee</Link>
        <Link to='/orders' className="hover:underline">orders</Link>
      </div>
      <div>
        {token ? (
          <button
            onClick={logout}
            className="bg-white text-amber-950 px-3 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        ) : (
          <Link to="/" className="hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
