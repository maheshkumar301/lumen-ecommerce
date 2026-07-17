import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import productsData from '../data/products.json';

const Shop = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', ...new Set(productsData.map(product => product.category))];

  const filteredProducts = filter === 'All' 
    ? productsData 
    : productsData.filter(product => product.category === filter);

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: '100vh' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ marginBottom: '0.5rem', fontSize: '3rem' }}>{t('nav_shop')}</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px' }}>Discover our complete collection of premium furniture and lighting.</p>
        </motion.div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setFilter(category)}
              className={`btn ${filter === category ? 'btn-primary' : 'btn-outline'}`} 
              style={{ padding: '0.5rem 1.5rem', textTransform: 'capitalize' }}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}
        >
          <AnimatePresence>
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
            ) : (
              filteredProducts.map((product, i) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
