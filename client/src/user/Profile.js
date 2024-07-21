import React,{useState , useEffect} from 'react'
import Layout from '../components/layout/Layout';
import UserMenu from '../components/layout/UserMenu';
import { useAuth } from '../context/Context';
import {toast} from 'react-hot-toast';
import axios from 'axios';


const Profile = () => {
    //context
    const[auth,setAuth] = useAuth();

    //states
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get data
    useEffect(() => {
        const {name,email,phone,address} = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    } , [auth?.user])

   //form handling function
   const handleSubmit = async (e) => {
    e.preventDefault();
     
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/app/v1/auth/profile`,{name,email,password,phone,address});
        if(data?.error){
            toast.error(data?.error)
        }else{
            setAuth({...auth,user:data?.updatedUser});
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = data.updateduser;
            localStorage.setItem("auth",JSON.stringify(ls));
            toast.success("Profile updated successfully");
        }
        
        // if(res && res.data.success){
        //     toast.success(res.data && res.data.message);
        //     navigate('/login');
        // } else{
        //     toast.error(res.data.message)
        // }
        
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        
    }
}

  return (
    <Layout title={"Your Profile"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
            <div className='col-md-9'>
            <div className="register">
        <h1 className='title'>User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              
               
            />
            </div>
            <div className="mb-3">

             
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail2"
              placeholder="Enter your email address"
             
              disabled
              
              />
            </div>
             
          <div className="mb-3">


            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter A Strong Password"
            
              
              />
            </div>
            <div className="mb-3">

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              
              className="form-control"
              id="exampleInputEmail3"
              placeholder="Enter Phone No."
           
              
              />
            </div>
            <div className="mb-3">

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail4"
              placeholder="Enter Your Address"
             
              />
            </div>
            {/* <div className="mb-3">

            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your Favourite Sports ?"
              required
              
              />
            </div> */}
          
 
             <button type="submit" className="btn btn-primary">
               UPDATE
             </button>
        </form>
      </div>
            </div>
            </div>
        </div>
      
    </Layout>
  )
}

export default Profile;
