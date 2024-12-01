import React from 'react';
import { useAuth } from '../Context/Auth';
import { Box, Heading, Text, Card, CardBody, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';

const Allusers = () => {
  const { auth } = useAuth();
  const { user } = auth;

  // Adjust the number of columns based on the screen size
  const columns = useBreakpointValue({ base: 1, md: 2 });

  return (
    <>
      <Box p={5} bg="gray.50" borderRadius="md" boxShadow="md">
        <Heading as="h1" size="xl" mb={4}>All Users</Heading>

        {auth.user ? (
          <SimpleGrid columns={columns} spacing={5}>
            {/* Card for User 1 */}
            <Card>
              <CardBody>
                <Heading size="md">{user.name}</Heading>
                <Text mt={2}>Email: {user.email}</Text>
                <Text mt={2}>Role: {user.role === 1 ? 'Admin' : 'User'}</Text>
                {/* Add more user details here if needed */}
              </CardBody>
            </Card>

            {/* Card for another User or Placeholder */}
            <Card>
              <CardBody>
                <Heading size="md">Another User</Heading>
                <Text mt={2}>Email: example@example.com</Text>
                <Text mt={2}>Role: User</Text>
                {/* Add more user details here if needed */}
              </CardBody>
            </Card>
          </SimpleGrid>
        ) : (
          <Text>No user data available</Text>
        )}
      </Box>
    </>
  );
};

export default Allusers;
