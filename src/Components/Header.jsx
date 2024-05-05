import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
  // the below code fragment can be found in:
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "black" }}>
          <Typography variant="h6">
           E-Commerce APP
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Category</Button>
            <NavLink to='/register' style={{color:'white'}}>
              <Button color="inherit">Register</Button>
            </NavLink>
          
            <NavLink to='/login' style={{color:'white'}} >
              <Button color="inherit">Login</Button>
            </NavLink>
            <IconButton color="inherit" aria-label="Cart">
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
