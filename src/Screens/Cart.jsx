import React from 'react';
import { useAuth } from '../Context/Auth';
import { useCart } from '../Context/CartContext';
import axios from 'axios';
import '../Styles/cart.css';
import {useNavigate} from 'react-router-dom'
import Footer from '../Components/Footer';
const Cart = () => {
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const { auth } = useAuth();

    const removeItem = (id,index) => {
        if(cart.length){
            const newCart = [...cart];  
            
            newCart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        }
        // localStorage.setItem('cart', JSON.stringify(newCart));
        // setCart(newCart);
    };

    // const newCart = cart.filter(item => item._id !== id);

    const handlePayment = async () => {
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        try {
            const orderResponse = await axios.post('http://localhost:4000/product/create-order', {
                amount: totalPrice * 100,
                currency: 'INR'
            });

            const options = {
                key: 'rzp_test_VntZm15bTqdhSc',
                amount: totalPrice*100,
                currency: 'INR',
                // order_id: order_id,
                name: 'R.Sharma Production',
                order_id: orderResponse.data.id,
                description: 'Test Transaction',
                handler:async function (response) {
                    try {
                        await axios.post('http://localhost:4000/product/payment-verify', {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            cart: cart,
                            userID: auth.user._id,
                            totalPrice: totalPrice,
                            currency: 'INR',
                            status: 'Booked',

                        });
                        console.log('Payment successful:', response);
                        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    } catch (error) {
                        console.error('Payment success handler error:', error);
                        alert('Payment verification failed. Please contact support.');
                    }
                    console.log('Payment successful:', response);
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: auth.user.name,
                    email: auth.user.email,
                    contact: auth.user.phone, // You can fetch user contact from your auth context or user data
                },
                theme: {
                    color: 'red',
                },
            };
    
            console.log('Opening Razorpay payment box with options:', options);
    
            // Check if the window object is available and Razorpay script is loaded before creating a new instance of Razorpay
            if (typeof window !== 'undefined' && window.Razorpay) {
                const rzp = new window.Razorpay(options); //set Option data 
                rzp.open(); // open the new instance of Razorpay with Default options and Details object
            } else {
                console.error('Razorpay is not available in this environment.');
            }
          
        } catch (error) {
            console.error('Payment error:', error);
        }
    };
    

    return (
        <>
            <h3>{auth.user.name}</h3>
            <div className="container-fluidBox">
                <div className="row">
                    <div className="col-md-7 cart-items-section">
                        <h3>Cart Items</h3>
                        {cart.length === 0 ? (
                            <h4 className="empty-cart-message">Your cart is empty</h4>
                        ) : (
                            cart.map((item,index) => (
                                <div className="card cart-item-card" key={item._id}>
                                    <div className="card-body cart-item-body">
                                        <img src={item.image} alt={item.name} className="cart-item-image" />
                                        <h5 className="card-title cart-item-title">{item.name.substring(0,25)}...  </h5>
                                        <p className="card-text cart-item-price">Price ${item.price}</p>
                                        <p className="card-text cart-item-description">
                                            {item.description.length > 40
                                                ? `${item.description.substring(0, 40)}...`
                                                : item.description}
                                        </p>
                                        <button
                                            className="btn btn-danger cart-remove-btn"
                                            onClick={() => removeItem(item._id,index)}
                                        >
                                            Remove Item
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="col-md-5 order-summary-section">
                        <h3>Order Summary</h3>
                        <h4 className="total-items">Total Items: {cart.length}</h4>
                        <h4 className="total-price">Total Price: ${cart.reduce((sum, item) => sum + item.price, 0)}</h4>
                        <button className="btn btn-success checkout-btn" onClick={handlePayment}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Cart;
