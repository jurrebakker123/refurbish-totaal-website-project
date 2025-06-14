
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Extend the global Window interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route changes
    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
      });
      
      console.log('GA4 pageview tracked:', location.pathname);
    }
  }, [location]);

  // Track conversion events
  const trackConversion = (eventName: string, parameters?: Record<string, any>) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'conversion',
        event_label: location.pathname,
        ...parameters,
      });
    }
  };

  // Track form submissions
  const trackFormSubmission = (formType: string) => {
    trackConversion('form_submit', {
      form_type: formType,
      page_path: location.pathname,
    });
  };

  // Track contact events
  const trackContact = (contactMethod: string) => {
    trackConversion('contact', {
      contact_method: contactMethod,
      page_path: location.pathname,
    });
  };

  // Track quote requests
  const trackQuoteRequest = (serviceType?: string) => {
    trackConversion('quote_request', {
      service_type: serviceType || 'general',
      page_path: location.pathname,
    });
  };

  // Make tracking functions available globally
  useEffect(() => {
    (window as any).trackGA = {
      conversion: trackConversion,
      formSubmission: trackFormSubmission,
      contact: trackContact,
      quoteRequest: trackQuoteRequest,
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
