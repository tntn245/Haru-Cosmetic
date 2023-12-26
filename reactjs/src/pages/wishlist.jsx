import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../components/shopcontext';
import { RiDeleteBack2Line } from 'react-icons/ri'
import axios from '../api/axios.js';

const Wishlist = () => {
    const shopcontext = useContext(ShopContext);
    const [favorites, setFavorites] = useState([]);
    const [userID, setUserID] = useState(0);

    const handleRemoveFromFavs = (productID) => {
        shopcontext.removeFromFavs(userID, productID);
        setFavorites(prevProducts => prevProducts.filter(product => product.id !== productID));
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user != null) {
            const user_id = JSON.parse(user).id;
            setUserID(user_id);
            
            if (userID !== 0) {
                axios.post("/api/get-favs", { userID })
                .then(
                    (response) => {
                    setFavorites(response.data);
                    console.log(response.data);
                    }
                )
                .catch(function (error) {
                    console.log(error.message);
                });
            }
        }
    }, [userID]);
    
    return (
        <div className='Wishlist' style={{margin: '60px'}}>
            {favorites.length === 0 ? (
                <p>Sản phẩm yêu thích của bạn đang trống.</p>
            ) : (
                <ul>
                    {favorites.map((product) => (
                        <div key={product.id} className="container card my-3">
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
                                        <p>{product.name}</p>
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

