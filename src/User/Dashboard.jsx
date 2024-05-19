import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, background, } from '@chakra-ui/react'
import '../Styles/Dash.css';
import User from './User';
import Orders from './Orders';
const Dashboard = () => {
  return (
    <>
        <h4>Dashboard</h4>
        <Tabs>
      <TabList className="tabs-list">
      <Tab className="tab">Orders</Tab>
        <Tab className="tab">Profile</Tab>
      </TabList>
      <hr style={{height:'3px'}}/>

      <TabPanels>
        <TabPanel>
          <Orders />
        </TabPanel>
        <TabPanel>
          <User />
        </TabPanel>
      </TabPanels>
    </Tabs>

    </>
  )
}

export default Dashboard




