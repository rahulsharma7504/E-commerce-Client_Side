import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/Auth';
import { SearchProvider } from './Context/Search'
ReactDOM.render(
    <AuthProvider>
      <SearchProvider>
      <App />

      </SearchProvider>
    </AuthProvider>,
  document.getElementById('root')
);
