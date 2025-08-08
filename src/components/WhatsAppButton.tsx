import React from 'react';
import { WhatsAppIcon } from '../../constants';

const WHATSAPP_NUMBER = '9609641626';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:scale-105 z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
      }}
    >
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  );
};
