import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Container, Text, useBreakpointValue } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  document.title = 'Register - E-Commerce';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.address) {
      alert('All fields are required');
      return;
    }

    // Add your registration logic here
    const res = await axios.post('http://localhost:4000/user/register', { formData });
    if (res.data) {
      alert('User Registered successfully');
      navigate('/login');
    }
  };

  return (
    <Container maxW="lg" py={8}>
      <Box
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        bg="white"
        width="100%"
        maxWidth="500px"
        mx="auto"
      >
        <Text textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>Register</Text>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </FormControl>

          <Button colorScheme="teal" type="submit" width="100%" mb={4}>
            Register
          </Button>
        </form>

        <Text textAlign="center">
          Already have an account?{' '}
          <NavLink to="/login" style={{ color: '#319795', fontWeight: 'bold' }}>
            Login Here
          </NavLink>
        </Text>
        <Text textAlign="center">
          Forgot Password?{' '}
          <NavLink to="/forget" style={{ color: '#319795', fontWeight: 'bold' }}>
            Forget Password
          </NavLink>
        </Text>
      </Box>
    </Container>
  );
};

export default RegisterForm;
