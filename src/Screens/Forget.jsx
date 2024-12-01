import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Box, Button, FormControl, FormLabel, Input, Text, Container, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';

const Forget = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/user/forget', { email });
      console.log(res.data);
      Swal.fire({
        title: 'Success!',
        text: 'Please check your email to reset your password',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
    } catch (error) {
      console.error('Error:', error.response.data.error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.error,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  return (
    <Container maxW="lg" p={6} centerContent>
      <Box bg="white" p={8} boxShadow="lg" borderRadius="md" width="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">Forget Password</Text>

        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="teal.500"
              mb={4}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            mb={4}
            isLoading={false}
            loadingText="Submitting"
            _hover={{ bg: 'teal.600' }}
          >
            Reset Password
          </Button>
        </form>

        <Text fontSize="sm" textAlign="center">
          Remember your password?{' '}
          <NavLink to="/login" style={{ color: '#3182ce' }}>
            Login
          </NavLink>
        </Text>
      </Box>
    </Container>
  );
};

export default Forget;
