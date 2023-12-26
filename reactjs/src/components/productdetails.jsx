/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import shopcontext, { ShopContext } from './shopcontext';
import { PRODUCTS, PRODUCTS1 } from './products';
import { GrDeliver } from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import axios from '../api/axios.js';

const ProductDetails = () => {
  const shopcontext = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [userID, setUserID] = useState(0);
  const [averageStars, setAverageStars] = useState(4);

  // Set selectedProduct to 0
  const productID = shopcontext.selectedProduct || 0;

  const product = PRODUCTS.find((p) => p.id === productID);
  const inventory_quantity = product.inventory_quantity;

  if (!product) {
    return null;
  }

  const cartItemAmount = shopcontext.cartItems[product.id];
  const [activeTab, setActiveTab] = useState('details');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Tính số sao trung bình
  const calculateAverageStars = (reviews) => {
    if (reviews.length === 0) return 0;

    const starsSum = reviews.reduce((sum, obj) => {
      if (obj.stars !== null) {
        return sum + obj.stars;
      }
      return sum;
    }, 0);

    const averageStars = starsSum / reviews.length;
    setAverageStars(averageStars.toFixed(1));
  };

  // Tính số sao trung bình cho mỗi rating
  const calculateRatingPercentage = (reviews, rating) => {
    if (reviews.length === 0) return 0;
    const ratingCount = reviews.filter((review) => review.stars === rating).length;
    return (ratingCount / reviews.length) * 100;
  };

  const handleReviewSubmit = () => {
    // Validate the review trước khi submitting
    if (newReview.stars === 0 || newReview.text.trim() === '') {
      // You can show an error message or prevent submission if the review is not valid
      return;
    }
    else {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      shopcontext.addNewReviews(productID, userID, newReview.text, newReview.stars, formattedDate)
      shopcontext.calculateAverageStars();
      console.log("add new", shopcontext.reviews);
      setNewReview({ stars: 0, text: '' });
      setIsWritingReview(false);
      calculateAverageStars(shopcontext.reviews)
    }

  };
  // Render star icons dựa trên star rating
  const renderStarReview = (stars) => {
    return (
      <ReactStars
        count={5}
        value={stars}
        size={24}
        color1="#CCCCCC"
        color2="#FFD700"
        edit={false}
      />
    );
  };

  // Format the date of the review
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({ stars: 0, text: '' });
  const handleWriteReviewClick = () => {
    setIsWritingReview(true);
  };


  const handleIncreaseNumber = () => {
    const newQuantity = Number(quantity + 1);
    if(newQuantity <= inventory_quantity){
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseNumber = () => {
    const newQuantity = Number(quantity - 1);
    if(newQuantity > 0){
      setQuantity(newQuantity);
    }
  };

  const handleUpdateNumber = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0 && newQuantity <= inventory_quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    event.target.classList.toggle("red");
    if (userID !== 0) {
      var productID = product.id;
      axios.post("/api/add-to-cart", { userID, productID, quantity })
        .then(
          (response) => {
            console.log(response);
          }
        )
        .catch(function (error) {
          throw error;
        });
    }
  }
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_id = JSON.parse(user).id;
      setUserID(user_id);
    }
  }, [userID]);

  useEffect(() => {
    shopcontext.loadReviews(productID);
    calculateAverageStars(shopcontext.reviews);
  }, []);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="card p-5 m-auto">
            <img src={product.image} alt="" className="card-img-top img-fluid p-2" />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-3 m-auto">
            <div className="card-body">
              <h5 className="card-title">{product.brand}</h5>
              <h3 className="card-text">{product.name}</h3>
                        <ReactStars
                          isHalf={true}
                          count={5}
                          value={shopcontext.calculateAverageStars()}
                          size={24}
                          color1="#CCCCCC"
                          color2="#FFD700"
                          edit={false}
                        />
              <p className="card-text text-start ">
                <span className="text-danger fs-4 me-2">{product.price} VNĐ</span>
              </p>
              <div className="card-text">
                <GrDeliver className="mb-2" /> THANH TOÁN BẰNG HÌNH THỨC COD HOẶC CHUYỂN KHOẢN<br />
                <FaPhoneAlt /> HOTLINE: (098) 67453476
              </div>
              <p className="card-text" style={{textAlign: 'justify'}}>{product.description}</p>
              <p className="card-text">Còn lại <b>{product.inventory_quantity}</b> sản phẩm</p>

              <div style={{ textAlign: '-webkit-center' }}>
                <div className="d-flex align-items-center mb-3 col-4">
                  <button className="btn btn-outline-secondary ms-2" onClick={handleDecreaseNumber}>-</button>
                  <input className="form-control text-center" type="number" min="1" value={quantity}  onChange={handleUpdateNumber} />
                  <button className="btn btn-outline-secondary ms-2" onClick={handleIncreaseNumber}>+</button>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  onClick={() => handleAddToCart()}
                  id='button-link'
                  className="myButton"
                  style={{ width: '100%', height: '100%' }}
                >
                  THÊM VÀO GIỎ HÀNG
                  {cartItemAmount > 0 && ` (${cartItemAmount})`}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="hidden-navigation mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'details' ? 'active' : ''} nav-link-custom`}
              onClick={() => handleTabClick('details')}>
              CHI TIẾT SẢN PHẨM
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'instructions' ? 'active' : ''} nav-link-custom`}
              onClick={() => handleTabClick('instructions')}
            >
              HƯỚNG DẪN SỬ DỤNG
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''} nav-link-custom`}
              onClick={() => handleTabClick('reviews')}
            >
              REVIEW CỦA KHÁCH HÀNG
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'related' ? 'active' : ''} nav-link-custom`}
              onClick={() => handleTabClick('related')}
            >
              SẢN PHẨM LIÊN QUAN
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="tab-pane active">
              {/* Nội dung của tab Chi tiết sản phẩm */}
              <div className="mt-4">
                <strong>Tinh chất kháng viêm Niacinamide 10%</strong><br /><br />
                <h6><b>Công dụng sản phẩm:</b></h6><br />
                <ul>
                  <li>Phái sinh Azelaic kết hợp Ferulic acid có khả năng kháng viêm, giảm đỏ, làm sáng da hiệu quả, ngăn ngừa lão hóa mạnh mẽ. </li><br />
                  <li> Zinc PCA và Panthenol giúp ngừa mụn, phục hồi những vùng da nhạy cảm, thương tổn do mụn gây ra.  </li><br />
                  <li> Bộ đôi Niacinamide và N-acetyl Glucosamine tăng khả năng chống oxy hóa cho da lên nhiều lần, giúp da trắng sáng, tươi trẻ.   </li><br />
                </ul>
                <h6><b>Thành phần :</b></h6>
                <p className="text-start">Water, Niacinamide, Acetyl Glucosamine, Potassium Azeloyl Diglycinate, Propanediol, Propylene Glycol, Hydroxyethyl Urea, Panthenol, Zinc PCA, Butylene Glycol, Glycyrrhiza Glabra Root Extract, Morus Alba Root Extract, Scutellaria Baicalensis Root Extract, Allantoin, Artemisia Capillaris Flower Extract, Zizyphus Jujuba Fruit Extract, Sodium Hyaluronate, Ferulic acid, Disodium EDTA, Diazolidinyl Urea, Iodopropynyl Butylcarbamate, Gluconolactone.</p>
              </div>
            </div>
          )}
          {activeTab === 'instructions' && (
            <div className="tab-pane active">
              {/* Nội dung của tab Hướng dẫn sử dụng */}
              <div className="mt-4">
                <h6><b>Đối tượng sử dụng:</b></h6><br />
                <ul>
                  <li>Da thường xuyên bị mụn viêm. </li><br />
                  <li>Da cần được điều trị toàn diện.  </li><br />
                  <li> Da có nhiều vấn đề về sắc tố như thâm đen, thâm đỏ.    </li><br />
                </ul>
                <h6><b>Cách sử dụng Tinh chất kháng viêm Niacinamide 10% Ampoule Zakka Naturals</b></h6><br />
                <ul>
                  <li> Nhỏ 2-3 giọt serum ra tay hoặc lên da. </li><br />
                  <li>Thoa đều lên da rồi massage nhẹ nhàng</li><br />
                </ul>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-pane active">
              {/* Nội dung của tab Review của khách hàng */}
              <div className="mt-4">
                <h4>Đánh Giá Của Khách Hàng</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ width: '18%' }}>
                    <div className="d-flex flex-column align-items-center">
                      <div className="me-2">
                        <div className="text-muted mb-1">
                          {shopcontext.calculateAverageStars()}
                        </div>
                        <ReactStars
                          isHalf={true}
                          count={5}
                          value={shopcontext.calculateAverageStars()}
                          size={24}
                          color1="#CCCCCC"
                          color2="#FFD700"
                          edit={false}
                        />
                      </div>
                      <div>
                        <span className="text-muted">{shopcontext.reviews.length} Đánh Giá</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: '50%' }}>
                    {[5, 4, 3, 2, 1].map((stars, index) => (
                      <div className="d-flex align-items-center" key={stars}>
                        <div className="me-2">
                          {renderStarReview(stars)}
                        </div>
                        <div className="progress" style={{ width: '30%' }}>
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${calculateRatingPercentage(shopcontext.reviews, stars)}%` }}
                            aria-valuenow={calculateRatingPercentage(shopcontext.reviews, stars)}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>
                        <div className="ms-2">
                          {shopcontext.countReviewsByRating(stars)} Đánh Giá
                        </div>
                        {index !== [5, 4, 3, 2, 1].length - 1 && <hr />}
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="justify-content-end mb-3" style={{ display: 'none' }}>
                  <div className="container p-5">
                    {/* ... (other code) */}
                    {isWritingReview ? (
                      <div>
                        <textarea
                          placeholder="Nhập đánh giá của bạn..."
                          rows="4"
                          className="form-control mb-3"
                          value={newReview.text}
                          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        />
                        <ReactStars
                          count={5}
                          value={newReview.stars}
                          size={24}
                          color1="#CCCCCC"
                          color2="#FFD700"
                          edit={true}
                          onChange={(newRating) => setNewReview({ ...newReview, stars: newRating })}
                        />
                        <button
                          className="btn btn-outline-dark"
                          onClick={handleReviewSubmit}
                        >
                          Gửi Đánh Giá
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-outline-dark"
                        onClick={handleWriteReviewClick}
                      >
                        Viết Đánh Giá
                      </button>
                    )}
                  </div>
                </div>
                {/* Review của mỗi khách hàng */}
                {shopcontext.reviews.map((review) => (
                  <div key={review.id} className="card mb-3">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          {renderStarReview(review.stars)}
                        </div>
                        <div>
                          <p className="card-text">{review.text}</p>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="card-text text-muted">{formatDate(new Date(review.date))}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'related' && (
            <div className="tab-pane active">
              <div className="card mt-3">
                <div className="d-none d-md-block">
                  <div className="row mb-3">
                    <div className="col-6 col-md-4 col-lg-8 mx-auto">
                      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                        {PRODUCTS.slice(3, 7).map((product) => (
                          <div key={product.id} className="col">
                            <div className="card h-100">
                              <img src={product.image} className="card-img-top" alt="..." />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-6 col-md-4 col-lg-8 mx-auto">
                      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                        {PRODUCTS1.slice(2, 6).map((product) => (
                          <div key={product.id} className="col">
                            <div className="card h-100">
                              <img src={product.image} className="card-img-top" alt="..." />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default ProductDetails;