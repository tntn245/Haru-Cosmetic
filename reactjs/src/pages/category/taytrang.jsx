import React, { useContext, useState } from 'react'
import Shopitems from '../../components/shopitems';
import Newsletter from '../../components/newsletter';
import Hero from '../../components/hero';
import PriceFilter from '../../components/PriceFilter';
import '../../styles/taytrang.scss'
const TayTrang = () => {
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');

    // useEffect(() => {
    //     // Fetch products from the backend API
    //     fetch('your-backend-api-url/taytrang')
    //         .then(response => response.json())
    //         .then(data => {
    //             setProducts(data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             setError('Error fetching products. Please try again later.');
    //             setLoading(false);
    //         });
    // }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>{error}</div>;
    // }
    return <>
        <section className="p-4">
            <div className="container-xxl">
                <div className="row justify-content-center align-items-center">
                    <div className="col text-center">
                        <h1>TẨY TRANG</h1>
                    </div>
                </div>
            </div>
        </section>

        <section className="featured-products my-5 py-4 " >
            <div className='content'>
                <div className='side-bar'>
                    <PriceFilter />
                </div>
                <div className="container-xxl" >
                    <div className="row shopitems" >
                        <Shopitems />
                    </div>
                </div>
            </div>
        </section>

        {/* <section className="featured-products my-5 py-4 " >
      <div  style={{ display: 'flex' }}>
        <PriceFilter style={{ flex: '0 0 20%' }} />
        <div className="container-xxl" >
          <div className="row" >
            <Shopitems style={{ flex: '1' }} />
          </div>
        </div>
      </div>
    </section> */}

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
export default TayTrang;