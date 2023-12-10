/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
// import ProductItems from '../components/productItems';
import Newsletter from '../components/newsletter';
import Hero from '../components/hero';
import Filter from './Filter';
import StarFilter from '../components/starfilter';
import '../styles/shop.scss'
import Prod from './prod';

const ProductCategory = ({ products }) => {
  return (
    <>
      <section className="shop-banner">
        <div className="container-xxl">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6 text-center">
            </div>
          </div>
        </div>
      </section>


      <section className="featured-products my-5 py-4">
        <div className='content'>
          <div className='side-bar-content'>
            <Filter />
          </div>
          <div className="container-xxl">
            <div className="row productItems">
              {products.map((product) => (
                <Prod key={product.id} data={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pagination p-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 align-items-center justify-content-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <Hero />

      <Newsletter />
    </>
  );
}

export default ProductCategory;