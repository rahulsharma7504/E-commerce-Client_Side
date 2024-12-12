import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import Swal from 'sweetalert2';
import { Button, Box, Text, Image, Checkbox, Radio, VStack, HStack, SimpleGrid, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import Footer from './Footer';
import { Prices } from './Prices';
import axios from 'axios';
import image from './Banner.jpg';
import '../Styles/layout.css'

const Layout = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  useEffect(() => {
    getAllcategory();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      filterproducts();
    }
  }, [checked, radio, page]);

  const getAllcategory = async () => {
    try {
      const res = await axios.get('http://localhost:4000/category/all');
      setCategory(res.data.Category);
    } catch (error) {
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/product/all');
      if (res.status === 200 && res.data.Product.length > 0) {
        setProduct(res.data.Product);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterproducts = async () => {
    try {
      const res = await axios.post('http://localhost:4000/product/filter', { checked, radio });
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChecked = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      let index = all.indexOf(id);
      all.splice(index, 1);
    }
    setChecked(all);
  };

  const nextPage = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/product/pagination?page=${page + 1}`);
      if (res.data.data.length === 0) {
        setHasMoreProducts(false);
      } else {
        setProduct(res.data.data);
        setPage(page + 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleMore = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      <Box>
        <Image src={image} width="100%" height="250px" alt="Banner" objectFit="cover" borderBottomRadius="xl" />

        <Box p={4}>
          {/* Stack layout for filters on top and products below */}
          <HStack spacing={4} align="flex-start" direction={['column', 'row']} mb={8}>
            {/* Filters Section */}
            <Box width={['100%', '25%']} mb={[4, 0]} p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
              <Text fontSize="lg" fontWeight="bold" mb={4}>Filter by Category</Text>
              {category.map((item, index) => (
                <Checkbox key={index} value={item._id} my={2} mx={1} onChange={(e) => handleChecked(e.target.checked, item._id)}>
                  {item.name}
                </Checkbox>
              ))}
              <Divider my={4} />
              <Text fontSize="lg" fontWeight="bold" mb={4}>Filter by Price</Text>
              {Prices.map((item, index) => (
                <Radio key={index} my={2} value={item.array} onChange={(e) => setRadio([e.target.value])}>
                  {item.name}
                </Radio>
              ))}
              <Button colorScheme="green" mt={4} onClick={() => window.location.reload()}>Reset Filter</Button>
            </Box>

            {/* Products Section */}
            <Box width={['100%', '75%']} p={4}>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>All Products</Text>

              {/* Product grid (single column on mobile, multi-column on larger screens) */}
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                {product.map((item, index) => (
                  <Box
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    mb={4}
                    _hover={{ boxShadow: 'lg', transform: 'scale(1.05)', transition: 'transform 0.2s ease-in-out' }}
                    cursor="pointer"
                    bg="white"
                  >
                    <Image src={item.image} alt={item.name} width="100%" height="auto" borderRadius="md" />
                    <Text fontSize="lg" mt={2} isTruncated>{item.name}</Text>
                    <Text isTruncated>{item.description}</Text>
                    <Text fontWeight="bold">{item.price}</Text>
                    <Button
                      colorScheme="blue"
                      mt={2}
                      width="full"
                      onClick={() => {
                        setCart([...cart, item]);
                        localStorage.setItem('cart', JSON.stringify([...cart, item]));
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="link"
                      mx={2}
                      colorScheme="blue"
                      onClick={() => handleMore(item._id)}
                      mt={2}
                      style={{ color: 'crimson' }}
                    >
                      More..
                    </Button>
                  </Box>
                ))}
              </SimpleGrid>

              {/* Load More Button */}
              {hasMoreProducts ? (
                <Button colorScheme="teal" mt={4} onClick={nextPage} width="full">
                  Load More
                </Button>
              ) : (
                <Text mt={4} textAlign="center">No more products to show.</Text>
              )}
            </Box>
          </HStack>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Layout;
