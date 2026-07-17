import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import productsData from '../data/products.json';
import ProductCard from './ProductCard';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuery('');
      setResults([]);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = productsData.filter(product => {
      const translatedName = t(product.name).toLowerCase();
      const translatedDesc = t(product.description).toLowerCase();
      const category = product.category.toLowerCase();
      return translatedName.includes(lowerQuery) || translatedDesc.includes(lowerQuery) || category.includes(lowerQuery);
    });
    setResults(filtered);
  }, [query, t]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'var(--bg-color)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '6rem',
            overflowY: 'auto'
          }}
        >
          <div className="container" style={{ position: 'relative', width: '100%' }}>
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '-3rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-color)',
                zIndex: 210
              }}
            >
              <X size={32} />
            </button>
            
            <div style={{ position: 'relative', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <Search size={32} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input 
                type="text" 
                placeholder={t('search_placeholder') || 'Search for products...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid var(--text-color)',
                  color: 'var(--text-color)',
                  fontSize: '3rem',
                  padding: '1rem 1rem 1rem 4rem',
                  outline: 'none',
                  fontFamily: 'var(--font-main)'
                }}
              />
            </div>

            {query.trim().length >= 3 && results.length === 0 && (
              <div style={{ textAlign: 'center', opacity: 0.6, fontSize: '1.2rem' }}>
                No products found for "{query}".
              </div>
            )}

            {results.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '2rem'
                }}
              >
                {results.map((product) => (
                  <div key={product.id} onClick={onClose}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
