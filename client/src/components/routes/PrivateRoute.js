import {useState , useEffect} from 'react';
import {useAuth} from '../../context/Context';
import {Outlet} from 'react-router-dom';
import axios from 'axios';
import Spineer from '../Spineer';
 
export default function PrivateRoute(){
    const[ok,setOk] = useState();
    const[auth,setAuth] = useAuth();

    useEffect(() =>{
        const autocheck = async () =>{
            const res = await axios.get("http://localhost:8080/app/v1/auth/user-auth");
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
    };
    if(auth?.token) autocheck()}
    ,[auth?.token]);


    return ok ? <Outlet/> : <Spineer/>;
}