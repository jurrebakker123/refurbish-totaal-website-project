
import { useEffect, useState } from 'react';
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
      
      // Don't block the user from leaving - removed the prevent default code
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
