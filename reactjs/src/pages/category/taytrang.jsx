import React, { useContext, useState } from 'react'
import ProductCategory from '../../components/ProductCategory'
import '../../styles/taytrang.scss'
const TayTrang = () => {
    return <>
        <section className="p-4">
            <div className="container-xxl">
                <div className="row justify-content-center align-items-center">
                    <div className="col text-center">
                        <h1>TẨY TRANG</h1>
                        <ProductCategory />
                    </div>
                </div>
            </div>
        </section>
    </>;

}
export default TayTrang;