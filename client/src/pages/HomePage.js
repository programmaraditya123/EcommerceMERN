import React from 'react'
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/Context';


const HomePage = () => {
   const[auth,setAuth] = useAuth();
  return (
     <Layout title="Best Offer">
        <h1>header page</h1>
        <pre>{JSON.stringify(auth , null ,4)}</pre>
     </Layout>
  )
}

export default HomePage;
