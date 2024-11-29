import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../Styles/singlePro.css';
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../Context/CartContext'

const ProDetails = () => {
    const { cart, setCart } = useCart();

    const { id } = useParams();
    const [product, setproduct] = useState([]);
    const [similar, setsimilar] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getProduct()
    }, [id])
    const getProduct = async () => {
        const res = await (await axios.get(`http://localhost:4000/product/single/${id}`)).data

        setproduct(res.product);
        similarProduct(res.product._id, res.product.category);
    }

    const similarProduct = async (pid, cid) => {
        const res = await (await axios.get(`http://localhost:4000/product/similar/${pid}/${cid}`)).data
        if (res.similarProducts) {
            setsimilar(res.similarProducts)

        }
    }


    const handleSimilar = (id) => {
        navigate(`/details/${id}`)
        // setproduct()
    }
    return (
        <>
            <div class="container-fluid mt-5">
                <div class="product-detail-card row">
                    <div class="col-md-6">
                        <img src={product.image} class="img-fluid" alt="3.0 OFF COURT LEATHER" />
                    </div>
                    <div class="col-md-6">
                        <div class="product-info">
                            <h2>{product.name}</h2>
                            <h3>Price :${product.price}</h3>
                            <h3>Shipping : <strong>{product.shipping ? 'Available' : 'Un-Available'}</strong></h3>
                            <h3>Quantity : <strong>{product.quantity}</strong></h3>
                            <div class="product-options">
                                <h4>DESCRIPTION</h4>
                                <p>{product.description}</p>
                                <h4>AVAILABLE COLORS</h4>
                                <div class="color-options">
                                    <span class="color-dot red"></span>
                                    <span class="color-dot green"></span>
                                    <span class="color-dot black"></span>
                                    <span class="color-dot white"></span>
                                </div>
                            </div>
                            <div class="actions">
                                <button class="btn btn-dark" onClick={() => {
                                    setCart([...cart, product])
                                    localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                }}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="similar-products">
                        <h2>Similar Products</h2>
                        <hr />
                        <hr />
                        <div className="row">
                            {similar.map((item, index) => (
                                <div className="col-md-5 m-3" key={index}>
                                    <div className="product-card p-3">
                                        <img src={item.image} className="img-fluid mb-2" alt="3.0 OFF COURT LEATHER" />
                                        <h3>{item.name}</h3>
                                        <h4>Price: ${item.price}</h4>
                                        <button className="btn btn-dark" onClick={() => handleSimilar(item._id)}>View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProDetails
