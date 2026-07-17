import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import blogData from '../data/blog.json';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Find the post
    if (blogData.featured.slug === slug) {
      setPost(blogData.featured);
    } else {
      const found = blogData.posts.find(p => p.slug === slug);
      if (found) setPost(found);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <div style={{ paddingTop: '10rem', textAlign: 'center', minHeight: '100vh' }}>Post not found</div>;

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', opacity: 0.7 }}>
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', color: 'var(--accent-color)', marginBottom: '1rem', display: 'block', fontWeight: 600 }}>{post.category}</span>
          <h1 style={{ marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{post.title}</h1>
          
          <div style={{ display: 'flex', gap: '2rem', opacity: 0.6, fontSize: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {post.date}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} /> {post.readTime}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ marginBottom: '4rem', borderRadius: '20px', overflow: 'hidden', height: '400px' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"; }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.9 }}>
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '2rem' }}>{paragraph}</p>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
