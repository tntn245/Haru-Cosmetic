import React, {useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const EditUserProfile = () => {
  const location = useLocation();
  const receivedData = location?.state?.data || {};

  const [userProfile, setUserProfile] = useState({
    name: receivedData.name,
    email: receivedData.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform API call or other logic to save the updated profile
    console.log('Updated profile:', userProfile);
  };

  return (
    <div className="container">
      <h2 class="text-center mt-4">Chỉnh Sửa Thông Tin Cá Nhân</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={userProfile.email}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên người dùng:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={userProfile.name}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-dark">Lưu</button>
      </form>
    </div>
  );
};

export default EditUserProfile;