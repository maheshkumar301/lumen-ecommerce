import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image Skeleton */}
      <motion.div 
        animate={{ opacity: [0.3, 0.7, 0.3] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ height: '300px', backgroundColor: 'var(--border-color)' }}
      />
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Title Skeleton */}
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ height: '1.5rem', width: '70%', backgroundColor: 'var(--border-color)', marginBottom: '0.8rem', borderRadius: '4px' }}
        />
        {/* Description Skeletons */}
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ height: '1rem', width: '100%', backgroundColor: 'var(--border-color)', marginBottom: '0.5rem', borderRadius: '4px' }}
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ height: '1rem', width: '80%', backgroundColor: 'var(--border-color)', marginBottom: '2rem', borderRadius: '4px' }}
        />
        
        {/* Footer Skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ height: '1.5rem', width: '30%', backgroundColor: 'var(--border-color)', borderRadius: '4px' }}
          />
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ height: '40px', width: '40px', backgroundColor: 'var(--border-color)', borderRadius: '50%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
