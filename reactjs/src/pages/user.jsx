import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { ShopContext } from '../components/shopcontext'
import pro1 from '../assets/images/products/f1.jpg'
import pro2 from '../assets/images/products/f2.jpg'
import axios from '../api/axios.js';
import { Card, Table } from 'react-bootstrap';
import '../styles/user.scss';

const User = () => {
    // const { userID } = useParams();
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(0);
    const [orderStatus, setOrderStatus] = useState('address');
    const navigate = useNavigate();
    const shopcontext = useContext(ShopContext);
    const [userOrders, setUserOrders] = useState([]);
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user != null) {
            const user_id = JSON.parse(user).id;
            setUserID(user_id);
        }
    }, []);

    const handleLogout = () => {
        axios.post("/api/logout-user")
            .then(
                (response) => {
                    console.log(response);
                    navigate('/login');
                    localStorage.clear();
                    shopcontext.checkIsLogin();
                    console.log("is", shopcontext.isLogin);
                }
            )
            .catch(function (error) {
                console.log(error);
            });
    };

    const [editedAddressIndex, setEditedAddressIndex] = useState(null);
    const [newAddress, setNewAddress] = useState({ name: '', phone: '', address: '' });
    const [showNewAddressFields, setShowNewAddressFields] = useState(false);
    const [collapsedOrderId, setCollapsedOrderId] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user != null) {
            setUser(user);
            shopcontext.loadAddresses(user.id);

            axios.post("/api/get-user-orders", { userID })
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
                                            payment_status: order.payment_status,
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
            shopcontext.updateAddress(editedAddressIndex, newAddress.name, newAddress.phone, newAddress.address)
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
        shopcontext.updateAddress(editedAddressIndex, newAddress.name, newAddress.phone, newAddress.address)
        setEditedAddressIndex(null);
    };

    const handleOrderCollapse = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };
    return (
        <section className="user-wrapper">
            <div className="container">
                <h1 className="user-heading">Tài Khoản Của Tôi</h1>
                <div className="card">
                    <div className="card-body">
                        <p>User ID: {user.id}</p>
                        <p>Email: {user.email}</p>
                        <p>Tên người dùng: {user.name}</p>
                        {/* <h5 className="card-title">Email: {userEmail}</h5> */}

                        <div className="container_btn">
                            <Link to="/editprofile" className="btn btn-outline-info">Edit Profile</Link>
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
                        {orderStatus === 'pending' &&
                            <Card>
                                <Card.Body>
                                    <Card.Title className="mt-3 text-center">Đơn hàng của bạn</Card.Title>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Mã đơn hàng</th>
                                                <th>Ngày đặt hàng</th>
                                                <th>Tổng tiền</th>
                                                <th>Tình trạng thanh toán</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userOrders.map((order) => (
                                                <React.Fragment key={order.id}>
                                                    {order.payment_status != "Không thành công" &&
                                                        <>
                                                            <tr onClick={() => handleOrderCollapse(order.id)}>
                                                                <td>
                                                                    <Link to="#" className="order-link">
                                                                        {order.id}
                                                                    </Link>
                                                                </td>
                                                                <td>{order.orderDate}</td>
                                                                <td>{order.total_price}</td>
                                                                <td>{order.payment_status}</td>
                                                            </tr>
                                                            {expandedOrder === order.id && (
                                                                <tr>
                                                                    <td colSpan="4">
                                                                        <Table striped bordered hover>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Sản phẩm</th>
                                                                                    <th>Giá</th>
                                                                                    <th>Số lượng</th>
                                                                                    <th>Tổng tiền</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {order.items.map((item) => (
                                                                                    <tr key={item.productID}>
                                                                                        <td>
                                                                                            <img
                                                                                                src={item.productImage}
                                                                                                alt={item.productName}
                                                                                                style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', marginRight: '20px' }}
                                                                                            />
                                                                                            {item.productName}
                                                                                        </td>
                                                                                        <td>{item.price}</td>
                                                                                        <td>{item.quantity}</td>
                                                                                        <td>{item.totalPriceItem}</td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </Table>

                                                                    </td>
                                                                </tr>
                                                            )}
                                                            <tr></tr>
                                                        </>
                                                    }
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        }
                        {orderStatus === 'shipping' && <p>Show Shipping Orders here</p>}
                        {orderStatus === 'delivered' && <p>Show Delivered Orders here</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User;
