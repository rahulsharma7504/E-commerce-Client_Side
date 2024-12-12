import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Container, Text, useBreakpointValue } from '@chakra-ui/react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPass = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract token from the query parameters in the URL
    const urlSearchParams = new URLSearchParams(location.search);
    const token = urlSearchParams.get('token');

    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/reset_pass?token=${token}`, { password: pass });
      if (res.data) {
        Swal.fire({
          icon: 'success',
          title: 'Your password has been updated successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: error.response ? error.response.data.message : 'Please try again later.',
      });
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
        <Text textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>
          Reset Password
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="password">New password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your new password"
            />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="100%" mb={4}>
            Reset Password
          </Button>
        </form>
        <Text textAlign="center">
          Remember your password?{' '}
          <NavLink to="/login" style={{ color: '#319795', fontWeight: 'bold' }}>
            Login
          </NavLink>
        </Text>
      </Box>
    </Container>
  );
};

export default ResetPass;
