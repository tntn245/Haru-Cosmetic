/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { ShopContext } from './shopcontext'
import React, { useContext, useState } from 'react'
import { RiDeleteBack2Line } from 'react-icons/ri'
const cartitem = (props) => {
  const [showDiv, setShowDiv] = useState(true);
  const { id, name, price, image, brand, user_id, quantity, inventory_quantity } = props.data;
  const [quantity_state, setQuantity] = useState(quantity)
  const shopcontext = useContext(ShopContext);

  const handleIncreaseNumber = () => {
    shopcontext.updateCartItemCount(Number(quantity_state + 1), id, user_id)
    setQuantity(quantity_state + 1);
  }
  const handleDecreaseNumber = () => {
    shopcontext.updateCartItemCount(Number(quantity_state - 1), id, user_id)
    setQuantity(quantity_state - 1);
    if (quantity_state < 1) {
      shopcontext.removeToCart(id, user_id);
      setShowDiv(false);
    }
  }
  const handleUpdateNumber = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    shopcontext.updateCartItemCount(newQuantity, id, user_id);
    if (quantity_state < 1) {
      shopcontext.removeToCart(id, user_id);
      setShowDiv(false);
    }
  }
  const handleRemoveToCart = () => {
    shopcontext.removeToCart(id, user_id);
    setShowDiv(false);
  }
  return <>
    {showDiv &&
      <div className="container card my-3">
        <div className="row g-3">
          <div className="col-12 col-md-5">
            <div className="p-3">
              <div className="cart-item-image m-auto">
                <img src={image} className="card-img-top img-fluid" alt="..." />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="p-3">
              <h2>{name}</h2>
              <p className="cart-item-id">Product Brand: <b className='text-center mb-1'>{brand}</b></p>
              <p className="cart-item-id">Product Price: <b className='text-center mb-1'>${price}</b></p>
              <p className="cart-item-id">Product Number: <b className='text-center mb-3'>{id}</b></p>
              <p className="cart-item-id">Items in Stock: <b className='text-danger'>{inventory_quantity}</b></p>
            </div>
            <div className="p-3 d-flex justify-content-between align-items-center">
              <div className="count-handler">
                <button className="btn btn-outline-secondary" onClick={handleDecreaseNumber}>-</button>
                <input className='text-danger fs-4 form-control' value={quantity_state} onChange={handleUpdateNumber} />
                <button className="btn btn-outline-secondary" onClick={handleIncreaseNumber}>+</button>
              </div>
              <button className="btn btn-outline-danger" onClick={handleRemoveToCart}>
                <RiDeleteBack2Line />
              </button>
            </div>
            <div className="p-3">
              <input type="text" className="form-control" id="coupon" placeholder="Enter coupon code..." />
            </div>
          </div>
        </div>
      </div>
    }
  </>;
}

export default cartitem