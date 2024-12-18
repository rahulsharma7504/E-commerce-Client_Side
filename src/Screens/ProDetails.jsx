import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import {
  Box, Button, Container, Grid, GridItem, Image, Text, VStack, useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import '../Styles/product.css'; // Import external CSS for custom styling

const ProDetails = () => {
  const { cart, setCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/single/${id}`);
    setProduct(res.data.product);
    similarProduct(res.data.product._id, res.data.product.category);
  };

  const similarProduct = async (pid, cid) => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/similar/${pid}/${cid}`);
    if (res.data.similarProducts) {
      setSimilar(res.data.similarProducts);
    }
  };

  const handleSimilar = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <Container maxW="7xl" p={4} className="product-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
          <GridItem className="product-image">
            <Image
              src={product.image}
              alt={product.name}
            />
          </GridItem>
          <GridItem className="product-info">
            <VStack align="stretch" spacing={4}>
              <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
              <Text fontSize="xl" className="product-price">Price: ${product.price}</Text>
              <Text fontSize="md">
                Shipping: <strong>{product.shipping ? 'Available' : 'Unavailable'}</strong>
              </Text>
              <Text fontSize="md">
                Quantity: <strong>{product.quantity}</strong>
              </Text>
              <Text fontSize="md" fontWeight="semibold">DESCRIPTION</Text>
              <Text fontSize="md">{product.description}</Text>

              <Text fontSize="md" fontWeight="semibold" mt={4}>AVAILABLE COLORS</Text>
              <Box display="flex" gap={2}>
                <Box width="30px" height="30px" bg="red.500" borderRadius="full" />
                <Box width="30px" height="30px" bg="green.500" borderRadius="full" />
                <Box width="30px" height="30px" bg="black" borderRadius="full" />
                <Box width="30px" height="30px" bg="white" borderRadius="full" />
              </Box>

              <Button
                colorScheme="teal"
                size="lg"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem('cart', JSON.stringify([...cart, product]));
                }}
                mt={4}
                className="add-to-cart-btn"
              >
                Add to Cart
              </Button>
            </VStack>
          </GridItem>
        </Grid>

        <Box mt={8} className="similar-products">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Similar Products</Text>
          <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {similar.map((item) => (
              <GridItem key={item._id} p={4} border="1px" borderColor="gray.200" borderRadius="md" className="similar-item">
                <Image
                  src={item.image}
                  alt={item.name}
                  objectFit="cover"
                  boxSize="100%"
                  borderRadius="md"
                />
                <Text mt={2} fontWeight="semibold">{item.name}</Text>
                <Text mt={1}>Price: {item.price}</Text>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleSimilar(item._id)}
                  mt={2}
                  className="view-details-btn"
                >
                  View Details
                </Button>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ProDetails;
