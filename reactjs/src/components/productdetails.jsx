/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from './shopcontext';
import { PRODUCTS, PRODUCTS1 } from './products';
import axios from '../api/axios.js';

const ProductDetails = () => {
  const { selectedProduct, cartItems } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [userID, setUserID] = useState(0);

  // Set selectedProduct to 0
  const productId = selectedProduct || 0;

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS1.find((p) => p.id === productId);

  if (!product) {
    return null;
  }
  const cartItemAmount = cartItems[product.id];
  const [activeTab, setActiveTab] = useState('details');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleDecreaseQuantiy = () => {
    if(quantity>1)
      setQuantity(quantity-1);
  };
  const handleAddToCart = () => {
    event.target.classList.toggle("red");
    if (userID !== 0) {
      var productID = product.id;
      axios.post("/api/add-to-cart", { userID, productID, quantity})
        .then(
          (response) => {
            console.log(response);
          }
        )
        .catch(function (error) {
          throw error;
        });
    }
  }
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_id = JSON.parse(user).id;
      setUserID(user_id);
    }
  }, [userID]);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="card p-5 m-auto">
            <img src={product.image} alt="" className="card-img-top img-fluid p-2" />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-3 m-auto">
            <div className="card-body">
              <h5 className="card-title">{product.brand}</h5>
              <h3 className="card-text">{product.name}</h3>
              <p className="card-text text-start ">
                <span className="text-danger fs-4 me-2">{product.price}đ</span>
                <strike>{product.price * 2}đ</strike>
              </p>
              <p className="card-text">{product.description}</p>
              <div>
                <p className="card-text mb-1 text-start">Mô tả sản phẩm</p>
                <ul>
                  <li>First bullet point</li>
                  <li>Second bullet point</li>
                  <li>Third bullet point</li>
                </ul>
              </div>

              <div className="d-flex align-items-center mb-3 col-4 mb-5">
                <button className="btn btn-outline-secondary ms-2" onClick={() => handleDecreaseQuantiy}>-</button>
                <input className="form-control text-center" type="number"  min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                <button className="btn btn-outline-secondary me-2" onClick={() => setQuantity(quantity+1)}>+</button>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  onClick={() => handleAddToCart()}
                  id='button-link'
                  className="myButton"
                  style={{ width: '100%', height: '100%' }}
                >
                  THÊM VÀO GIỎ HÀNG
                  {cartItemAmount > 0 && ` (${cartItemAmount})`}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="hidden-navigation mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'details' ? 'active' : ''} nav-link-custom`}
              onClick={() => handleTabClick('details')}>
              CHI TIẾT SẢN PHẨM
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'instructions' ? 'active' : ''} nav-link-custom`}
              onClick={() => handleTabClick('instructions')}
            >
              HƯỚNG DẪN SỬ DỤNG
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''} nav-link-custom`}
              onClick={() => handleTabClick('reviews')}
            >
              REVIEW CỦA KHÁCH HÀNG
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'related' ? 'active' : ''} nav-link-custom`}
              onClick={() => handleTabClick('related')}
            >
              SẢN PHẨM LIÊN QUAN
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="tab-pane active">
              {/* Nội dung của tab Chi tiết sản phẩm */}
              {/* ... */}
            </div>
          )}
          {activeTab === 'instructions' && (
            <div className="tab-pane active">
              {/* Nội dung của tab Hướng dẫn sử dụng */}
              {/* ... */}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-pane active">
              {/* Nội dung của tab Review của khách hàng */}
              {/* ... */}
            </div>
          )}
          {activeTab === 'related' && (
            <div className="tab-pane active">
              <div className="card mt-3">
                <div className="d-none d-md-block">
                  <div className="row mb-3">
                    <div className="col-6 col-md-4 col-lg-8 mx-auto">
                      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                        {PRODUCTS.slice(3, 7).map((product) => (
                          <div key={product.id} className="col">
                            <div className="card h-100">
                              <img src={product.image} className="card-img-top" alt="..." />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-6 col-md-4 col-lg-8 mx-auto">
                      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                        {PRODUCTS1.slice(2, 6).map((product) => (
                          <div key={product.id} className="col">
                            <div className="card h-100">
                              <img src={product.image} className="card-img-top" alt="..." />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;