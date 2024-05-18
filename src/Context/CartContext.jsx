import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  useEffect(()=>{
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if(localCart){
      setCart(localCart)
    }
  },[])


  return <CartContext.Provider value={{ cart, setCart }}>
    {children}
  </CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);