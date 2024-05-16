import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Styles/Forget.css'
import axios from 'axios';

const Forget = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/user/forget', { email });
      console.log(res.data);
      Swal.fire({
        title: 'Success!',
        text: 'Please check your email to reset your password',
        icon:'success',
        confirmButtonText: 'Okay'
      })
      
    } catch (error) {
      console.error("Error:", error.response.data.error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.error,
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    
    }
  };

  return (
    <div class="container">
  <h1>Forget Password</h1>
  <form class="forget-password-form" onSubmit={handleSubmit}>
    <div class="form-group">
      <label for="email">Email Address</label>
      <input type="email" id="email" name="email" placeholder="Enter your email address" required />
    </div>
    <button type="submit" class="btn-reset">Reset Password</button>
  </form>
  <p>Remember your password? <NavLink to="/login">Login</NavLink></p>
</div>

  );
};

export default Forget;
