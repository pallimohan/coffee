import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Chef from './pages/Chef';
import Gallery from './pages/Gallery';
import Register from './pages/Register';
import Login from './pages/Login';

import ItemList from './pages/ItemList';
import PlaceOrder from './pages/PlaceOrder';
import Payment from './pages/Payment';
import MyOrders from './pages/MyOrders';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const { token } = useContext(AuthContext);  // ✅ using context

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />

        <Route path="/items" element={token ? <ItemList /> : <Navigate to="/login" />} />
        <Route path="/place-order" element={token ? <PlaceOrder /> : <Navigate to="/login" />} />
        <Route path="/payment" element={token ? <Payment /> : <Navigate to="/login" />} />
        <Route path="/my-orders" element={token ? <MyOrders /> : <Navigate to="/login" />} />

        <Route path="*" element={<div className="text-center text-brown-900 mt-10 text-2xl">Page Not Found</div>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
