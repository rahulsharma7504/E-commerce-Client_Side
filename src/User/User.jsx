import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import {
  Box,
  Input,
  Button,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const User = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const toast = useToast();
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
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/user/profile`,
        { formData }
      );

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

      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  document.title = 'Profile';

  return (
    <Container maxW="md" py={8}>
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        User Profile
      </Heading>
      <Box as="form" onSubmit={handleSubmit} bg="white" p={6} rounded="md" shadow="md">
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>

          <FormControl id="email" isDisabled>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a new password"
            />
          </FormControl>

          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </FormControl>

          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" w="full">
            Update
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default User;
