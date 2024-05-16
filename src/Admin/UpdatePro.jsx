import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import '../Styles/UpdatePro.css'
import { Select } from "@chakra-ui/react";
import Swal from 'sweetalert2';



const UpdatePro = () => {
    const navigate = useNavigate()
    const [selectedImage, setSelectedimage] = useState(null)
    const { id } = useParams()
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        quantity: '',
        image: '',
        categoryId: '',
        shipping: ''
    });
    useEffect(() => {
        getSingleProduct()
    }, [])
    const getSingleProduct = async () => {
        const res = await axios.get(`http://localhost:4000/product/single/${id}`)
        setProduct(res.data.product)
    }



    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            setSelectedimage(URL.createObjectURL(image));
            setProduct({ ...product, image });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('quantity', product.quantity);
        formData.append('image', product.image ); // Updated line
        formData.append('category', product.category);
        formData.append('shipping', product.shipping);
        try {
            const res = await axios.put(`http://localhost:4000/product/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            navigate('/admin/dashboard')
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Product Created Successfully'
            });
            
            // handle success response
        } catch (error) {
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }
            console.error('Error occurred:', error);
            // handle error response
        }
    };


    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/product/delete/${id}`);
            console.log(res.data);
            if (res.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Product Deleted Successfully'
                });
            navigate('admin/dashboard');

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to delete product'
                });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        }
    };


    return (
        <>
        
        <h1>Update Product</h1>
<hr />
<div class="row">
    <div class="col-md-6">
        <form onSubmit={handleSubmit}>
            <div class="form-group mb-2">
                <label for='upload image'>Upload photo</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    class="form-control"
                    placeholder={product.name}
                />
            </div>
            <img class='img-fluid' width={'100px'} src={selectedImage ? selectedImage : product.image} alt="" />
            <div class="form-group mb-2">
                <label>Product Name</label>
                <input
                    value={product.name}
                    type="text"
                    class="form-control"
                    placeholder="Enter Product Name"
                    onChange={(e) => { setProduct({ ...product, name: e.target.value }) }}
                />
            </div>

        </form>
    </div>
    <div class="col-md-6">
        <div class="form-group mb-2">
            <label>Product Price</label>
            <input
                value={product.price}
                type="text"
                class="form-control"
                placeholder="Enter Product Price"
                onChange={(e) => { setProduct({ ...product, price: e.target.value }) }}
            />
        </div>
        <div class="form-group mb-2">
            <label>Product Description</label>
            <input
                value={product.description}
                type="text"
                class="form-control"
                placeholder="Enter Product Description"
                onChange={(e) => { setProduct({ ...product, description: e.target.value }) }}
            />
        </div>

    </div>
</div>
<div class="row">
    <div class="col-md-6 offset-md-3">
        <div class="form-group mb-2">
            <label>Product Quantity</label>
            <input
                value={product.quantity}
                type="text"
                class="form-control"
                placeholder="Enter Product Quantity"
                onChange={(e) => { setProduct({ ...product, quantity: e.target.value }) }}
            />
        </div>
        <div class="form-group mb-2">
            <label>Shipping</label>
            <select name="" id="" class="form-control" onChange={(e) => { setProduct({ ...product, shipping: e.target.value }) }}>
                <option value="True">True</option>
                <option value="False">False</option>
            </select>
        </div>
        <button type='submit' class='btn btn-success mx-2'>Update Product</button>
        <button class='btn btn-danger mx-2' onClick={handleDelete}>Delete Product</button>
    </div>
</div>

        </>
    )
}

export default UpdatePro
