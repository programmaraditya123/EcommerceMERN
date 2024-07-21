import React, { useState , useEffect } from 'react'
import Adminmenu from '../../components/layout/Adminmenu';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
//import { useAuth } from '../context/Context';
import moment from 'moment';
import { useAuth } from '../../context/Context';
import {Select} from 'antd';
const {Option} =Select;


const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"])
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setorders] = useState([]);
    const [auth, setAuth] = useAuth();



    //get orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/app/v1/auth/all-order`);
            setorders(data);

        } catch (error) {
            console.log(error);

        }
    };
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);


    const handleChange = async (orderid,value) => {
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/app/v1/auth/order-status/${orderid}`,{status:value});
            getOrders();
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <Layout title={"All orders data"}>
            <div className='row'>
                <div className='col-md-3'>
                    <Adminmenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Orders</h1>
                    {
                        orders?.map((o, i) => {
                            return (
                                <div className='border shadow'>
                                    <div className='table'>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Select bordered={false} onChange={(value) => handleChange(o._id,value)} defaultValue={o?.status}>
                                                {status.map((s,i) =>(
                                                    <option key={i} value={s}>
                                                        {s}
                                                    </option>
                                                ))}

                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createAt).fromNow()}</td>
                                            {/* <td>{o?.payment.success ? "success" : "Failed"}</td> */}
                                            <td>{o?.products?.length}</td>
                                        </tbody>
                                    </div>
                                    <div className="conatiner">
                                        {o?.products?.map((p, i) => (
                                            <div className="row mt-2 p-3 card flex-row">
                                                <div className="col-md-4">
                                                    <img
                                                        src={`${process.env.REACT_APP_API}/app/v1/products/get-photo/${p._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        width="100px"
                                                        height="100px"
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <p>PRICE : {p.price}</p>

                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                </div>

        </Layout>
    )
}

export default AdminOrders;
