import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { NavLink , useNavigate } from 'react-router-dom'

import axios from 'axios';

import '../Styles/register.css'
const RegisterForm = () => {
const navigate=useNavigate()


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  document.title='Register -E-Commerce'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Add your registration logic here
    const res=await axios.post('http://localhost:4000/user/register',{formData:formData});
    if(res.data){
      alert('User Registered successfully')
      navigate('/login');
      
    }
     
  };

  return (
    <Container maxWidth="sm" className="register-container">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Phone"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Address"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth className="register-button">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterForm;
