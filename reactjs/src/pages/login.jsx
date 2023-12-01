/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/shopcontext'
import { RoleContext } from '../components/rolecontext';
import axios from '../api/axios.js';
import '../styles/login.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const shopcontext = useContext(ShopContext);
  const { updateRole } = useContext(RoleContext);
  const navigate = useNavigate();

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await csrf();

    await axios.post("/api/login-user", { email, password })
      .then(
        (response) => {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data.userDetails));
          const userType = response.data.userDetails.type;
          shopcontext.checkIsLogin();
          updateRole(userType);
          navigate("/");
        }
      )
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.data.message);

          if (error.response.data.email?.[0] == "Email is required")
            setError('Bạn chưa điền email');
          else if (error.response.data.email?.[0] == "Email address is invalid")
            setError('Định dạng email không hợp lệ');
          else if (error.response.data.email?.[0] == "Email does not exists")
            setError('Email chưa đăng ký');
          else if (error.response.data.password?.[0] == "Password is required")
            setError('Bạn chưa nhập mật khẩu');
          else if (error.response.data.message == "Password is incorrect")
            setError('Mật khẩu không chính xác');
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log('Error', error.message);
        }
      });
  }
  
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "633767045331-hdief49o2fq3m6p5iiqh3h6brtf859v7.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("sigin"),
      {theme: "outline", size: "large"}
    );
  }, []);

  function handleCallBackResponse(response){
    console.log(response.credential);
    var obj = jwt_decode(response.credential);
    console.log(obj);
    
    var name = obj.family_name + " " + obj.given_name;
    var email = obj.email;
    var password = "";
    console.log(name);

    csrf();
    axios.post("/api/login-google", { name, email, password })
      .then(
        (response) => {
          console.log(response.data);
          navigate("/");
          localStorage.setItem("user", JSON.stringify(response.data.userDetails));
          shopcontext.checkIsLogin();
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <section className="login-wrapper p-5">
      <div className="container-xxl">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-center">ĐĂNG NHẬP</h2>
                <p className="text-center mb-4">Welcome Back!!</p>
                {/* <form onSubmit={handleSubmit}> */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label mb-3">
                    Tên Tài Khoản Hoặc Địa Chỉ Email
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
                  <div className="input-2">
                    <input
                      type={isShowPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Nhập mật khẩu ở đây ..."
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <FontAwesomeIcon
                      className="icon-eye"
                      icon={isShowPassword ? faEye : faEyeSlash}
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    />
                  </div>
                </div>
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                <div className="mb-3 d-flex justify-content-end">
                  <Link to="/forgotpasword" className="form-link">
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className='m-0'>Chưa có tài khoản?</p>
                  <Link to="/signup" className="form-link">
                    Đăng ký
                  </Link>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" onClick={handleSubmit}>TIẾP TỤC</button>
                </div>
                {/* </form> */}
              </div>
              <p className="or"><span>Hoặc</span></p>
              <div id='sigin' className="alt-login"></div>
              
              {/* <div className="alt-login">
                <GoogleOAuthProvider clientId="229105552951-k2ld40mskicj5fr0igq6kvi23trmm8s1.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      const details = jwt_decode(credentialResponse.credential);
                      console.log(details);
                      console.log(credentialResponse);
                    }
                    }
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </GoogleOAuthProvider>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;