import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout';
//import { useAuth } from '../context/Context';
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import Prices from '../components/Prices';


const HomePage = () => {
   //const[auth,setAuth] = useAuth();
   const [products,setProducts] = useState([]);
   const [categories,setCategories] = useState([]);
   const [checked,setChecked] = useState([]);
   const [radio , setRadio] = useState([]);



  //get all category
  const getAllCategory = async () =>{
   try {
     const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/category/get-category`);
     if(data.success){
       setCategories(data.category);
     }
     
   } catch (error) {
     console.log(error);
      
     
   }
 };

//filter by category
const handleFilter = (value,id) =>{
   let all = [...checked];
   if(value){
      all.push(id);
   }else {
      all=all.filter((c) => c !== id);
   }
   setChecked(all)
}


useEffect(()=>{
 getAllCategory();
},[]);




//get all products
const getAllProducts = async () =>{
   try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/products/get-product`);
      setProducts(data.products);
      
   } catch (error) {
      console.log(error);
      
   }
};
useEffect(() => {if (!checked.length || !radio.length ) getAllProducts()
   //eslint-disable-next-line

},[checked.length,radio.length]);

useEffect(() => {if (checked.length || radio.length) filterProducts();

},[checked,radio])



//get filtered products
const filterProducts = async () =>{
   try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/app/v1/products/product-filters`,{checked,radio});
      setProducts(data?.products);
      
   } catch (error) {
      console.log(error);
      
   }
};





  return (
     <Layout title="All products -Best Offer">
      <div className='row mt-3'>
         <div className='col-md-2'>
            <h4 className='text-center'>Filter By Category</h4>
            <div className='d-flex flex-column'>
               {categories?.map(c =>(
               <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
            ))}
            </div>
            {/* //price filter */}
            <h4 className='text-center'>Filter By Prices</h4>
            <div className='d-flex flex-column'>
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map(p =>(
                     <div key={p._id}>
                        
                        <Radio value={p.array}>{p.name}</Radio>
                        </div>
                        ))}
                         
                </Radio.Group>
            </div>
            <div className='d-flex flex-column'>
               <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTER</button>
            </div>
         </div>
         <div className='col-md-9'>
            {/* //{JSON.stringify(radio,null,4)} */}
            <h1 className='text-center'>All Products</h1>
            <div className='d-flex flex-wrap'>
            {products?.map((p) => (
            //   <Link
            //     key={p._id}
            //     to={`/dashboard/admin/product/${p.slug}`}
            //     className="product-link"
            //   >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/app/v1/products/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text"> {p.description.substring(0,30)}..</p>
                    <p className="card-text"> $ {p.price}</p>
                    <button className='btn btn-primary mb-1'>MORE DETAILS</button>
                    <button className='btn btn-secondary mb-1'>ADD TO CART</button>
                  </div>
                </div>
               //  </Link>
            ))}
            </div>
         </div>
      </div>
         
     </Layout>
  )
}

export default HomePage;
