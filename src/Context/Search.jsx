import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [Search, setSearch] = useState();


  return <SearchContext.Provider value={{ Search, setSearch }}>
    {children}
  </SearchContext.Provider>;
};

export const useSearch = () => useContext(SearchContext);