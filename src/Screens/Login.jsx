import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import '../Styles/login.css'; // Import CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log(formData);
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
        <TextField
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
      </form>
    </Container>
  );
};

export default Login;
