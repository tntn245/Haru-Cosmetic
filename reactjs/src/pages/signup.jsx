import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../api/axios";

const Signup = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await csrf();

    try {
      await axios.post("/api/register-user", { email, password, confirmPassword })
        .then(
          (response) => {
            console.log(response.status); // return 201
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            alert("Đăng ký thành công");
            navigate('/login');
          }
        )
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            setError('');

            if (error.response.data.email?.[0] == "Email is required")
              setError('Bạn chưa điền email');
            else if (error.response.data.email?.[0] == "Email address is invalid")
              setError('Định dạng email không hợp lệ');
            else if (error.response.data.email?.[0] == "Email is existed")
              setError('Email đã đăng ký');
            else if (error.response.data.password?.[0] == "Password is required")
              setError('Bạn chưa nhập mật khẩu');
            else if (error.response.data.password?.[0] == "Password must have at least 6 characters")
              setError('Mật khẩu phải có ít nhất 6 kí tự');
            else if (error.response.data.password?.[0] == "Password is confirmed")
              setError('Mật khẩu không trùng khớp');
          }
          else if (error.request) {
            console.log(error.request);
          }
          else {
            console.log('Error', error.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  // async function handleSubmit1() {
  //   let item = { email, password };
  //   let result = await fetch("http://127.0.0.1:8001/api/register-user", {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify(item)
  //   });
  //   result = await result.json();

  //   if (result['email'] == "Email is required")
  //     setError('Bạn chưa điền email');
  //   else if (result['email'] == "Email address is invalid")
  //     setError('Định dạng email không hợp lệ');
  //   else if (result['email'] == "Email is existed")
  //     setError('Email đã đăng ký');
  //   else if (result['password'] == "Password is required")
  //     setError('Bạn chưa nhập mật khẩu');
  //   else if (password !== confirmPassword)
  //     setError('Mật khẩu không trùng khớp');
  //   else {
  //     setEmail('');
  //     setPassword('');
  //     setConfirmPassword('');
  //     setError('');
  //     alert("Đăng ký thành công");
  //     navigate("/login");
  //   }

  // }

  return (
    <section className="login-wrapper p-5">
      <div className="container-xxl">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-center">ĐĂNG KÝ</h2>
                <p className="text-center mb-3">Chào mừng bạn đến với Haru !!</p>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label mb-3">
                    Địa Chỉ Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Nhập email ở đây ..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label mb-3">
                    Mật Khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Nhập mật khẩu ở đây ..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label mb-3"
                  >
                    Xác Nhận Mật Khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Nhập lại mật khẩu ở đây ..."
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    required
                  />
                </div>
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p>
                    Đã có tài khoản?
                  </p>
                  <Link to="/login" className="form-link">
                    Đăng Nhập
                  </Link>
                </div>
                <div className="d-grid gap-2" style={{ marginTop: '15px' }}>
                  <button type="submit" onClick={handleSubmit}>ĐĂNG KÝ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;