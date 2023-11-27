// User.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from '../api/axios.js';
import '../styles/user.scss';

const User = () => {
    const { userID } = useParams();
    const [user, setUser] = useState(null);
    const [orderStatus, setOrderStatus] = useState('address');
    const userEmail = localStorage.getItem("userEmail");
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post("/api/logout-user", { userID })
            .then(
                (response) => {
                    console.log(response);
                    navigate('/login');
                    localStorage.clear();
                }
            )
            .catch(function (error) {
                console.log(error);
            });
    };

    const [addresses, setAddresses] = useState([]);
    const [editedAddressIndex, setEditedAddressIndex] = useState(null);
    const [newAddress, setNewAddress] = useState({ name: '', phone: '', details: '' });
    const [showNewAddressFields, setShowNewAddressFields] = useState(false);
    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user != null) {
                setUser(user);
                setAddresses(user.addresses || []);
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
                setNewAddress({ name: '', phone: '', details: '' });
                setAddresses([...addresses, newAddress]);
                setShowNewAddressFields(false); // Hide the input fields after adding a new address
            }
        } else {
            // Case: Editing an existing address
            const updatedAddresses = [...addresses];
            updatedAddresses[editedAddressIndex] = newAddress;
            setAddresses(updatedAddresses);
            setEditedAddressIndex(null);
            setNewAddress({ name: '', phone: '', details: '' }); // Clear new address fields
            setShowNewAddressFields(false); // Hide the input fields after editing an existing address
        }
    };
    const handleCancelAddAddress = () => {
        setShowNewAddressFields(false);
        setNewAddress({ name: '', phone: '', details: '' });
    };

    const handleEditAddress = (index) => {
        setEditedAddressIndex(index);
    };

    const handleSaveAddress = () => {
        const updatedAddresses = [...addresses];
        updatedAddresses[editedAddressIndex] = newAddress;
        setAddresses(updatedAddresses);
        setEditedAddressIndex(null);
    };

    return (
        <section className="user-wrapper">
            <div className="container">
                <h1 className="user-heading">Tài Khoản Của Tôi</h1>
                <div className="card">
                    <div className="card-body">
                        <p>User ID: {user.id}</p>
                        <h5 className="card-title">Email: {userEmail}</h5>
                        <Link to="/edit-profile" className="btn btn-outline-danger">Edit Profile</Link>
                        <button onClick={handleLogout}>Logout</button>

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
                                        {addresses.map((address, index) => (
                                            <div key={index} className={`address-item ${index !== addresses.length - 1 ? 'border-bottom' : ''}`}>
                                                <span className="address-name">{address.name}</span>
                                                <span className="address-divider">|</span>
                                                <span className="address-phone">{address.phone}</span>
                                                <br />
                                                <span className="address-details">{address.details}</span>
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
                                                                            value={newAddress.details}
                                                                            onChange={(e) => setNewAddress({ ...newAddress, details: e.target.value })}
                                                                        ></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <button className="btn btn-dark" onClick={handleSaveAddress}>Save</button>
                                                        </>
                                                    ) : (
                                                        <button className="update btn btn-dark" onClick={() => handleEditAddress(index)}>Cập nhật</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {editedAddressIndex === null && (
                                            <div className="address-item">
                                                {showNewAddressFields && (
                                                    <>
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
                                                                        value={newAddress.details}
                                                                        onChange={(e) => setNewAddress({ ...newAddress, details: e.target.value })}
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                )}
                                                <button className="btn btn-dark" onClick={() => handleAddAddress()}>Thêm địa chỉ mới</button>
                                            </div>
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
