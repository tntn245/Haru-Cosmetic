/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter, Route, useLocation, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/home'
import About from './pages/about'
import Shop from './pages/shop'
import Contact from './pages/contact'
import Login from './pages/login'
import Signup from './pages/signup'
import EditUserProfile from './pages/editprofile'
import Forgotpasword from './pages/forgotpasword'
import Cart from './pages/cart'
import Thanks from './pages/thanks'
import Checkout from './pages/checkout'
import Search from './pages/search'
import Brands from './pages/brand'
import './App.css'
import ShopContext from './components/shopcontext'
import { RoleContext } from './components/rolecontext'
import Details from './pages/details'
import User from './pages/user'
import Wishlist from './pages/wishlist'
import ImageUploadForm from './pages/testloadimg'
import Category from './pages/category'
import Brandname from './pages/brandname'
import Dashboard from './admin/pages/dashboard'
import Products from './admin/scenes/products'
import Account from './admin/scenes/account'
import Orders from './admin/scenes/orders'
import Form from './admin/scenes/form'
import Categories from './admin/scenes/category'
import Bar from './admin/scenes/bar'
// import Calendar from './admin/scenes/calendar/calendar'
import Line from './admin/scenes/line'
import Pie from "./admin/scenes/pie";
import FAQ from "./admin/scenes/faq";
import Geography from "./admin/scenes/geography";
import Sidebar from './admin/scenes/global/Sidebar'
import Topbar from './admin/scenes/global/Topbar'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  const { role } = useContext(RoleContext);

  return (
    <>
      <ShopContext>
        <ScrollToTop />
        {role != 'admin'
          ?
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='shop' element={<Shop />} />
              <Route path='about' element={<About />} />
              <Route path='contact' element={<Contact />} />
              <Route path='/search/:query' element={<Search />} />
              <Route path='login' element={<Login />} />
              <Route path='/user' element={<User />} />
              <Route path='signup' element={<Signup />} />
              <Route path='forgotpasword' element={<Forgotpasword />} />
              <Route path='cart' element={<Cart />} />
              <Route path='wishlist' element={<Wishlist />} />
              <Route path='checkout' element={<Checkout />} />
              <Route path='thanks' element={<Thanks />} />
              <Route path='editprofile' element={<EditUserProfile />} />
              <Route path='details' element={<Details />} />
              <Route path='img' element={<ImageUploadForm />} />
              <Route path='/category/:categoryStr' element={<Category />} />
              <Route path='/brands/:brandStr' element={<Brandname />} />
              <Route path='brand' element={<Brands />} />
            </Route>
          </Routes>
          :
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/category" element={<Categories />} />
                    <Route path="/brand" element={<Brands />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        }
      </ShopContext>
    </>
  )
}

export default App
