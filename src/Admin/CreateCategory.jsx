import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import '../Styles/category.css'
// import { getAllCategory } from './CreateProduct'

const CreateCategory = () => {
  const [category, setCategory] = useState([])
  const [name, setName] = useState('')
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    getAllcategory()
  }, [])

  const getAllcategory = async () => {
    try {
      const res = await axios.get('http://localhost:4000/category/all')
      console.log(res.data.Category)
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

  const handelAdd = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/category/create', { name: name })
      if (res.data) {
        getAllcategory()
        // await getAllCategory(axios,Swal)
        Swal.fire({
          icon: 'success',
          title: 'Category Added Successfully',
          text: 'Category Added Successfully'
        })
        setName('')
        // window.location.reload()
      }
    } catch (error) {
      if (error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
    }
  }


  const handleOpenModal = async (id) => {
    const open = await Swal.fire({
      title: "Edit Category",
      input: "text",
      placeholder: "Category Name",
      inputLabel: "Category Name",
      inputValue: inputValue, // Set the input value to the category name
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      }
    });

    if (open.isConfirmed) {
      const editedName = open.value;
      try {
        await axios.put(`http://localhost:4000/category/update/${id}`, { name: editedName });
        getAllcategory();
        Swal.fire({
          icon: 'success',
          title: 'Category Updated Successfully',
          text: 'Category Updated Successfully'
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while updating the category!'
        });
      }
    }
  };

  //delete category
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/category/delete/${id}`)
      getAllcategory()
      Swal.fire({
        icon: 'success',
        title: 'Category Deleted Successfully',
        text: 'Category Deleted Successfully'
      })


    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })

    }
  }
  return (
    <>
      <div class="manage-categories-container">
        <h1>Manage Categories</h1>
        <div class="row d-flex manage-categories-section">
          <div class="col-4 add-category-section">
            <form onSubmit={handelAdd} class="add-category-form">
              <input
                type="text"
                name="category"
                onChange={(e) => setName(e.target.value)}
                placeholder="Add New Category"
                class="add-category-input"
              />
              <button type="submit" class="btn btn-primary mt-2 p-3 add-category-btn">
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div class="category-table-section">
        <table class="table manage-categories-table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Category Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item, index) => (
              <tr key={index} class="category-row">
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>
                  <div className='edbtn'>

                  <button
                    class="btn btn-danger mx-2 delete-category-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    class="btn btn-primary edit-category-btn"
                    onClick={() => handleOpenModal(item._id, setInputValue(item.name))}
                  >
                    EDIT
                  </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default CreateCategory