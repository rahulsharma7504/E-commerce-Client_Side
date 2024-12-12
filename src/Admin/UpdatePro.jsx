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
        const res = await axios.get(`${process.env.SERVER_URL}/product/single/${id}`)
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
            const res = await axios.put(`${process.env.SERVER_URL}/product/update/${id}`, formData, {
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
            const res = await axios.delete(`${process.env.SERVER_URL}/product/delete/${id}`);
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
<div className="row offset-md-3">
  <div className="col-md-6 col-sm-8">
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-2">
        <label htmlFor="upload-image">Upload photo</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="form-control"
          placeholder={product.name}
          id="upload-image"
        />
      </div>
      <img className="img-fluid" width="100px" src={selectedImage ? selectedImage : product.image} alt="" />

      <div className="form-group mb-2">
        <label>Product Name</label>
        <input
          value={product.name}
          type="text"
          className="form-control"
          placeholder="Enter Product Name"
          onChange={(e) => { setProduct({ ...product, name: e.target.value }) }}
        />
      </div>

      <div className="form-group mb-2">
        <label>Product Price</label>
        <input
          value={product.price}
          type="text"
          className="form-control"
          placeholder="Enter Product Price"
          onChange={(e) => { setProduct({ ...product, price: e.target.value }) }}
        />
      </div>

      <div className="form-group mb-2">
        <label>Product Description</label>
        <input
          value={product.description}
          type="text"
          className="form-control"
          placeholder="Enter Product Description"
          onChange={(e) => { setProduct({ ...product, description: e.target.value }) }}
        />
      </div>

      <div className="form-group mb-2">
        <label>Product Quantity</label>
        <input
          value={product.quantity}
          type="text"
          className="form-control"
          placeholder="Enter Product Quantity"
          onChange={(e) => { setProduct({ ...product, quantity: e.target.value }) }}
        />
      </div>

      <div className="form-group mb-2">
        <label>Shipping</label>
        <select className="form-control" onChange={(e) => { setProduct({ ...product, shipping: e.target.value }) }}>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
      </div>
        <div className="col-md-6 d-flex">
      <button type="submit" className="btn btn-success mx-2">Update Product</button><br />
      <button type="button" className="btn btn-danger mx-2" onClick={handleDelete}>Delete Product</button>
      </div>
    </form>
  </div>
</div>


        </>
    )
}

export default UpdatePro
