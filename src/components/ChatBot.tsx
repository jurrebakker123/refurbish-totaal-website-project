
import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatBot = () => {
  const phoneNumber = "31854444255"; // Converting Dutch number to international format
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:right-8 bg-green-500 text-white p-3 rounded-full shadow-lg z-40 hover:bg-green-600 transition-colors"
      aria-label="Contact via WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">W</span>
      </div>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
};

export default ChatBot;
