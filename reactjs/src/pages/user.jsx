import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { ShopContext } from '../components/shopcontext'
import axios from '../api/axios.js';

const User = () => {
    const { userID } = useParams();
    const [user, setUser] = useState(null);
    const userEmail = localStorage.getItem("userEmail");
    const navigate = useNavigate();
    const shopcontext = useContext(ShopContext);
    
    const handleLogout = () => {
        axios.post("/api/logout-user", {userID})
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

    useEffect(() => {
        // Fetch user data based on the userID
        try {
            // const response = await fetch(`/api/users/${userID}`);
            // const userData = await response.json();
            const user = JSON.parse(localStorage.getItem('user'));
            if (user != null) {
                setUser(user);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, [userID]);

    if (!user) {
        return <div>Loading user...</div>;
    }
    return (
        <section className="user-wrapper">
            <div className="container">
                <h1 className="user-heading">Tài Khoản Của Tôi</h1>
                <div class Name="card">
                    <div className="card-body">
                        <p>User ID: {user.id}</p>
                        <h5 className="card-title">Email: {userEmail}</h5>
                        <Link to="/edit-profile" className="btn btn-outline-danger">Edit Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default User;