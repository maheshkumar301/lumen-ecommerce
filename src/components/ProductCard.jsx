import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    addToCart(product, 1, product.colors[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const isWished = isInWishlist(product.id);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div 
      className="glass"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Link to={`/product/${product.slug}`} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden', backgroundColor: 'var(--border-color)' }}>
          {!imgLoaded && (
            <motion.div 
              animate={{ opacity: [0.3, 0.7, 0.3] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--border-color)' }}
            />
          )}
          <img 
            src={product.image} 
            alt={t(product.name)} 
            onLoad={() => setImgLoaded(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease, transform 0.5s ease', opacity: imgLoaded ? 1 : 0 }} 
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"; setImgLoaded(true); }}
          />
          <button 
            onClick={handleToggleWishlist}
            style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            title="Toggle Wishlist"
          >
            <Heart size={20} fill={isWished ? 'var(--accent-color)' : 'none'} color={isWished ? 'var(--accent-color)' : 'var(--text-color)'} />
          </button>
          
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
            {product.colors.map(color => (
              <div key={color} style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: color, border: '1px solid rgba(255,255,255,0.5)' }}></div>
            ))}
          </div>
        </div>
        
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{t(product.name)}</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>{t(product.description).substring(0, 60)}...</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>${product.price.toFixed(2)}</span>
            <button 
              onClick={handleAddToCart}
              className={`btn ${added ? 'btn-outline' : 'btn-primary'}`} 
              style={{ padding: '0.6rem', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
              title={added ? "Added!" : t('btn_add_to_cart')}
            >
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
