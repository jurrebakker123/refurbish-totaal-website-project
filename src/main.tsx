
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GoogleTagManager from './components/GoogleTagManager';
import GoogleAnalytics from './components/GoogleAnalytics';
import DakkapelLandingPage from './pages/DakkapelLandingPage.tsx';
import ZonnepanelenPage from './pages/ZonnepanelenPage.tsx';
import SolarProductDetailPage from './pages/SolarProductDetailPage.tsx';
import IsolatieSelectiePage from './pages/IsolatieSelectiePage.tsx';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute.tsx';
import UnifiedAdminDashboard from './pages/UnifiedAdminDashboard.tsx';
import AdminLogin from './components/admin/AdminLogin.tsx';
import { SidebarProvider } from './components/ui/sidebar';
import DakkapelCalculatorConceptPage from './pages/DakkapelCalculatorConceptPage.tsx';
import DakkapelCalculatorPage from './pages/DakkapelCalculatorPage.tsx';
import BouwhulpPage from './pages/BouwhulpPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import OffertePage from './pages/OffertePage.tsx';
import DienstDetailPage from './pages/DienstDetailPage.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    return (
      <SidebarProvider defaultCollapsed={true}>
        <GoogleAnalytics />
        <Routes>
          <Route path="/" element={<DakkapelLandingPage />} />
          <Route path="/product/:productId" element={<SolarProductDetailPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <UnifiedAdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin-zonnepanelen" element={
            <ProtectedAdminRoute>
              <UnifiedAdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/dakkapel-calculator" element={<DakkapelCalculatorConceptPage />} />
          <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorPage />} />
          <Route path="/offerte" element={<OffertePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </SidebarProvider>
    );
  } 
  // Check for zonnepanelen domain
  else if (hostname === 'refurbishzonnepanelen.nl' || hostname === 'www.refurbishzonnepanelen.nl') {
    console.log('Rendering ZonnepanelenPage with product routes');
    return (
      <SidebarProvider defaultCollapsed={true}>
        <GoogleAnalytics />
        <Routes>
          <Route path="/" element={<ZonnepanelenPage />} />
          <Route path="/product/:productId" element={<SolarProductDetailPage />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <UnifiedAdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin-zonnepanelen" element={
            <ProtectedAdminRoute>
              <UnifiedAdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/dakkapel-calculator" element={<DakkapelCalculatorConceptPage />} />
          <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorPage />} />
          <Route path="/offerte" element={<OffertePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </SidebarProvider>
    );
  }
  // Check for bouwhulp domain
  else if (hostname === 'refurbishbouwhulp.nl' || hostname === 'www.refurbishbouwhulp.nl') {
    console.log('Rendering BouwhulpPage');
    return (
      <SidebarProvider defaultCollapsed={true}>
        <GoogleAnalytics />
        <Routes>
          <Route path="/" element={<BouwhulpPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <UnifiedAdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin-zonnepanelen" element={
            <ProtectedAdminRoute>
              <UnifiedAdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/offerte" element={<OffertePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/diensten/:serviceId" element={<DienstDetailPage />} />
        </Routes>
      </SidebarProvider>
    );
  }
  // Check for isolatie domain
  else if (hostname === 'isolatieselectie.nl' || hostname === 'www.isolatieselectie.nl') {
    console.log('Rendering IsolatieSelectiePage');
    return (
      <SidebarProvider defaultCollapsed={true}>
        <GoogleAnalytics />
        <Routes>
          <Route path="/" element={<IsolatieSelectiePage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <UnifiedAdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin-zonnepanelen" element={
            <ProtectedAdminRoute>
              <UnifiedAdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/dakkapel-calculator" element={<DakkapelCalculatorConceptPage />} />
          <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorPage />} />
          <Route path="/offerte" element={<OffertePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </SidebarProvider>
    );
  }
  // Default case for development and other domains
  else {
    console.log('Rendering default App with routing');
    return (
      <SidebarProvider defaultCollapsed={true}>
        <GoogleTagManager />
        <GoogleAnalytics />
        <App />
      </SidebarProvider>
    );
  }
};

// Render the appropriate component
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Router>
      {renderBasedOnDomain()}
    </Router>
  );
}
