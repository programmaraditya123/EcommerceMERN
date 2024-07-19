import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';


const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products,setProduct] = useState([]);

    const [category,setCategory] = useState([]);
    console.log("********************",products);


    useEffect(() => {
        if(params?.slug) getProductByCat();
    },[params?.slug])

    const getProductByCat = async () =>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/products/product-category/${params.slug}`)
            console.log("//////////",data.products)
            console.log("//////////********************",data)
            setProduct(data?.products);
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
            
        }
    };
  return (
    <Layout>
        <div className='container'>
            <h1 className="text-center">{category?.name}</h1>
            <h1 className="text-center">{products?.length} results found</h1>
            <div className='row'>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
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
        </div>
      
    </Layout>
  )
}

export default CategoryProduct;
