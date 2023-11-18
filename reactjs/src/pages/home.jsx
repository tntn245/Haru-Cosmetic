/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { CgShoppingCart } from 'react-icons/cg'
import { Link } from 'react-router-dom';
import Featuredproducts from '../components/featuredproducts';
import Sale from '../components/sale'
import Hero from '../components/hero';
import FeaturedBrands from '../components/featuredbrand';
import '../styles/home.scss'

const home = () => {
  const [userID, setUserID] = useState(0);

  useEffect(() => {    
      const user = localStorage.getItem('user');
      if(user != null){
        const user_id = JSON.parse(user).id;
        setUserID(user_id);
        console.log(userID);
      }
  }, [userID]); 

  return <>
    <section className="banner">
      <div className="container-xxl ">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="d-flex flex-column justify-content-center ">
              <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner ">
                  <div className='back-details '>
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