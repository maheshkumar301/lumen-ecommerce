import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Moon, Sun, Globe, User, Heart, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchModal from './SearchModal';

const Navbar = ({ theme, toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        padding: '0.8rem 0',
      }}
    >
      <div className="container glass" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        borderRadius: '50px',
        margin: '0 auto',
      }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', zIndex: 102 }}>
          LUMEN.
        </Link>

        <div className="desktop-only" style={{ gap: '3rem', alignItems: 'center' }}>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/">{t('nav_home')}</Link>
            <Link to="/shop">{t('nav_shop')}</Link>
            <Link to="/blog">{t('nav_blog')}</Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button onClick={() => setIsSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <Search size={20} />
            </button>
            <button onClick={toggleLanguage} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={20} />
              <span style={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>{i18n.language}</span>
            </button>
            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/account" style={{ color: 'inherit' }}>
              <User size={20} />
            </Link>
            <Link to="/wishlist" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit' }}>
              <Heart size={20} />
              {totalWishlistItems > 0 && (
                <span style={{ background: 'var(--accent-color)', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', fontWeight: 'bold', marginLeft: '-10px', marginTop: '-10px' }}>{totalWishlistItems}</span>
              )}
            </Link>
            <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={20} />
              <span style={{ background: 'var(--text-color)', color: 'var(--bg-color)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>{totalItems}</span>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-only" style={{ alignItems: 'center', gap: '1rem', zIndex: 102 }}>
          <button onClick={() => setIsSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex' }}>
            <Search size={24} />
          </button>
          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', color: 'inherit', position: 'relative' }}>
            <ShoppingBag size={24} />
            {totalItems > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--text-color)', color: 'var(--bg-color)', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.65rem', fontWeight: 'bold' }}>{totalItems}</span>}
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex' }}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'var(--bg-color)', zIndex: 101, display: 'flex', flexDirection: 'column', paddingTop: '6rem', paddingLeft: '2rem', paddingRight: '2rem' }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '2rem', marginTop: '2rem' }}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>{t('nav_home')}</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>{t('nav_shop')}</Link>
                <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>{t('nav_blog')}</Link>
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>Account</Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link>
              </nav>
              
              <div style={{ marginTop: 'auto', marginBottom: '4rem', display: 'flex', gap: '2rem' }}>
                <button onClick={toggleLanguage} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                  <Globe size={24} /> {i18n.language.toUpperCase()}
                </button>
                <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                  {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />} Theme
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  );
};

export default Navbar;
