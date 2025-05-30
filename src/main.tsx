
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GoogleTagManager from './components/GoogleTagManager';
import DakkapelLandingPage from './pages/DakkapelLandingPage.tsx';
import ZonnepanelenPage from './pages/ZonnepanelenPage.tsx';
import SolarProductDetailPage from './pages/SolarProductDetailPage.tsx';
import IsolatieSelectiePage from './pages/IsolatieSelectiePage.tsx';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute.tsx';
import AdminDashboardPage from './pages/AdminDashboardPage.tsx';
import AdminLogin from './components/admin/AdminLogin.tsx';
import { SidebarProvider } from './components/ui/sidebar';
import DakkapelCalculatorConceptPage from './pages/DakkapelCalculatorConceptPage.tsx';
import DakkapelCalculatorPage from './pages/DakkapelCalculatorPage.tsx';
import BouwhulpPage from './pages/BouwhulpPage.tsx';
import AdminZonnepanelenPage from './pages/AdminZonnepanelenPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import OffertePage from './pages/OffertePage.tsx';
import DienstDetailPage from './pages/DienstDetailPage.tsx';

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
      <BrowserRouter>
        <SidebarProvider defaultCollapsed={true}>
          <Routes>
            <Route path="/" element={<DakkapelLandingPage />} />
            <Route path="/product/:productId" element={<SolarProductDetailPage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/dakkapel-calculator" element={<DakkapelCalculatorConceptPage />} />
            <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorPage />} />
            <Route path="/offerte" element={<OffertePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    );
  } 
  // Check for zonnepanelen domain
  else if (hostname === 'refurbishzonnepanelen.nl' || hostname === 'www.refurbishzonnepanelen.nl') {
    console.log('Rendering ZonnepanelenPage with product routes');
    return (
      <BrowserRouter>
        <SidebarProvider defaultCollapsed={true}>
          <Routes>
            <Route path="/" element={<ZonnepanelenPage />} />
            <Route path="/product/:productId" element={<SolarProductDetailPage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/dakkapel-calculator" element={<DakkapelCalculatorConceptPage />} />
            <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorPage />} />
            <Route path="/offerte" element={<OffertePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    );
  }
  // Check for bouwhulp domain
  else if (hostname === 'refurbishbouwhulp.nl' || hostname === 'www.refurbishbouwhulp.nl') {
    console.log('Rendering BouwhulpPage');
    return (
      <BrowserRouter>
        <SidebarProvider defaultCollapsed={true}>
          <Routes>
            <Route path="/" element={<BouwhulpPage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/offerte" element={<OffertePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/diensten/:serviceId" element={<DienstDetailPage />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    );
  }
  // Check for isolatie domain
  else if (hostname === 'isolatieselectie.nl' || hostname === 'www.isolatieselectie.nl') {
    console.log('Rendering IsolatieSelectiePage');
    return (
      <BrowserRouter>
        <SidebarProvider defaultCollapsed={true}>
          <Routes>
            <Route path="/" element={<IsolatieSelectiePage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/dakkapel-calculator" element={<DakkapelCalculatorConceptPage />} />
            <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorPage />} />
            <Route path="/offerte" element={<OffertePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    );
  }
  // Default case for development and other domains
  else {
    console.log('Rendering default App with routing');
    return (
      <BrowserRouter>
        <GoogleTagManager />
        <SidebarProvider defaultCollapsed={true}>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/refurbishdakkapel" element={<DakkapelLandingPage />} />
            <Route path="/refurbishzonnepanelen" element={<ZonnepanelenPage />} />
            <Route path="/refurbishbouwhulp" element={<BouwhulpPage />} />
            <Route path="/isolatie-selectie" element={<IsolatieSelectiePage />} />
            <Route path="/product/:productId" element={<SolarProductDetailPage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/dakkapel-calculator" element={<DakkapelCalculatorConceptPage />} />
            <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorPage />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    );
  }
};

// Render the appropriate component
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(renderBasedOnDomain());
}
