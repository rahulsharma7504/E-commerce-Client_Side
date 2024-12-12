import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Cart icon
import { Button, Box, Image, Text, SimpleGrid, useToast } from '@chakra-ui/react';
import { useCart } from '../Context/CartContext';
import { useSearch } from '../Context/Search';
import '../Styles/search.css';
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
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/search/${search}`);
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
    <Box className="search-container">
      {Search.length === 0 ? (
        <Text fontSize="xl" textAlign="center" mt={8}>No result found</Text>
      ) : (
        <Box mt={8}>
          <Text className="search-result-heading">Search Results</Text>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {searchData.map((item, index) => (
              <Box key={index} className="search-item-card">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="search-item-image"
                  objectFit="cover"
                  boxSize="100%" // Ensures the image fills the container
                  height="200px" // You can adjust the height as needed
                />

                <Text className="search-item-name" isTruncated>
                  {item.name}
                </Text>
                <Text className="search-item-description" isTruncated>
                  {item.description.substring(0, 20)}
                </Text>
                <Text className="search-item-price">
                  {item.price}
                </Text>
                <Box className="search-item-actions">
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
    </Box>
  );
};

export default Search;
