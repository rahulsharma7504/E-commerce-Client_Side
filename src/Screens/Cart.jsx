import React from 'react';
import { useAuth } from '../Context/Auth';
import { useCart } from '../Context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Stack, Text, Button, Image } from '@chakra-ui/react';
import Footer from '../Components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { auth } = useAuth();

  const removeItem = (id, index) => {
    if (cart.length) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    }
  };

  const handlePayment = async () => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    try {
      const orderResponse = await axios.post('http://localhost:4000/product/create-order', {
        amount: totalPrice * 100,
        currency: 'INR',
      });

      const options = {
        key: 'rzp_test_VntZm15bTqdhSc',
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'R.Sharma Production',
        order_id: orderResponse.data.id,
        description: 'Test Transaction',
        handler: async function (response) {
          try {
            await axios.post('http://localhost:4000/product/payment-verify', {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              cart: cart,
              userID: auth.user._id,
              totalPrice: totalPrice,
              currency: 'INR',
              status: 'Booked',
            });
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          } catch (error) {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: auth.user.name,
          email: auth.user.email,
          contact: auth.user.phone,
        },
        theme: {
          color: 'red',
        },
      };

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error('Razorpay is not available in this environment.');
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <>
      <Text textAlign="center" fontSize="2xl" fontWeight="bold">{auth.user.name}</Text>
      <Box maxW="1200px" mx="auto" p={4}>
        <Grid templateColumns={{ base: '1fr', md: '3fr 2fr' }} gap={6}>
          {/* Cart Items Section */}
          <Box>
            <Text fontSize="xl" fontWeight="bold">Cart Items</Text>
            {cart.length === 0 ? (
              <Text>Your cart is empty</Text>
            ) : (
              cart.map((item, index) => (
                <Box key={item._id} border="1px" borderRadius="md" mb={4} p={4}>
                  <Grid templateColumns="3fr 1fr" gap={4}>
                    <Box>
                      <Image src={item.image} alt={item.name} maxH="100px" objectFit="contain" />
                    </Box>
                    <Box>
                      <Text fontSize="lg">{item.name.substring(0, 25)}...</Text>
                      <Text fontSize="md" color="gray.500">Price: ${item.price}</Text>
                      <Text fontSize="sm">{item.description.length > 40 ? `${item.description.substring(0, 40)}...` : item.description}</Text>
                      <Button colorScheme="red" mt={2} onClick={() => removeItem(item._id, index)}>
                        Remove Item
                      </Button>
                    </Box>
                  </Grid>
                </Box>
              ))
            )}
          </Box>

          {/* Order Summary Section */}
          <Box border="1px" borderRadius="md" p={4}>
            <Text fontSize="xl" fontWeight="bold">Order Summary</Text>
            <Text>Total Items: {cart.length}</Text>
            <Text fontSize="xl" fontWeight="bold">Total Price: ${cart.reduce((sum, item) => sum + item.price, 0)}</Text>
            <Button colorScheme="green" mt={4} onClick={handlePayment}>
              Checkout
            </Button>
          </Box>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Cart;
