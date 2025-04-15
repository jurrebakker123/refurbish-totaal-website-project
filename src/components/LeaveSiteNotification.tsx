
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PhoneCall } from 'lucide-react';

const LeaveSiteNotification = () => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Show custom notification in browser tab 
      const message = 'Wilt u direct een offerte? Bel +31 6 30136079 of kom terug naar onze website!';
      e.returnValue = message; // Standard for most browsers
      return message; // For older browsers
    };

    // Add event listener when component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything, it just adds the event listener
};

export default LeaveSiteNotification;
