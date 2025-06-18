
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { GoogleTagManager } from '@/components/GoogleTagManager';
import { SEOOptimizer } from '@/components/SEOOptimizer';
import { CursorEffects } from '@/components/CursorEffects';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CookieConsent } from '@/components/CookieConsent';
import { LeaveSiteNotification } from '@/components/LeaveSiteNotification';
import { PWAInstallPrompt } from '@/components/admin/PWAInstallPrompt';
import { ChatBot } from '@/components/ChatBot';
import Index from "./pages/Index";
import DienstenPage from "./pages/DienstenPage";
import DienstDetailPage from "./pages/DienstDetailPage";
import ProjectenPage from "./pages/ProjectenPage";
import OverOnsPage from "./pages/OverOnsPage";
import ContactPage from "./pages/ContactPage";
import OffertePage from "./pages/OffertePage";
import BedrijvenPage from "./pages/BedrijvenPage";
import DakkapelLandingPage from "./pages/DakkapelLandingPage";
import DakkapelCalculatorPage from "./pages/DakkapelCalculatorPage";
import DakkapelCalculatorConceptPage from "./pages/DakkapelCalculatorConceptPage";
import ZonnepanelenPage from "./pages/ZonnepanelenPage";
import SolarProductDetailPage from "./pages/SolarProductDetailPage";
import IsolatietechniekPage from "./pages/IsolatietechniekPage";
import KozijntechniekPage from "./pages/KozijntechniekPage";
import IsolatieSelectiePage from "./pages/IsolatieSelectiePage";
import BouwhulpPage from "./pages/BouwhulpPage";
import TuinhuizenPage from "./pages/TuinhuizenPage";
import TuinhuizenModelPage from "./pages/TuinhuizenModelPage";
import VacaturesPage from "./pages/VacaturesPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminDakkapelPage from "./pages/AdminDakkapelPage";
import AdminZonnepanelenPage from "./pages/AdminZonnepanelenPage";
import AdminZonnepanelenDashboardPage from "./pages/AdminZonnepanelenDashboardPage";
import UnifiedAdminDashboard from "./pages/UnifiedAdminDashboard";
import InterestConfirmationPage from "./pages/InterestConfirmationPage";
import PrivacyPage from "./pages/PrivacyPage";
import VoorwaardenPage from "./pages/VoorwaardenPage";
import CertificaatPage from "./pages/CertificaatPage";
import NotFound from "./pages/NotFound";

// New Marketplace Pages
import MarketplacePage from "./pages/MarketplacePage";
import MarketplaceAuthPage from "./pages/MarketplaceAuthPage";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <GoogleTagManager />
          <GoogleAnalytics />
          <SEOOptimizer />
          <CursorEffects />
          <WhatsAppButton />
          <CookieConsent />
          <LeaveSiteNotification />
          <PWAInstallPrompt />
          <ChatBot />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diensten" element={<DienstenPage />} />
            <Route path="/diensten/:slug" element={<DienstDetailPage />} />
            <Route path="/projecten" element={<ProjectenPage />} />
            <Route path="/over-ons" element={<OverOnsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/offerte" element={<OffertePage />} />
            <Route path="/bedrijven" element={<BedrijvenPage />} />
            <Route path="/dakkapel" element={<DakkapelLandingPage />} />
            <Route path="/dakkapel-calculator" element={<DakkapelCalculatorPage />} />
            <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorConceptPage />} />
            <Route path="/zonnepanelen" element={<ZonnepanelenPage />} />
            <Route path="/zonnepanelen/:productId" element={<SolarProductDetailPage />} />
            <Route path="/isolatietechniek" element={<IsolatietechniekPage />} />
            <Route path="/kozijntechniek" element={<KozijntechniekPage />} />
            <Route path="/isolatie-selectie" element={<IsolatieSelectiePage />} />
            <Route path="/bouwhulp" element={<BouwhulpPage />} />
            <Route path="/tuinhuizen" element={<TuinhuizenPage />} />
            <Route path="/tuinhuizen/:modelId" element={<TuinhuizenModelPage />} />
            <Route path="/vacatures" element={<VacaturesPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/dakkapel" element={<AdminDakkapelPage />} />
            <Route path="/admin/zonnepanelen" element={<AdminZonnepanelenPage />} />
            <Route path="/admin/zonnepanelen-dashboard" element={<AdminZonnepanelenDashboardPage />} />
            <Route path="/admin/unified" element={<UnifiedAdminDashboard />} />
            <Route path="/interest-bevestiging" element={<InterestConfirmationPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/voorwaarden" element={<VoorwaardenPage />} />
            <Route path="/certificaat" element={<CertificaatPage />} />
            
            {/* New Marketplace Routes */}
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/login" element={<MarketplaceAuthPage />} />
            <Route path="/marketplace/vakman-registratie" element={<MarketplaceAuthPage />} />
            <Route path="/marketplace/klus-plaatsen" element={<MarketplaceAuthPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
