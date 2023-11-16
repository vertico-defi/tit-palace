import logo from './logo.svg';
import './App.css';
import Header from "./components/header/header"
import Footer from "./components/footer/footer"
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import homepage from './pages/homepage/homepage';
import TeasersPage from './pages/teasers/teasers';
import ShopPage from './pages/shop/shop';
import Rewards from './pages/rewards/rewards'


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' exact Component={homepage} />
        <Route path='/teasers' element={<TeasersPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/rewards' element={<Rewards />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
