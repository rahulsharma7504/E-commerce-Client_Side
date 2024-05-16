import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import Swal from 'sweetalert2'
import { Input } from '@chakra-ui/react';
import { useSearch } from '../Context/Search';
const Header = () => {
  const {Search,setSearch}=useSearch();
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
  const { auth,setAuth } = useAuth();
  const navigate = useNavigate()

  // the below code fragment can be found in:
  const logout = () => {
    Toast.fire({
      icon:'success',
      title: 'Logged out successfully'
    })
    navigate('/login')
localStorage.removeItem('auth');

setAuth({ user: null, token: '' });


  }
  const handleSearch=()=>{  
    
    navigate(`/search/${Search}`)


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
           
          <Input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        variant="outline"
        mr={4} // Add margin-right to create space between input and button
      />
      <Button
        colorScheme="blue"
        onClick={handleSearch}
      >
        Search
      </Button>
            {auth.token ? (
              <>
               <NavLink to='/' style={{ color: 'white' }}>
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink to='/contact' style={{ color: 'white' }}>
              <Button color="inherit">Category</Button>
            </NavLink>
            {auth.user.role===1 ?(
            <>
            <NavLink to='/admin/dashboard' style={{ color: 'white' }}>
              <Button color="inherit">Admin</Button>
            </NavLink>
            </>
            
            ):(
              <>
              <NavLink to='/user/dashboard' style={{ color: 'white' }}>
              <Button color="inherit">User</Button>
            </NavLink>
              </>
            )}
            
                <NavLink to='/login' style={{ color: 'white' }} >
                  <Button color="inherit" onClick={logout}>Logout</Button>
                </NavLink>
                <IconButton color="inherit" aria-label="Cart">
              <ShoppingCartIcon />
            </IconButton>
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
