/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import blog1 from '../assets/images/blog/blog-1.jpg'
import blog2 from '../assets/images/blog/blog-2.jpg'
import blog3 from '../assets/images/blog/blog-3.jpg'
import blog4 from '../assets/images/blog/blog-4.jpg'
import a6 from '../assets/images/about/a6.jpg'
import video from '../assets/images/about/1.mp4'
import Marquee from "react-fast-marquee";
import orders1 from '../assets/images/icons/icon2.png'
import orders2 from '../assets/images/icons/icon3.png'
import orders3 from '../assets/images/icons/icon4.png'
import orders4 from '../assets/images/icons/icon5.png'
const about = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check the screen width on component mount and when it's resized
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Call the handleResize function initially
    handleResize();

    // Add an event listener to handle screen resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <>
    <section className="about-wrapper p-5 d-flex justify-content-center align-items-center">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="shop-details text-center align-items-center">
              <h1 className="text-black">Câu chuyện của Haru</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="about-us p-5">
      <div className="row">
        <div className="col-md-6">
          <img src={a6} alt="" className='img-fluid p-5' />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <h1 style={{marginBottom: '10px'}}><b>Chúng mình là ai?</b></h1>
          <div className="text-content">
            <p className="card-text mb-3">Chào các bạn, chúng mình là Haru – một công ty đi theo mô hình “Best Selected”, tức là lựa chọn những sản phẩm làm đẹp tốt nhất từ các thương hiệu được đánh giá cao tại Hàn Quốc để đem đến cho khách hàng Việt Nam. <br /> Đối với các sản phẩm dưỡng da, chúng mình luôn theo đuổi những thương hiệu lành tính mà ngay cả những bạn da siêu nhạy cảm, da đang bị mụn hay các mẹ bầu cần cẩn thận trong thai kỳ đều có thể sử dụng được. Đồng thời, chúng mình cũng xem xét thật kĩ bảng thành phần, đọc thêm nhiều nhận xét trên các website uy tín và dùng thử sản phẩm trước khi quyết định giới thiệu sản phẩm đó tới khách hàng Việt Nam. Vì có những cảm nhận chung về làn da châu Á đỏng đảnh đặc trưng, Seoulista tin rằng những thương hiệu được chúng mình lựa chọn sẽ đem đến những kết quả tuyệt vời cho làn da của các bạn.</p>
          </div>
        </div>
      </div>
    </section>

    {/* <section className="about-app p-5">
      <h2 className='fs-1 text-center mb-4' >Download our <Link>App</Link></h2>
      <div className="col-12 p-5 col-md-8 mx-auto">
        {isMobile ? (
          // Render a mobile-friendly video or image here
          <img src={mobileImage} alt="Mobile Image" className='w-100' />
        ) : (
          // Render the video for larger screens
          <video loop muted autoPlay src={video} className='w-100'></video>
        )}
      </div>
    </section> */}

    <section className="abouts p-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 p-3">
            <Marquee className='p-2 slide'>
              <div>
                <img src={orders1} alt="" className='img-fluid' />
                <p className="card-text mb-2">Quick Shipping</p>

              </div>
              <div>
                <img src={orders2} alt="" className='img-fluid' />
                <p className="card-text mb-2">High Saves</p>
              </div>
              <div>
                <img src={orders3} alt="" className='img-fluid' />
                <p className="card-text">24/7 Support</p>
              </div>
              <div>
                <img src={orders4} alt="" className='img-fluid' />
                <p className="card-text">Online Orders</p>
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  </>;
}

export default about