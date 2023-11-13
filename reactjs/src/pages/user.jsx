import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
const User = () => {
    const userEmail = localStorage.getItem("userEmail");
    const userPassword = "********";

    return (
        <section className="user-wrapper">
            <div className="container">
                <h1>Tài Khoản Của Tôi</h1>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Email: {userEmail}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Mật khẩu: {userPassword}</h6>
                        <Link to="/edit-profile" className="btn btn-outline-danger">Edit Profile</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default User;