import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useCategoryContext } from '../Context/CategoryContext';
import { Input, Button, Box, Text, Table, Thead, Tbody, Tr, Th, Td, IconButton, Flex, Spacer, useDisclosure, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; 

const CreateCategory = () => {
  const [name, setName] = useState('');
  const { category, getAllcategory } = useCategoryContext();
  
  const handelAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/category/create`, { name });
      if (res.data) {
        getAllcategory();
        Swal.fire({
          icon: 'success',
          title: 'Category Added Successfully',
          text: 'Category Added Successfully'
        });
        setName(''); // Clear the input field
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while adding the category!'
      });
    }
  };

  const handleOpenModal = async (id, currentName) => {
    const { value: editedName } = await Swal.fire({
      title: "Edit Category",
      input: "text",
      inputLabel: "Category Name",
      inputValue: currentName,
      showCancelButton: true,
      inputValidator: (value) => !value && "You need to write something!",
    });

    if (editedName) {
      try {
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/category/update/${id}`, { name: editedName });
        getAllcategory();
        Swal.fire({
          icon: 'success',
          title: 'Category Updated Successfully',
          text: 'Category Updated Successfully'
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while updating the category!'
        });
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/category/delete/${id}`);
      getAllcategory();
      Swal.fire({
        icon: 'success',
        title: 'Category Deleted Successfully',
        text: 'Category Deleted Successfully'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while deleting the category!'
      });
    }
  };

  return (
    <Box p={5} bg="gray.50" borderRadius="md" boxShadow="lg">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">Manage Categories</Text>

      {/* Add Category Form */}
      <Flex direction={{ base: 'column', sm: 'row' }} mb={6} justify="center" align="center">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add New Category"
          size="lg"
          mb={{ base: 3, sm: 0 }}
          mr={3}
          borderColor="teal.400"
          _hover={{ borderColor: "teal.500" }}
        />
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handelAdd}
          isDisabled={!name}
          _hover={{ bg: "teal.600" }}
        >
          Add Category
        </Button>
      </Flex>

      {/* Categories Table */}
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Category Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {category.map((item, index) => (
              <Tr key={item._id}>
                <Td>{index + 1}</Td>
                <Td>{item.name}</Td>
                <Td>
                  <Flex justify="flex-start" gap={3}>
                    <Tooltip label="Edit Category" fontSize="md" placement="top">
                      <IconButton
                        colorScheme="blue"
                        icon={<FontAwesomeIcon icon={faEdit} />}
                        onClick={() => handleOpenModal(item._id, item.name)}
                        size="sm"
                        aria-label="Edit Category"
                        variant="outline"
                        _hover={{ bg: "blue.50" }}
                      />
                    </Tooltip>
                    <Tooltip label="Delete Category" fontSize="md" placement="top">
                      <IconButton
                        colorScheme="red"
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => handleDelete(item._id)}
                        size="sm"
                        aria-label="Delete Category"
                        variant="outline"
                        _hover={{ bg: "red.50" }}
                      />
                    </Tooltip>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default CreateCategory;
