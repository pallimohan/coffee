import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Employes from './pages/Employes';
import EmployesAdd from './pages/EmployesAdd';
import Food from './pages/Food';
import FoodAdd from './pages/FoodAdd';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import { AuthContext } from './context/AuthContext';
import Orders from './pages/Orders';

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
      <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
      <Route path="/employes" element={token ? <Employes /> : <Navigate to="/" />} />
      <Route path="/employee/add" element={token ? <EmployesAdd /> : <Navigate to="/" />} />
      <Route path="/food" element={token ? <Food /> : <Navigate to="/" />} />
      <Route path="/food/add" element={token ? <FoodAdd /> : <Navigate to="/" />} />
      <Route path="/orders" element={token ? <Orders /> : <Navigate to="/" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
};

export default App;
