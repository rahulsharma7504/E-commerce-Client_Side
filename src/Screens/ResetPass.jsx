import React, { useState } from 'react';
import '../Styles/Forget.css';
import axios from 'axios';
import Swal from 'sweetalert2'

import { useLocation , NavLink } from 'react-router-dom'; // Import useLocation from react-router-dom

const ResetPass = () => {
  const location = useLocation(); // Get the current location

  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract token from the query parameters in the URL
    const urlSearchParams = new URLSearchParams(location.search);
    console.log(urlSearchParams)
    const token = urlSearchParams.get('token');
    console.log(token)

    const res=axios.post(`http://localhost:4000/user/reset_pass?token=${token}`, { password: pass })
    if(res.data){
      Swal.fire({
        icon:'success',
        title: 'Your password has been updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    
      
  };

  return (
    <>
      <div className="container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}> 
          <div className="form-group">
            <label htmlFor="password">New password</label>
            <input type="password" onChange={(e) => setPass(e.target.value)} id="password" name="password" placeholder="Enter your new password" required/>
          </div>
          <button type="submit" className="btnf">Reset Password</button>
        </form>
        <p>Remember your password? <NavLink to="/login">Login</NavLink></p>
      </div>
    </>
  );
}

export default ResetPass;
