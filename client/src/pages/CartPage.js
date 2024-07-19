import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Context";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
        let total = 0;
        cart?.map((item) => {
            total  = total + item.price;
        });
        return total.toLocaleString("en-US",{
            style:"currency",
            currency:"USD",
        })
    } catch (error) {
        console.log(error);
    }
  };

 //delete item 
 const removeCartItem = (pid) =>{
    try {
        let mycart = [...cart];
        let index = mycart.findIndex(item => item._id === pid);
        mycart.splice(index,1);
        setCart(mycart); 
        localStorage.setItem("cart",JSON.stringify(mycart));
        
    } catch (error) {
        console.log(error);
        
    }
 };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello , ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `YOU HAVE ${cart.length} ITEMS IN YOUR CART ${
                    auth?.token ? "" : "PLEASE LOGIN TO CHECKOUT"
                  }`
                : "YOUR CART IS EMPTY"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
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
                    <p>{p.description.substring(0,30)}</p>
                    <p>PRICE : {p.price}</p>
                    <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>REMOVE</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>cart summary</h2>
            <p> Total | Checkout | Payment</p>
            <hr/>
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
                <>
                <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>UPDATE ADDRESS</button>
                </div>
                </>
            ) : (
                <div className="mb-3">
                    {
                        auth?.token ? (
                            <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>UPADTE ADDRESS</button>
                        ) : (
                            <button className="btn btn-outline-warning" onClick={() => navigate("/login" ,{state:"/cart"}) }>PLEASE LOGGIN TO CHECKOUT</button>
                        )
                    }
                </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
