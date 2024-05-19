import axios from 'axios';
import React,{useEffect, useState} from 'react'

const Orders = () => {
  const [bookings,setBookings]=useState([]);
  useEffect(()=>{
    getAllBooking()

  },[]);

  const getAllBooking=async()=>{
    const res=await axios.get('http://localhost:4000/user/bookings');
    setBookings(res.data.Bookings);
  }
console.log(bookings)
  return (
    <>
    <h3>User Orders</h3>
    <table className="table">
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
          bookings.map(booking=>(
            <tr>
              <td>{booking._id}</td>
              <td>{booking.Products.map((name)=>name.ProductName+' |')}</td>
              <td>{booking.Products.length}</td>
              <td>{booking.Amount}</td>
              <td>{booking.Status}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
      
    </>
  )
}

export default Orders
