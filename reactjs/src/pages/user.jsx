import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { ShopContext } from '../components/shopcontext'
import axios from '../api/axios.js';
import '../styles/user.scss';

const User = () => {
    const { userID } = useParams();
    const [user, setUser] = useState(null);
    const [orderStatus, setOrderStatus] = useState('address');
    const userEmail = localStorage.getItem("userEmail");
    const navigate = useNavigate();
    const shopcontext = useContext(ShopContext);
  
    const handleLogout = () => {
        axios.post("/api/logout-user")
            .then(
                (response) => {
                    console.log(response);
                    navigate('/login');
                    localStorage.clear();
                    shopcontext.checkIsLogin();
                    console.log("is",shopcontext.isLogin);
                }
            )
            .catch(function (error) {
                console.log(error);
            });
    };

    const [editedAddressIndex, setEditedAddressIndex] = useState(null);
    const [newAddress, setNewAddress] = useState({ name: '', phone: '', address: '' });
    const [showNewAddressFields, setShowNewAddressFields] = useState(false);

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user != null) {
                setUser(user);
                shopcontext.loadAddresses(user.id);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, [userID]);

    if (!user) {
        return <div>Loading user...</div>;
    }

    const steps = [
        { status: 'address', label: 'Sổ Địa Chỉ' },
        { status: 'pending', label: 'Đơn Hàng Chờ Duyệt' },
        { status: 'shipping', label: 'Đơn Hàng Đang Giao' },
        { status: 'delivered', label: 'Đơn Hàng Đã Giao' },
    ];

    const handleStatusChange = (status) => {
        setOrderStatus(status);
    };

    const isStepCompleted = (step) => {
        const stepIndex = steps.findIndex(s => s.status === step.status);
        return stepIndex < steps.findIndex(s => s.status === orderStatus);
    };

    const handleAddAddress = () => {
        if (editedAddressIndex === null) {
            // Case: Adding a new address
            if (!showNewAddressFields) {
                setShowNewAddressFields(true);
            } else {
                setNewAddress({ name: '', phone: '', address: '' });
                console.log(newAddress);
                var name = newAddress.name;
                var phone = newAddress.phone;
                var address = newAddress.address;
                shopcontext.addNewAddress(user.id, name, phone, address)
                setShowNewAddressFields(false); // Hide the input fields after adding a new address
            }
        } else {
            // Case: Editing an existing address
            shopcontext.updateAddress(editedAddressIndex, newAddress.name, newAddress.phone, newAddress.address )
            setEditedAddressIndex(null);
            setNewAddress({ name: '', phone: '', address: '' }); // Clear new address fields
            setShowNewAddressFields(false); // Hide the input fields after editing an existing address
        }
    };
    const handleCancelAddAddress = () => {
        setShowNewAddressFields(false);
        setEditedAddressIndex(null);
    };

    const handleEditAddress = (index) => {
        setEditedAddressIndex(index);
        setNewAddress({ name: shopcontext.addresses[index].name, phone: shopcontext.addresses[index].phone, address: shopcontext.addresses[index].address });
    };

    const handleDeleteAddress = (index) => {
        shopcontext.deleteAddress(index);
    };

    const handleSaveAddress = () => {
        shopcontext.updateAddress(editedAddressIndex, newAddress.name, newAddress.phone, newAddress.address )
        setEditedAddressIndex(null);
    };

    return (
        <section className="user-wrapper">
            <div className="container">
                <h1 className="user-heading">Tài Khoản Của Tôi</h1>
                <div className="card">
                    <div className="card-body">
                        <p>User ID: {user.id}</p>
                        <p>Email: {user.email}</p>
                        <p>Name: {user.name}</p>
                        {/* <h5 className="card-title">Email: {userEmail}</h5> */}
                        
                        <div className="container_btn">
                            <Link to="/edit-profile" className="btn btn-outline-info">Edit Profile</Link>
                            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                        </div>

                        <ul className="step-wizard-list">
                            {steps.map((step, index) => (
                                <li key={index} className={`step-wizard-item ${step.status === orderStatus ? 'current-item' : ''}`}>
                                    <span
                                        className={`progress-count mini-circle ${isStepCompleted(step) ? 'completed' : ''}`}
                                        onClick={() => handleStatusChange(step.status)}
                                    >
                                        {isStepCompleted(step) ? '✔' : index + 1}
                                    </span>
                                    <span className="progress-label" onClick={() => handleStatusChange(step.status)}>
                                        {step.label}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Render orders based on the current status */}

                        {orderStatus === 'address' && (
                            <div>
                                <div className="card">
                                    <div className="card-body">
                                        <p>Địa chỉ nhận hàng</p>
                                        {shopcontext.addresses.map((address, index) => (
                                            <div key={index} className={`address-item `}>
                                                <span className="address-name">{address.name}</span>
                                                <span className="address-divider">|</span>
                                                <span className="address-phone">{address.phone}</span>
                                                <br />
                                                <span className="address-details">{address.address}</span>
                                                <div>
                                                    {editedAddressIndex === index ? (
                                                        <>
                                                            <div className="row">
                                                                <div className="col-md-4 mb-3">
                                                                    <div className="input-group">
                                                                        <label htmlFor="name" className="form-label">Họ tên:</label>
                                                                        <input
                                                                            type="text"
                                                                            id="name"
                                                                            className="form-control"
                                                                            value={newAddress.name}
                                                                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4 mb-3">
                                                                    <div className="input-group">
                                                                        <label htmlFor="phone" className="form-label">SĐT:</label>
                                                                        <input
                                                                            type="text"
                                                                            id="phone"
                                                                            className="form-control"
                                                                            value={newAddress.phone}
                                                                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4 mb-3">
                                                                    <div className="input-group">
                                                                        <label htmlFor="details" className="form-label">Địa Chỉ:</label>
                                                                        <textarea
                                                                            id="details"
                                                                            className="form-control"
                                                                            value={newAddress.address}
                                                                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                                                        ></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-dark" onClick={handleSaveAddress}>Lưu</button>
                                                            <button className="btn btn-dark" onClick={handleCancelAddAddress}>Hủy</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                        <button className="update btn btn-dark" onClick={() => handleEditAddress(index)}>Cập nhật</button>
                                                        <button className="delete btn btn-dark" onClick={() => handleDeleteAddress(index)}>Xóa</button>
                                                        </>
                                                    )}
                                                </div>
                                                <hr></hr>
                                            </div>
                                        ))}
                                        
                                        <button className="btn btn-dark" onClick={() => handleAddAddress()}>Thêm địa chỉ mới</button>
                                        {editedAddressIndex === null && (
                                            <>
                                                {showNewAddressFields && (
                                                    <>
                                                        <button className="btn btn-dark" onClick={handleCancelAddAddress}>Hủy</button>
                                                        <div className="address-item">
                                                            <div className="row">
                                                                <div className="col-md-4 mb-3">
                                                                    <div className="input-group">
                                                                        <label htmlFor="name" className="form-label">Họ Tên:</label>
                                                                        <input
                                                                            type="text"
                                                                            id="name"
                                                                            className="form-control"
                                                                            value={newAddress.name}
                                                                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4 mb-3">
                                                                    <div className="input-group">
                                                                        <label htmlFor="phone" className="form-label-sdt">SĐT<i></i>:</label>
                                                                        <input
                                                                            type="text"
                                                                            id="phone"
                                                                            className="form-control"
                                                                            value={newAddress.phone}
                                                                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4 mb-3">
                                                                    <div className="input-group">
                                                                        <label htmlFor="details" className="form-label">Địa Chỉ:</label>
                                                                        <textarea
                                                                            id="details"
                                                                            className="form-control"
                                                                            value={newAddress.address}
                                                                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                                                        ></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {orderStatus === 'pending' && <p>Show Pending Orders here</p>}
                        {orderStatus === 'shipping' && <p>Show Shipping Orders here</p>}
                        {orderStatus === 'delivered' && <p>Show Delivered Orders here</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User;
