import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';
import Swal from 'sweetalert2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Tooltip } from '@mui/material';
import axios from 'axios';
import '../Styles/Home.css';
import { Prices } from './Prices';
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/CartContext'

const Layout = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [category, setCategory] = useState([])
  const [product, setProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllcategory();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      filterproducts();
    }
  }, [checked, radio, page]);

  const getAllcategory = async () => {
    try {
      const res = await axios.get('http://localhost:4000/category/all')
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

  const getAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/product/all');
      if (res.status === 200 && res.data.Product.length > 0) {
        // Set the first product from the API response
        setProduct(res.data.Product);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  // for filter products that
  const filterproducts = async () => {
    try {
      const res = await axios.post('http://localhost:4000/product/filter', { checked, radio });
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const handleChecked = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      let index = all.indexOf(id);
      all.splice(index, 1);
    }
    setChecked(all)
  }
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const nextPage = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/product/pagination?page=${page + 1}`);
      if (res.data.data.length === 0) {
        setHasMoreProducts(false);
      } else {
        setProduct(res.data.data);
        setPage(page + 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const handleMore = (id) => {
    navigate(`/details/${id}`);
  }
  return (
    <>
      <div className="container-filtter">
        <div className="row">
          <div className="col-sm-3 m-3">
            <h5>Filtter by Category</h5>
            {
              category.map((item, index) => {
                return (
                  <div className="col-md-12" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item._id}
                        id="flexCheckDefault"
                        onChange={(e) => { handleChecked(e.target.checked, item._id) }}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        {item.name}
                      </label>
                    </div>
                  </div>
                );
              })
            }
            <hr />
            <hr /><h5>Filter by Price</h5>
            {
              Prices.map((item, index) => {
                return (
                  <div className="col-md-12" key={index}>
                    <div className="form-check">
                      <input
                        value={item.array} className="form-check-input" type="radio" name='price' id="flexCheckDefault"
                        onChange={(e) => { setRadio([e.target.value]) }}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        {item.name}
                      </label>
                    </div>
                  </div>
                );
              })
            }

            <button className='btn btn-success m-4' onClick={() => window.location.reload()}>Reset Filter</button>
          </div>
          <div className="col-md-8 col-sm-4  m-3">
            <h3>All Product</h3>
            <div className="row">
              {
                product.map((item, index) => {
                  return (
                    <div className="col-md-4 col-sm-6" key={index}>
                      <div className="card">
                        <img src={item.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">{item.description.substring(0, 20)}</p>
                          <p className="card-text">$ {item.price}</p>
                          <Tooltip title="Add to Cart" arrow>
                            <Button onClick={() => {setCart([...cart,item])
                              localStorage.setItem('cart', JSON.stringify([...cart,item]))
                            }
                          
                          }>
                                <ShoppingCartIcon />
                            </Button>
                          </Tooltip>

                          <Button variant='danger' onClick={() => { handleMore(item._id) }}>More..</Button>

                        </div>
                      </div>
                    </div>
                  );
                })
              }
              {hasMoreProducts ? (
                <button className="btn btn-secondary float-right" onClick={nextPage}>
                  Next..
                </button>
              ) : (
                <p>No more products to show.</p>
              )}
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Layout;

const prices = [

]