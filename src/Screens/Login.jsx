import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
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
    // Add your login logic here
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
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField style={{marginBottom:'5px'}}
          variant="outlined"
          label="Email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
        <TextField style={{marginBottom:'5px'}}
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className="login-button">
          Login
        </Button>
        <Typography variant="body2" align="center" gutterBottom>
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </Typography>
        <Typography variant="body2" align="center" gutterBottom>
          Forgot Password? <NavLink to="/forget">Forget Password</NavLink>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
