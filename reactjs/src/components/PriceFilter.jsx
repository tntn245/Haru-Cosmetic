import React, { useContext, useState } from 'react';
import { ShopContext } from './shopcontext';

const PriceFilter = () => {
    const { filterByPrice, updateSelectedCategory } = useContext(ShopContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        const priceRange = event.target.value;
        let minPrice, maxPrice;

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

        filterByPrice(minPrice, maxPrice);
    };
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        updateSelectedCategory(event.target.value);
    };
    return (
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
    );
};

export default PriceFilter;