/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import pay from '../assets/images/pay/pay.png'
import axios from '../api/axios.js';
import { ShopContext } from '../components/shopcontext.jsx';


const checkout = () => {
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

    const handlePay = () => {
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
    };

    return <>
        <section className="checkout p-5">
            <div className="container-xxl">
                <div className="row checkout-header">

                    <h1>{query}</h1>
                    <div className="col-md-6">
                        <h1 className="mb-4 fs-3">Phương thức thanh toán</h1>
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header p-0" id="headingTwo">
                                    <button className="btn col-12 btn-light btn-block text-start collapsed p-3 rounded-0 border-bottom-custom" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className='col-6'>
                                                <span>Paypal</span>
                                            </div>
                                            <div className='col-6'>
                                                <img src={pay} alt="" className='img-fluid' />
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="card-body">
                                        <input type="text" className="form-control" placeholder="Paypal email" />
                                    </div>
                                </div>
                            </div>
                            <div className="card m-auto">
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="card-body payment-card-body">
                                        <span className="font-weight-normal card-text">Card Number</span>
                                        <div className="input mb-4">
                                            <i className="fa fa-credit-card"></i>
                                            <input type="text" className="form-control" placeholder="0000 0000 0000 0000" />
                                        </div>
                                        <div className="row mt-3 mb-3">
                                            <div className="col-md-6">
                                                <span className="font-weight-normal card-text">Expiry Date</span>
                                                <div className="input">
                                                    <i className="fa fa-calendar"></i>
                                                    <input type="text" className="form-control" placeholder="MM/YY" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="font-weight-normal card-text">CVC/CVV</span>
                                                <div className="input mb-4">
                                                    <i className="fa fa-lock"></i>
                                                    <input type="text" className="form-control" placeholder="000" />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-muted certificate-text"><i className="fa fa-lock"></i> Your transaction is secured with ssl certificate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="address col-md-6 p-2">
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