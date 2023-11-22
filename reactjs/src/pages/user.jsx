import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
    const { userID } = useParams();
    const [user, setUser] = useState(null);
    const userEmail = localStorage.getItem("userEmail");
    
    useEffect(() => {
            try {
                // const response =  fetch(`/api/users/${userID}`);
                // const userData =  response.json();
                
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
                <h1>Tài Khoản Của Tôi</h1>
                <div class Name="card">
                    <div className="card-body">
                        <p>User ID: {user.id}</p>
                        <h5 className="card-title">Email: {userEmail}</h5>
                        <Link to="/edit-profile" className="btn btn-outline-danger">Edit Profile</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default User;