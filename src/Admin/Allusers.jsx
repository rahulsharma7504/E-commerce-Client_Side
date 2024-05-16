import React from 'react'
import { useAuth } from '../Context/Auth'
const Allusers = () => {
  const { auth,setAuth } = useAuth();
const {user}=auth
  return (
    <>
    <h1>Allusers</h1>
    {auth.user ?(
      <>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{user.name}</h3>
              <p class="card-text">Text</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Title</h3>
              <p class="card-text">Text</p>
            </div>
          </div>
        </div>
      </div>
      
    
      </>
    ): null}
      
    </>
  )
}

export default Allusers
