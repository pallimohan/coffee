import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [cart, setCart] = useState([]);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedType = localStorage.getItem('userType');
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedToken) setToken(savedToken);
    if (savedType) setUserType(savedType);
    if (savedCart) setCart(savedCart);
  }, []);

  const login = (newToken, type) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userType', type);
    setToken(newToken);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('cart');
    setToken(null);
    setUserType(null);
    setCart([]);
  };

  // Add item to cart
  const addToCart = (item) => {
    const existing = cart.find(i => i._id === item._id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map(i => i._id === item._id ? {...i, quantity: i.quantity + 1} : i);
    } else {
      updatedCart = [...cart, {...item, quantity: 1}];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(i => i._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update quantity
  const updateQuantity = (id, qty) => {
    const updatedCart = cart.map(i => i._id === id ? {...i, quantity: qty} : i);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, logout, API_URL, cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </AuthContext.Provider>
  );
};
