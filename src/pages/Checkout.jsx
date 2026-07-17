import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/account');
    }, 3000);
  };

  if (success) {
    return (
      <div style={{ paddingTop: '8rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <CheckCircle size={80} color="var(--accent-color)" style={{ marginBottom: '2rem' }} />
        </motion.div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Order Confirmed!</h1>
        <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>Thank you for your purchase. Redirecting to your account...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: '8rem', minHeight: '80vh', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>No items to checkout</h2>
        <button className="btn btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '2rem' }}>Go to Shop</button>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Checkout</h1>
        
        <form onSubmit={handleCheckout} className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Shipping Details</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <input type="text" placeholder="First Name" required style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
            <input type="text" placeholder="Last Name" required style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
          </div>
          <input type="text" placeholder="Address" required style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit', marginBottom: '1rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <input type="text" placeholder="City" required style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
            <input type="text" placeholder="Postal Code" required style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
          </div>

          <h3 style={{ marginBottom: '1.5rem' }}>Payment</h3>
          <input type="text" placeholder="Card Number" required style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit', marginBottom: '1rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <input type="text" placeholder="MM/YY" required style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
            <input type="text" placeholder="CVC" required style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 600 }}>
              <span>Total to Pay</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}>
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
