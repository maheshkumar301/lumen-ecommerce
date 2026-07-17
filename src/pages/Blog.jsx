import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import blogData from '../data/blog.json';

const { posts: blogPosts, featured: featuredPost } = blogData;

const Blog = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100vh' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>The Journal</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>Thoughts, insights, and inspiration for the modern aesthetic.</p>
        </motion.div>

        {/* Featured Post */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="glass split-layout" style={{ borderRadius: '30px', overflow: 'hidden', marginBottom: '6rem', gap: 0 }}>
          <div style={{ minHeight: '400px', position: 'relative' }}>
            <img src={featuredPost.image} alt={featuredPost.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"; }} />
          </div>
          <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.5, marginBottom: '1rem', fontWeight: 600 }}>{featuredPost.category}</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>{featuredPost.title}</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2rem', lineHeight: 1.6 }}>{featuredPost.excerpt}</p>
            
            <div style={{ display: 'flex', gap: '2rem', opacity: 0.6, fontSize: '0.9rem', marginBottom: '2rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={16} /> {featuredPost.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> {featuredPost.readTime}</span>
            </div>

            <Link to={`/blog/${featuredPost.slug}`} className="btn btn-primary" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Read Article <ArrowRight size={18} /></Link>
          </div>
        </motion.div>

        {/* Latest Posts Grid */}
        <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Latest Articles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }} className="glass" style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"; }} />
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', color: 'var(--text-color)', opacity: 0.5, marginBottom: '1rem', fontWeight: 600 }}>{post.category}</span>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h4>
                <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1 }}>{post.excerpt}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', gap: '1rem', opacity: 0.5, fontSize: '0.8rem' }}>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-color)', fontWeight: 600, fontSize: '0.9rem' }}>Read <ArrowRight size={16} /></Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
