import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import '../Styles/managepro.css';
import { useNavigate, NavLink } from 'react-router-dom'

const ManageProduct = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const res = await axios.get('http://localhost:4000/product/all-manage');
            if (res.status === 200 && res.data.Product.length > 0) {
                // Set the first product from the API response
                setProduct(res.data.Product);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container-fluid product-container">
                <div className="row">
                    {product.map((item, index) => (
                        <div className="col-md-4 col-sm-6" key={index}>
                            <NavLink to={`/admin/dashboard/update/${item._id}`} className="product-link">
                                <div className="card mb-4">
                                    <img src={item.image} className="card-img-top product-image" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title product-title">{item.name}</h5>
                                        <p className="card-text product-description">
                                            {item.description.substring(0, 30)}
                                        </p>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>

        </>

    );
};

export default ManageProduct;

