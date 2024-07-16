import React,{useState,useEffect} from 'react';
import Layout from '../../components/layout/Layout';
import Adminmenu from '../../components/layout/Adminmenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';


const Products =  () => {
    const [Products,setProducts] = useState([]);

    //get all products
    const getAllProducts = async () =>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/products/get-product`);
            setProducts(data.products);
             
            
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
            
        }
    }
    useEffect(() => {
        getAllProducts()
    },[]);
  return (
    

    <Layout>
        <div className='row'>
            <div className='col-md-3'>
                <Adminmenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Products List</h1>
                <div className='d-flex'>
                {Products?.map(p =>(
                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>

                 
                    <div className="card m-2" style={{width: '18rem'}}>
  <img src={p.photo} className="card-img-top" alt={p.name}/>
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text"> {p.description}</p>
     
  </div>
</div>
</Link>

                ))}
                </div>
            </div>
        </div>
      
    </Layout>
  )
}

export default Products;
