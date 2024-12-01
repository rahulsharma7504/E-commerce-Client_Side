import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button, Badge, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, IconButton } from '@chakra-ui/react';
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
    const res = await axios.get('http://localhost:4000/category/all');
    setCategory(res.data.Category);
  };

  return (
    <>
      {/* Main Header */}
      <Box as="header" width="100%" bg="teal.500" p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
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

          {/* Desktop Search and Navigation */}
          <Box display={{ base: 'none', md: 'flex' }} alignItems="center" flexWrap="wrap" justifyContent="center">
            {auth.token ? (
              <>
                <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }} mb={{ base: 2, sm: 0 }}>
                  <Input
                    type="search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSearchVal(e.target.value);
                    }}
                    color={'Black'}
                    placeholder="Search Products"
                    variant={'dashed'}
                    className="searchBox"
                    mr={{ sm: 2 }}
                    mb={{ base: 1, sm: 0 }}
                  />
                  <Button className="searchButton" onClick={handleSearch} mb={{ base: 1, sm: 0 }} color={'blue'}>
                    Search
                  </Button>
                </Box>

                {/* Navigation buttons */}
                <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }} justifyContent="center">
                  <NavLink to="/" style={{ color: 'white' }} mb={{ base: 1, sm: 0 }}>
                    <Button color="black" mx={2}>Home</Button>
                  </NavLink>

                  {auth.user.role === 1 ? (
                    <NavLink to="/admin/dashboard" style={{ color: 'white' }} mb={{ base: 1, sm: 0 }}>
                      <Button color="black" mx={2}>Admin</Button>
                    </NavLink>
                  ) : (
                    <NavLink to="/user/dashboard" style={{ color: 'white' }} mb={{ base: 1, sm: 0 }}>
                      <Button color="black" mx={2}>User</Button>
                    </NavLink>
                  )}
                  <NavLink to="/login" style={{ color: 'white' }} mb={{ base: 1, sm: 0 }}>
                    <Button color="black" mx={2} onClick={logout}>
                      Logout
                    </Button>
                  </NavLink>

                  <NavLink to="/cart" mb={{ base: 1, sm: 0 }} style={{ color: 'white' }}>
                    <FontAwesomeIcon color="green" icon={faShoppingCart} size="2x" />
                    <Badge ml={2} colorScheme="blue">{cart.length}</Badge>
                  </NavLink>
                </Box>
              </>
            ) : (
              <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }}>
                <NavLink to="/register" style={{ color: 'white' }} mb={{ base: 1, sm: 0 }}>
                  <Button color="inherit">Register</Button>
                </NavLink>
                <NavLink to="/login" style={{ color: 'white' }} mb={{ base: 1, sm: 0 }}>
                  <Button color="inherit">Login</Button>
                </NavLink>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Mobile Drawer/Slider */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={'gray'}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody bg={'gray'}>
            {auth.token ? (
              <>
                <NavLink to="/" style={{ display: 'block', marginBottom: '10px' }}>
                  <Button color="black">Home</Button>
                </NavLink>
                {auth.user.role === 1 ? (
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
