import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import roundlab from '../assets/images/brands/roundlab.jpg';
import purito from '../assets/images/brands/purito.jpg';
import makeprem from '../assets/images/brands/makeprem.jpg';
import inistree from '../assets/images/brands/inistree.jpg';
import realbarrier from '../assets/images/brands/realbarrier.jpg';
import '../styles/featuredbrands.scss';
import { Link } from 'react-router-dom';

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black", fontSize: "1.5em" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black", fontSize: "1.5em" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};

const FeaturedBrands = () => {
  const brands = [
    { name: 'Round Lab', image: roundlab, link: '/brandname/roundlab' },
    { name: 'Purito', image: purito, link: '/brandname/purito' },
    { name: 'Make P:rem', image: makeprem, link: '/brandname/makeprem' },
    { name: 'Isntree', image: inistree, link: '/brandname/isntree' },
    { name: 'Real Barrier', image: realbarrier, link: '/brandname/realbarrier' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {brands.map((brand, index) => (
        <div
          key={index}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Link to={brand.link}>
            <img src={brand.image} alt={brand.name} className="brand-image" />
            <p>{brand.name}</p>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default FeaturedBrands;