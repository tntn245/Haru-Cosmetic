/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { ShopContext } from '../components/shopcontext'
import React, { useContext, useState, useEffect } from 'react'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { PRODUCTS, PRODUCTSCART } from '../components/products'
import CartItem from '../components/cartitem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'


const cart = () => {
  const shopcontext = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(shopcontext.getTotalCartAmount());
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [userID, setUserID] = useState(0);
  const [dataToPass, setDataToPass] = useState([]);

  const handleResize = () => {
    if (window.innerWidth < 576) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  window.addEventListener("resize", handleResize)

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_id = JSON.parse(user).id;
      setUserID(user_id);
      shopcontext.loadProductsCart(user_id);
      shopcontext.resetTotalChoosed();
      console.log("totalAmount ", totalAmount);
      console.log("totalChoosed ", shopcontext.totalChoosed);
    }    
  }, []);

  useEffect(() => {
    console.log("totalAmount ", totalAmount);
    console.log("totalChoosed ", shopcontext.totalChoosed);
  }, [userID]);

  return <>
    <section className="cart">
      <div className="container-xxl p-5">
        {totalAmount > 0 ?
          <div className="row">
            <div className='row'>
              <div className="col-6">
                  <button onClick={() => navigate("/shop")} style={{backgroundColor: 'rgba(0,0,0,0)', color: '#000'}}>
                  <ArrowBackIcon />{isMobile ? "Back" : "Tiếp Tục Mua Sắm"}
                  </button>
              </div>
              <div className='pa-2 col-6 text-center'>
              </div>
            </div>
            <div className="p-3">
              {[...shopcontext.cartItems].map((product) => {
                return <CartItem key={product.id} data={product} />;
              })}

              <hr />
              <div className="row">
                <div className='col-6 text-start'>
                  <button onClick={() => shopcontext.clearCart(userID)} id='clear-cart' style={{marginLeft: '5%'}}> Xóa giỏ hàng </button>
                </div>
                <div className="col-6">
                      <div className="text-end" style={{marginRight: '15%'}}>
                        <h2 className="mb-3">
                          <b>Tổng tiền</b>
                        </h2>
                        <div className="align-items-center">
                          <div>
                            <p className="total-price text-end">
                              <b>{shopcontext.totalChoosed} VNĐ</b>
                            </p>
                          </div>
                        </div>
                        {shopcontext.totalChoosed > 0 &&
                        <Link to="/checkout" state={{ data: shopcontext.totalChoosed }}>
                          <button>
                            {isMobile ? "Check Out" : "Đi Đến Thanh Toán"}
                          </button>
                        </Link>
                        }
                      </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="container-xxl">
            <div className="row">
              <div className="text-center p-5 mb-4">
                <h2>Giỏ hàng của bạn đang trống!!!</h2>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  </>;
}

export default cart