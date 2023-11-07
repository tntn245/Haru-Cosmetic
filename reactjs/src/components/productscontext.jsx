import axios from '../api/axios.js';
import React, { createContext, useEffect, useState } from 'react';

const DataFetcher = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Logic để tải dữ liệu và cập nhật giá trị data
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const userID = user.id;
    
        axios.post("http://127.0.0.1:8001/api/get-cart", { userID })
        .then((response) =>{
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) =>{
          throw error;
        });
    };

    fetchData();
  }, []);

  return children.data;
};

export default DataFetcher;



// export const ProductContext = createContext();

// const productcontext = (props) => {
//   const [PRODUCTS, setProducts] = useState([]);
//   const [PRODUCTSCART, setProductsCart] = useState([]);

//   const loadProductsCart = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const userID = user.id;

//       axios.post("http://127.0.0.1:8001/api/get-cart", { userID })
//       .then((response) =>{
//         setProductsCart(response.data);
//       })
//       .catch((error) =>{
//         throw error;
//       });
//   }

//   const loadProducts = () => {
//     axios.get("http://127.0.0.1:8001/get-products")
//       .then((response) =>{
//         setProducts(response.data);
//       })
//       .catch((error) =>{
//         throw error;
//       });
//   }
  
//   const contextValue = {
//     PRODUCTS,
//     PRODUCTSCART,
//     loadProductsCart,
//     loadProducts
//   };

//   console.log("ProductContext", PRODUCTS);

//   return (
//     <ProductContext.Provider value={contextValue}>
//       {props.children}
//     </ProductContext.Provider>
//   );
// };


// export default productcontext