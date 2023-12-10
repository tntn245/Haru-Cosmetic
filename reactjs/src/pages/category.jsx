import React, { useEffect, useState, useContext } from 'react'
import ProductCategory from '../components/ProductCategory.jsx'
import '../styles/taytrang.scss'
import Prod from '../components/prod.jsx';
import axios from '../api/axios.js';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../components/shopcontext'

const Category = () => {
    const { categoryStr } = useParams();
    const shopcontext = useContext(ShopContext);

    useEffect(() => {
        console.log("categoryStr", categoryStr)
        shopcontext.loadProductsCategory(categoryStr);
    }, [categoryStr]);

    return <>
        <section className="p-2">
            <div className="container-xxl">
                <div className="row justify-content-center align-items-center">
                    <div className="col text-center">
                        <h1>{categoryStr}</h1>
                        <ProductCategory products={shopcontext.filteredProducts} />
                    </div>
                </div>
            </div>
        </section>
    </>;

}
export default Category;