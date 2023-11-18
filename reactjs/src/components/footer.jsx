/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { BsDiscord } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { BsTwitter } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { BsSlack, BsGithub } from 'react-icons/bs'

const footer = () => {
  const [userID, setUserID] = useState(0);
  
  useEffect(() => {    
    const user = localStorage.getItem('user');
    if(user != null){
        const user_id = JSON.parse(user).id;
        setUserID(user_id);
      }
  }, [userID]); 

  return <>
    <footer className='footer p-5' style={{ backgroundColor: '#333333' }}>
      <div className="container-xxl">
        <div className="row justify-content-between align-items-start">
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg mb-md-0">
            <h2 className='footer-title mb-3'><b>Liên Hệ</b></h2>
            <div className='mb-3'><p><b>Địa chỉ:</b>  Khu Phố 3, Phường Linh Trung, TP.Thủ Đức</p> </div>
            <div className='mb-3'><p><b>SĐT:</b>  <a className='footer-tel' href="tel:+1234567890">Số Hotline +1 (234) 567-890</a></p> </div>
            <div className='mb-4'><p><b>Giờ làm việc:</b>  8 a.m - 9 p.m</p> </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg mb-md-0">
            <h2 className='footer-title mb-3'><b>Giới thiệu</b></h2>
            <div className='mb-3'> <Link to='/about' id='footer-links'>Về Haru</Link>  </div>
            <div className='mb-3'> <Link to='checkout' id='footer-links'>Giao hàng</Link>  </div>
            <div className='mb-3'> <Link id='footer-links'>Điều khoản sử dụng</Link></div>
            <div className='mb-3'> <Link id='footer-links'>Chính sách bảo mật</Link>  </div>
            <div className='mb-3'> <Link id='footer-links'>Chính sách mua hàng</Link>  </div>
            <div className='mb-3'> <Link id='footer-links'>Chính sách giao hàng</Link>  </div>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4 col-lg mb-md-0">
            <h2 className='footer-title mb-3'><b>Tài Khoản</b></h2>
            {userID ?
              <div>
                <div className='mb-3'> <Link to='/cart' id='footer-links'>Giỏ hàng</Link>  </div>
                <div className='mb-3'> <Link id='footer-links'>Thanh toán</Link>  </div>
                <div className='mb-3'> <Link id='footer-links'>Sản phẩm yêu thích</Link>  </div>
              </div>
              :
              <div className='mb-3'> <Link to='/login' id='footer-links'>Đăng nhập</Link>  </div>
            }
            <div className='mb-3'> <Link to='/contact' id='footer-links'>Trợ giúp</Link>  </div>
          </div>
        </div>
        <hr className='my-4 hr-custom' />
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-6  ">
            <p className="copyright text-center">&copy;Developed by HARU team</p>
          </div>
        </div>
      </div>
    </footer>
  </>;
}

export default footer