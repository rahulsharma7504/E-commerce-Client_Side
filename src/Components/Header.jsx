import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem, Button, Box, IconButton, Select } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import Swal from 'sweetalert2'
import { Input } from '@chakra-ui/react';
import Badge from '@mui/material/Badge';
import '../Styles/search.css';

import { useSearch } from '../Context/Search';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
const Header = () => {
  const { cart, setCart } = useCart();  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category, setCategory] = useState([])
  const { Search, setSearch } = useSearch();
  const [SearchVal, setSearchVal] = useState('');
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
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate()

  // the below code fragment can be found in:
  const logout = () => {
    Toast.fire({
      icon: 'success',
      title: 'Logged out successfully'
    })
    navigate('/login')
    localStorage.removeItem('auth');

    setAuth({ user: null, token: '' });


  }
  const handleSearch = () => {
    if (SearchVal === '') {
      Swal.fire(
        'Please enter a search Key',
        'No-Value Search'
      )
    } else {
      navigate(`/search/${Search}`)

    }



  }





  const handleChange = (event) => {
    const selectedItem = category.find(item => item.name === event.target.value);
    if (selectedItem) {
      setSelectedCategory(selectedItem.name);
      navigate(`/categories/${selectedItem._id}/${selectedItem.name}`);
    }
  };


  //  Retrive all  categories
  useEffect(() => {
    categories()
  }, [])
  const categories = async (id) => {
    const res = await axios.get(`http://localhost:4000/category/all`);
    setCategory(res.data.Category);


  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
            <Typography variant={{ xs: 'h6', sm: 'h5' }}>
              E-Commerce APP
            </Typography>
            <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
              {auth.token ? (
                <>
                  <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} mb={{ xs: 2, sm: 0 }}>
                    <Input type="search" onChange={(e) => {
                      setSearch(e.target.value)
                      setSearchVal(e.target.value)

                    }}
                      placeholder="Search" variant="outline" className="searchBox" mr={{ sm: 2 }} mb={{ xs: 1, sm: 0 }}
                    />
                    <button className='searchButton btn mt-md-0 mt-sm-2' onClick={handleSearch} mb={{ xs: 1, sm: 0 }}>
                      Search
                    </button>
                  </Box>
                  <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                    <NavLink to="/" style={{ color: 'white' }} mb={{ xs: 1, sm: 0 }}>
                      <Button color="inherit">Home</Button>
                    </NavLink>
                    <select  className='form-select' value={selectedCategory} onChange={handleChange}>
                      <option className='data-list' value="">Category</option>
                      {category?.map((item, index) => (
                        <option key={index} value={item.name} className='form-select-option'>{index+1}.{item.name}</option>
                      ))}
                    </select>


                    {auth.user.role === 1 ? (
                      <NavLink to="/admin/dashboard" style={{ color: 'white' }} mb={{ xs: 1, sm: 0 }}>
                        <Button color="inherit">Admin</Button>
                      </NavLink>
                    ) : (
                      <NavLink to="/user/dashboard" style={{ color: 'white' }} mb={{ xs: 1, sm: 0 }}>
                        <Button color="inherit">User</Button>
                      </NavLink>
                    )}
                    <NavLink to="/login" style={{ color: 'white' }} mb={{ xs: 1, sm: 0 }}>
                      <Button color="inherit" onClick={logout}>
                        Logout
                      </Button>
                    </NavLink>
                    <NavLink className='cartIcon' to="/cart" mb={{ xs: 1, sm: 0 }}>
                      <IconButton className='cartIcon' aria-label="Cart">
                        <Badge badgeContent={cart.length} color="secondary">
                          <ShoppingCartIcon />
                        </Badge>
                      </IconButton>
                    </NavLink>
                  </Box>
                </>
              ) : (
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                  <NavLink to="/register" style={{ color: 'white' }} mb={{ xs: 1, sm: 0 }}>
                    <Button color="inherit">Register</Button>
                  </NavLink>
                  <NavLink to="/login" style={{ color: 'white' }} mb={{ xs: 1, sm: 0 }}>
                    <Button color="inherit">Login</Button>
                  </NavLink>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>

  );
}

export default Header;
