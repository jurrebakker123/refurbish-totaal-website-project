
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import GoogleTagManager from "@/components/GoogleTagManager";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeaveSiteNotification from "@/components/LeaveSiteNotification";
import Index from "./pages/Index";
import DienstenPage from "./pages/DienstenPage";
import DienstDetailPage from "./pages/DienstDetailPage";
import OffertePage from "./pages/OffertePage";
import ContactPage from "./pages/ContactPage";
import OverOnsPage from "./pages/OverOnsPage";
import ProjectenPage from "./pages/ProjectenPage";
import VoorwaardenPage from "./pages/VoorwaardenPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";
import DakkapelLandingPage from "./pages/DakkapelLandingPage";
import DakkapelCalculatorPage from "./pages/DakkapelCalculatorPage";
import DakkapelCalculatorConceptPage from "./pages/DakkapelCalculatorConceptPage";
import IsolatieSelectiePage from "./pages/IsolatieSelectiePage";
import IsolatietechniekPage from "./pages/IsolatietechniekPage";
import KozijntechniekPage from "./pages/KozijntechniekPage";
import ZonnepanelenPage from "./pages/ZonnepanelenPage";
import TuinhuizenPage from "./pages/TuinhuizenPage";
import TuinhuizenModelPage from "./pages/TuinhuizenModelPage";
import BouwhulpPage from "./pages/BouwhulpPage";
import SolarProductDetailPage from "./pages/SolarProductDetailPage";
import CertificaatPage from "./pages/CertificaatPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <GoogleTagManager />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diensten" element={<DienstenPage />} />
            <Route path="/diensten/:serviceId" element={<DienstDetailPage />} />
            <Route path="/offerte" element={<OffertePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/over-ons" element={<OverOnsPage />} />
            <Route path="/projecten" element={<ProjectenPage />} />
            <Route path="/voorwaarden" element={<VoorwaardenPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/dakkapel" element={<DakkapelLandingPage />} />
            <Route path="/dakkapel-calculator" element={<DakkapelCalculatorConceptPage />} />
            <Route path="/dakkapel-calculator-concept" element={<DakkapelCalculatorPage />} />
            <Route path="/isolatie-selectie" element={<IsolatieSelectiePage />} />
            <Route path="/isolatietechniek" element={<IsolatietechniekPage />} />
            <Route path="/kozijntechniek" element={<KozijntechniekPage />} />
            <Route path="/zonnepanelen" element={<ZonnepanelenPage />} />
            <Route path="/tuinhuizen" element={<TuinhuizenPage />} />
            <Route path="/tuinhuizen/model/:id" element={<TuinhuizenModelPage />} />
            <Route path="/bouwhulp" element={<BouwhulpPage />} />
            <Route path="/zonnepanelen/:slug" element={<SolarProductDetailPage />} />
            <Route path="/certificaat" element={<CertificaatPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <WhatsAppButton />
          <LeaveSiteNotification />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
