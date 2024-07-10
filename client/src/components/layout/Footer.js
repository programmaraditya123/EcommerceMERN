import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark text-white p-3 footer'>
    <h1 className='text-center'>All Rights Reserved @ Copy : Aditya</h1>
    <p className='text-center m-3'>
      <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/policy">Privacy Policy</Link>
    </p>
      
    </div>
  )
}

export default Footer
