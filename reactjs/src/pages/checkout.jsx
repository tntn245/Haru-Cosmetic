/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { ShopContext } from '../components/shopcontext'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import vnpay from '../assets/images/pay/vnpay.svg'
import momo from '../assets/images/pay/momo.png'
import axios from '../api/axios.js';

const checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [userID, setUserID] = useState(0);
    const shopcontext = useContext(ShopContext);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const provinces = [
        "An Giang",
        "Bà Rịa - Vũng Tàu",
        "Bạc Liêu",
        "Bắc Giang",
        "Bắc Kạn",
        "Bắc Ninh",
        "Bến Tre",
        "Bình Định",
        "Bình Dương",
        "Bình Phước",
        "Bình Thuận",
        "Cà Mau",
        "Cần Thơ",
        "Cao Bằng",
        "Đà Nẵng",
        "Đắk Lắk",
        "Đắk Nông",
        "Điện Biên",
        "Đồng Nai",
        "Đồng Tháp",
        "Gia Lai",
        "Hà Giang",
        "Hà Nam",
        "Hà Nội",
        "Hà Tĩnh",
        "Hải Dương",
        "Hải Phòng",
        "Hậu Giang",
        "Hồ Chí Minh (Thành phố)",
        "Hòa Bình",
        "Hưng Yên",
        "Khánh Hòa",
        "Kiên Giang",
        "Kon Tum",
        "Lai Châu",
        "Lâm Đồng",
        "Lạng Sơn",
        "Lào Cai",
        "Long An",
        "Nam Định",
        "Nghệ An",
        "Ninh Bình",
        "Ninh Thuận",
        "Phú Thọ",
        "Phú Yên",
        "Quảng Bình",
        "Quảng Nam",
        "Quảng Ngãi",
        "Quảng Ninh",
        "Quảng Trị",
        "Sóc Trăng",
        "Sơn La",
        "Tây Ninh",
        "Thái Bình",
        "Thái Nguyên",
        "Thanh Hóa",
        "Thừa Thiên Huế",
        "Tiền Giang",
        "Trà Vinh",
        "Tuyên Quang",
        "Vĩnh Long",
        "Vĩnh Phúc",
        "Yên Bái",
    ];

    const { query } = useParams();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user != null) {
            const user_id = JSON.parse(user).id;
            setUserID(user_id);
        }
    }, [userID]);

    const handlePay = () => {
        if(selectedMethod=="VNPay"){
            axios.post("/vnpay", { query })
                .then(
                    (response) => {
                        console.log(response);
                        const link = response.data.vnp_Url;
                        window.location.href = link;
                    }
                )
                .catch(function (error) {
                    console.log(error);
                });
            setSelectedMethod("VNPay");
            setPaymentMethod(selectedMethod);
            shopcontext.createOrder(userID, Number(query), paymentMethod);
        }
        else if(selectedMethod=="Momo"){
            axios.post("/momo", { query })
                .then(
                    (response) => {
                        console.log(response);
                        const link = response.data.payUrl;
                        window.location.href = link;
                    }
                )
                .catch(function (error) {
                    console.log(error);
                });
            setSelectedMethod("Momo");
            setPaymentMethod(selectedMethod);
            shopcontext.createOrder(userID, Number(query), selectedMethod);
        }
        else{
            
        }
    };

    const handleClick = (method) => {
        setShowOptions(true);
        setSelectedMethod(method);
    };  
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
    return <>
        <section className="checkout p-5">
            <div className="container-xxl">
                    {/* <h1>{query}</h1> */}
                <div className="row checkout-header">
                    <div className="col-md-6">
                        <h1 className="mb-4 fs-3">Phương thức thanh toán</h1>
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header p-0" id="headingTwo">
                                    <button className={`btn col-12 btn-light btn-block text-start p-3 rounded-0 border-bottom-custom ${selectedMethod === 'VNPAY' ? 'active' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseVNPAY"  // Unique target for VNPAY
                                        aria-expanded="false"
                                        aria-controls="collapseVNPAY"
                                        onClick={() => handleClick("VNPay")}
                                        >
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className='col-6' >
                                                <span>VNPAY</span>
                                            </div>
                                            <div className='col-6' style={{ maxWidth: '70px' }}>
                                                <img src={vnpay} alt="" className='img-fluid' style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    </button>
                                    {/* {showOptions && (
                                        <div>
                                            <div className="radio-container">
                                                <label>
                                                    <input type="radio" name="option" value="NCB"
                                                    checked={selectedOption === 'NCB'}
                                                    onChange={handleOptionChange} />
                                                    NCB
                                                </label>
                                            </div>
                                            <div className="radio-container">
                                                <label>
                                                    <input type="radio" name="option" value="ACB" 
                                                    checked={selectedOption === 'ACB'}
                                                    onChange={handleOptionChange}/>
                                                    ACB
                                                </label>
                                            </div>
                                            <div className="radio-container">
                                                <label>
                                                    <input type="radio" name="option" value="BIDV" 
                                                    checked={selectedOption === 'BIDV'}
                                                    onChange={handleOptionChange} />
                                                    BIDV
                                                </label>
                                            </div>
                                        </div>
                                    )} */}
                                    <button className={`btn col-12 btn-light btn-block text-start p-3 rounded-0 border-bottom-custom ${selectedMethod === 'MOMO' ? 'active' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseMOMO"  // Unique target for MOMO
                                        aria-expanded="false"
                                        aria-controls="collapseMOMO"
                                        onClick={() => handleClick("Momo")}
                                        >
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className='col-6'>
                                                <span>MOMO</span>
                                            </div>
                                            <div className='col-6' style={{ maxWidth: '70px' }}>
                                                <img src={momo} alt="" className='img-fluid' style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    </button>
                                    <button className={`btn col-12 btn-light btn-block text-start p-3 rounded-0 border-bottom-custom ${selectedMethod === 'THANH_TOAN_COD' ? 'active' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseCOD"  // Unique target for THANH TOAN COD
                                        aria-expanded="false"
                                        aria-controls="collapseCOD"
                                        onClick={() => handleClick("COD")}
                                        >
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className='col-6'>
                                                <span>THANH TOÁN COD</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="address col-md-6 p-2 mt-3">
                        <h1 className=" mt-3 mb-3 fs-3">Địa chỉ giao hàng</h1>
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Mật khẩu</label>
                                <input type="password" className="form-control" id="inputPassword4" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Địa chỉ</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Đường xyz" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">Thành phố</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputProvince" className="form-label">Tỉnh</label>
                                <select id="inputProvince" className="form-select">
                                    <option selected>Chọn...</option>
                                    {provinces.map((province, index) => (
                                        <option key={index}>{province}</option>
                                    ))}
                                </select>
                            </div>
                            <button id="button-linker" onClick={handlePay}>Đặt hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>;
}

export default checkout