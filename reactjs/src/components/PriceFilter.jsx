import React, { useContext, useState } from 'react';
import { ShopContext } from './shopcontext';

const PriceFilter = () => {
    const { filterByPrice } = useContext(ShopContext);
    const [selectedOption, setSelectedOption] = useState('');

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

    return (
        <div>
            <label><b>Price</b></label><br />
            <label>
                <input
                    type="radio"
                    value="low"
                    checked={selectedOption === 'low'}
                    onChange={handleOptionChange}
                />
                0-100000
            </label><br />

            <label>
                <input
                    type="radio"
                    value="medium"
                    checked={selectedOption === 'medium'}
                    onChange={handleOptionChange}
                />
                100000-500000
            </label><br />

            <label>
                <input
                    type="radio"
                    value="high"
                    checked={selectedOption === 'high'}
                    onChange={handleOptionChange}
                />
                {`>`}500000
            </label>
        </div>
    );
};

export default PriceFilter;