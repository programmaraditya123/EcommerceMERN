import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout';
import Adminmenu from '../../components/layout/Adminmenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate,useParams } from 'react-router-dom';
const {Option} = Select;

const UpdateProduct= () => {
  const navigate = useNavigate();
  const params= useParams();

  const [categories,setCategories] = useState([]);
  const[name,setName] = useState("");
  const[description,setDescription] = useState("");
  const[category,setCategory] = useState("");
  const [price,setPrice] = useState("");
  const[quantity,setQuantity] = useState("");
  const[shipping,setShipping] = useState("");
  const[photo,setPhoto] = useState("");
  const[id,setId] = useState("");

    //get single product
    const getSingleProduct = async () =>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/products/get-product/${params.slug}`);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setId(data.product._id);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
            
        }
    };
  
    useEffect(() => {
        getSingleProduct()
        //eslint-disbale-next-line
    },[])
   

   //get all category
   const getAllCategory = async () =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/category/get-category`);
      if(data.success){
        setCategories(data.category);
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
      
    }
  };

useEffect(()=>{
  getAllCategory();
},[]);


//handlecreate function
const handleUpdate = async (e)=>{
  e.preventDefault();
  

try {
  const formData = new FormData();
  formData.append('name',name);
  formData.append('description',description);
  formData.append('category',category);
  formData.append('price',price);
  formData.append('quantity',quantity);
  formData.append('shipping',shipping);
  photo && formData.append('photo',photo);
  console.log("+++++++++++++++++++",formData)

  const {data} = await axios.put(`${process.env.REACT_APP_API}/app/v1/products/update-product/${id}`,formData);
  if(data?.success){
    toast.success("Product Updated Successfuly");
    navigate("/dashboard/admin/products")
     
  } else{
    toast.error(data?.message)
  }
  
} catch (error) {
  console.log(error);
  toast.error("Something Went Wrong")
  
}
};

//handle delete
const handleDelete = async () => {
    try {
        let answer = window.prompt("Are you sure you want to delete this product ? ");
        if (!answer) return;
        const {data} = await axios.delete(`${process.env.REACT_APP_API}/app/v1/products/delete-product/${id}`);
        
            toast.success("Product Deleted Successfuly")
            navigate("/dashboard/admin/products")
        
            toast.error(data?.message)
        } catch (error) {
        console.log(error);
        toast.error("Something WENT wRONG")
        
    }
};

  return (
    
    <Layout title="create category dashboard">
        <div className='container-fluid m-3 p-3'>

      <div className='row'>
            <div className='col-md-3'>
                <Adminmenu/>
            </div>
            <div className='col-md-9'>
                <h1>Update product</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false} placeholder="Select a caegory" size='larger' showSearch className='form-select mb-3' onChange={(value) =>{setCategory(value);}} value={category}>
                    {categories?.map((c) =>(<Option key={c._id} value={c._id}>{c.name}</Option>))}
                  </Select>
                  <div className='mb-3'>
                    <label  className='btn btn-outline-secondary col-md-12'>
                      {photo ? photo.name : "Upload Photo"}
                      <input type="file" name='photo' accept='images/*' onChange={(e) =>setPhoto(e.target.files[0])} hidden />
                    </label>
                  </div>

                  <div className='mb-3'>
                    {photo ? (<div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product-photo' height={"200px"} className='img img-responsive'/>
                    </div>) : (<div className='text-center'>
                      <img src={`${process.env.REACT_APP_API}/app/v1/products/get-photo/${id}`} alt='product-photo' height={"200px"} className='img img-responsive'/>
                    </div>)}
                  </div>

                  <div className='mb-3'>
                    <input type='text' value={name} placeholder='Write product desription' className='form-control' onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className='mb-3'>
                    <input type='text' value={description} placeholder='Write a name for your product' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div className='mb-3'>
                    <input type='number' value={price} placeholder='Enter product Price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className='mb-3'>
                    <input type='number' value={quantity} placeholder='Enter product Quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                  </div>
                  <div className='mb-3'>
                    <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) =>{setShipping(value)}} value={shipping ? "Yes" : "No"}> 
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
                  </div>
                </div>
            </div>
            </div>
        </div>    
    </Layout>
  )
}

export default UpdateProduct;
