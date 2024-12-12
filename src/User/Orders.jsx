import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react';

const Orders = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBooking();
  }, []);

  const getAllBooking = async () => {
    try {
      const res = await axios.get(`${process.env.SERVER_URL}/user/bookings`);
      setBookings(res.data.Bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <>
      <Box maxW="1200px" mx="auto" p={4}>
        <h3>User Orders</h3>
        <Table variant="simple" size="sm" width="100%" overflowX="auto">
          <TableCaption>User orders and booking details</TableCaption>
          <Thead>
            <Tr>
              <Th>Order Id</Th>
              <Th>Product Name</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map((booking) => (
              <Tr key={booking._id}>
                <Td>{booking._id}</Td>
                <Td>{booking.Products.map((name) => name.ProductName + ' |')}</Td>
                <Td>{booking.Products.length}</Td>
                <Td>${booking.Amount}</Td>
                <Td>{booking.Status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Orders;
