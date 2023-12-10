import React, { useEffect, useState, useContext } from 'react'
import '../styles/taytrang.scss'
import '../styles/brand.scss'
import Prod from '../components/prod.jsx';
import axios from '../api/axios.js';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../components/shopcontext'
import roundlab from '../assets/images/banner/roundlab.png'
import Filter from '../components/Filter';
const Brandname = () => {
    // tui ăn cắp từ cái category qua=)))
    // const { categoryStr } = useParams();
    // const shopcontext = useContext(ShopContext);

    // useEffect(() => {
    //     console.log("categoryStr", categoryStr)
    //     shopcontext.loadProductsCategory(categoryStr);
    // }, [categoryStr]);

    return <>
        {/* <section className="brand-banner p-5" style={{ background: `url(${roundlab})`}}> */}
        <section className="brand-banner p-5">
            <div className="container-xxl">
                <div className="row justify-content-center align-items-center">
                    <div className="col text-center">

                    </div>
                </div>
            </div>
        </section>
        <section className="featured-products my-5 py-4 " >
            <div className='content'>
                <div className='side-bar'>
                    <div className='side-bar-content'>
                        <Filter />
                    </div>
                </div>
                <div className="container-xxl" >
                    <div className="row branditems" >
                        {/* ... */}
                    </div>
                </div>
            </div>
        </section>
    </>;

}
export default Brandname;