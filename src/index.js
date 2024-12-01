import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Context/Auth';
import { SearchProvider } from './Context/Search'
import { CartProvider } from './Context/CartContext';
import { ChakraProvider } from '@chakra-ui/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <AuthProvider>
      <CartProvider>
      <SearchProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </SearchProvider>
      </CartProvider>
      
    </AuthProvider>
  </>
);

