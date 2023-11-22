/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from './shopcontext';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiSearch } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Details from '../pages/details';
import '../styles/prod.scss'
import axios from '../api/axios.js';

const Prod = (props) => {
  const { id, name, price, image, brand, star } = props.data;
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [removeFromWishlist, setRemoveFromWishlist] = useState(false);
  const shopcontext = useContext(ShopContext);
  const [hover, setHover] = useState(false);
  const [flagFaved, setFlagFaved] = useState(0);
  const [userID, setUserID] = useState(0);

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

  const handleViewProductDetails = () => {
    // shopcontext.viewProductDetails(id);
  };

  const handleAddToFavs = (productID) => {
    shopcontext.addToFavs(userID, productID);
    setFlagFaved(1);
    setAddedToWishlist(true);
  };
  const handleRemoveFromFavs = (productID) => {
    shopcontext.removeFromFavs(userID, productID);
    setFlagFaved(0);
    setRemoveFromWishlist(true);
  };

  const handleCheckFaved = (productID) => {
    if(userID!==0){
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
      }
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

  return (
    <>
      <div
        className="col mb-5"
        onMouseEnter={() => handleCheckFaved(id)}
        onMouseLeave={() => setHover(false)}
      >
        <Link key={id} className="card h-100 m-auto">
          <img src={image} className="card-img-top img-fluid" alt="..." />
          {hover && (
            <div className="overlay">
              <button className="button" onClick={() => handleAddToCart(id)}>
                <FiShoppingBag />
              </button>
                {flagFaved ?
                  < button className="button" onClick={() => handleRemoveFromFavs(id)}>
                    <AiFillHeart />
                  </button>
                  :
                  < button className="button" onClick={() => handleAddToFavs(id)}>
                    <AiOutlineHeart />
                  </button>
                }
              <Link to="/details" onClick={handleViewProductDetails}>
                <button className="button">
                  <FiSearch />
                </button>
              </Link>
            </div>
          )}
          <div className="card-body">
            <p className="card-text mb-2">{brand}</p>
            <h5>{name}</h5>
            <ReactStars count={5} edit={false} isHalf={true} value={star} size={24} activeColor="#EA9D5A" />
            <div className="mb-3">
              <p className="price mb-2">
                <span className="red">{price} </span>&nbsp; <strike>{price * 2}$</strike>
              </p>
            </div>
          </div>
        </Link>
      </div>

      {addedToWishlist &&(
        <div className="wishlist-notification">
          <p>You've added {name} to your wishlist.</p>
        </div>
      )}
            
      {removeFromWishlist &&(
        <div className="wishlist-notification">
          <p>You've removed {name} from your wishlist.</p>
        </div>
      )}
    </>
  );
};

export default Prod;