import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const params = useParams();
    const navigate  = useNavigate();
    const[product,setProduct] = useState({});
    const [relatedProducts,setRelatedProducts] = useState([]);

    //initial product details
    useEffect(() =>{
        if(params?.slug) getProduct()
    },[params?.slug])

    //get product
    const getProduct = async () =>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/products/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProducts(data?.product._id,data?.product.category._id);
            
        } catch (error) {
            console.log(error);
            
        }
    }; 

    //get similar products 
    const getSimilarProducts = async (pid,cid) => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/products/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)
            
        } catch (error) {
            console.log(error);
            
        }
    };

  return (
    <Layout>
         <div className='row container mt-5'>
            <div className='col-md-6'>
            <img
                    src={`${process.env.REACT_APP_API}/app/v1/products/get-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name} height={300} width={200}
                  />
            </div>
            <div className='col-md-6'>
                <h1 className='text-center'>Product Details</h1>
                <h6>Name : {product.name}</h6>
                <h6>description : {product.description}</h6>
                <h6>Price : {product.price}</h6>
                <h6>Category : {product?.category?.name}</h6>
                <button className='btn btn-secondary'>ADD TO CART</button>
                
                {/* <h6>Shipping : {product.shipping}</h6> */}
            </div>
            
         </div>
         <hr/>
         <div className='row container'>
            <h6>similar products</h6>
            {relatedProducts.length < 1 && <p className='text-center'>No similar Products Found</p>}
            <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/app/v1/products/get-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {" "}
                    {p.description?.substring(0, 30)}..
                  </p>
                  <p className="card-text"> $ {p.price}</p>

                  <button
                    className="btn btn-primary mb-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    MORE DETAILS
                  </button>

                  <button className="btn btn-secondary mb-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
         </div>
    </Layout>
  )
}

export default ProductDetails;
