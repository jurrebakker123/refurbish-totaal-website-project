
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { MessageCircle, Coffee } from 'lucide-react';

const LeaveSiteNotification = () => {
  const [hasShown, setHasShown] = useState(false);
  
  useEffect(() => {
    // Toon een begroetingsmelding boven de chatbot
    if (!hasShown) {
      setTimeout(() => {
        toast.info(
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            <span>Goedemorgen! Waarmee kan ik u helpen?</span>
          </div>,
          {
            duration: 10000,
            position: 'bottom-right',
            description: 'Klik op de chatbot om te beginnen.'
          }
        );
        setHasShown(true);
      }, 2000);
    }
  }, [hasShown]);

  return null;
};

export default LeaveSiteNotification;
