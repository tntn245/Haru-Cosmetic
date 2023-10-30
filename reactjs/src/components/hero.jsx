/* eslint-disable no-unused-vars */
import React from 'react'
import orders from '../assets/images/icons/icon1.png'
import orders1 from '../assets/images/icons/icon2.png'
import orders2 from '../assets/images/icons/icon3.png'
import orders3 from '../assets/images/icons/icon4.png'
import orders4 from '../assets/images/icons/icon5.png'

const Hero = () => {
  return (
    <section className="hero p-4">
      <div className="container-xxl">
        <h1 style={{ marginBottom: "4.5rem" }}>CAM KẾT</h1>
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 hero-details">
            <div className="row g-4 justify-content-center justify-content-md-between align-items-stretch">
              <div className="col-6 col-md-4 col-lg-3">
                <div className="card text-center h-100">
                  <img src={orders} className="card-img-top img-fluid m-auto mt-3" alt="Fast Orders" />
                  <div className="card-body">
                    <p className="card-text mb-0">Fast Orders</p>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3">
                <div className="card text-center h-100">
                  <img src={orders1} className="card-img-top img-fluid m-auto mt-3" alt="Quick Shipping" />
                  <div className="card-body">
                    <p className="card-text mb-0">Quick Shipping</p>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3">
                <div className="card text-center h-100">
                  <img src={orders2} className="card-img-top img-fluid m-auto mt-3" alt="High Saves" />
                  <div className="card-body">
                    <p className="card-text mb-0">High Saves</p>
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3">
                <div className="card text-center h-100">
                  <img src={orders3} className="card-img-top img-fluid m-auto mt-3" alt="24/7 Support" />
                  <div className="card-body">
                    <p className="card-text mb-0">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;