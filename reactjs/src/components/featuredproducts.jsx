/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { FiShoppingBag, FiSearch } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { ShopContext } from './shopcontext';
import axios from '../api/axios.js';

const featuredproducts = () => {
  const [userID, setUserID] = useState(0);
  const [flagFaved, setFlagFaved] = useState(0);
  const [hover, setHover] = useState(false);
  const shopcontext = useContext(ShopContext);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [removeFromWishlist, setRemoveFromWishlist] = useState(false);
  const [notLogin, setNotLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_id = JSON.parse(user).id;
      setUserID(user_id);
    }
    shopcontext.loadProducts();
  }, [userID]);

  const handleAddToCart = (productID) => {
    if (userID != 0) {
      var quantity = 1;
      axios.post("/api/add-to-cart", { userID, productID, quantity })
        .then(
          (response) => {
            console.log(response);
          }
        )
        .catch(function (error) {
          throw error;
        });
    }
    else {
      setNotLogin(true);
    }
  }

  const handleViewProductDetails = (productID) => {
    shopcontext.viewProductDetails(productID);
  };

  const handleAddToFavs = (productID) => {
    if (userID != 0) {
      shopcontext.addToFavs(userID, productID);
      setFlagFaved(1);
      setAddedToWishlist(true);
    }
    else {
      setNotLogin(true);
    }
  };

  const handleRemoveFromFavs = (productID) => {
    shopcontext.removeFromFavs(userID, productID);
    setFlagFaved(0);
    setRemoveFromWishlist(true);
  };

  const handleCheckFaved = (productID) => {
    console.log(productID);
    axios.post("/api/check-faved", { userID, productID })
      .then(
        (response) => {
          setFlagFaved(response.data);
          console.log("flag", flagFaved);
          setHover(true);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (addedToWishlist) {
      const timer = setTimeout(() => {
        setAddedToWishlist(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [addedToWishlist]);

  useEffect(() => {
    if (removeFromWishlist) {
      const timer = setTimeout(() => {
        setRemoveFromWishlist(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [removeFromWishlist]);

  useEffect(() => {
    if (notLogin) {
      const timer = setTimeout(() => {
        setNotLogin(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notLogin]);

  return <>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
      {shopcontext.products?.slice(0, 4).map((product) => (
        <div
          className="col mb-5"
          onMouseEnter={() => handleCheckFaved(product.id)}
          onMouseLeave={() => setHover(false)}
        >
          <Link key={product.id} className="card h-100 m-auto">
            <img src={product.image} className="card-img-top img-fluid" alt="..." />
            {hover && (
              <div className="overlay">
                <button className="button" onClick={() => handleAddToCart(product.id)}>
                  <FiShoppingBag />
                </button>
                {flagFaved ?
                  < button className="button" onClick={() => handleRemoveFromFavs(product.id)}>
                    <AiFillHeart />
                  </button>
                  :
                  < button className="button" onClick={() => handleAddToFavs(product.id)}>
                    <AiOutlineHeart />
                  </button>
                }
                <Link to="/details" onClick={() => handleViewProductDetails(product.id)}>
                  <button className="button">
                    <FiSearch />
                  </button>
                </Link>
              </div>
            )}
            <div className="card-body">
              <p className="card-text mb-2">{product.brand}</p>
              <h5>{product.name}</h5>
              <ReactStars count={5} edit={false} isHalf={true} value={product.star} size={24} activeColor="#EA9D5A" />
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

    {addedToWishlist && (
      <div className="wishlist-notification">
        <p>You've added {name} to your wishlist.</p>
      </div>
    )}

    {removeFromWishlist && (
      <div className="wishlist-notification">
        <p>You've removed {name} from your wishlist.</p>
      </div>
    )}

    {notLogin && (
      <div className="wishlist-notification">
        <p>You've not login.</p>
      </div>
    )}
  </>;
}

export default featuredproducts