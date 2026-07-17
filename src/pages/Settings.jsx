import React, { useState } from 'react';
import { Settings, ArrowLeft, Bell, Lock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', opacity: 0.7 }}>
          <ArrowLeft size={16} /> Back to Account
        </Link>
        
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Settings size={36} color="var(--accent-color)" /> Account Settings
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Bell size={24} /> Notifications
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Order Updates</h4>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Receive updates about your shipping status.</p>
              </div>
              <button onClick={() => setNotifications(!notifications)} style={{ width: '50px', height: '26px', borderRadius: '13px', background: notifications ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)', border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: notifications ? '26px' : '2px', transition: 'left 0.3s' }} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Marketing Emails</h4>
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Promotions, new products and sales.</p>
              </div>
              <button onClick={() => setMarketing(!marketing)} style={{ width: '50px', height: '26px', borderRadius: '13px', background: marketing ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)', border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: marketing ? '26px' : '2px', transition: 'left 0.3s' }} />
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Lock size={24} /> Security
            </h2>
            <button className="btn btn-outline" style={{ display: 'block', width: '100%', padding: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
              Change Password
            </button>
            <button className="btn btn-outline" style={{ display: 'block', width: '100%', padding: '1rem', textAlign: 'left' }}>
              Two-Factor Authentication
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
