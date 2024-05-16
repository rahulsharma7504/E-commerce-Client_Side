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
            const res = await axios.get('http://localhost:4000/product/all');
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
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 product-col" key={index}>
                            <NavLink to={`/admin/dashboard/update/${item._id}`} className="product-link">
                                <Box className="product-box" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                                    <Image className="product-image" src={item.image} alt={item.name} />
                                    <Box p="6">
                                        <Box d="flex" alignItems="baseline">
                                            <Text className="product-title" fontWeight="semibold" fontSize="lg" mr="2">
                                                {item.name}
                                            </Text>
                                        </Box>
                                        <Text className="product-description" mt="2" color="gray.600">
                                            {item.description.substring(0,30)}
                                        </Text>
                                    </Box>
                                </Box>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>


        </>

    );
};

export default ManageProduct;

