import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import SettingsPage from './pages/Settings';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Footer from './components/Footer';
import SplashLoader from './components/SplashLoader';
import { AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

function App() {
  const [theme, setTheme] = useState('dark');
  const [showSplash, setShowSplash] = useState(true);
  const { progress } = useProgress();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Wait until the 3D avatar is 100% loaded before starting the dismissal timer
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 6500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <Router>
      <div className="app-container">
        <AnimatePresence>
          {showSplash && <SplashLoader key="splash" />}
        </AnimatePresence>
        
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
          </Routes>
        </main>
        <Footer />
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '2rem', 
            right: '2rem', 
            fontSize: '5rem', 
            fontWeight: 900, 
            opacity: 0.03, 
            pointerEvents: 'none', 
            zIndex: 9999,
            userSelect: 'none',
            letterSpacing: '-0.05em'
          }}
        >
          MK
        </div>
      </div>
    </Router>
  );
}

export default App;
