/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { ShopContext } from '../components/shopcontext'
import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import vnpay from '../assets/images/pay/vnpay.svg'
import momo from '../assets/images/pay/momo.png'
import axios from '../api/axios.js';
import { useLocation } from 'react-router-dom';
import { Box, IconButton, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom'

const checkout = () => {
    const location = useLocation();
    const query = location.state ? location.state.data : null;

    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [userID, setUserID] = useState(0);
    const shopcontext = useContext(ShopContext);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [panelAddress, setPanelAddress] = useState(false);

    const [selectedAddressID, setSelectedAddressID] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedPhone, setSelectedPhone] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    // const { query } = useParams();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user != null) {
            const user_id = JSON.parse(user).id;
            setUserID(user_id);
            shopcontext.loadAddresses(user_id);
        }
    }, [userID]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
                const jsonData = await response.json();
                setCities(jsonData);
                console.log(jsonData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handlePay = () => {
        if (selectedMethod === "VNPay") {
            setSelectedMethod("VNPay");
            setPaymentMethod(selectedMethod);
            shopcontext.createOrder(userID, Number(query), selectedMethod, selectedAddressID);
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
        }
        else if (selectedMethod === "Momo") {
            setSelectedMethod("Momo");
            setPaymentMethod(selectedMethod);
            shopcontext.createOrder(userID, Number(query), selectedMethod, selectedAddressID);
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
        }
        else {
            setSelectedMethod("COD");
            setPaymentMethod(selectedMethod);
            shopcontext.createOrder(userID, Number(query), selectedMethod, selectedAddressID);
            navigate("/thanks?COD=1")
        }
    };

    const handleClick = (method) => {
        // setShowOptions(true);
        setSelectedMethod(method);
    };

    const handleChooseAddress = () => {
        setPanelAddress(true);
    }

    const handleClose = () => {
        setPanelAddress(false);
    };


    const handleRadioChange = (event) => {
      const selectedValue = event.target.value; // Giá trị của radio button được chọn

      const selectedAddr = shopcontext.addresses.find(addr => Number(addr.id) === Number(selectedValue));
      const name = selectedAddr.name;
      const phone = selectedAddr.phone;
      const address = selectedAddr.address;
  
      setSelectedAddressID(Number(selectedValue))
      setSelectedName(name);
      setSelectedPhone(phone);
      setSelectedAddress(address);
      setPanelAddress(false);
    };
    return <>
        <section className="checkout p-5">
            <div className="container-xxl">


                {panelAddress && (
                    <Modal open={open} onClose={handleClose}>
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '50%',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'white',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }}
                                onClick={handleClose}
                                style={{ color: '#D80032' }}
                            >
                                <CloseIcon />
                            </IconButton>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    // alignItems: 'center',
                                    flexDirection: 'column',
                                    gap: '16px',
                                }}
                            >
                                <div class="card-header mb-3">
                                    <h4 class="card-title">Sổ địa chỉ</h4>
                                </div>
                                {shopcontext.addresses.map((address) => (

                                    <div class="card-address-details col-lg-12 row mb-3" style={{ marginLeft: '0 !important' }}>
                                        <div class="card btn btn-light p-0 col-lg-12">
                                            <label class="d-flex align-items-center p-0" style={{ margin: 0 }}>
                                                <input type="radio" name="diachi" class="address" autocomplete="off" style={{ margin: '10px' }} 
                                                    value={address.id}
                                                    size="1" minlength="3" maxlength="3"
                                                    onChange={handleRadioChange}></input>
                                                <div style={{ margin: '10px', display: 'block', textAlign: 'left' }}>
                                                    <div><b>Tên người nhận: </b><span class="consignee-name">{address.name}</span></div>
                                                    <div><b>Số điện thoại: </b><span class="phone-numer">{address.phone}</span></div>
                                                    <div><b>Địa chỉ: </b><span class="address-details" >{address.address}</span></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </Box>
                    </Modal>
                )}
                <div className='card' style={{padding:'10px'}}>
                <h3 style={{textAlign: '-webkit-center', margin: '0'}}>Tổng tiền: {query}</h3>
                </div>
                {shopcontext.productsChoosedToBuy.map((product) => (
                    <div key={product.id} className="container card my-3">
                        <div className="row g-3">
                            <div className="col-12 col-md-5">
                                <div className="p-3">
                                    <div className="cart-item-image m-auto">
                                        <img src={product.image} className="card-img-top img-fluid " alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-7">
                                <div className="p-3">
                                    <p>{product.name}</p>
                                    <p className="cart-item-id">Nhãn hàng: <b className='text-center mb-1'>{product.brand}</b></p>
                                    <p className="cart-item-id">Số lượng: <b className='text-center mb-3'>{product.quantity}</b></p>
                                    <p className="cart-item-id">Giá bán: <b className='text-center mb-1'>{product.price} VND</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="row checkout-header">
                    <div className="col-md-6">
                        <h1 className=" mt-4 mb-4 fs-3">Địa chỉ giao hàng</h1>
                        <div className="row">
                            <div className="col-12">
                                <button className="choose-address-inf form-select form-select-sm mb-3" onClick={handleChooseAddress} style={{ height: '50px' }}>Chọn thông tin giao hàng</button>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputName" className="form-label">Tên người nhận</label>
                                <input disabled type="text" className="form-control" id="inputName" value={selectedName} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPhone" className="form-label">Số điện thoại</label>
                                <input disabled type="text" className="form-control" id="inputPhone" value={selectedPhone} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputAddress" className="form-label">Địa chỉ</label>
                                <input disabled type="text" className="form-control" id="inputAddress" value={selectedAddress} />
                            </div>


                            {/* <div className="col-12" style={{display: 'flex', placeContent: 'space-between'}}>
                                <div class="col-4" style={{height:'50px',width:'30%'}}>
                                    <label>Tỉnh/ Thành phố:</label><br />
                                    <select className="form-select form-select-sm mb-3" value={selectedCity} onChange={handleCityChange} style={{height:'50px'}}>
                                        <option value="" disabled>Chọn tỉnh thành</option>
                                        {cities.map(city => (
                                            <option key={city.Id} value={city.Id}>{city.Name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="col-4"style={{height:'50px',width:'30%'}}>
                                    <label>Quận/ Huyện:</label><br />
                                    <select className="form-select form-select-sm mb-3" value={selectedDistrict} onChange={handleDistrictChange} style={{height:'50px'}}>
                                        <option value="" disabled>Chọn quận huyện</option>
                                        {districts.map(district => (
                                            <option key={district.Id} value={district.Id}>{district.Name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="col-4"style={{height:'50px',width:'30%'}}>
                                    <label>Phường xã:</label><br />
                                    <select className="form-select form-select-sm" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} style={{height:'50px'}}>
                                        <option value="" disabled>Chọn phường xã</option>
                                        {wards.map(ward => (
                                            <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}


                            {/* <div className="col-md-6">
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
                            </div> */}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h1 className=" mt-4 mb-4 fs-3">Phương thức thanh toán</h1>
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header p-0" id="headingTwo">
                                
                                        
                                    <button className={`btn col-12 btn-light btn-block text-start p-3 rounded-0 border-bottom-custom ${selectedMethod === 'VNPay' ? 'active' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseVNPAY"  // Unique target for VNPAY
                                        aria-expanded="false"
                                        aria-controls="collapseVNPAY"
                                        onClick={() => handleClick("VNPay")}
                                        style={{textDecoration: 'none'}}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <input type="radio" name="diachi" class="address" autocomplete="off" style={{ margin: '10px' }} 
                                                size="1" minlength="3" maxlength="3"
                                                checked={selectedMethod==="VNPay"}></input>
                                            <div className='col-6' >
                                                <span>Thanh toán VNPay</span>
                                            </div>
                                            <div className='col-6' style={{ maxWidth: '70px' }}>
                                                <img src={vnpay} alt="" className='img-fluid' style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    </button>
                                    <button className={`btn col-12 btn-light btn-block text-start p-3 rounded-0 border-bottom-custom ${selectedMethod === 'Momo' ? 'active' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseMOMO"  // Unique target for MOMO
                                        aria-expanded="false"
                                        aria-controls="collapseMOMO"
                                        onClick={() => handleClick("Momo")}
                                        style={{textDecoration: 'none'}}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <input type="radio" name="diachi" class="address" autocomplete="off" style={{ margin: '10px' }} 
                                                size="1" minlength="3" maxlength="3"
                                                checked={selectedMethod==="Momo"}></input>
                                            <div className='col-6'>
                                                <span>Thanh toán Momo</span>
                                            </div>
                                            <div className='col-6' style={{ maxWidth: '70px' }}>
                                                <img src={momo} alt="" className='img-fluid' style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    </button>
                                    <button className={`btn col-12 btn-light btn-block text-start p-3 rounded-0 border-bottom-custom ${selectedMethod === 'COD' ? 'active' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseCOD"  // Unique target for THANH TOAN COD
                                        aria-expanded="false"
                                        aria-controls="collapseCOD"
                                        onClick={() => handleClick("COD")}
                                        style={{textDecoration: 'none'}}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <input type="radio" name="diachi" class="address" autocomplete="off" style={{ margin: '10px' }} 
                                                size="1" minlength="3" maxlength="3"
                                                checked={selectedMethod==="COD"}></input>
                                            <div className='col-6'>
                                                <span>Thanh toán khi nhận hàng</span>
                                            </div>
                                            <div className='col-6' style={{ maxWidth: '70px' }}>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <button id="button-linker" onClick={handlePay} style={{ width: '100%', marginTop: '15px' }} disabled={selectedName===""||selectedMethod===""}>Đặt hàng</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>;
}

export default checkout