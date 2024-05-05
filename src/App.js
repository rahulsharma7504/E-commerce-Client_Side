import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Routes} from'react-router-dom';

import './App.css';
import NotFound from './Components/NotFound';
import Layout from './Components/Layout';
import About from './Screens/About';
import Contect from './Screens/Contect';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Register from './Screens/Register';
import Login from './Screens/Login';

function App() {
  return (
   <>
   <Router>
    <Header/>
     <Routes>
       <Route path="/register" element={<Register/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/" element={<Layout/>} />
       <Route path="/about" element={<About/>} />
       <Route path="/contact" element={<Contect/>} />     
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer/>
   </Router>
   
   </>
  );
}

export default App;
