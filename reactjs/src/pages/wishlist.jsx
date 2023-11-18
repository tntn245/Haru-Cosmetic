import React, { useContext } from 'react';
import { ShopContext } from '../components/shopcontext';
import { RiDeleteBack2Line } from 'react-icons/ri'

const Wishlist = () => {
    const { favorites, removeFromFavs } = useContext(ShopContext);

    const handleRemoveFromFavs = (productId) => {
        removeFromFavs(productId);
    };

    return (
        <div className='Wishlist'>
            {favorites.length === 0 ? (
                <p>Sản phẩm yêu thích của bạn đang trống.</p>
            ) : (
                <ul>
                    {favorites.map((product) => (
                        <div className="container card my-3">
                            <div className="row g-3">
                                <div className="col-12 col-md-5">
                                    <div className="p-3">
                                        <div className="cart-item-image m-auto">
                                            <img src={product.image} className="card-img-top img-fluid " alt="..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-7">
                                    <div className="p-3">
                                        <h2>{product.name}</h2>
                                        <p className="cart-item-id">Nhãn hàng: <b className='text-center mb-1'>{product.brand}</b></p>
                                        <p className="cart-item-id">Giá bán: <b className='text-center mb-1'>{product.price} VND</b></p>
                                        <p className="cart-item-id">Mã sản phẩm: <b className='text-center mb-3'>{product.id}</b></p>
                                    </div>
                                    <div className="p-3 d-flex justify-content-end align-items-center">
                                        <button className="btn btn-outline-dark" onClick={() => handleRemoveFromFavs(product.id)}>
                                            <RiDeleteBack2Line size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Wishlist;

