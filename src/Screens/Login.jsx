import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../Context/Auth';
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

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
      const res = await axios.post('http://localhost:4000/user/login', { formData: formData });
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
    <Container maxW="lg" p={4} centerContent>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box bg="white" p={8} boxShadow="lg" borderRadius="md" width="full">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
            Login
          </Text>
          
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  focusBorderColor="teal.500"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  focusBorderColor="teal.500"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                _hover={{ bg: 'teal.600' }}
              >
                Login
              </Button>
            </VStack>
          </form>

          <Text fontSize="sm" textAlign="center" mt={4}>
            Don't have an account?{' '}
            <NavLink to="/register" style={{ color: '#3182ce' }}>
              Register
            </NavLink>
          </Text>
          <Text fontSize="sm" textAlign="center">
            Forgot Password?{' '}
            <NavLink to="/forget" style={{ color: '#3182ce' }}>
              Forget Password
            </NavLink>
          </Text>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Login;
