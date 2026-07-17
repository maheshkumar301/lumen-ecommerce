import React from 'react';
import { Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Orders = () => {
  const mockOrders = [
    { id: 'ORD-1042', date: '2026-07-15', total: 299.00, status: 'Delivered' },
    { id: 'ORD-1098', date: '2026-07-10', total: 149.00, status: 'Shipped' },
    { id: 'ORD-1150', date: '2026-06-22', total: 899.00, status: 'Delivered' },
  ];

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', opacity: 0.7 }}>
          <ArrowLeft size={16} /> Back to Account
        </Link>
        
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Package size={36} color="var(--accent-color)" /> My Orders
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {mockOrders.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass" 
              style={{ padding: '2rem', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
            >
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Order {order.id}</h3>
                <p style={{ opacity: 0.7 }}>Placed on {order.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>${order.total.toFixed(2)}</div>
                <span style={{ 
                  padding: '0.4rem 1rem', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 600,
                  backgroundColor: order.status === 'Delivered' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(241, 196, 15, 0.2)',
                  color: order.status === 'Delivered' ? '#2ecc71' : '#f1c40f'
                }}>
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
