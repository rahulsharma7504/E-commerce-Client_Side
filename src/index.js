import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/Auth';
import { SearchProvider } from './Context/Search'
import { CartProvider } from './Context/CartContext';
ReactDOM.render(
    <AuthProvider>
      <CartProvider>
      <SearchProvider>
      <App />

      </SearchProvider>
      </CartProvider>
      
    </AuthProvider>,
  document.getElementById('root')
);
