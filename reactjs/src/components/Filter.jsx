import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from './shopcontext';
import ReactStars from 'react-rating-stars-component';

const Filter = () => {
    const {filter, updateSelectedCategory } = useContext(ShopContext);
    const [selectedOption, setSelectedOption] = useState('');

    const handleStarOptionChange = (event) => {
        setSelectedOption(event.target.value);
        let starRating = parseInt(event.target.value);
        filter(starRating,0,0);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        const priceRange = event.target.value;
        let minPrice, maxPrice = 0;

        if (priceRange === 'low') {
            minPrice = 0;
            maxPrice = 100000;
        } else if (priceRange === 'medium') {
            minPrice = 100000;
            maxPrice = 500000;
        } else if (priceRange === 'high') {
            minPrice = 500000;
            maxPrice = Infinity;
        }
        filter(0, minPrice, maxPrice);
    };
    
    return (
        <div>
        <div className="price-filter">
            <label id="price">Giá bán</label>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="low"
                    checked={selectedOption === 'low'}
                    onChange={handleOptionChange}
                />
                <label className="form-check-label">0-100,000</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="medium"
                    checked={selectedOption === 'medium'}
                    onChange={handleOptionChange}
                />
                <label className="form-check-label">100,000-500,000</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="high"
                    checked={selectedOption === 'high'}
                    onChange={handleOptionChange}
                />
                <label className="form-check-label">{'>'}500,000</label>
            </div>
        </div>
        
        <div className="star-filter mt-3">
            <label id="stars">Đánh giá</label>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="1"
                    checked={selectedOption === '1'}
                    onChange={handleStarOptionChange}
                />
                <label className="form-check-label">
                    <ReactStars count={5} value={1} size={24} edit={false} activeColor="#EA9D5A" />
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="2"
                    checked={selectedOption === '2'}
                    onChange={handleStarOptionChange}
                />
                <label className="form-check-label">
                    <ReactStars count={5} value={2} size={24} edit={false} activeColor="#EA9D5A" />
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="3"
                    checked={selectedOption === '3'}
                    onChange={handleStarOptionChange}
                />
                <label className="form-check-label">
                    <ReactStars count={5} value={3} size={24} edit={false} activeColor="#EA9D5A" />
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="4"
                    checked={selectedOption === '4'}
                    onChange={handleStarOptionChange}
                />
                <label className="form-check-label">
                    <ReactStars count={5} value={4} size={24} edit={false} activeColor="#EA9D5A" />
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="5"
                    checked={selectedOption === '5'}
                    onChange={handleStarOptionChange}
                />
                <label className="form-check-label">
                    <ReactStars count={5} value={5} size={24} edit={false} activeColor="#EA9D5A" />
                </label>
            </div>
        </div>
        </div>
    );
};

export default Filter;