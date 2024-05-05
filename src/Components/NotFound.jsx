import React from 'react'
import {Button,Typography} from '@mui/material';
import { NavLink } from 'react-router-dom';
const NotFound = () => {
  return (
    <>
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={NavLink} to="/">
        Go to Home Page
      </Button>
    </div>
      
    </>
  )
}

export default NotFound
