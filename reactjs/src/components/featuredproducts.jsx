/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import axios from '../api/axios.js';

const featuredproducts = () => {
  const [products, setProducts] = useState([]);
  const [userID, setuserID] = useState('');

  useEffect(() => {
    axios.get("http://127.0.0.1:8001/get-products")
      .then((response) =>{
        setProducts(response.data);
        // console.log(response);
      })
      .catch((error) =>{
        throw error;
      });
  }, []);

  
  const handleAddToCart = async (event) => {
    event.preventDefault();

    setuserID(localStorage.getItem("user").id);

    try {
      await axios.post("/api/add-to-cart", { userID })
        .then(
          (response) => {
          }
        )
        .catch(function (error) {
        });
    } catch (error) {
      console.log(error);
    }
  }

  return <>
     <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
      {products?.slice(0, 4).map((product) => (
        <div className="col mb-5">
        <div key={product.id} className="card h-100 m-auto" onClick={handleAddToCart}>
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