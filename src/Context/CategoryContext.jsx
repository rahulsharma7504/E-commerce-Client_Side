import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export const categoryContext=createContext();



export const CategoryProvider = ({children}) => {

    const [category,setCategory]=useState([]);
    useEffect(()=>{
        getAllcategory();
    },[])
    const getAllcategory = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/category/all`)
          setCategory(res.data.Category)
        } catch (error) {
          if (error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          console.log(error)
        }
      }

  return <categoryContext.Provider value={{category,getAllcategory}}>
    {children}
  </categoryContext.Provider>
}


export const useCategoryContext =()=>useContext(categoryContext);
