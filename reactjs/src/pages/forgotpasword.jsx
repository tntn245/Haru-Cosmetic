/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Button, Modal } from "@mui/material";
import axios from '../api/axios.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setNewPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [token, setToken] = useState('');
  const [messagePIN, setMessagePIN] = useState('');
  const [messageEmail, setMessageEmail] = useState('');
  const [messagePassword, setMessagePassword] = useState('');
  const [panelPIN, setPanelPIN] = useState(false);
  const [panelPassword, setPanelPassword] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setPanelPIN(false);
  };

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    axios.post("/api/forgot-password", { email })
      .then(
        (response) => {
          console.log(response.data.success);
          const success = response.data.success;
          if (success) {
            setPanelPIN(true);
          }
          else{
            setMessageEmail("Email không tồn tại");
          }
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleVerifyPIN = async () => {
    axios.post("/api/verify/pin", { email, token })
      .then(
        (response) => {
          console.log(response.data)
          const status = response.status;
          if (status==200) {
            setPanelPIN(false);
            setPanelPassword(true);
          }
        }
      )
      .catch(function (error) {
        const status = error.response.status;
        if(status==401){
          setMessagePIN("Sai mã PIN");
        }
        else if(status==400){
          setMessagePIN("PIN đã hết hạn");
        }
        else if(status==422){
          setMessagePIN("Sai định dạng");
        }
      });
  };

  const handleNewPassWord = async () =>{
    if(password != password_confirmation)
      setMessagePassword("Mật khẩu không trùng khớp");
    else{
      axios.post("/api/reset-password", { email, password, password_confirmation})
      .then(
        (response) => {
          console.log(response.data)
          setPanelPassword(false);
          navigate('/login');
        }
      )
      .catch(function (error) {
        console.log(error);
        const status = error.response.status;
        if(status==422)
          setMessagePIN("Mật khẩu phải từ 8 kí tự");
        else 
          setMessagePassword("Có lỗi xảy ra");
      });
    }
  }

  return (
    <section className="login-wrapper p-5">
      <div className="container-xxl">

        {panelPIN && (
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                width: '50%',
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

              <h2>PIN đang được gửi qua email của bạn</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  // alignItems: 'center',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <hr></hr>
                <input
                  type="number"
                  onChange={(event) => setToken(event.target.value)}
                  required
                  style={{
                    width: '100%', border: "1px solid #000", padding: '5px'
                  }}
                />
                {messagePIN && <div class="alert alert-danger">{messagePIN}</div>}
                <button className="btn btn-dark" type="submit" onClick={handleVerifyPIN} style={{width: '100%'}}>Tiếp tục</button>
              </div>
            </Box>
          </Modal>
        )}

        {panelPassword && (
          <Modal open={open}>
            <Box
              sx={{
                position: 'absolute',
                width: '50%',
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

              <h2>Đặt lại mật khẩu của bạn</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <hr></hr>
                <input
                  type="password"
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder='Mật khẩu mới'
                  required
                  style={{
                    width: '100%', border: "1px solid #000", padding: '5px'
                  }}
                />
                <input
                  type="password"
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  placeholder='Xác nhận lại mật khẩu'
                  required
                  style={{
                    width: '100%', border: "1px solid #000", padding: '5px'
                  }}
                />
                {messagePassword && <div class="alert alert-danger">{messagePassword}</div>}
                <button className='btn btn-dark' type="submit" onClick={handleNewPassWord} style={{width: '100%'}}>Xác nhận</button>
              </div>
            </Box>
          </Modal>
        )}

        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body p-4">
                <h2 className="text-center">Quên mật khẩu</h2>
                <form onSubmit={handleSubmitEmail}>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label mb-3"
                    >
                      Nhập địa chỉ email của bạn
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="nhập email ở đây ..."
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" onClick={handleSubmitEmail}>Xác Nhận</button>
                  </div>
                </form>
                {messageEmail && <div class="alert alert-danger">{messageEmail}</div>}
                {/* {message && <p className="text-center mt-4">{message}</p>} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;