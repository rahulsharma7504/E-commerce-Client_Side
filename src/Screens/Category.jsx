import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'
import '../Styles/categories.css';
import { Button, Tooltip } from '@mui/material';
const Category = () => {
    const navigate = useNavigate();

    const { id, name } = useParams();
    const [Products, setProducts] = useState([])
    useEffect(() => {
        getAllProducts();
    }, [id]);
    const getAllProducts = async () => {
        const res = await axios(`http://localhost:4000/product/category/${id}`)
        setProducts(res.data.data)
    }

    const handleMore = (id) => {
        navigate(`/details/${id}`);
    }
    return (
        <>
            <h3>Category: {name}</h3>
            <h4>Total: {Products.length}</h4>

            <div className="product-container">
                {Products.map((item, index) => (
                    <div className="product-cards" key={index}>
                        <img src={item.image} className="product-image" alt="..." />
                        <div className="product-detail">
                            <h5 className="product-titles">{item.name}</h5>
                            <p className="product-descriptions">{item.description.substring(0, 20)}</p>
                            <p className="product-prices">$ {item.price}</p>
                            <div className="product-action">
                                <Tooltip title="Add to Cart" arrow>
                                    <Button>
                                        <ShoppingCartIcon />
                                    </Button>
                                </Tooltip>
                                <Button variant='danger' onClick={() => { handleMore(item._id) }}>More..</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



        </>
    )
}

export default Category
