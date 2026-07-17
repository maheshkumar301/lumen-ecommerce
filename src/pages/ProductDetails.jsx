import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Star, MessageSquare, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import Scene from '../components/3d/Scene';
import { HeroModel } from '../components/3d/HeroModel';

const ProductDetails = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [added, setAdded] = useState(false);

  const [reviews, setReviews] = useState([
    { name: "Sarah M.", date: "Oct 12, 2026", rating: 5, text: "Absolutely stunning piece. The quality exceeded my expectations and it looks perfect in my space." },
    { name: "James T.", date: "Sep 28, 2026", rating: 5, text: "Beautiful design and incredible craftsmanship. Delivery was fast and the packaging was very secure." },
    { name: "Emily R.", date: "Sep 15, 2026", rating: 4, text: "Love the minimalist aesthetic. It's exactly as pictured. A great addition to my home." },
    { name: "Michael B.", date: "Aug 02, 2026", rating: 5, text: "Highly recommend! The materials feel incredibly premium." },
    { name: "Linda K.", date: "Jul 18, 2026", rating: 5, text: "This completely transformed my living room. Worth every penny." },
    { name: "David S.", date: "Jul 05, 2026", rating: 4, text: "Very good product. Arrived slightly later than expected, but the quality makes up for it." }
  ]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentReviewIndex(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
    }
    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) return <div style={{ paddingTop: '10rem', textAlign: 'center' }}>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.text) {
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      setReviews([{ ...newReview, date: today }, ...reviews]);
      setIsWritingReview(false);
      setNewReview({ name: '', rating: 5, text: '' });
      setCurrentReviewIndex(0);
    }
  };

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '6rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container split-layout">
        
        {/* Left side: Product Image */}
        <div style={{ height: '600px', position: 'relative', borderRadius: '20px', overflow: 'hidden', backgroundColor: 'var(--border-color)' }}>
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={product.image} 
            alt={t(product.name)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"; }}
          />
        </div>

        {/* Right side: Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', opacity: 0.7 }}>
            <ArrowLeft size={16} /> Back to Shop
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{t(product.name)}</h1>
            <p style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '2rem' }}>${product.price.toFixed(2)}</p>
            
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8, marginBottom: '3rem' }}>
              {t(product.description)}
            </p>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', opacity: 0.7 }}>Select Color</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: selectedColor === color ? '2px solid var(--text-color)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      outline: selectedColor === color ? '4px solid var(--bg-color)' : 'none',
                      transition: 'transform 0.2s ease',
                      transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
                    }}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`btn ${added ? 'btn-outline' : 'btn-primary'}`}
              style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              {added ? <><Check size={20} /> Added to Cart</> : t('btn_add_to_cart')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container" style={{ marginTop: '6rem', width: '100%', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem' }}>Customer Reviews</h2>
          <button onClick={() => setIsWritingReview(true)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={16} /> Write a Review
          </button>
        </div>
        
        {/* Carousel */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: '1rem 0' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentReviewIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`, gap: '2rem', padding: itemsPerPage === 1 ? '0 3rem' : '0 4rem' }}
            >
              {reviews.slice(currentReviewIndex * itemsPerPage, (currentReviewIndex + 1) * itemsPerPage).map((review, idx) => (
                <div key={idx} className="glass" style={{ padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? "var(--text-color)" : "none"} color={i < review.rating ? "var(--text-color)" : "var(--border-color)"} />
                    ))}
                  </div>
                  <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.8, marginBottom: '1.5rem', flexGrow: 1 }}>"{review.text}"</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', opacity: 0.6 }}>
                    <strong>{review.name}</strong>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          <button onClick={handlePrevReview} className="glass" style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', border: 'none', cursor: 'pointer', opacity: 0.8, padding: '0.8rem', transition: 'all 0.2s ease', borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.8}>
            <ChevronLeft size={32} color="var(--text-color)" />
          </button>
          <button onClick={handleNextReview} className="glass" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', border: 'none', cursor: 'pointer', opacity: 0.8, padding: '0.8rem', transition: 'all 0.2s ease', borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.8}>
            <ChevronRight size={32} color="var(--text-color)" />
          </button>
        </div>
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {isWritingReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass"
              style={{ width: '90%', maxWidth: '500px', padding: '3rem', borderRadius: '30px', position: 'relative' }}
            >
              <button onClick={() => setIsWritingReview(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}>
                <X size={24} />
              </button>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Write a Review</h3>
              
              <form onSubmit={submitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Your Name</label>
                  <input required value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} type="text" style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-color)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Rating</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1,2,3,4,5].map(star => (
                      <button key={star} type="button" onClick={() => setNewReview({...newReview, rating: star})} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <Star size={28} fill={star <= newReview.rating ? "var(--text-color)" : "none"} color={star <= newReview.rating ? "var(--text-color)" : "var(--border-color)"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Your Review</label>
                  <textarea required value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})} rows="4" style={{ width: '100%', padding: '1rem', borderRadius: '15px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-color)', outline: 'none', resize: 'vertical' }}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem', borderRadius: '15px' }}>Submit Review</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
