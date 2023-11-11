/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import axios from '../api/axios.js';

const featuredproducts = () => {
  const [products, setProducts] = useState([]);
  const [userID, setUserID] = useState(0);
  const [productID, setProductID] = useState(0);

  //Load sản phẩm trước khi render
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/get-products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  //Xử lý thêm vào giỏ hàng
  const handleAddToCart = async (product_id) => {
    setProductID(product_id);

    const user = localStorage.getItem('user');
    const user_id = JSON.parse(user).id;
    setUserID(user_id);
  }

  //Đợi state thay đổi rồi mới thực hiện
  useEffect(() => {
    if (userID !== 0) {
      try {
        axios.post("/api/add-to-cart", { userID, productID })
          .then(
            (response) => {
              console.log(response);
            }
          )
          .catch(function (error) {
            throw error;
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [userID]);


  return <>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
      {products?.slice(0, 4).map((product) => (
        <div className="col mb-5">
          <div key={product.id} className="card h-100 m-auto" onClick={() => handleAddToCart(product.id)}>
            <img src={product.image} className="card-img-top img-fluid" alt="..." />
            <div className="card-body">
              {/* <p className="card-text mb-2">{product.brand}</p> */}
              <h5 className='mb-3'>{product.quantity_sold} </h5>
              <div className="card-footer m-auto text-center">
                <p className='text-danger fs-4'>{product.name}</p>
                <p className="price"><span className="red"></span> {product.price} đ </p>
              </div>
              <div className="card-footer d-md-none">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to='shop' className='m-auto'>View products</Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      ))}
    </div>

  </>;
}

export default featuredproducts