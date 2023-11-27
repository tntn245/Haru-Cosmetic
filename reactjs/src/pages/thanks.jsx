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
  const shopcontext = useContext(ShopContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [userID, setUserID] = useState(0);
  const [vnpTransactionStatus, setVNPTransactionStatus] = useState('');
  const [vnpBankCode, setVNPBankCode] = useState('');
  const [vnpBankTranNo, setVNPBankTranNo] = useState('');
  const [vnpAmount, setVNPAmount] = useState('');
  const [vnpTxnRef, setVNPTxnRef] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_id = JSON.parse(user).id;
      setUserID(user_id);
    }
  }, [userID]);

  useEffect(() => {
    const currentURL = window.location.href;
    console.log(currentURL);

    const params = new URLSearchParams(new URL(currentURL).search);
    setVNPTxnRef(params.get("vnp_TxnRef"));
    setVNPBankCode(params.get("vnp_BankCode"));
    setVNPBankTranNo(params.get("vnp_BankTranNo"));
    setVNPAmount(params.get("vnp_Amount"));
    setVNPTransactionStatus(params.get("vnp_TransactionStatus"));

    console.log(vnpTransactionStatus);
    if (vnpTransactionStatus === '00') {
      shopcontext.updatePaymentStatus(vnpTxnRef, "Thành công")
      shopcontext.updateOrderStatus(vnpTxnRef, "Chờ duyệt")
    }
    else {
      shopcontext.updatePaymentStatus(vnpTxnRef, "Không thành công")
      shopcontext.updateOrderStatus(vnpTxnRef, "Đã hủy")
    }
  }, [vnpTransactionStatus]);

  return <>
    <section className="cart">
      <div className="container-xxl p-5">
        <div className="container-xxl">
          <div className="row">
            <div className="text-center p-5 mb-4">
              <div className="container card my-3">
                {vnpTransactionStatus == '00'
                  ?
                  <div>
                    <h3>Cảm ơn quý khách rất nhiều :D !!!</h3>
                    <div className="row">
                      <div className="col-12 col-md-6 d-flex m-auto justify-content-center mt-4">
                        <button onClick={() => navigate("/shop")}>
                          Tiếp Tục Mua Sắm
                        </button>
                      </div>
                      <div className="col-12 col-md-6 d-flex m-auto justify-content-center mt-4">
                        <button onClick={() => navigate("/order-details")}>
                          Order Details
                        </button>
                      </div>
                    </div>
                  </div>
                  :
                  <div>
                    <h3>Giao dịch thất bại :C !!!</h3>
                    <button onClick={() => navigate("/cart")}>
                      Return cart
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
}

export default Thanks