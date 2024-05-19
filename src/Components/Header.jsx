import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import Swal from 'sweetalert2'
import { Input } from '@chakra-ui/react';
import Badge from '@mui/material/Badge';

import { useSearch } from '../Context/Search';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
const Header = () => {
  const { cart, setCart } = useCart();
  const [category, setCategory] = useState([])
  const { Search, setSearch } = useSearch();
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

    navigate(`/search/${Search}`)


  }


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id,name) => {
    setAnchorEl(null);
    navigate(`categories/${id}/${name}`);

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
      <div>
        <AppBar position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "black" }}>
            <Typography variant="h6">
              E-Commerce APP
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>


              {auth.token ? (
                <>
                  <Input
                    type="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    variant="outline"
                    mr={4} // Add margin-right to create space between input and button
                  />
                  <Button
                    colorScheme="blue" onClick={handleSearch}>Search</Button>
                  <NavLink to='/' style={{ color: 'white' }}>
                    <Button color="inherit">Home</Button>
                  </NavLink>
                  <Button
                    style={{ color: 'white' }} aria-controls="dropdown-menu" aria-haspopup="true" onClick={handleClick} >Category</Button>
                  <Menu
                    id="dropdown-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {/* Iterate over the category array and generate MenuItem components */}
                    {category?.map((item, index) => (
                      <MenuItem key={index} onClick={()=>handleClose(item._id,item.name)}>{index+1+'.'}{item.name}</MenuItem>
                    ))}
                  </Menu>



                  {auth.user.role === 1 ? (
                    <>
                      <NavLink to='/admin/dashboard' style={{ color: 'white' }}>
                        <Button color="inherit">Admin</Button>
                      </NavLink>
                    </>

                  ) : (
                    <>
                      <NavLink to='/user/dashboard' style={{ color: 'white' }}>
                        <Button color="inherit">User</Button>
                      </NavLink>
                    </>
                  )}

                  <NavLink to='/login' style={{ color: 'white' }} >
                    <Button color="inherit" onClick={logout}>Logout</Button>
                  </NavLink>
                  <NavLink to='/cart'>

                  <IconButton color="inherit" aria-label="Cart">
                  <Badge badgeContent={cart.length} color="secondary">

                    <ShoppingCartIcon/>
                    </Badge>

                  </IconButton>
                  </NavLink>

                </>

              ) : (
                <>
                  <NavLink to='/register' style={{ color: 'white' }}>
                    <Button color="inherit">Register</Button>
                  </NavLink>
                  <NavLink to='/login' style={{ color: 'white' }} >
                    <Button color="inherit">Login</Button>
                  </NavLink>
                </>

              )}


            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>

  );
}

export default Header;
