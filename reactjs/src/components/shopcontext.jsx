/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react'
import { PRODUCTS, PRODUCTSCART } from '../components/products';
import DataFetcher from '../components/productscontext';
import axios from '../api/axios.js';


export const ShopContext = createContext({});
// const  loadProductsCart = () => {
//   const [PRODUCTSCART, setProductsCart] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userID = user.id;
//   axios.post("http://127.0.0.1:8001/api/get-cart", { userID })
//     .then((response) => {
//       setProductsCart(response.data);
//       console.log(response.data);
//     })
//     .catch((error) => {
//       throw error;
//     });
//   return PRODUCTSCART;
// }

// const  getDefaultCart = () => {
//   const cart = [];
//   for (let i = 0; i < PRODUCTSCART.length; i++){
//     cart[i] = PRODUCTSCART[i];
//     console.log(cart[i].product_id);
//   }
//   return cart;
// };


const shopcontext = (props) => {
  const [cartItems, setCartItems] = useState(PRODUCTSCART);
  const [totalAmount, setTotalAmount] = useState(0);

  const  loadProductsCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user.id;
    const PRODUCTSCART = [];

    try{
      const response = axios.post("http://127.0.0.1:8001/api/get-cart", { userID });
      PRODUCTSCART.push(...response.data);
      setCartItems(PRODUCTSCART);
    } catch (error) {
      console.error(error);
    }
  }

  const getTotalCartAmount = () => {
    var total = Number(0);
    for (let i = 0; i < cartItems.length; i++) {
      let itemInfo = PRODUCTS.find((product) => product.id === Number(cartItems[i].product_id));
      
      let itemPrice = itemInfo.price;
      if(itemPrice === null)
        itemPrice = 0;
      
      total += Number(itemPrice);
    }
    setTotalAmount(total);
    return totalAmount;
  };

  const getTotalCartProducts = () => {
    let totalProducts = [];
    for (const item in cartItems) {
      if (cartItems[item].product_id > 0) {
        totalProducts += cartItems[item].product_id;
      }
    }
    return totalProducts;
  };
  

  const addToCart = (productID, userID) => {
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
  };
  
  const removeToCart = (productID, userID) => {
    try {
      axios.post("http://127.0.0.1:8001/api/remove-to-cart", { userID, productID })
      .then((response) =>{
        console.log(response);
      })
      .catch((error) =>{
        throw error;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartItemCount = (newQuantity, productID, userID) => {
      try {
        axios.post("/api/add-to-cart", {newQuantity, productID, userID })
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
  };
  
  const clearCart = (userID) => {
    try {
      axios.post("http://127.0.0.1:8001/api/clear-cart", { userID})
      .then((response) =>{
        console.log(response);
      })
      .catch((error) =>{
        throw error;
      });
    } catch (error) {
      console.error(error);
    }
  };  

  const resetCart = () => {
    setCartItems([]);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const viewProductDetails = (productId) => {
    setSelectedProduct(productId);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };
  

  const contextValue = {
    cartItems,
    totalAmount,
    loadProductsCart,
    addToCart,
    removeToCart,
    updateCartItemCount,
    getTotalCartAmount,
    getTotalCartProducts,
    clearCart,
    resetCart,
    viewProductDetails,
    closeProductDetails,
    selectedProduct,
  };

  console.log("ShopContext ",cartItems);

  return (
    // <DataFetcher>
    //   {(data) => (
        <ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>
    //   )} 
    // </DataFetcher>

  );
};


export default shopcontext