import React from 'react'
import Layout from '../../components/layout/Layout';
import Adminmenu from '../../components/layout/Adminmenu';

const Users = () => {
  return (
    <Layout title="users dashboard">
        <div className='container-fluid m-3 p-3'>

        <div className='row'>
            <div className='col-md-3'>
                <Adminmenu/>
            </div>
            <div className='col-md-9'>
                <h1>ALL USERS</h1>
            </div>
        </div>
</div>
         
      
    </Layout>
  )
}

export default Users;
