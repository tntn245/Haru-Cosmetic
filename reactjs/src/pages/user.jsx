import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { ShopContext } from '../components/shopcontext'
import pro1 from '../assets/images/products/f1.jpg'
import pro2 from '../assets/images/products/f2.jpg'
import axios from '../api/axios.js';
import { Card, Table } from 'react-bootstrap';
import CloseIcon from "@mui/icons-material/Close";
import ReactStars from "react-rating-stars-component";
import { Box, IconButton, Button, Modal } from "@mui/material";
import '../styles/user.scss';

const User = () => {
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(0);
    const [orderID, setOrderID] = useState(0);
    const [orderStatus, setOrderStatus] = useState('address');
    const navigate = useNavigate();
    const shopcontext = useContext(ShopContext);
    const [userOrders, setUserOrders] = useState([]);
    const [dataToPass, setDataToPass] = useState([]);

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCityID, setSelectedCityID] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDistrictID, setSelectedDistrictID] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const [selectedWardID, setSelectedWardID] = useState('');
    const [panelEvaluate, setPanelEvaluate] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [orderItemsEvaluate, setOrderItemsEvaluate] = useState([]);

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

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user != null) {
            const user_id = JSON.parse(user).id;
            setUserID(user_id);
            setDataToPass(JSON.parse(user));
        }
    }, []);

    const handleCityChange = (e) => {
        const selectedCityId = e.target.value;
        setSelectedCityID(selectedCityId);
        setSelectedCity(e.target[e.target.selectedIndex].text);

        const city = cities.find(city => city.Id === selectedCityId);
        if (city) {
            setDistricts(city.Districts);
            setWards([]);
        }
        setNewAddress({ ...newAddress, addressCity: e.target[e.target.selectedIndex].text });
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        setSelectedDistrictID(selectedDistrictId)
        setSelectedDistrict(e.target[e.target.selectedIndex].text);

        const city = cities.find(city => city.Id === selectedCityID);
        if (city) {
            const district = city.Districts.find(district => district.Id === selectedDistrictId);
            if (district) {
                setWards(district.Wards);
            }
        }
        setNewAddress({ ...newAddress, addressDistrict: e.target[e.target.selectedIndex].text });
    };

    const handleWardChange = (e) => {
        const selectedWardId = e.target.value;
        setSelectedWardID(selectedWardId);
        setSelectedWard(e.target[e.target.selectedIndex].text);

        setNewAddress({ ...newAddress, addressWard: e.target[e.target.selectedIndex].text });
    };

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

    const loadOrders = async (userID) => {
        try {
            const response = await axios.post("/api/get-user-orders", { userID });
            const orders = response.data;
            const fetchOrders = [];

            for (const order of orders) {
                const arr = {
                    id: order.id,
                    total_price: order.total_price,
                    created_date: order.created_date,
                    delivered_date: order.delivered_date,
                    payment_method: order.payment_method,
                    payment_status: order.payment_status,
                    order_status: order.order_status,
                    evaluated: order.evaluated
                    //   items: items,
                };
                fetchOrders.push(arr);
            }

            setUserOrders(fetchOrders);
            console.log("userOrders ", userOrders);
        } catch (error) {
            console.log('Error', error.message);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user != null) {
            setUser(user);
            shopcontext.loadAddresses(user.id);
            loadOrders(user.id);
        }
    }, [userID]);

    if (!user) {
        return <div>Loading user...</div>;
    }

    const steps = [
        { status: 'address', label: 'Sổ Địa Chỉ' },
        { status: 'pending', label: 'Đơn Hàng Chờ Duyệt' },
        { status: 'approved', label: 'Đơn Hàng Đã Duyệt' },
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
                setNewAddress({ name: '', phone: '', address: '', addressCity: '', addressDistrict: '', addressWard: '' });
                setSelectedCityID('');
                setSelectedDistrictID('');
                setSelectedWardID('');
            } else {
                setNewAddress({ name: '', phone: '', address: '' });
                var name = newAddress.name;
                var phone = newAddress.phone;
                var address = newAddress.address + ", " + newAddress.addressWard + ", " + newAddress.addressDistrict + ", " + newAddress.addressCity;
                if (name === '' || phone === '' || newAddress.address === '' || newAddress.addressWard === '' || newAddress.addressDistrict === '' || newAddress.addressCity === '') {
                    alert("Bạn chưa điền đủ thông tin")
                }
                else {
                    shopcontext.addNewAddress(user.id, name, phone, address)
                    setShowNewAddressFields(false); // Hide the input fields after adding a new address
                }
            }
        } else {
            // Case: Editing an existing address
            var address = newAddress.address + ", " + newAddress.addressWard + ", " + newAddress.addressDistrict + ", " + newAddress.addressCity;
            shopcontext.updateAddress(editedAddressIndex, newAddress.name, newAddress.phone, address)
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
        var address = shopcontext.addresses[index].address
        const addressArray = address.split(',');
        const details = addressArray[0].trim();
        const addressCity = addressArray[addressArray.length - 3].trim();
        const addressDistrict = addressArray[addressArray.length - 2].trim();
        const addressWard = addressArray[addressArray.length - 1].trim();

        setNewAddress({ name: shopcontext.addresses[index].name, phone: shopcontext.addresses[index].phone, address: details, addressCity: addressCity, addressDistrict: addressDistrict, addressWard: addressWard });

        setSelectedCity(addressCity);
        setSelectedDistrict(addressDistrict);
        const city = cities.find(city => city.Name === addressCity);
        if (city) {
            setSelectedCityID(city.Id)
            setDistricts(city.Districts);
            setWards([]);
            const district = city.Districts.find(district => district.Name === addressDistrict);
            if (district) {
                setSelectedDistrictID(district.Id)
                setWards(district.Wards);
                const ward = district.Wards.find(ward => ward.Name === addressWard);
                if (ward) {
                    setSelectedWardID(ward.Id)
                }
            }
        }
    };

    const handleDeleteAddress = (index) => {
        shopcontext.deleteAddress(index);
    };

    const handleSaveAddress = () => {
        shopcontext.updateAddress(editedAddressIndex, newAddress.name, newAddress.phone, newAddress.address + ", " + newAddress.addressWard + ", " + newAddress.addressDistrict + ", " + newAddress.addressCity)
        setEditedAddressIndex(null);
    };
    const handleOrderCollapse = async (orderID) => {
        try {
            const detailsResponse = await axios.post("/api/get-user-orders-details", { orderID });
            const orderDetails = detailsResponse.data;

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

            setUserOrders(prevOrders => (
                prevOrders.map(order => {
                    if (order.id === orderID) {
                        return { ...order, items: items };
                    }
                    return order;
                })
            ));
            setExpandedOrder(expandedOrder === orderID ? null : orderID);
            console.log(items);
            setOrderItemsEvaluate(items)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleCancelOrder = (orderID) => {
        shopcontext.updateOrderStatus(orderID, "Đã hủy")
        const updatedOrders = userOrders.filter(order => order.id !== orderID);
        setUserOrders(updatedOrders);
    };

    const handleClose = () => {
        setPanelEvaluate(false);
    };
    const handleEvaluate = () => {
        setPanelEvaluate(false);
        console.log(reviews)

        const currentDate = new Date();
        const date = currentDate.toISOString().split('T')[0];

        reviews.map(review => {
            var text = review.text;
            var stars = review.stars;
            var productID = review.id;
            axios.post("/api/add-new-review", { productID, userID, text, stars, date })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        console.log(orderID)
        axios.post("/api/evaluate-order", {orderID})
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleOpenEvaluate = (orderID) => {
        setOrderID(orderID)
        setPanelEvaluate(true);
        const updatedOrders  = userOrders.map(order => {
        if (order.id === orderID) {
            return { ...order, evaluated: 1 };
        }
        return order;
        });
        setUserOrders(updatedOrders)
    };
    const handleReviewChange = (productID, field, value) => {
        const updatedReviews = reviews.map(review => {
            if (review.id === productID) {
                return { ...review, [field]: value };
            }
            return review;
        });

        if (!updatedReviews.some(review => review.id === productID)) {
            updatedReviews.push({ id: productID, [field]: value });
        }

        setReviews(updatedReviews);
    };

    return (
        <section className="user-wrapper" style={{ paddingBottom: '60px' }}>
            <div className="container">

                {panelEvaluate && (
                    <Modal open={open} onClose={handleClose}>
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '70%',
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

                            {orderItemsEvaluate.map((item) => (
                                <div className="row" key={item.productID} style={{ marginBottom: '40px' }}>
                                    <div className="col-2" style={{ textAlignLast: 'right' }}>
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', marginRight: '20px' }}
                                        />
                                    </div>
                                    <div className="col-2" style={{ textAlignLast: 'left', alignSelf: 'center' }}>{item.productName}</div>
                                    <div className="col-7" style={{ placeSelf: 'center' }}>
                                        <div>
                                            <textarea
                                                placeholder="Nhập đánh giá của bạn..."
                                                rows="2"
                                                className="form-control"
                                                // value={newReview.text}
                                                onChange={(e) => handleReviewChange(item.productID, 'text', e.target.value)}
                                            />
                                            <ReactStars
                                                count={5}
                                                // value={newReview.stars}
                                                size={24}
                                                color1="#CCCCCC"
                                                color2="#FFD700"
                                                edit={true}
                                                onChange={(newRating) => handleReviewChange(item.productID, 'stars', newRating)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={{ textAlign: 'center' }}>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={handleEvaluate}>
                                    Gửi Đánh Giá
                                </button>
                            </div>
                        </Box>
                    </Modal>
                )}

                <h1 className="user-heading">Tài Khoản Của Tôi</h1>
                <div className="card">
                    <div className="card-body">
                        <p>User ID: {user.id}</p>
                        <p>Email: {user.email}</p>
                        <p>Tên người dùng: {user.name}</p>

                        <div className="container_btn">
                            <Link to="/editprofile" state={{ data: dataToPass }} className="btn btn-outline-info">Edit Profile</Link>
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
                                                            <hr></hr>
                                                            <div className="row mb-3">
                                                                <div className="col-md-4">
                                                                    <label className="form-label label-address">Họ Tên:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        className="form-control"
                                                                        value={newAddress.name}
                                                                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label label-address">SĐT:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="phone"
                                                                        className="form-control"
                                                                        value={newAddress.phone}
                                                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label label-address">Địa Chỉ:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="details"
                                                                        className="form-control"
                                                                        value={newAddress.address}
                                                                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label>Tỉnh/ Thành phố:</label><br />
                                                                    <select className="form-select form-select-sm mb-3" onChange={handleCityChange}>
                                                                        <option value="" disabled>Chọn tỉnh thành</option>
                                                                        {cities.map(city => (
                                                                            <option key={city.Id} value={city.Id}
                                                                                selected={city.Name === newAddress.addressCity}>
                                                                                {city.Name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Quận/ Huyện:</label><br />
                                                                    <select className="form-select form-select-sm mb-3" value={selectedDistrictID} onChange={handleDistrictChange}>
                                                                        <option value="" disabled>Chọn quận huyện</option>
                                                                        {districts.map(district => (
                                                                            <option key={district.Id} value={district.Id}
                                                                                selected={district.Name === newAddress.addressDistrict}
                                                                            >{district.Name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Phường xã:</label><br />
                                                                    <select className="form-select form-select-sm" value={selectedWardID} onChange={handleWardChange}>
                                                                        <option value="" disabled>Chọn phường xã</option>
                                                                        {wards.map(ward => (
                                                                            <option key={ward.Id} value={ward.Id}
                                                                                selected={ward.Name === newAddress.addressWard}
                                                                            >{ward.Name}</option>
                                                                        ))}
                                                                    </select>
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
                                                            <div className="row mb-3">
                                                                <div className="col-md-4">
                                                                    <label className="form-label label-address">Họ Tên:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        className="form-control"
                                                                        value={newAddress.name}
                                                                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label label-address">SĐT:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="phone"
                                                                        className="form-control"
                                                                        value={newAddress.phone}
                                                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label className="form-label label-address">Địa Chỉ:</label>
                                                                    <input
                                                                        type="text"
                                                                        id="details"
                                                                        className="form-control"
                                                                        value={newAddress.address}
                                                                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label>Tỉnh/ Thành phố:</label><br />
                                                                    <select className="form-select form-select-sm mb-3" value={selectedCityID} onChange={handleCityChange}>
                                                                        <option value="" disabled>Chọn tỉnh thành</option>
                                                                        {cities.map(city => (
                                                                            <option key={city.Id} value={city.Id}>{city.Name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Quận/ Huyện:</label><br />
                                                                    <select className="form-select form-select-sm mb-3" value={selectedDistrictID} onChange={handleDistrictChange}>
                                                                        <option value="" disabled>Chọn quận huyện</option>
                                                                        {districts.map(district => (
                                                                            <option key={district.Id} value={district.Id}>{district.Name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label>Phường xã:</label><br />
                                                                    <select className="form-select form-select-sm" value={selectedWardID} onChange={handleWardChange}>
                                                                        <option value="" disabled>Chọn phường xã</option>
                                                                        {wards.map(ward => (
                                                                            <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                                                                        ))}
                                                                    </select>
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
                                                <th>Phương thức thanh toán</th>
                                                <th>Tình trạng thanh toán</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userOrders.map((order) => (
                                                <React.Fragment key={order.id}>
                                                    {order.order_status === "Chờ duyệt" &&
                                                        <>
                                                            <tr className={order.order_status === "Đã hủy" ? 'hidden-row' : ''} onClick={() => handleOrderCollapse(order.id)}>
                                                                <td>
                                                                    <Link to="#" className="order-link">
                                                                        {order.id}
                                                                    </Link>
                                                                </td>
                                                                <td>{order.created_date}</td>
                                                                <td>{order.total_price}</td>
                                                                <td>{order.payment_method}</td>
                                                                <td>{order.payment_status}</td>
                                                                <td><button className="btn btn-dark" onClick={() => handleCancelOrder(order.id)}>Hủy đơn</button></td>
                                                            </tr>
                                                            {expandedOrder === order.id && (
                                                                <tr>
                                                                    <td colSpan="6">
                                                                        {order.items.map((item) => (
                                                                            <div className="row" key={item.productID} style={{ marginBottom: '20px' }}>
                                                                                <div className="col-3" style={{ textAlignLast: 'right' }}>
                                                                                    <img
                                                                                        src={item.productImage}
                                                                                        alt={item.productName}
                                                                                        style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', marginRight: '20px' }}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-3" style={{ textAlignLast: 'left', alignSelf: 'center' }}>{item.productName}</div>
                                                                                <div className="col-3" style={{ placeSelf: 'center' }}>
                                                                                    <div>{item.price}</div>
                                                                                    <div>x{item.quantity}</div>
                                                                                </div>
                                                                                <div className="col-3" style={{ placeSelf: 'center' }}>{item.totalPriceItem}</div>
                                                                            </div>
                                                                        ))}
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
                        {orderStatus === 'approved' &&
                            <Card>
                                <Card.Body>
                                    <Card.Title className="mt-3 text-center">Đơn hàng của bạn</Card.Title>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Mã đơn hàng</th>
                                                <th>Ngày đặt hàng</th>
                                                <th>Tổng tiền</th>
                                                <th>Phương thức thanh toán</th>
                                                <th>Tình trạng thanh toán</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userOrders.map((order) => (
                                                <React.Fragment key={order.id}>
                                                    {order.order_status === "Đã duyệt" &&
                                                        <>
                                                            <tr onClick={() => handleOrderCollapse(order.id)}>
                                                                <td>
                                                                    <Link to="#" className="order-link">
                                                                        {order.id}
                                                                    </Link>
                                                                </td>
                                                                <td>{order.created_date}</td>
                                                                <td>{order.total_price}</td>
                                                                <td>{order.payment_method}</td>
                                                                <td>{order.payment_status}</td>
                                                            </tr>
                                                            {expandedOrder === order.id && (
                                                                <tr>
                                                                    <td colSpan="6">
                                                                        {order.items.map((item) => (
                                                                            <div className="row" key={item.productID} style={{ marginBottom: '20px' }}>
                                                                                <div className="col-3" style={{ textAlignLast: 'right' }}>
                                                                                    <img
                                                                                        src={item.productImage}
                                                                                        alt={item.productName}
                                                                                        style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', marginRight: '20px' }}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-3" style={{ textAlignLast: 'left', alignSelf: 'center' }}>{item.productName}</div>
                                                                                <div className="col-3" style={{ placeSelf: 'center' }}>
                                                                                    <div>{item.price}</div>
                                                                                    <div>x{item.quantity}</div>
                                                                                </div>
                                                                                <div className="col-3" style={{ placeSelf: 'center' }}>{item.totalPriceItem}</div>
                                                                            </div>
                                                                        ))}
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
                        {orderStatus === 'shipping' &&
                            <Card>
                                <Card.Body>
                                    <Card.Title className="mt-3 text-center">Đơn hàng của bạn</Card.Title>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Mã đơn hàng</th>
                                                <th>Ngày đặt hàng</th>
                                                <th>Tổng tiền</th>
                                                <th>Phương thức thanh toán</th>
                                                <th>Tình trạng thanh toán</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userOrders.map((order) => (
                                                <React.Fragment key={order.id}>
                                                    {order.order_status == "Đang vận chuyển" &&
                                                        <>
                                                            <tr onClick={() => handleOrderCollapse(order.id)}>
                                                                <td>
                                                                    <Link to="#" className="order-link">
                                                                        {order.id}
                                                                    </Link>
                                                                </td>
                                                                <td>{order.created_date}</td>
                                                                <td>{order.total_price}</td>
                                                                <td>{order.payment_method}</td>
                                                                <td>{order.payment_status}</td>
                                                            </tr>
                                                            {expandedOrder === order.id && (
                                                                <tr>
                                                                    <td colSpan="5">
                                                                        {order.items.map((item) => (
                                                                            <div className="row" key={item.productID} style={{ marginBottom: '20px' }}>
                                                                                <div className="col-3" style={{ textAlignLast: 'right' }}>
                                                                                    <img
                                                                                        src={item.productImage}
                                                                                        alt={item.productName}
                                                                                        style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', marginRight: '20px' }}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-3" style={{ textAlignLast: 'left', alignSelf: 'center' }}>{item.productName}</div>
                                                                                <div className="col-3" style={{ placeSelf: 'center' }}>
                                                                                    <div>{item.price}</div>
                                                                                    <div>x{item.quantity}</div>
                                                                                </div>
                                                                                <div className="col-3" style={{ placeSelf: 'center' }}>{item.totalPriceItem}</div>
                                                                            </div>
                                                                        ))}
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
                        {orderStatus === 'delivered' &&
                            <Card>
                                <Card.Body>
                                    <Card.Title className="mt-3 text-center">Đơn hàng của bạn</Card.Title>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Mã đơn hàng</th>
                                                <th>Ngày đặt hàng</th>
                                                <th>Tổng tiền</th>
                                                <th>Phương thức thanh toán</th>
                                                <th>Tình trạng thanh toán</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userOrders.map((order) => (
                                                <React.Fragment key={order.id}>
                                                    {order.order_status == "Đã giao" &&
                                                        <>
                                                            <tr onClick={() => handleOrderCollapse(order.id)}>
                                                                <td>
                                                                    <Link to="#" className="order-link">
                                                                        {order.id}
                                                                    </Link>
                                                                </td>
                                                                <td>{order.created_date}</td>
                                                                <td>{order.total_price}</td>
                                                                <td>{order.payment_method}</td>
                                                                <td>{order.payment_status}</td>
                                                                <td><button className="btn btn-dark" onClick={() => handleOpenEvaluate(order.id)} disabled={order.evaluated === 1}>Đánh giá</button></td>
                                                            </tr>
                                                            {expandedOrder === order.id && (
                                                                <tr>
                                                                    <td colSpan="6">
                                                                        {order.items.map((item) => (
                                                                            <div className="row" key={item.productID} style={{ marginBottom: '20px' }}>
                                                                                <div className="col-3" style={{ textAlignLast: 'right' }}>
                                                                                    <img
                                                                                        src={item.productImage}
                                                                                        alt={item.productName}
                                                                                        style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', marginRight: '20px' }}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-3" style={{ textAlignLast: 'left', alignSelf: 'center' }}>{item.productName}</div>
                                                                                <div className="col-3" style={{ placeSelf: 'center' }}>
                                                                                    <div>{item.price}</div>
                                                                                    <div>x{item.quantity}</div>
                                                                                </div>
                                                                                <div className="col-3" style={{ placeSelf: 'center' }}>{item.totalPriceItem}</div>
                                                                            </div>
                                                                        ))}
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User;
