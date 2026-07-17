import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: '10rem', minHeight: '80vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Your cart is empty</h2>
        <Link to="/shop" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{t('nav_cart')}</h1>
        
        <div className="split-layout" style={{ gap: '3rem' }}>
          {/* Cart Items */}
          <div>
            {cart.map((item, index) => (
              <motion.div 
                key={`${item.id}-${item.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass"
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '2rem', 
                  padding: '1.5rem', 
                  borderRadius: '20px', 
                  marginBottom: '1.5rem',
                  alignItems: 'center'
                }}
              >
                <div style={{ width: '120px', height: '120px', borderRadius: '10px', overflow: 'hidden' }}>
                  <img 
                    src={item.image} 
                    alt={t(item.name)} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"; }}
                  />
                </div>
                
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t(item.name)}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.7, marginBottom: '1rem' }}>
                    Color: <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: item.color, border: '1px solid var(--border-color)' }}></div>
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>${item.price.toFixed(2)}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-color)', padding: '0.5rem', borderRadius: '30px' }}>
                  <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '0.2rem' }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '0.2rem' }}>
                    <Plus size={16} />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id, item.color)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red', padding: '1rem', opacity: 0.7 }}
                  title="Remove from cart"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ flex: '1 1 300px' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', position: 'sticky', top: '8rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.8 }}>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.8 }}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div style={{ height: '1px', background: 'var(--border-color)', margin: '1.5rem 0' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 600 }}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                Proceed to Checkout <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
