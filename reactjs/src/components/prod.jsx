/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from './shopcontext';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiSearch } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import Details from '../pages/details';
import '../styles/prod.scss'
const Prod = (props) => {
  const { id, name, price, image, brand } = props.data;
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const shopcontext = useContext(ShopContext);
  const [hover, setHover] = useState(false);

  const handleAddToCart = () => {
    // addToCart(id);
  };

  const handleViewProductDetails = () => {
    // shopcontext.viewProductDetails(id);
  };

  const handleAddToFavs = () => {
    setAddedToWishlist(true);
    shopcontext.addToFavs(id);
  };
  useEffect(() => {
    if (addedToWishlist) {
      const timer = setTimeout(() => {
        setAddedToWishlist(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [addedToWishlist]);

  return (
    <>
      <div
        className="col mb-5"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link key={id} className="card h-100 m-auto">
          <img src={image} className="card-img-top img-fluid" alt="..." />
          {hover && (
            <div className="overlay">
              <button className="button" onClick={handleAddToCart}>
                <FiShoppingBag />
              </button>
              < button className="button" onClick={handleAddToFavs}>
                <AiOutlineHeart />
              </button>
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
            <ReactStars count={5} edit={false} value={4.5} size={24} isHalf={true} activeColor="#EA9D5A" />
            <div className="mb-3">
              <p className="price mb-2">
                <span className="red">{price} </span>&nbsp; <strike>{price * 2}đ</strike>
              </p>
            </div>
          </div>
        </Link>
      </div>

      {addedToWishlist && (
        <div className="wishlist-notification">
          <p>Bạn vừa thêm {name} vào sản phẩm yêu thích.</p>
        </div>
      )}
    </>
  );
};

export default Prod;