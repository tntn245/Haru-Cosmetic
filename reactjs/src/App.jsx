/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter, Route, useLocation, Routes } from 'react-router-dom'
import Layout from './components/layout'
import LayoutAdmin from './components/layoutadmin'
import Home from './pages/home'
import About from './pages/about'
import Shop from './pages/shop'
import Contact from './pages/contact'
import Login from './pages/login'
import Signup from './pages/signup'
import Forgotpasword from './pages/forgotpasword'
import Cart from './pages/cart'
import Thanks from './pages/thanks'
import Checkout from './pages/checkout'
import Search from './pages/search'
import './App.css'
import ShopContext from './components/shopcontext'
import Details from './pages/details'
import User from './pages/user'
import Wishlist from './pages/wishlist'
import ImageUploadForm from './pages/testloadimg'
import Category from './pages/category'
import Dashboard from './admin/pages/dashboard'
import Contacts from './admin/scenes/contacts'
import Team from './admin/scenes/team'
import Invoices from './admin/scenes/invoices'
import Form from './admin/scenes/form'
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
  const [role, setRole] = useState('');
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();
  // const shopcontext = useContext(ShopContext);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user != null) {
      const user_type = JSON.parse(user).type;
      setRole(user_type);
      console.log(role);
      // console.log("islogin", shopcontext.isLogin);
    }
  }, [role]);

  return (
    <>
      <ShopContext>
        <ScrollToTop />
        <Routes>
          <Route path='login' element={<Login />} />
        </Routes>
        {role != 'admin'
          ?
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='shop' element={<Shop />} />
              <Route path='about' element={<About />} />
              <Route path='contact' element={<Contact />} />
              <Route path='/search/:query' element={<Search />} />
              {/* <Route path='login' element={<Login />} /> */}
              <Route path='/user/:query' element={<User />} />
              <Route path='signup' element={<Signup />} />
              <Route path='forgotpasword' element={<Forgotpasword />} />
              <Route path='cart' element={<Cart />} />
              <Route path='wishlist' element={<Wishlist />} />
              <Route path='checkout/:query' element={<Checkout />} />
              <Route path='thanks' element={<Thanks />} />
              <Route path='details' element={<Details />} />
              <Route path='img' element={<ImageUploadForm />} />
              <Route path='/category/:categoryStr' element={<Category />} />
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
                    {/* <Route path="login" element={<Login />} /> */}
                    <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    {/* <Route path="/calendar" element={<Calendar />} /> */}
                    <Route path="/geography" element={<Geography />} />
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
