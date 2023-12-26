import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import axios from '../api/axios.js';

const EditUserProfile = () => {
  const location = useLocation();
  const receivedData = location?.state?.data || {};
  const navigate = useNavigate();

  const [message, setMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [editName, setEditName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [errorOldPassword, setErrorOldPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [errorPasswordConfirmation, setErrorPasswordConfirmation] = useState('');
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
    setDisabled(true);
  };

  const handleEditName = () => {
    setEditName(!editName);
    setMessage(false);
  }

  const handleEditPassword = () => {
    setEditPassword(!editPassword);
    setOldPassword('');
    setNewPassword('');
    setPasswordConfirmation('');
    setErrorOldPassword('');
    setErrorNewPassword('');
    setErrorPasswordConfirmation('');
    setMessage(false);
  }

  const handleOldPassword = (e) => {
    const value = e.target.value;
    setOldPassword(value);
  }

  const handleNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    if (value.length < 8) {
      setErrorNewPassword('Mật khẩu phải từ 8 kí tự trở lên');
      setDisabled(false);
    } else {
      setErrorNewPassword('');
      setDisabled(true);
    }
  }

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
    if (newPassword === e.target.value) {
      setErrorPasswordConfirmation('');
      setDisabled(true);
    }
    else {
      setErrorPasswordConfirmation('Mật khẩu không trùng khớp');
      setDisabled(false);
    }
  }

  const handleBack = () => {
    navigate("/user");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = JSON.parse(localStorage.getItem('user')).id;
    const email = userProfile.email;
    const name = userProfile.name;
    if (newPassword != '') {
      const password = oldPassword;
      axios.post("/api/check-user-password", { email, password })
        .then(
          (response) => {
            console.log(response);
            setErrorOldPassword('');

            const password = newPassword;
            axios.post("/api/update-user", { id, email, name, password })
              .then(
                (response) => {
                  console.log(response);
                  setEditPassword(false);
                  setOldPassword('');
                  setNewPassword('');
                  setPasswordConfirmation('');
                  setMessage(true);
                }
              )
              .catch(function (error) {
                console.log(error);
              });
          }
        )
        .catch(function (error) {
          console.log(error);
          setErrorOldPassword('Sai mật khẩu');
        });
    }
    else {
      axios.post("/api/update-user", { id, name })
        .then(
          (response) => {
            console.log(response);
            setMessage(true);
            setEditName(false);
          }
        )
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <h2 class="text-center mt-4">Chỉnh Sửa Thông Tin Cá Nhân</h2>
      <form onSubmit={handleSubmit} className="card" style={{margin:'30px 20% 50px', padding: '20px'}}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label"><strong>Email: </strong>{userProfile.email}</label>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label"><strong>Tên người dùng: </strong>{userProfile.name}</label>
          <IconButton
            onClick={() => handleEditName()}
            size="small"
            style={{ color: '#FFD700' }}>
            <EditIcon />
          </IconButton>
          {editName &&
            <div className="container">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder='Nhập tên mới'
                  value={userProfile.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          }
        </div>

        <div className="mb-3 ">
          <label htmlFor="password" className="form-label"><strong>Mật khẩu: </strong></label>
          <IconButton
            onClick={() => handleEditPassword()}
            size="small"
            style={{ color: '#FFD700' }}>
            <EditIcon />
          </IconButton>
          <br></br>
          {editPassword &&
            <>
              <div className="container">
                <div className="form-group">
                  <input
                    type="password"
                    id="oldpassword"
                    name="oldpassword"
                    className="form-control mb-3"
                    placeholder='Nhập mật khẩu cũ'
                    value={oldPassword}
                    onChange={handleOldPassword}
                    required
                  />
                  {errorOldPassword && (
                    <div class="alert alert-danger">
                      {errorOldPassword}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    className="form-control mb-3"
                    placeholder='Nhập mật khẩu mới'
                    value={newPassword}
                    onChange={handleNewPassword}
                    required
                  />
                  {errorNewPassword && (
                    <div class="alert alert-danger">
                      {errorNewPassword}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="newpassword_confirmation"
                    name="newpassword_confirmation"
                    className="form-control mb-3"
                    placeholder='Xác nhận lại mật khẩu'
                    value={passwordConfirmation}
                    onChange={handlePasswordConfirmation}
                    required
                  />
                  {errorPasswordConfirmation && (
                    <div class="alert alert-danger">
                      {errorPasswordConfirmation}
                    </div>
                  )}
                </div>
              </div>
            </>}
        </div>
        {message && (
          <div class="alert alert-success">
            <strong>Sửa thông tin thành công</strong>
          </div>
        )}
        <div className='row' style={{justifyContent: 'center'}}>
          <button type="submit" disabled={!disabled} className="col-5 btn btn-dark">Lưu</button>
          <button className="col-5 btn btn-dark" onClick={handleBack}>Trở về</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserProfile;