/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react'
import { PRODUCTS, PRODUCTSCART } from '../components/products';
import axios from '../api/axios.js';


export const ShopContext = createContext({});
const shopcontext = (props) => {
  const [cartItems, setCartItems] = useState(PRODUCTSCART);
  const [products, setProducts] = useState(PRODUCTS);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalChoosed, setTotalChoosed] = useState(0);
  const [totalProducts, settotalProducts] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [productsChoosedToBuy, setProductsChoosedToBuy] = useState([]);

  const createOrder = (userID, totalPrice, paymentMethod) => {
    if (userID !== 0) {
      let orderID = 0;
      axios.post("/api/create-order", { userID, totalPrice, paymentMethod })
        .then(
          (response) => {
            setFavorites(response.data);
            console.log(response.data);

            orderID = response.data.order_id;
            console.log(productsChoosedToBuy);

            productsChoosedToBuy.forEach((item) => {
              const productID = item.product_id;
              const quantity = item.quantity;
              const price = item.price;

              //add to order details
              axios.post("/api/create-order-details", { orderID, productID, quantity, price })
              .then(
                (response) => {
                  console.log(response.data);
                }
              )
              .catch(function (error) {
                console.log(error.message);
              });

              //del in cart
              axios.post("/api/remove-to-cart", {userID, productID})
              .then(
                (response) => {
                  console.log("aaa", response.data);
                }
              )
              .catch(function (error) {
                console.log(error.message);
              });
            });

          }
        )
        .catch(function (error) {
          console.log(error.message);
        });      
    }
  }
  const updatePaymentStatus = (orderID, paymentStatus) => {
    axios.post("api/update-payment-status", { orderID, paymentStatus })
      .then(
        (response) => {
          console.log(response.data);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }
  const updateOrderStatus = (orderID, orderStatus) => {
    axios.post("api/update-order-status", { orderID, orderStatus })
      .then(
        (response) => {
          console.log(response.data);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const resetTotalChoosed = () => {
    setTotalChoosed(0);
  }

  const addToProductsChoosed = (productID, price, quantity) => {
    let sum = totalChoosed;
    sum += Number(price)*Number(quantity);
    setTotalChoosed(sum);

    const newProduct = {
      product_id: productID,
      quantity: quantity,
      price: price
    };
    setProductsChoosedToBuy([...productsChoosedToBuy, newProduct]);
    console.log(productsChoosedToBuy);
  }

  const removeFromProductsChoosed = (productID, price, quantity) => {
    let sum = totalChoosed;
    sum -= Number(price)*Number(quantity);
    setTotalChoosed(sum);

    const filteredItems = productsChoosedToBuy.filter((item) => item.key !== productID);
    setProductsChoosedToBuy(filteredItems);
    console.log(productsChoosedToBuy);
  };

  const loadFavs = (userID) => {
    if (userID !== 0) {
      axios.post("/api/get-favs", { userID })
        .then(
          (response) => {
            setFavorites(response.data);
            console.log(response.data);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  }


  const addToFavs = (userID, productID) => {
    if(userID!==0){
      axios.post("/api/add-to-favs", { userID, productID })
        .then(
          (response) => {
            setFavorites(response.data);
            console.log(response);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  const removeFromFavs = (userID, productID) => {
    if(userID!==0){
      axios.post("/api/remove-from-favs", { userID, productID })
        .then(
          (response) => {
            console.log(response);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  const loadProducts = () => {
    const PRODUCTS = [];

    axios.post("/api/get-products")
      .then(
        (response) => {
          PRODUCTS.push(...response.data);
          setProducts(PRODUCTS);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const loadProductsCart = () => {
    const userID = JSON.parse(localStorage.getItem('user')).id;
    const PRODUCTSCART = [];

    // Lấy sản phẩm dựa trên cái loại sản phẩm
    const categoryProducts = axios.get(`/api/get-products?category=${selectedCategory}`)
      .then((response) => {
        PRODUCTSCART.push(...response.data);
        setCartItems(PRODUCTSCART);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios.post("/api/get-cart", { userID })
      .then(
        (response) => {
          PRODUCTSCART.push(...response.data);
          setCartItems(PRODUCTSCART);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }
  // Cập nhật cái loại sản phẩm được chọn
  const updateSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const getTotalCartAmount = () => {
    var total = Number(0);
    for (let i = 0; i < cartItems.length; i++) {
      let itemInfo = PRODUCTS.find((product) => product.id === Number(cartItems[i].product_id));

      let itemPrice = itemInfo.price;
      if (itemPrice === null)
        itemPrice = 0;

      total += Number(itemPrice);
    }
    setTotalAmount(total);
    return totalAmount;
  };

  const getTotalCartProducts = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item].quantity;
    }
    settotalProducts(total);
    return totalProducts;
  };


  const addToCart = (productID, userID) => {
    if (userID !== 0) {
      try {
        axios.post("/api/add-to-cart", { userID, productID })
          .then(
            (response) => {
              console.log(response);
              for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id === productID) {
                  cartItems[i].quantity++;
                  break;
                }
              }
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
    if (userID !== 0) {
      try {
        axios.post("/api/remove-to-cart", { userID, productID })
          .then((response) => {
            console.log(response);
            for (let i = 0; i < cartItems.length; i++) {
              if (cartItems[i].id === productID) {
                cartItems[i].quantity--;
                break;
              }
            }
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateCartItemCount = (newQuantity, productID, userID) => {
    try {
      axios.post("/api/update-to-cart", { newQuantity, productID, userID })
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
      axios.post("/api/clear-cart", { userID })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
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

  const filterByPrice = (minPrice, maxPrice) => {
    const filteredProducts = products.filter((product) => {
      const price = product.price;
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredProducts(filteredProducts);
  };
  const contextValue = {
    cartItems,
    favorites,
    totalAmount,
    totalChoosed,
    totalProducts,
    productsChoosedToBuy,
    createOrder,
    updatePaymentStatus,
    updateOrderStatus,
    loadProducts,
    loadProductsCart,
    addToCart,
    removeToCart,
    updateCartItemCount,
    resetTotalChoosed,
    getTotalCartAmount,
    getTotalCartProducts,
    clearCart,
    resetCart,
    viewProductDetails,
    closeProductDetails,
    addToProductsChoosed,
    removeFromProductsChoosed,
    selectedProduct,
    products,
    loadFavs,
    addToFavs,
    removeFromFavs,
    filterByPrice,
    selectedCategory,
    updateSelectedCategory,
  };

  console.log("ShopContext ", cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};


export default shopcontext