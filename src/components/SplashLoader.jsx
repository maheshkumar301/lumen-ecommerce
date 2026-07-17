import React from 'react';
import { motion } from 'framer-motion';
import Scene from './3d/Scene';
import { AvatarModel } from './3d/AvatarModel';

const SplashLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Scene>
           <group position={[0, -0.5, 2]}>
             {/* Render the same avatar, but specifically configured for the splash screen */}
             <AvatarModel />
           </group>
        </Scene>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          marginTop: '-4rem',
          textAlign: 'center',
          color: '#ffffff',
          position: 'relative',
          zIndex: 10
        }}
      >
        <h1 style={{ fontSize: '3rem', letterSpacing: '0.2em', margin: 0, fontWeight: 300 }}>LUMEN.</h1>
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', margin: '1rem 0' }}></div>
        <p style={{ letterSpacing: '0.5em', fontSize: '0.8rem', opacity: 0.6, margin: 0, textTransform: 'uppercase' }}>Initializing Experience</p>
      </motion.div>
    </motion.div>
  );
};

export default SplashLoader;
