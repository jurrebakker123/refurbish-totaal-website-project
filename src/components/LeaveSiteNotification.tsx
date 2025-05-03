
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Custom event for search notification
export const triggerSearchNotification = () => {
  const event = new CustomEvent('search-notification', { 
    detail: { message: '1 nieuw bericht' } 
  });
  window.dispatchEvent(event);
};

const LeaveSiteNotification = () => {
  const location = useLocation();
  const [hasShown, setHasShown] = useState(false);
  
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Trigger the search notification when user tries to leave
      triggerSearchNotification();
      
      // Standard beforeunload handling
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasShown) {
        triggerSearchNotification();
        setHasShown(true);
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasShown, location.pathname]);

  return null;
};

export default LeaveSiteNotification;
