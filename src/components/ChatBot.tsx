
import React from 'react';

const ChatBot = () => {
  const phoneNumber = "31854444255"; // Converting Dutch number to international format
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:right-8 z-40 transition-transform hover:scale-105"
      aria-label="Contact via WhatsApp"
    >
      <img 
        src="/lovable-uploads/f267d8c4-13cc-4af9-9a44-ff406caa4b4c.png"
        alt="WhatsApp"
        className="w-14 h-14"
      />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
};

export default ChatBot;
