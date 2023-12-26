/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../components/shopcontext'
import { CiMail } from 'react-icons/ci'
import { BiPhoneCall } from 'react-icons/bi'
import { VscAccount } from 'react-icons/vsc'
import { CgShoppingCart, CgProductHunt } from 'react-icons/cg'
import { AiOutlineMenu, AiOutlineClose, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { NavLink, useLocation } from 'react-router-dom';
import compare from "../assets/images/compare.svg";
import wishlist from "../assets/images/wishlist.svg";
import user from "../assets/images/user.svg";
import logo from '../assets/images/logo.png'
import { FaSearch } from "react-icons/fa";
import { NavDropdown } from 'react-bootstrap';
import axios from '../api/axios.js';

const header = () => {
  const [showMenu1, setShowMenu1] = useState(false); // For "MUA HÀNG" menu
  const [showMenu2, setShowMenu2] = useState(false); // For "THƯƠNG HIỆU" menu
  const [showMenu, setShowMenu] = useState(false);
  const [userID, setUserID] = useState(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchText, setSearchText] = useState('');

  const shopcontext = useContext(ShopContext);
  // const totalProducts = shopcontext.getTotalCartProducts();
  const location = useLocation();

  useEffect(() => {
    shopcontext.checkIsLogin();
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_id = JSON.parse(user).id;
      setUserID(user_id);
    }
  }, [userID]);

  useEffect(() => {
    axios.post("/api/get-categories")
      .then(
        (response) => {
          setCategories(response.data);
        })
      .catch(function (error) {
        console.log(error.message);
      });

    axios.post("/api/get-brands")
      .then(
        (response) => {
          setBrands(response.data);
        })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const closeMenu = () => {
    setShowMenu1(false);
    setShowMenu2(false);
    setShowMenu(false);
  };

  const handleMouseOver1 = () => {
    setShowMenu1(true);
  };
  const handleMouseOver2 = () => {
    setShowMenu2(true);
  };
  return <>
    <header className='navbar-top'>
      <div className="container-xxl">
        <div className="row">
          <div className="d-flex align-items-center justify-content-between d-none d-md-flex">
            <div className="col-md-8 me-auto">
              <p className='text-white mt-2 mb-2'>The trending products at 30% off</p>
            </div>
            <div className="col-md d-flex align-items-center justify-content-end mr-3">
              <Link className='links fs-4'><CiMail /></Link>
              <Link className='links fs-4'><BiPhoneCall /></Link>
            </div>
          </div>
        </div>
      </div>
    </header>
    <header className='navbar-middle sticky-top p-2 p-md-2 p-lg-2'>
      <div className="container-xxl">
        <div className="row align-items-center m-0">
          <div className="col-md-2 d-flex justify-content-center">

            <button className="navbar-toggler d-md-none " type="button" onClick={toggleMenu}>
              <span className="navbar-toggler-icon">{showMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
              </span>
            </button>

            <Link to='/'>
              <img src={logo} alt="logo" className='img-fluid logo' />
            </Link>

            <button className="cart-span fs-3 d-md-none">
              <Link to='cart' className={location.pathname === '/wishlist' ? 'active' : 'not-active'}>
                <AiOutlineHeart />
                {/* <b><span>{totalProducts}</span></b> */}
              </Link>
            </button>

            <button className="cart-span fs-3 d-md-none">
              <Link to='cart' className={location.pathname === '/cart' ? 'active' : 'not-active'}>
                <CgShoppingCart />
                {/* <b><span>{totalProducts}</span></b> */}
              </Link>

            </button>

            <button className='cart-span-2 fs-3 d-md-none'>
              <Link to='login' className={location.pathname === '/login' ? 'active' : 'not-active'}>
                <VscAccount />
              </Link>
            </button>
          </div>

          <div className="col-md-10 row col-lg-10">
            <div className="col-md-3 m-auto">
              <div className="input-group d-none d-md-flex">
                <input type="text" onChange={(e) => setSearchText(e.target.value)} className="form-control" placeholder="Tìm kiếm sản phẩm..." aria-label="Tìm kiếm sản phẩm..." aria-describedby="basic-addon2" />
                <button className="input-group-text" id="basic-addon2" >
                  {searchText ?
                    <Link to={`/search/${searchText}`} className={location.pathname === '/search' ? 'active' : 'not-active'}>
                      <FaSearch />
                    </Link>
                    :
                    <FaSearch />
                  }
                </button>
              </div>
            </div>
            <div className="col-md-6 m-auto">
              <div className='menu-links mt-2 d-none d-md-flex d-lg-flex d-flex align-items-center'>
                <div className='ms-auto gap-3'>
                  <NavLink to="/" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={closeMenu}>
                    TRANG CHỦ
                  </NavLink>
                </div>
                <div className='ms-auto gap-3'>
                  <NavDropdown
                    title={
                      <NavLink to="/shop" className={location.pathname === '/shop' ? 'active' : 'not-active'} onClick={closeMenu}>
                        MUA HÀNG
                      </NavLink>}
                    id="dropdown-menu"
                    show={showMenu1}
                    onMouseOver={handleMouseOver1}
                    onMouseLeave={closeMenu}>
                    {categories.map((category) => (
                      <NavDropdown.Item as={NavLink} to={`/category/${category.name_str}`}>{category.name}</NavDropdown.Item>
                    ))}
                  </NavDropdown>
                </div>
                {/* <div className='ms-auto gap-3'>
                  <NavDropdown
                    title={
                      <NavLink to="/brand" className={location.pathname === '/brand' ? 'active' : 'not-active'} onClick={closeMenu}>
                        THƯƠNG HIỆU
                      </NavLink>
                    }
                    id="dropdown-menu"
                    show={showMenu2}
                    onMouseOver={handleMouseOver2}
                    onMouseLeave={closeMenu}>
                    {brands.map((brand) => (
                      <NavDropdown.Item as={NavLink} to={`/brands/${brand.name_str}`}>{brand.name}</NavDropdown.Item>
                    ))}
                  </NavDropdown>
                </div> */}
                <div className='ms-auto gap-3'>
                  <NavLink to="/about" className={location.pathname === '/about' ? 'active' : 'not-active'} onClick={closeMenu}>
                    VỀ HARU
                  </NavLink>
                </div>
                <div className='ms-auto gap-3'>
                  <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : 'not-active'} onClick={closeMenu}>
                    LIÊN HỆ
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="row d-flex justify-content-center">
                {shopcontext.isLogin ?
                  <div className="col-12 col-md-2 d-none d-md-flex d-lg-flex m-auto">
                    <div className={location.pathname === 'wishlist' ? 'active' : 'not-active'}>
                      <Link onClick={toggleMenu}
                        to="/wishlist"
                        className="d-flex align-items-center color-nav me-3">
                        <AiOutlineHeart className='me-1 fs-2' />
                      </Link>
                    </div>
                    <div className={location.pathname === 'login' ? 'active' : 'not-active'}>
                      <Link
                        to={'user'}
                        className="d-flex align-items-center color-nav me-3 cart-span-one">
                        <VscAccount className='me-1 fs-2' />
                      </Link>
                    </div>
                    <div className={location.pathname === 'cart' ? 'active' : 'not-active'}>
                      <Link onClick={toggleMenu}
                        to="/cart"
                        className="d-flex align-items-center color-nav me-3 cart-span-one">
                        <CgShoppingCart className='me-1 fs-2' />
                        {/* <b>{totalProducts}</b> */}
                      </Link>
                    </div>
                  </div>
                  :
                  <div className="col-12 col-md-2 d-none d-md-flex d-lg-flex m-auto">
                    <div className={location.pathname === 'login' ? 'active' : 'not-active'}>
                      <Link
                        to="/login"
                        className="d-flex align-items-center color-nav me-3">
                        <VscAccount className='me-1 fs-2' />
                      </Link>
                    </div>
                  </div>
                }
              </div>
            </div>

          </div>
          {showMenu && (
            <div className="col-md-10 d-md-none mt-3">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm..." aria-label="Tìm kiếm sản phẩm..." aria-describedby="basic-addon2" />
                <button className="input-group-text" id="basic-addon2"><FaSearch /></button>
              </div>
              <div className='menu-links mt-2'>
                <div className='mb-2'><NavLink className={location.pathname === '/' ? 'active' : 'not-active'} to="/" onClick={toggleMenu}>TRANG CHỦ</NavLink></div>
                <div className='mb-2'><NavLink className={location.pathname === '/shop' ? 'active' : 'not-active'} to="/shop" onClick={toggleMenu}>MUA HÀNG</NavLink></div>
                <div className='mb-2'><NavLink className={location.pathname === '/shop' ? 'active' : 'not-active'} to="/brand" onClick={toggleMenu}>THƯƠNG HIỆU</NavLink></div>
                <div className='mb-2'><NavLink className={location.pathname === '/about' ? 'active' : 'not-active'} to="/about" onClick={toggleMenu}>VỀ HARU</NavLink></div>
                <div className='mb-2'><NavLink className={location.pathname === '/contact' ? 'active' : 'not-active'} to="/contact" onClick={toggleMenu}>LIÊN HỆ</NavLink></div>
              </div>

              <div className="menu-bar__actions">
                <div className='mb-2'>
                  <Link to="" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={toggleMenu}>
                    <img src={compare} alt="compare" className='d-none' />
                    <span>New</span>
                  </Link>
                </div>
                <div className='mb-2'>
                  <Link to="" className={location.pathname === '/' ? 'active' : 'not-active'} onClick={toggleMenu}>
                    <img src={wishlist} alt="wishlist" className='d-none' />
                    <span>Wishlist</span>
                  </Link>
                </div>
                <div className='mb-2'>
                  <Link to="/login" className={location.pathname === '/login' ? 'active' : 'not-active'} onClick={toggleMenu}>
                    <img src={user} alt="user" className='d-none' />
                    <span>Account</span>
                  </Link>
                </div>
              </div>
            </div>

          )}
        </div>
      </div>
    </header>
  </>;
};

export default header