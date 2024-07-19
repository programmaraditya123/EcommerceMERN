 
import React from 'react';
import Layout from "./../../components/layout/Layout";
import { useSearch } from '../../context/Search';

const Searchpage = () => {
    const [values,setvalues] = useSearch();
  return (
    <Layout title={'search results'}>
        <div className='container'>
            <div className='text-center'>
                <h1>search results</h1>
                <h6>{values?.results.length < 1 ? "'No Products Found" : `Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
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
                  <button className="btn btn-primary mb-1">MORE DETAILS</button>
                  <button className="btn btn-secondary mb-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
              
            ))}
          </div>
            </div>
        </div>
      
    </Layout>
  )
}

export default Searchpage;
