import React from 'react'
import Layout from '../../components/layout/Layout';
import Adminmenu from '../../components/layout/Adminmenu';
import { useAuth } from '../../context/Context';

const AdminDashboard = () => {
  const [auth] =useAuth();
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <Adminmenu/>
            </div>
            <div className='col-md-9'>
              <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin PH.NO.: {auth?.user?.phone}</h3>
              <h3>Admin Address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      
    </Layout>
  )
}

export default AdminDashboard
