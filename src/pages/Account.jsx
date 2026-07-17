import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Account = () => {
  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>My Account</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Orders', icon: Package, desc: 'View your order history', path: '/orders' },
            { title: 'Wishlist', icon: Heart, desc: 'Saved products', path: '/wishlist' },
            { title: 'Profile', icon: User, desc: 'Update your details', path: '/profile' },
            { title: 'Settings', icon: Settings, desc: 'Preferences and password', path: '/settings' }
          ].map((item, i) => (
            <Link to={item.path} key={i}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass" 
                style={{ padding: '2rem', borderRadius: '20px', cursor: 'pointer', transition: 'transform 0.3s ease', height: '100%' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <item.icon size={32} style={{ marginBottom: '1rem', color: 'var(--accent-color)' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ opacity: 0.7 }}>{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
