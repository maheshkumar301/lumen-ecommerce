import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartCrack, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { t } = useTranslation();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1, product.colors[0]);
    removeFromWishlist(product.id);
  };

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div style={{ padding: '5rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HeartCrack size={60} style={{ opacity: 0.3, marginBottom: '2rem' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your wishlist is empty</h2>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Save items you love to review them later.</p>
            <Link to="/shop" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
              Explore Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {wishlist.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass"
                style={{ 
                  display: 'flex', 
                  gap: '2rem', 
                  padding: '1.5rem', 
                  borderRadius: '20px', 
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <Link to={`/product/${product.slug}`} style={{ width: '120px', height: '120px', borderRadius: '10px', overflow: 'hidden', display: 'block' }}>
                  <img 
                    src={product.image} 
                    alt={t(product.name)} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"; }}
                  />
                </Link>
                
                <div style={{ flexGrow: 1, minWidth: '200px' }}>
                  <Link to={`/product/${product.slug}`}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t(product.name)}</h3>
                  </Link>
                  <p style={{ opacity: 0.7, marginBottom: '0.5rem' }}>{t(product.description).substring(0, 50)}...</p>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>${product.price.toFixed(2)}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button 
                    onClick={() => handleMoveToCart(product)}
                    className="btn btn-primary"
                    style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <ShoppingCart size={18} /> Move to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    style={{ background: 'rgba(255,0,0,0.1)', border: 'none', cursor: 'pointer', color: '#ff4444', padding: '0.8rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Remove from wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
