
import React from 'react';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/31854444255"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] rounded-full p-3.5 shadow-lg hover:scale-110 transition-all"
      aria-label="Contact via WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp">
        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.301-.754.966-.925 1.164-.17.199-.342.2-.642.051-.3-.15-1.268-.468-2.414-1.49-.893-.794-1.494-1.776-1.669-2.075-.176-.3-.019-.461.131-.611.136-.135.301-.353.452-.528.151-.175.2-.301.3-.502.099-.2.049-.374-.051-.524-.1-.15-.672-1.62-.922-2.22-.242-.583-.487-.5-.672-.51-.172-.01-.371-.011-.571-.011-.2 0-.522.075-.796.375-.273.3-1.045 1.02-1.045 2.489s1.07 2.889 1.22 3.089c.15.2 2.125 3.25 5.122 4.557 2.999 1.306 2.999.872 3.541.815.542-.057 1.743-.712 1.992-1.399.248-.687.248-1.273.173-1.398-.074-.125-.273-.198-.573-.349z"/>
        <path d="M12 2a10 10 0 0 1 7.743 16.33L19 22l-3.866-.001A10 10 0 0 1 12 2z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;
