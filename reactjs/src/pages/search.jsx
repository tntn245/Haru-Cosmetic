/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Shopitems from '../components/shopitems';
import Newsletter from '../components/newsletter';
import Hero from '../components/hero'
import Prod from '../components/prod';
import { PRODUCTS } from '../components/products';
import { PRODUCTS1 } from '../components/products';
import { useParams } from 'react-router-dom';
import axios from '../api/axios.js';

const Search = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        axios.get(`/search-product/${query}`)
        .then(
            (response) => {
                setProducts(response.data);
                console.log(response.data);
            }
          )
        .catch(function (error) {
            console.log(error.message);
            });
    }, [query]);

    return <>
        <section className="shop-banner p-5">
        </section>

        <section className="featured-products p-5">
            <h1>Nội dung tìm kiếm: {query}</h1>
            <div className="container-xxl">
                <div className="row">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {[...products].map((product) => (
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
    </>;
}

export default Search