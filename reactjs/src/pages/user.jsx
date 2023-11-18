import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const User = () => {
    const { userID } = useParams();
    const [user, setUser] = useState(null);
    const userEmail = localStorage.getItem("userEmail");
    useEffect(() => {
        // Fetch user data based on the userID
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${userID}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
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