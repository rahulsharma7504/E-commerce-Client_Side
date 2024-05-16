import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, background, } from '@chakra-ui/react'
import '../Styles/Dash.css';
const Dashboard = () => {
  return (
    <>
        <h4>Dashboard</h4>
        <Tabs>
      <TabList className="tabs-list">
        <Tab className="tab">Profile</Tab>
        <Tab className="tab">Orders</Tab>
      </TabList>
      <hr style={{height:'3px'}}/>

      <TabPanels>
        <TabPanel>
          <User />
        </TabPanel>
        <TabPanel>
          <Orders />
        </TabPanel>
      </TabPanels>
    </Tabs>

    </>
  )
}

export default Dashboard


const User=()=>{
  return(
    <div>
      <h1>User</h1>
    </div>
    
  )
 
}



const Orders=()=>{

  return(
    <div>
      <h1>Orders</h1>
    </div>
    
  )
}