import React, { useState } from 'react';
import '../Styles/login.css'; // Import CSS file
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../Context/Auth';
import Swal from 'sweetalert2'


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
  const navigate = useNavigate()
  const [tokenData, setTokenData] = useState('')
  const [user, setuser] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/user/login', { formData: formData });
      if (res.data) {
        Toast.fire({
          icon:'success',
          title: 'Login Successful'
        })
        const { token, user } = res.data
        setAuth({ ...auth, token, user });
        localStorage.setItem('auth', JSON.stringify(res.data,res.data.user.password=''))
        navigate('/');
       
  
      }
      
    } catch (error) {
      console.log(error)
      Toast.fire({
        icon:'error',
        title: 'Login Failed'
      })
      
    }
    // Add your login logic here
   
  };

  return (
    <div class="login-container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <h4 class="login-title">Login</h4>
        <form class="login-form" onSubmit={handleSubmit}>
          <div class="form-group">
            <input type="email" class="form-control login-input" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div class="form-group">
            <input type="password" class="form-control login-input" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-login">Login</button>
          </div>
          <p class="text-center mb-3 login-links">Don't have an account? <NavLink to="/register">Register</NavLink></p>
          <p class="text-center login-links">Forgot Password? <NavLink to="/forget">Forget Password</NavLink></p>
        </form>
        
      </div>
    </div>
  </div>
  
  );
};

export default Login;
