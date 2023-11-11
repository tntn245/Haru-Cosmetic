/* eslint-disable no-unused-vars */
import React from 'react'
import { CgShoppingCart } from 'react-icons/cg'
import { Link } from 'react-router-dom';
import Featuredproducts from '../components/featuredproducts';
import Sale from '../components/sale'
import Hero from '../components/hero';
import FeaturedBrands from '../components/featuredbrand';
import '../styles/home.scss'

const home = () => {
  return <>
    <section className="banner">
      <div className="container-xxl">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="d-flex flex-column justify-content-center ">
              <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className='back-details'>
                    <p className='mb-3 text'></p>
                    <p className='mb-3' />
                    <Link to='/shop' className='banner-link'></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Hero />

    <section className="featured-products p-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 text-center">
            <h1>BÁN CHẠY NHẤT</h1>
          </div>
          <Featuredproducts />
        </div>
      </div>
    </section>

    <section className="discount-banner p-5">
      <div className="container-xxl">
        <div className="row ">
          <div className="home-discount-banner text-center align-items-center">
          </div>
        </div>
      </div>
    </section>

    <section className="new-arrivals p-4">
      <div className="container-xxl">
        <div className="row">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h1>GIẢM GIÁ</h1>
          </div>
          <Sale />
        </div>
      </div>
    </section>
    {/* <section className="hot-deals p-5 d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start">
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-6 d-flex">
            <div className="card m-auto mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={banner} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Hot Deals</h5>
                    <h2 className="card-text mb-2">Buy One get One free.</h2>
                    <p className="card-text mb-2"><small className="text-body-secondary">The latest best collection in our closet <br />Feel Cute with our outfits</small></p>
                    <Link to='blog'>
                      <button className='mt-4'>Learn more</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="col-md-6 d-flex">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={banner1} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Season-In</h5>
                    <h2 className="card-text mb-2">All Weather Attire</h2>
                    <p className="card-text mb-2"><small className="text-body-secondary">It never matter which season it is <br />We got you covered</small></p>
                    <Link to='blog'>
                      <button className='mt-4'>Learn more</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section> */}

    <section className="featured-brands p-4">
      <div className="container-xxl">
        <div className="row">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h1>THƯƠNG HIỆU ĐỒNG HÀNH</h1>
          </div>
          <FeaturedBrands />
        </div>
      </div>
    </section>
  </>;
}

export default home