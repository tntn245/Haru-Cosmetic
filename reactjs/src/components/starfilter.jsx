import React, { useContext, useState } from 'react';
import { ShopContext } from './shopcontext';
import ReactStars from 'react-rating-stars-component';

const StarFilter = () => {
    const {filter_Category, filter } = useContext(ShopContext);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        const starRating = parseInt(event.target.value);

        filter(starRating,0,0);
    };

    return (
        <div className="star-filter mt-3">
            <label id="stars">Đánh giá</label>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="1"
                    checked={selectedOption === '1'}
                    onChange={handleOptionChange}
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
                    onChange={handleOptionChange}
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
                    onChange={handleOptionChange}
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
                    onChange={handleOptionChange}
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
                    onChange={handleOptionChange}
                />
                <label className="form-check-label">
                    <ReactStars count={5} value={5} size={24} edit={false} activeColor="#EA9D5A" />
                </label>
            </div>
        </div>
    );
};

export default StarFilter;