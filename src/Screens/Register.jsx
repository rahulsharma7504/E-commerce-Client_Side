import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

import '../Styles/register.css'
const RegisterForm = () => {
  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  document.title = 'Register -E-Commerce'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData){
      if(!formData.name){
        alert('Name is required')
        return
      }
      if(!formData.email){
        alert('Email is required')
        return
      }
      if(!formData.password){
        alert('Password is required')
        return
      }
      if(!formData.phone){
        alert('Phone is required')
        return
      }
      if(!formData.address){
        alert('Address is required')
        return
      }
    }
    // Add your registration logic here
    const res = await axios.post('http://localhost:4000/user/register', { formData: formData });
    if (res.data) {
      alert('User Registered successfully')
      navigate('/login');

    }

  };

  return (
    <div class="background-animation">
  <div class="register-container">
    <div class="register-container">
      <div class="row justify-content-center">
        <div class="col-12">
          <h4 class="register-title text-center mb-4">Register</h4>
          <form class="register-form" onSubmit={handleSubmit}>
            <div class="form-group">
              <input type="text" class="form-control register-input" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div class="form-group">
              <input type="email" class="form-control register-input" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div class="form-group">
              <input type="password" class="form-control register-input" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div class="form-group">
              <input type="text" class="form-control register-input" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div class="form-group">
              <input type="text" class="form-control register-input" placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-register btn-block">Register</button>
            </div>
            <p class="text-center mb-3 login-links">Already have an account? <NavLink to="/login">Login Here</NavLink></p>
            <p class="text-center login-links">Forgot Password? <NavLink to="/forget">Forget Password</NavLink></p>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>

  );
};

export default RegisterForm;
