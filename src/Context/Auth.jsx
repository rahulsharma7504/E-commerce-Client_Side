import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(()=>JSON.parse(localStorage.getItem('auth'))||{user:'', token: null });


  return <AuthContext.Provider value={{ auth, setAuth }}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);