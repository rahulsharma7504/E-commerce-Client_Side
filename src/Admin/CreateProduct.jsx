import React, { useState, useEffect } from 'react';
import { Select } from "@chakra-ui/react";
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Styles/product.css'
const CreateProduct = () => {
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image file

  const [data, setData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    image: '',
    categoryId: '',
    shipping: ''
  });

  useEffect(() => {
    getAllcategory();
    //  <getAllCategory setCategory={setCategory}/>
  }, []);

  const getAllcategory = async () => {
    try {
      const res = await axios.get('http://localhost:4000/category/all');
      setCategory(res.data.Category);
    } catch (error) {
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      }
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile)); // Set the URL of the selected image
    setData((prevData) => ({
      ...prevData,
      image: imageFile
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('quantity', data.quantity);
    formData.append('image', data.image);
    formData.append('categoryId', data.categoryId);
    formData.append('shipping', data.shipping);
    try {
      const res = await axios.post('http://localhost:4000/product/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.reload()
      console.log(res.data);
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


  return (
    <>
   <div class="background-container">
    <h1>Create Product</h1>
    <hr />
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
                <Select
                    class='form-control'
                    onChange={(e) => {
                        const newCategoryName = e.target.value;
                        setCategoryName(newCategoryName);
                        setData((prevData) => ({
                            ...prevData,
                            category: newCategoryName
                        }));
                        const newSelectedCategory = category.find((item) => item.name === newCategoryName);
                        setData((prevData) => ({
                            ...prevData,
                            categoryId: newSelectedCategory ? newSelectedCategory._id : ''
                        }));
                    }}
                    placeholder="Select category"
                >
                    {category.map((item, index) => (
                        <option key={index} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </Select>
                <div class="form-group mb-2">
                    <label for='upload image'>Upload photo</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        class="form-control"
                        placeholder="Upload Product Image"
                    />
                </div>
                {selectedImage && <img src={selectedImage} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />}
                <div class="form-group mb-2">
                    <label>Product Name</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setData((prevData) => ({
                                ...prevData,
                                name: e.target.value
                            }));
                        }}
                        class="form-control"
                        placeholder="Enter Product Name"
                    />
                </div>
                <div class="form-group mb-2">
                    <label>Product Price</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setData((prevData) => ({
                                ...prevData,
                                price: e.target.value
                            }));
                        }}
                        class="form-control"
                        placeholder="Enter Product Price"
                    />
                </div>
                <div class="form-group mb-2">
                    <label>Product Description</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setData((prevData) => ({
                                ...prevData,
                                description: e.target.value
                            }));
                        }}
                        class="form-control"
                        placeholder="Enter Product Description"
                    />
                </div>
                <div class="form-group mb-2">
                    <label>Product Quantity</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setData((prevData) => ({
                                ...prevData,
                                quantity: e.target.value
                            }));
                        }}
                        class="form-control"
                        placeholder="Enter Product Quantity"
                    />
                </div>
                <div class="form-group mb-2">
                    <label>Shipping</label>
                    <Select
                        name=""
                        id=""
                        class='form-control'
                        onChange={(e) => {
                            setData((prevData) => ({
                                ...prevData,
                                shipping: e.target.value
                            }));
                        }}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </Select>
                </div>
                <button type='submit' class='btn btn-success'>Add Product</button>
            </form>
        </div>
    </div>
</div>

    </>
  );
};

export default CreateProduct;
// const getAllCategory = async (axios, Swal ,{setCategory}) => {
//   try {
//     const res = await axios.get('http://localhost:4000/category/all');
//     setCategory(res.data.Category);
//   } catch (error) {
//     if (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong!'
//       });
//     }
//     console.log(error);
//   }
// };
// export { getAllCategory }
