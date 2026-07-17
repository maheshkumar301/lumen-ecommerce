import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer style={{
      padding: '3rem 0',
      textAlign: 'center',
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-color)'
    }}>
      <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{t('footer_text')}</p>
    </footer>
  );
};

export default Footer;
