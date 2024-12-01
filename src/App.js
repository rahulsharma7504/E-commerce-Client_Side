import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Routes, Navigate } from 'react-router-dom';
import NotFound from './Components/NotFound';
import Layout from './Components/Layout';
import About from './Screens/About';
import Header from './Components/Header';
import Register from './Screens/Register';
import Login from './Screens/Login';
import { useAuth } from './Context/Auth';
import DashBoard from './Admin/AdminDashboard';
import Forget from './Screens/Forget';
import ResetPass from './Screens/ResetPass';
import AdminDashboard from './Admin/AdminDashboard';
import CreateCategory from './Admin/CreateCategory';
import CreateProduct from './Admin/CreateProduct';
import Allusers from './Admin/Allusers';
import Dashboard from './User/Dashboard';
import UpdatePro from './Admin/UpdatePro';
import Search from './Screens/Search';
import ProDetails from './Screens/ProDetails';
import Category from './Screens/Category';
import Cart from './Screens/Cart';
import { CategoryProvider } from './Context/CategoryContext';
function App() {
  const { auth, setAuth } = useAuth();

  return (
    <>
      <Router>
        <CategoryProvider>
        <Header />
        <Routes>
          {auth.token ? (
            <>
              <Route path="/" element={<Layout />} />
              <Route path="/search/:search" element={<Search />} />
              <Route path="/details/:id" element={<ProDetails />} />
              <Route path="/user/dashboard" element={<Dashboard />} />
              <Route path="/categories/:id/:name" element={<Category/>} />
              <Route path="/cart" element={<Cart/>} />


              {auth.user.role === 1 ? (
                <>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/dashboard/update/:id" element={<UpdatePro />} />
                  
                </>
              ) : null}
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/forget" element={<Forget />} />
              <Route path="/reset_pass" element={<ResetPass />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </CategoryProvider>
      </Router>

    </>
  );
}

export default App;