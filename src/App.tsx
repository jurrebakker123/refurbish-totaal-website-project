
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import DienstenPage from "./pages/DienstenPage";
import DienstDetailPage from "./pages/DienstDetailPage";
import OverOnsPage from "./pages/OverOnsPage";
import ContactPage from "./pages/ContactPage";
import OffertePage from "./pages/OffertePage";
import PrivacyPage from "./pages/PrivacyPage";
import VoorwaardenPage from "./pages/VoorwaardenPage";
import ProjectenPage from "./pages/ProjectenPage";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import { CursorEffects } from "./components/CursorEffects";
import CookieConsent from "./components/CookieConsent";
import LeaveSiteNotification from "./components/LeaveSiteNotification";
import SEOStructuredData from "./components/SEOStructuredData";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <ScrollToTop />
        <SEOStructuredData />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diensten" element={<DienstenPage />} />
          <Route path="/diensten/:serviceId" element={<DienstDetailPage />} />
          <Route path="/over-ons" element={<OverOnsPage />} />
          <Route path="/projecten" element={<ProjectenPage />} />
          <Route path="/projecten/:projectId" element={<Index />} />
          <Route path="/offerte" element={<OffertePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/voorwaarden" element={<VoorwaardenPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LeaveSiteNotification />
        <ChatBot />
        <CursorEffects />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
