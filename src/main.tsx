
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import GoogleTagManager from './components/GoogleTagManager';

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

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleTagManager />
    <App />
  </BrowserRouter>
);
