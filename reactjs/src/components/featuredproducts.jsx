/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { FiShoppingBag, FiSearch } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { ShopContext } from './shopcontext';
import axios from '../api/axios.js';

const featuredproducts = () => {
  const [userID, setUserID] = useState(0);
  const [hover, setHover] = useState(false);
  const shopcontext = useContext(ShopContext);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_id = JSON.parse(user).id;
      setUserID(user_id);
    }
  }, [userID]);

  const handleAddToCart = async (productID) => {
    if (userID !== 0) {
      await axios.post("/api/add-to-cart", { userID, productID })
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

  const handleViewProductDetails = (productID) => {
    // shopcontext.viewProductDetails(id);
  };

  const handleAddToFavs = (productID) => {
    shopcontext.addToFavs(userID, productID);
  };


  return <>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
      {shopcontext.cartItems?.slice(0, 4).map((product) => (
        <div
          className="col mb-5"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Link key={product.product_id} className="card h-100 m-auto">
            <img src={product.image} className="card-img-top img-fluid" alt="..." />
            {hover && (
              <div className="overlay">
                <button className="button" onClick={() => handleAddToCart(product.product_id)}>
                  <FiShoppingBag />
                </button>
                < button className="button" onClick={() => handleAddToFavs(product.product_id)}>
                  <AiOutlineHeart />
                </button>
                <Link to="/details" onClick={() => handleViewProductDetails(product.product_id)}>
                  <button className="button">
                    <FiSearch />
                  </button>
                </Link>
              </div>
            )}
            <div className="card-body">
              <p className="card-text mb-2">{product.brand}</p>
              <h5>{product.name}</h5>
              <ReactStars count={5} edit={false} value={4} size={24} activeColor="#EA9D5A" />
              <div className="mb-3">
                <p className="price mb-2">
                  <span className="red">{product.price} </span>&nbsp; <strike>{product.price * 2}$</strike>
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>

  </>;
}

export default featuredproducts