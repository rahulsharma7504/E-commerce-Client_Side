import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../Context/Auth';
import { motion } from 'framer-motion';
import '../Styles/login.css'

const Login = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.SERVER_URL}/user/login`, { formData: formData });
      if (res.data) {
        Toast.fire({
          icon: 'success',
          title: 'Login Successful'
        });
        const { token, user } = res.data;
        setAuth({ ...auth, token, user });
        localStorage.setItem('auth', JSON.stringify(res.data, res.data.user.password = ''));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: 'error',
        title: 'Login Failed'
      });
    }
  };

  return (
    <div className="container my-5">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            <p className="mt-3 text-center">
              Don't have an account?{' '}
              <NavLink to="/register" className="text-primary">Register</NavLink>
            </p>
            <p className="text-center">
              Forgot Password?{' '}
              <NavLink to="/forget" className="text-primary">Forget Password</NavLink>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
