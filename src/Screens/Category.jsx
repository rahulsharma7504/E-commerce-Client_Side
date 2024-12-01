import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { Button, Box, Text, Image, Stack, Tooltip, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ArrowBackIcon} from '@chakra-ui/icons';

const Category = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [Products, setProducts] = useState([]);
  
  useEffect(() => {
    getAllProducts();
  }, [id]);

  const getAllProducts = async () => {
    const res = await axios(`http://localhost:4000/product/category/${id}`);
    setProducts(res.data.data);
  };

  const handleMore = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Category: {name}</Text>
      <Text fontSize="lg" color="gray.600" mb={6}>Total: {Products.length}</Text>

      <Box display="grid" gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }} gap={6}>
        {Products.map((item, index) => (
          <Box
            key={index}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p={4}
            bg="white"
            _hover={{ boxShadow: 'lg' }}
          >
            <Image src={item.image} alt={item.name} w="full" h="auto" objectFit="cover" borderRadius="lg" mb={4} />
            <Stack spacing={3}>
              <Text fontSize="lg" fontWeight="bold" noOfLines={1}>{item.name}</Text>
              <Text color="gray.500" noOfLines={2}>{item.description}</Text>
              <Text fontWeight="semibold" fontSize="xl">${item.price}</Text>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Tooltip label="Add to Cart" aria-label="Add to Cart Tooltip">
                  <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={() => {
                      setCart([...cart, item]);
                      localStorage.setItem('cart', JSON.stringify([...cart, item]));
                    }}
                    colorScheme="teal"
                    variant="outline"
                    aria-label="Add to Cart"
                  />
                </Tooltip>

                <Button colorScheme="blue" variant="outline" onClick={() => handleMore(item._id)}>More..</Button>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Category;
