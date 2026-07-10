import React from 'react';
import { motion } from 'framer-motion';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CreNeev on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-16px_rgba(37,211,102,0.75)] transition-shadow duration-300 hover:shadow-[0_20px_55px_-14px_rgba(37,211,102,0.95)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      animate={{ y: [0, -6, 0] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3.2A12.66 12.66 0 0 0 3.35 15.86c0 2.23.58 4.41 1.69 6.33L3.2 28.8l6.78-1.78a12.64 12.64 0 0 0 6.04 1.54h.01A12.66 12.66 0 0 0 28.7 15.9 12.66 12.66 0 0 0 16.02 3.2Zm0 23.2h-.01a10.5 10.5 0 0 1-5.36-1.47l-.38-.23-4.02 1.05 1.07-3.92-.25-.4a10.5 10.5 0 1 1 8.95 4.97Zm5.76-7.86c-.32-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.16-.21.32-.82 1.02-1.01 1.23-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.56-.94-.84-1.58-1.88-1.77-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.83.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </motion.a>
  );
};