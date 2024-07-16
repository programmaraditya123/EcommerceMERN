import React,{useState} from "react";
import Layout from "./../../components/layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom';
import { useAuth } from "../../context/Context";

const ForgotPassword = () => {
  
    const [email, setEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [answer , setAnswer] = useState("");
    const [auth , setAuth] = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/app/v1/auth/forgot-password`,{email,newpassword,answer});
        
        if(res && res.data.success){
          toast.success(res.data && res.data.message);
           
          navigate('/login');
        } else{
          toast.error(res.data.message)
        }
        
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        
      }
    }
    
  
      return (
      <Layout title="Forgot password ecommerce -app">
        <div className="register">
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>
             
              <div className="mb-3">
  
               
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your email address"
                required
                
                />
              </div>
               
            <div className="mb-3">
                <input
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                placeholder="Enter A Strong Password"
                required
                
                />
              </div>

              <div className="mb-3">
                <input
                type="password"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                placeholder="Enter Your Favourite Sports"
                required
                
                />
              </div>



              
  
               
               <button type="submit" className="btn btn-primary">
                 RESET
               </button>

          </form>
        </div>
      </Layout>
      
       
      
    )
  }

export default ForgotPassword;
