
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PhoneCall } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const LeaveSiteNotification = () => {
  const [hasShown, setHasShown] = useState(false);
  
  useEffect(() => {
    // Toon een toast melding wanneer de component voor het eerst geladen wordt
    if (!hasShown) {
      setTimeout(() => {
        toast.info(
          <div className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5" />
            <span>Wilt u direct een offerte? Bel <a href="tel:+31630136079" className="font-bold hover:underline">+31 6 30136079</a></span>
          </div>,
          {
            duration: 10000,
            position: 'bottom-right'
          }
        );
        setHasShown(true);
      }, 2000);
    }
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Toon standaard browser melding bij verlaten van de website
      const message = 'Wilt u direct een offerte? Bel +31 6 30136079 of kom terug naar onze website!';
      e.returnValue = message; // Standaard voor de meeste browsers
      return message; // Voor oudere browsers
    };

    // Voeg event listener toe wanneer de component mount
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup wanneer de component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasShown]);

  return null; // Deze component rendert niets, voegt alleen event listeners toe
};

export default LeaveSiteNotification;
