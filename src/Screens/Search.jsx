import usePagination from '@mui/material/usePagination/usePagination'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Tooltip } from '@mui/material';

import '../Styles/search.css';

import { useSearch } from '../Context/Search'

const Search = () => {
  const {Search,setSearch}=useSearch();
const navigate=useNavigate();
  const { search } = useParams()
  const [searchData, setSearchData] = useState([])

  useEffect(() => {
    
    getSearchData()
  },[Search])

  const getSearchData = async () => {
    const res = await axios.get(`http://localhost:4000/product/search/${Search}`)
    if (res.data) {
      setSearchData(res.data.data)
    }
  }
  
  const handleMore=(id)=>{
    navigate(`/details/${id}`);
  }

  return (
    <>
    <div className="containerFlex">
        <div className="row">
        <h3 className="search-results-heading">Search Results</h3>
    {searchData.map((item, index) => {
      return (
        <div className="col-md-6  search-result-item" key={index}>
          <div className="card">
            <img src={item.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text search-result-description">{item.description.substring(0, 20)}</p>
              <p className="card-text search-result-price">$ {item.price}</p>
              <Tooltip title="Add to Cart" arrow>
                <Button className="add-to-cart-btn">
                  <ShoppingCartIcon className="cart-icon" />
                </Button>
              </Tooltip>
              <Button variant='danger' onClick={()=>{handleMore(item._id)}}>More..</Button>

            </div>
          </div>
        </div>
      );
    })}
        </div>
    </div>
   
  </>
  )
}

export default Search