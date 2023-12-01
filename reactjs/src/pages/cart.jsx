/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { ShopContext } from '../components/shopcontext'
import React, { useContext, useState, useEffect } from 'react'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { PRODUCTS, PRODUCTSCART } from '../components/products'
import CartItem from '../components/cartitem'
import { useNavigate } from 'react-router-dom'


const cart = () => {
  const shopcontext = useContext(ShopContext);
  const totalAmount = shopcontext.getTotalCartAmount();
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
    }    
  }, []);

  useEffect(() => {
    shopcontext.loadProductsCart(userID);
    shopcontext.resetTotalChoosed();
    console.log("totalAmount ", totalAmount);
    console.log("totalChoosed ", shopcontext.totalChoosed);
  }, [userID]);

  return <>
    <section className="cart">
      <div className="container-xxl p-5">
        {totalAmount > 0 ?
          <div className="row">
            <div className='pa-2 text-center'>
              <h2>Giỏ hàng</h2>
            </div>
            {/* <div className="col-12 col-md-5 text-center">
              <h5>Sản phẩm</h5>
            </div>
            <div className="col-12 col-md-5 text-center">
              <h5>Chi tiết</h5>
            </div> */}

            <div className="p-3">
              {[...shopcontext.cartItems].map((product) => {
                return <CartItem key={product.id} data={product} />;
              })}
              <div className='col-12 p-2 text-end'>
                <button onClick={() => shopcontext.clearCart(userID)} id='clear-cart'> Xóa giỏ hàng </button>
              </div>

              <hr />
              <div className="row">
                <div className="col-12 col-md-6 d-flex m-auto justify-content-center mt-4">
                  <button onClick={() => navigate("/shop")}>
                    {isMobile ? "Continue" : "Tiếp Tục Mua Sắm"}
                  </button>
                </div>

                <div className="col-12 col-md-6 total m-auto d-flex flex-column p-5">
                  <div className="col-12">
                    <div className="text-end">
                      <h2 className="mb-3">
                        <b>Tổng tiền</b>
                      </h2>
                      <div className="align-items-center">
                        <div>
                          <p className="total-price text-end">
                            <b>{shopcontext.totalChoosed} VND</b>
                          </p>
                        </div>
                      </div>
                      <Link to={`/checkout/${shopcontext.totalChoosed}`} state={{ data: dataToPass }}>
                        <button
                          className="mt-5">
                          {isMobile ? "Check Out" : "Đi Đến Thanh Toán"}
                        </button>
                      </Link>
                    </div>
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