import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Cart icon
import { Button, Box, Image, Text, SimpleGrid, useToast } from '@chakra-ui/react';
import { useCart } from '../Context/CartContext';
import { useSearch } from '../Context/Search';
const Search = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();  
  const { Search, setSearch } = useSearch();
  const { search } = useParams();
  const [searchData, setSearchData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (Search) {
      getSearchData();
    }
  }, [Search]);

  const getSearchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/product/search/${search}`);
      if (res.data) {
        setSearchData(res.data.data);
      }
    } catch (error) {
      toast({
        title: 'Error fetching data',
        description: 'There was an error fetching search results.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleMore = (id) => {
    navigate(`/details/${id}`);
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    localStorage.setItem('cart', JSON.stringify([...cart, item]));
    toast({
      title: 'Item added to cart',
      description: `${item.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      {Search.length === 0 ? (
        <Text fontSize="xl" textAlign="center" mt={8}>No result found</Text>
      ) : (
        <Box mt={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">Search Results</Text>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {searchData.map((item, index) => (
              <Box
                key={index}
                borderWidth="2px"
                borderRadius="md"
                overflow="hidden"
                p={4}
                bg="white"
                boxShadow="sm"
              >
                <Image src={item.image} alt={item.name} boxSize="100%" objectFit="cover" />
                <Text fontSize="lg" fontWeight="bold" mt={4} isTruncated>
                  {item.name}
                </Text>
                <Text fontSize="sm" color="gray.600" isTruncated>
                  {item.description.substring(0, 20)}
                </Text>
                <Text fontSize="md" color="green.500" fontWeight="semibold" mt={2}>
                  {/* ${item.price} */}
                </Text>
                <Box display="flex" justifyContent="space-between" mt={4}>
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                  <Button 
                    colorScheme="teal"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="link" colorScheme="blue" onClick={() => handleMore(item._id)}>
                    More...
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default Search;
