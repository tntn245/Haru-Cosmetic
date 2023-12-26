/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react'
import { PRODUCTS, PRODUCTSCART, CATEGORIES } from '../components/products';
import axios from '../api/axios.js';


export const ShopContext = createContext({});
const shopcontext = (props) => {
  const [cartItems, setCartItems] = useState(PRODUCTSCART);
  const [products, setProducts] = useState(PRODUCTS);
  const [categories, setCategories] = useState(CATEGORIES);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalChoosed, setTotalChoosed] = useState(0);
  const [totalProducts, settotalProducts] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [productsRoot, setProductsRoot] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsChoosedToBuy, setProductsChoosedToBuy] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [createdOrderID, setCreatedOrderID] = useState(0);

  const checkIsLogin = () => {
    const user = localStorage.getItem('user');
    console.log(user);
    if (user != null) {
      setIsLogin(true);
      return true;
    }
    else {
      setIsLogin(false);
      return false
    }
  }

  const createOrder = (userID, totalPrice, paymentMethod, addressID) => {
    if (userID !== 0) {
      let orderID = 0;
      const currentDate = new Date();
      const createdDate = currentDate.toISOString().split('T')[0];

      axios.post("/api/create-order", { userID, totalPrice, paymentMethod, addressID, createdDate })
        .then(
          (response) => {
            setFavorites(response.data);
            console.log(response.data);

            orderID = response.data.order_id;
            setCreatedOrderID(orderID)
            console.log(productsChoosedToBuy);
            
            if(paymentMethod === "COD"){
              updatePaymentStatus(orderID, "Chưa thanh toán")
              updateOrderStatus(orderID, "Chờ duyệt")
            }

            productsChoosedToBuy.forEach((item) => {
              const productID = item.id;
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
              axios.post("/api/remove-to-cart", { userID, productID })
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
  const updateDeliveredDate = (orderID, deliveredDate) => {
    axios.post("api/update-delivered-date", { orderID, deliveredDate })
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
    setProductsChoosedToBuy([]);
  }

  const addToProductsChoosed = (productID, price, quantity) => {
    let sum = totalChoosed;
    sum += Number(price) * Number(quantity);
    setTotalChoosed(sum);

    axios.post("api/get-product-inf", { productID })
      .then(
        (response) => {
          const newProduct = { ...response.data[0], quantity: quantity }
          setProductsChoosedToBuy([...productsChoosedToBuy, newProduct]);
          console.log(productsChoosedToBuy);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const removeFromProductsChoosed = (productID, price, quantity) => {
    let sum = totalChoosed;
    sum -= Number(price) * Number(quantity);
    setTotalChoosed(sum);

    const filteredItems = productsChoosedToBuy.filter((item) => item.product_id !== productID);
    setProductsChoosedToBuy(filteredItems);
    console.log(productsChoosedToBuy);
  };

  const loadFavs = (userID) => {
    if (userID !== 0) {
      axios.post("/api/get-favs", { userID })
        .then(
          (response) => {
            setFavorites(response.data[0]);
            console.log(response.data[0]);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  }


  const addToFavs = (userID, productID) => {
    if (userID !== 0) {
      axios.post("/api/add-to-favs", { userID, productID })
        .then(
          (response) => {
            setFavorites([...favorites, response.data[0]]);
            console.log(response);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  const removeFromFavs = (userID, productID) => {
    if (userID !== 0) {
      axios.post("/api/remove-from-favs", { userID, productID })
        .then(
          (response) => {
            console.log(response);
            const removedFavs = favorites.filter((item) => item.product_id !== productID);
            setFavorites(removedFavs);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  const loadCategories = () => {
    const CATEGORIES = [];

    axios.post("/api/get-categories")
      .then(
        (response) => {
          CATEGORIES.push(...response.data);
          setProducts(CATEGORIES);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const loadProducts = () => {
    const PRODUCTS = [];

    axios.post("/api/get-products")
      .then(
        (response) => {
          PRODUCTS.push(...response.data);
          setProducts(PRODUCTS);
          setProductsRoot(PRODUCTS);
          setFilteredProducts(PRODUCTS);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const loadProductsCart = (userID) => {
    const PRODUCTSCART = [];
    setCartItems(PRODUCTSCART);

    if (userID != 0) {
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
  }

  const getTotalCartAmount = () => {
    var total = Number(0);
    for (let i = 0; i < cartItems.length; i++) {
      let itemInfo = PRODUCTS.find((product) => Number(product.id) === Number(cartItems[i].product_id));
      if(itemInfo){
        let itemPrice = itemInfo.price;
        if (itemPrice === null)
          itemPrice = 0;

        total += Number(itemPrice);
      }
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


  const addToCart = (productID, userID, quantity) => {
    if (userID !== 0) {
      try {
        axios.post("/api/add-to-cart", { userID, productID, quantity })
          .then(
            (response) => {
              console.log(response);
              for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id === productID) {
                  cartItems[i].quantity += quantity;
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

  const filter = (starRating, minPrice, maxPrice) => {
    const filteredProducts = productsRoot.filter((product) => {
      const star = product.star;
      const price = product.price;
      if (starRating == 0)
        return price >= minPrice && price <= maxPrice;
      else if (minPrice == 0 && maxPrice == 0)
        return star == starRating;
      else
        return price >= minPrice && price <= maxPrice && star == starRating;
    });
    setFilteredProducts(filteredProducts);
  };

  const loadProductsCategory = (categoryStr) => {
    axios.post('/api/load-products-in-category', { categoryStr })
      .then(
        (response) => {
          setProductsCategory(response.data);
          setProductsRoot(response.data);
          setFilteredProducts(response.data);
          console.log(response);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const loadReviews = (productID) => {
    axios.post('/api/get-reviews', { productID })
      .then(
        (response) => {
          setReviews(response.data);
          console.log(reviews);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const addNewReviews = (productID, userID, text, stars, date) => {
    axios.post('/api/add-new-review', { productID, userID, text, stars, date })
      .then(
        (response) => {
          console.log(response);
          setReviews(prevArray => [...prevArray, response.data]);
          console.log(reviews);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const calculateAverageStars = () => {
    if (reviews.length === 0) return 0;
    const starsSum = reviews.reduce((sum, obj) => {
      if (obj.stars !== null) {
        return sum + obj.stars;
      }
      return sum;
    }, 0);
    const averageStars = starsSum / reviews.length;
    return averageStars.toFixed(1);
  };

  const countReviewsByRating = (rating) => {
    return reviews.filter((review) => review.stars === rating).length;
  };


  const [userOrders, setUserOrders] = useState([]);
  const loadUserOrders = async (userID) => {
    await axios.post("/api/get-user-orders", { userID })
    .then(
        (response) => {
            const fetchOrders = [];
            const orders = response.data;


            orders.map(async (order) => {
                const orderID = order.id;
                axios.post("/api/get-user-orders-details", { orderID })
                    .then(
                        (response) => {
                            const orderDetails = response.data;

                            const items = orderDetails.map((detail) => {
                                return {
                                    productID: detail.product_id,
                                    productName: detail.name,
                                    productImage: detail.image,
                                    price: detail.price,
                                    quantity: detail.quantity,
                                    totalPriceItem: Number(detail.price) * Number(detail.quantity),
                                };
                            });

                            const arr = {
                                id: order.id,
                                total_price: order.total_price,
                                created_date: order.created_date,
                                delivered_date: order.delivered_date,
                                payment_method: order.payment_method,
                                payment_status: order.payment_status,
                                order_status: order.order_status,
                                items: items,
                            };
                            fetchOrders.push(arr);
                        })
                    .catch(function (error) {
                        console.log('Error', error.message);
                    })

            })
            setUserOrders(fetchOrders);
            console.log("userOrders ", userOrders)
        }
    )
    .catch(function (error) {
        console.log('Error', error.message);
    })
  };

  const loadAddresses = (userID) => {
    axios.post('/api/get-addresses', { userID })
      .then(
        (response) => {
          setAddresses(response.data);
          console.log('addresses', addresses);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const addNewAddress = (userID, name, phone, address) => {
    axios.post('/api/add-new-address', { userID, name, phone, address })
      .then(
        (response) => {
          console.log(response);
          setAddresses(prevArray => [...prevArray, response.data]);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const updateAddress = (index, name, phone, address) => {
    const id = addresses[index].id;
    axios.post('/api/update-address', { id, name, phone, address })
      .then(
        (response) => {
          console.log(response);
          const updatedAddresses = [...addresses];
          updatedAddresses[index] = response.data;
          setAddresses(updatedAddresses);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const deleteAddress = (index) => {
    const id = addresses[index].id;
    axios.post('/api/delete-address', { id })
      .then(
        (response) => {
          console.log(response);
          const updatedAddresses = addresses.filter(item => item.id !== id);
          setAddresses(updatedAddresses);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const contextValue = {
    cartItems,
    favorites,
    totalAmount,
    totalChoosed,
    totalProducts,
    productsChoosedToBuy,
    filteredProducts,
    productsCategory,
    productsRoot,
    isLogin,
    reviews,
    addresses,
    userOrders,
    createdOrderID,
    loadAddresses,
    loadUserOrders,
    addNewAddress,
    updateAddress,
    deleteAddress,
    loadReviews,
    addNewReviews,
    calculateAverageStars,
    countReviewsByRating,
    checkIsLogin,
    createOrder,
    updatePaymentStatus,
    updateOrderStatus,
    updateDeliveredDate,
    loadCategories,
    loadProductsCategory,
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
    categories,
    loadFavs,
    addToFavs,
    removeFromFavs,
    filter,
  };

  console.log("shopcontext cartitem ", cartItems);
  // console.log("total cart amount ", totalAmount);
  // console.log("islogin ", isLogin);
  // console.log("shopcontext reviews ", reviews);
  // console.log("shopcontext address ", addresses);
  // console.log("shopcontext userOrders ", userOrders);
  // console.log("shopcontext productchoosed ", productsChoosedToBuy);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};


export default shopcontext