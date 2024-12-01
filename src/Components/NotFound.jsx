import React from 'react';
import { Button, Heading, Text, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box textAlign="center" mt="50px">
      <Heading as="h1" size="4xl" mb={4}>
        404
      </Heading>
      <Heading as="h5" size="lg" mb={4}>
        Page Not Found
      </Heading>
      <Text fontSize="xl" mb={4}>
        The page you are looking for does not exist.
      </Text>
      <Button 
        colorScheme="blue" 
        variant="solid" 
        as={NavLink} 
        to="/login"
      >
        Go to Home Page
      </Button>
    </Box>
  );
};

export default NotFound;
