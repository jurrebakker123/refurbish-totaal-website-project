
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import GoogleTagManager from './components/GoogleTagManager';
import DakkapelLandingPage from './pages/DakkapelLandingPage.tsx';
import ZonnepanelenPage from './pages/ZonnepanelenPage.tsx';

// TypeScript interface for window
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer
window.dataLayer = window.dataLayer || [];

// Push initial pageview event
window.dataLayer.push({
  event: 'pageview',
  page: {
    path: window.location.pathname,
    title: document.title
  }
});

// Determine which component to render based on the hostname
const renderBasedOnDomain = () => {
  const hostname = window.location.hostname;
  console.log('Current hostname:', hostname);
  
  // Check for dakkapel domain
  if (hostname === 'refurbishdakkapel.nl' || hostname === 'www.refurbishdakkapel.nl') {
    console.log('Rendering DakkapelLandingPage');
    return <DakkapelLandingPage />;
  } 
  // Check for zonnepanelen domain
  else if (hostname === 'refurbishzonnepanelen.nl' || hostname === 'www.refurbishzonnepanelen.nl') {
    console.log('Rendering ZonnepanelenPage');
    return <ZonnepanelenPage />;
  } 
  // Default case for development and other domains
  else {
    console.log('Rendering default App with routing');
    return (
      <BrowserRouter>
        <GoogleTagManager />
        <App />
      </BrowserRouter>
    );
  }
};

// Render the appropriate component
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(renderBasedOnDomain());
}
