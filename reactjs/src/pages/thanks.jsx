/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { ShopContext } from '../components/shopcontext'
import React, { useContext, useState, useEffect } from 'react'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { PRODUCTS, PRODUCTSCART } from '../components/products'
import CartItem from '../components/cartitem'
import { useNavigate } from 'react-router-dom'


const Thanks = () => {  
  useEffect(() => {    
    const currentURL = window.location.href;
    console.log(currentURL);

    const params = new URLSearchParams(new URL(currentURL).search);
    const vnpAmount = params.get("vnp_Amount");
    const vnpBankCode = params.get("vnp_BankCode");
    const vnpCardType = params.get("vnp_CardType");

    console.log(vnpAmount); // Kết quả: 34000000
    console.log(vnpBankCode); // Kết quả: VNPAY
    console.log(vnpCardType); // Kết quả: QRCODE
  }, []);

  return <>
    <section className="cart">
      <div className="container-xxl p-5">
          <div className="container-xxl">
            <div className="row">
              <div className="text-center p-5 mb-4">
                <h2>Thanks rất nhiều :D !!!</h2>
              </div>
            </div>
          </div>
      </div>
    </section>
  </>;
}

export default Thanks