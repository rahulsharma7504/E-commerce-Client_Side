import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import { Grid, TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Styles/Dash.css';
import axios from 'axios';

const User = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Initialize form data with user data from auth
    if (auth.user) {
      setFormData({
        name: auth.user.name || '',
        email: auth.user.email || '',
        password: '',
        phone: auth.user.phone || '',
        address: auth.user.address || '',
      });
    }
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update user data in the database
      const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/profile`, { formData });

      if (res.data) {
        let user = JSON.parse(localStorage.getItem('auth'));
        user.user = res.data.user;
        localStorage.setItem('auth', JSON.stringify(user));
        setAuth({ ...auth, user: res.data.user });

        Swal.fire({
          title: 'Profile Updated',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);

      Swal.fire({
        title: 'Error',
        text: 'Failed to update profile. Please try again later.',
        icon: 'error',
        showConfirmButton: true,
      });
    }
  };

  document.title = 'Profile'
  return (
    <>
      <h1>User</h1>
      <Container maxWidth="sm" className="register-container">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              className='TextField'
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
              className='TextField'
                variant="outlined"
                label="Email"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              className='TextField'
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
              className='TextField'
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
              className='TextField'
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
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default User;
