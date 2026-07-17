import React, { useState } from 'react';
import { User, ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', opacity: 0.7 }}>
          <ArrowLeft size={16} /> Back to Account
        </Link>
        
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <User size={36} color="var(--accent-color)" /> My Profile
        </h1>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSave} 
          className="glass" 
          style={{ padding: '2.5rem', borderRadius: '20px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>First Name</label>
              <input type="text" defaultValue="John" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Last Name</label>
              <input type="text" defaultValue="Doe" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Email Address</label>
              <input type="email" defaultValue="john.doe@example.com" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Phone Number</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.1)', color: 'inherit' }} />
            </div>
          </div>
          
          <button type="submit" className={`btn ${saved ? 'btn-outline' : 'btn-primary'}`} style={{ width: '100%', padding: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            {saved ? 'Changes Saved!' : <><Save size={20} /> Save Profile</>}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Profile;
