import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button, Badge, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, IconButton, Container } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import Swal from 'sweetalert2';
import { useSearch } from '../Context/Search';
import { useCart } from '../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons'; // Cart and Hamburger icon
import axios from 'axios';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();
  const { Search, setSearch } = useSearch();
  const [SearchVal, setSearchVal] = useState('');
  const [category, setCategory] = useState([]);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  
  // Toast for successful logout
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  // Handle logout
  const logout = () => {
    Toast.fire({
      icon: 'success',
      title: 'Logged out successfully'
    });
    navigate('/login');
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '' });
  };

  const handleSearch = () => {
    if (SearchVal === '') {
      Swal.fire('Please enter a search key', 'No-Value Search');
    } else {
      navigate(`/search/${Search}`);
    }
  };

  // Fetch categories for navigation
  useEffect(() => {
    categories();
  }, []);

  const categories = async () => {
    const res = await axios.get(`${process.env.SERVER_URL}/category/all`);
    setCategory(res.data.Category);
  };

  return (
    <>
      {/* Main Header */}
      <Box as="header" width="100%" bg="#1f3559" p={4}>
        <Container maxW="container.xl" display="flex" justifyContent="space-between" alignItems="center">
          {/* Logo and Title */}
          <Text fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }} color="white" fontWeight="bold">
            E-Commerce APP
          </Text>

          {/* Hamburger Menu for Mobile */}
          <IconButton
            display={{ base: 'block', md: 'none' }}
            color="white"
            onClick={onOpen}
            icon={<FontAwesomeIcon icon={faBars} />}
            aria-label="Menu"
          />

          {/* Search and Navigation */}
          <Box display={{ base: 'none', md: 'flex' }} justifyContent="center" alignItems="center" width="50%" flexDirection="row" gap={4}>
            {auth.token ? (
              <>
                {/* Search Bar */}
                <Box display="flex" width="100%" justifyContent="center">
                  <Input
                    type="search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSearchVal(e.target.value);
                    }}
                    color={'Black'}
                    placeholder="Search Products"
                    variant={'outline'}
                    className="searchBox"
                    width="80%"
                    mr={2}
                  />
                  <Button
                    onClick={handleSearch}
                    color={'white'}
                    bg="teal.600"
                    _hover={{ bg: 'teal.500' }}
                    width="20%"
                  >
                    Search
                  </Button>
                </Box>

                {/* Navigation buttons */}
                <Box display="flex" alignItems="center" gap={4}>
                  <NavLink to="/" style={{ color: 'white' }}>
                    <Button color="black">Home</Button>
                  </NavLink>

                  {auth.user?.role === 1 ? (
                    <NavLink to="/admin/dashboard" style={{ color: 'white' }}>
                      <Button color="black">Admin</Button>
                    </NavLink>
                  ) : (
                    <NavLink to="/user/dashboard" style={{ color: 'white' }}>
                      <Button color="black">User</Button>
                    </NavLink>
                  )}

                  <NavLink to="/login" style={{ color: 'white' }}>
                    <Button color="black" onClick={logout}>
                      Logout
                    </Button>
                  </NavLink>

                  <NavLink to="/cart" style={{ color: 'white' }}>
                    <FontAwesomeIcon color="green" icon={faShoppingCart} size="2x" />
                    <Badge ml={2} colorScheme="blue">{cart.length}</Badge>
                  </NavLink>
                </Box>
              </>
            ) : (
              <Box display="flex" alignItems="center" gap={4}>
                <NavLink to="/register" style={{ color: 'white' }}>
                  <Button color="inherit">Register</Button>
                </NavLink>
                <NavLink to="/login" style={{ color: 'white' }}>
                  <Button color="inherit">Login</Button>
                </NavLink>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Mobile Drawer/Slider */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={'gray.600'}>
          <DrawerCloseButton />
          <DrawerHeader color="white">Menu</DrawerHeader>

          <DrawerBody bg={'gray.600'}>
            {auth.token ? (
              <>
                <NavLink to="/" style={{ display: 'block', marginBottom: '10px' }}>
                  <Button color="black">Home</Button>
                </NavLink>
                {auth.user?.role === 1 ? (
                  <NavLink to="/admin/dashboard" style={{ display: 'block', marginBottom: '10px' }}>
                    <Button color="black">Admin</Button>
                  </NavLink>
                ) : (
                  <NavLink to="/user/dashboard" style={{ display: 'block', marginBottom: '10px' }}>
                    <Button color="black">User</Button>
                  </NavLink>
                )}
                <NavLink to="/login" style={{ display: 'block', marginBottom: '10px' }}>
                  <Button color="black" onClick={logout}>Logout</Button>
                </NavLink>

                <NavLink to="/cart" style={{ display: 'block', marginBottom: '10px' }}>
                  <FontAwesomeIcon color="green" icon={faShoppingCart} size="2x" />
                  <Badge ml={2} colorScheme="blue">{cart.length}</Badge>
                </NavLink>
              </>
            ) : (
              <Box>
                <NavLink to="/register" style={{ display: 'block', marginBottom: '10px' }}>
                  <Button color="black">Register</Button>
                </NavLink>
                <NavLink to="/login" style={{ display: 'block' }}>
                  <Button color="black">Login</Button>
                </NavLink>
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
