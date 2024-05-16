import React from 'react';
import { useAuth } from '../Context/Auth';
import { NavLink } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import Allusers from './Allusers';
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';
import '../Styles/AdminDash.css';
import ManageProduct from './ManageProduct';

const AdminDashboard = () => {
  return (
    <Box p={6} bg="gray.100" borderRadius="md" boxShadow="md">
      <Tabs isFitted variant="enclosed">
        <TabList className="custom-tab-list">
          <Tab className="custom-tab">All Users</Tab>
          <Tab className="custom-tab">Categories</Tab>
          <Tab className="custom-tab">Create Product</Tab>
          <Tab className="custom-tab">Manage Product</Tab>
        </TabList>
        <hr style={{ height: "3px" }} />
        <TabPanels>
          <TabPanel>
            <Allusers />
          </TabPanel>
          <TabPanel>
            <CreateCategory />
          </TabPanel>
          <TabPanel>
            <CreateProduct />
          </TabPanel>
          <TabPanel>
            <ManageProduct />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminDashboard;