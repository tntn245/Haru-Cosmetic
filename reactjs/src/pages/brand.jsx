import React from 'react';
import FeaturedBrands from '../components/featuredbrand'

const Brands = () => {
    return (
        <section className="featured-brands p-4">
            <div className="container-xxl">
                <div className="row">
                    <FeaturedBrands />
                </div>
            </div>
        </section>
    );
}
export default Brands;