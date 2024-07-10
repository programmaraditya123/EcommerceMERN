import React from 'react'
import Layout from '../components/layout/Layout';
import {Link} from 'react-router-dom';

const PageNotFound = () => {
  return (
     <Layout>
         <div className='pnf'>
            <div className='pnf-title'>404</div>
            <h1 className='pnf-heading'>Oops ! Page Not Found</h1>
            <Link to="/" className='pnf-button'>Go Back</Link>
         </div>
     </Layout>
  )
}

export default PageNotFound;
