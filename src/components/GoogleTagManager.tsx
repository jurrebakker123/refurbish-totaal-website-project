
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleTagManager: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Send page view event to GTM whenever the route changes
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname,
          title: document.title,
          url: window.location.href
        }
      });
      console.log('GTM pageview event sent:', location.pathname);
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleTagManager;
