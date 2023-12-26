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

  const [resultCode, setResultCode] = useState(null);
  const [extraData, setExtraData] = useState(null);

  const [COD, setCOD] = useState('');


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

    setResultCode(params.get("resultCode"))
    setExtraData(params.get("extraData"))

    setCOD(params.get("COD"))

    const orderID = vnpTxnRef || extraData;
    console.log(params.get("resultCode")==='0')
    if (params.get("vnp_TransactionStatus") === '00' || params.get("resultCode")==='0') {
      shopcontext.updatePaymentStatus(orderID, "Thành công")
      shopcontext.updateOrderStatus(orderID, "Đã duyệt")
    }
    else if (COD === '1'){
      shopcontext.updatePaymentStatus(orderID, "Chưa thanh toán")
      shopcontext.updateOrderStatus(orderID, "Chờ duyệt")
    }
    else {
      shopcontext.updatePaymentStatus(orderID, "Không thành công")
      shopcontext.updateOrderStatus(orderID, "Đã hủy")
    }
  }, [vnpTransactionStatus]);

  return <>
    <section className="cart">
      <div className="container-xxl p-5">
        <div className="container-xxl">
          <div className="row">
            <div className="text-center p-5 mb-4">
              <div className="container card my-3">
                {vnpTransactionStatus == '00' || resultCode === '0' || COD=='1'
                  ?
                  <div>
                    <img src="src/assets/images/Picture2.jpg" className="card-img-top img-fluid " alt="..." style={{maxHeight:'100px', width: 'auto'}}/>
                    <h3>Cảm ơn bạn đã lựa chọn chúng tôi</h3>
                    <h5>Đơn hàng của bạn đã đặt thành công! Chúng tôi sẽ giao nhanh nhất có thể để bạn không chờ quá lâu</h5>
                    <div className="row">
                      <div className="col-12 col-md-6 d-flex m-auto justify-content-center mt-4">
                        <button onClick={() => navigate("/shop")}>
                          Tiếp Tục Mua Sắm
                        </button>
                      </div>
                      <div className="col-12 col-md-6 d-flex m-auto justify-content-center mt-4">
                        <button onClick={() => navigate("/user")}>
                          Xem đơn hàng
                        </button>
                      </div>
                    </div>
                  </div>
                  :
                  <div>
                    <img src="src/assets/images/Picture1.jpg" className="card-img-top img-fluid " alt="..." style={{maxHeight:'100px', width: 'auto'}}/>
                    <h3>Ôi không! Giao dịch thất bại</h3>
                    <button onClick={() => navigate("/shop")}>
                      Tiếp Tục Mua Sắm
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