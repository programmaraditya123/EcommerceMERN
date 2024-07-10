import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <>
      <Header/>
      <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description}/>
                <meta name="keywords" content= {keywords}/>
                <meta name="author" content= {author}/>
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <main style={{minHeight:'70vh'}}>{children}<ToastContainer /></main>
      
      <Footer/>

    </>
  )
}
Layout.defaultProps = {
  title:"About Ecommerce -app shop now",
  keywords:"nodejs,monoDB,react,express",
  author:"Aditya",
  description:"Ecommerce app made with Nodejs, MongoDB, React, Express"
}


export default Layout;
