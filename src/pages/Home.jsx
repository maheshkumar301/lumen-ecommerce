import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import Scene from '../components/3d/Scene';
import { HeroModel } from '../components/3d/HeroModel';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import productsData from '../data/products.json';

const Home = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', paddingTop: '5rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Scene>
            {/* Shift the model to the right side */}
            <group position={[2, 0, 0]}>
              <HeroModel />
            </group>
          </Scene>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '600px', marginTop: '2rem' }}
          >
            <h1 style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>{t('hero_title')}</h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.8, position: 'relative', zIndex: 10, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>{t('hero_subtitle')}</p>

            <Link to="/shop" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2.5rem', fontSize: '1.1rem', position: 'relative', zIndex: 10 }}>
              {t('btn_explore')} <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5, zIndex: 10 }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: '1px', height: '40px', backgroundColor: 'var(--text-color)' }}
          />
        </div>
      </section>

      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Trending Now</h2>
            <Link to="/shop" style={{ borderBottom: '1px solid var(--text-color)', paddingBottom: '0.2rem' }}>View All Products</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            <AnimatePresence>
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
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
                productsData.slice(0, 3).map(product => (
                  <motion.div
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Truck size={40} style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Global Shipping</h3>
              <p style={{ opacity: 0.7 }}>Complimentary shipping and returns on all orders worldwide.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <ShieldCheck size={40} style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Premium Quality</h3>
              <p style={{ opacity: 0.7 }}>Every piece is crafted with the highest attention to detail and materials.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Leaf size={40} style={{ marginBottom: '1.5rem', color: 'var(--accent-color)' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sustainable</h3>
              <p style={{ opacity: 0.7 }}>We use ethically sourced materials to minimize our environmental footprint.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="Minimalist Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7 }}
            className="glass"
            style={{ padding: '4rem', borderRadius: '30px', maxWidth: '800px', textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Join the Inner Circle</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem' }}>
              Subscribe to our newsletter and be the first to know about new collections, exclusive events, and design inspiration.
            </p>
            <form style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                style={{ flex: '1 1 auto', padding: '1rem 1.5rem', borderRadius: '30px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)', minWidth: '200px', outline: 'none' }} 
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
