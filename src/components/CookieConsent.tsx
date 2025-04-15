
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Wait a moment before showing the banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };
  
  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-4 left-0 right-0 mx-auto w-11/12 max-w-5xl bg-white shadow-2xl rounded-lg z-50 p-4 md:p-6 border border-gray-200"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex items-center justify-center bg-brand-darkGreen/10 p-3 rounded-full">
              <Cookie className="h-6 w-6 text-brand-darkGreen" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Cookies & Privacy</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Deze website maakt gebruik van cookies om uw ervaring te verbeteren. Door op 'Accepteren' te klikken, gaat u akkoord met het gebruik van cookies zoals beschreven in ons
                <Link to="/privacy" className="text-brand-darkGreen hover:underline font-medium ml-1">privacybeleid</Link>.
              </p>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
                <motion.button
                  onClick={handleAccept}
                  className="bg-brand-darkGreen text-white font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Alle cookies accepteren
                </motion.button>
                
                <motion.button
                  onClick={handleDecline}
                  className="border border-gray-300 bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Alleen functionele cookies
                </motion.button>
                
                <Link 
                  to="/privacy" 
                  className="text-brand-darkGreen hover:underline text-sm md:text-base self-center font-medium"
                >
                  Meer informatie
                </Link>
              </div>
            </div>
            
            <button 
              onClick={handleDecline} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
