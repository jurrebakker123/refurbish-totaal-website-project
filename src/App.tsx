
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { CartProvider } from '@/context/CartContext';
import Index from '@/pages/Index';
import DienstenPage from '@/pages/DienstenPage';
import DienstDetailPage from '@/pages/DienstDetailPage';
import ContactPage from '@/pages/ContactPage';
import OffertePage from '@/pages/OffertePage';
import OverOnsPage from '@/pages/OverOnsPage';
import ProjectenPage from '@/pages/ProjectenPage';
import VacaturesPage from '@/pages/VacaturesPage';
import BedrijvenPage from '@/pages/BedrijvenPage';
import IsolatietechniekPage from '@/pages/IsolatietechniekPage';
import KozijntechniekPage from '@/pages/KozijntechniekPage';
import BouwhulpPage from '@/pages/BouwhulpPage';
import DakkapelLandingPage from '@/pages/DakkapelLandingPage';
import DakkapelCalculatorPage from '@/pages/DakkapelCalculatorPage';
import ZonnepanelenPage from '@/pages/ZonnepanelenPage';
import TuinhuizenPage from '@/pages/TuinhuizenPage';
import TuinhuizenModelPage from '@/pages/TuinhuizenModelPage';
import IsolatieSelectiePage from '@/pages/IsolatieSelectiePage';
import MarketplacePage from '@/pages/MarketplacePage';
import MarketplaceAuthPage from '@/pages/MarketplaceAuthPage';
import VakmanRegistrationPage from '@/pages/VakmanRegistrationPage';
import VakmanDashboardPage from '@/pages/VakmanDashboardPage';
import VakmanProfielPage from '@/pages/VakmanProfielPage';
import VakmanOffertePage from '@/pages/VakmanOffertePage';
import VakmanWerkgebiedPage from '@/pages/VakmanWerkgebiedPage';
import KlusPlaasten from '@/pages/KlusPlaasten';
import SolarProductDetailPage from '@/pages/SolarProductDetailPage';
import ServiceSelectorPage from '@/pages/ServiceSelectorPage';
import SchilderConfiguratorPage from '@/pages/SchilderConfiguratorPage';
import StukadoorConfiguratorPage from '@/pages/StukadoorConfiguratorPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminDakkapelPage from '@/pages/AdminDakkapelPage';
import AdminZonnepanelenPage from '@/pages/AdminZonnepanelenPage';
import AdminZonnepanelenDashboardPage from '@/pages/AdminZonnepanelenDashboardPage';
import AdminSchilderPage from '@/pages/AdminSchilderPage';
import AdminStukadoorPage from '@/pages/AdminStukadoorPage';
import UnifiedAdminDashboard from '@/pages/UnifiedAdminDashboard';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import InterestConfirmationPage from '@/pages/InterestConfirmationPage';
import PrivacyPage from '@/pages/PrivacyPage';
import VoorwaardenPage from '@/pages/VoorwaardenPage';
import CertificaatPage from '@/pages/CertificaatPage';
import NotFound from '@/pages/NotFound';
import WordPressAdminPage from '@/pages/WordPressAdminPage';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diensten" element={<DienstenPage />} />
            <Route path="/diensten/:slug" element={<DienstDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/offerte" element={<OffertePage />} />
            <Route path="/over-ons" element={<OverOnsPage />} />
            <Route path="/projecten" element={<ProjectenPage />} />
            <Route path="/vacatures" element={<VacaturesPage />} />
            <Route path="/bedrijven" element={<BedrijvenPage />} />
            <Route path="/isolatietechniek" element={<IsolatietechniekPage />} />
            <Route path="/kozijntechniek" element={<KozijntechniekPage />} />
            <Route path="/bouwhulp" element={<BouwhulpPage />} />
            <Route path="/dakkapel" element={<DakkapelLandingPage />} />
            <Route path="/dakkapel-calculator" element={<DakkapelCalculatorPage />} />
            <Route path="/zonnepanelen" element={<ZonnepanelenPage />} />
            <Route path="/zonnepanelen/:id" element={<SolarProductDetailPage />} />
            <Route path="/tuinhuizen" element={<TuinhuizenPage />} />
            <Route path="/tuinhuizen-model" element={<TuinhuizenModelPage />} />
            <Route path="/isolatie-selectie" element={<IsolatieSelectiePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace-auth" element={<MarketplaceAuthPage />} />
            <Route path="/vakman-registratie" element={<VakmanRegistrationPage />} />
            <Route path="/vakman-dashboard" element={<VakmanDashboardPage />} />
            <Route path="/vakman-profiel" element={<VakmanProfielPage />} />
            <Route path="/vakman-offerte" element={<VakmanOffertePage />} />
            <Route path="/vakman-werkgebied" element={<VakmanWerkgebiedPage />} />
            <Route path="/klus-plaasten" element={<KlusPlaasten />} />
            <Route path="/service-selector" element={<ServiceSelectorPage />} />
            <Route path="/schilderwerk-configurator" element={<SchilderConfiguratorPage />} />
            <Route path="/stucwerk-configurator" element={<StukadoorConfiguratorPage />} />
            <Route path="/admin-login" element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            } />
            {/* Admin dashboard is now accessible without login */}
            <Route path="/admin-dashboard" element={<UnifiedAdminDashboard />} />
            <Route path="/admin-dakkapel" element={
              <ProtectedAdminRoute>
                <AdminDakkapelPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen-dashboard" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenDashboardPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-schilder" element={
              <ProtectedAdminRoute>
                <AdminSchilderPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-stukadoor" element={
              <ProtectedAdminRoute>
                <AdminStukadoorPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/interest-bevestiging" element={<InterestConfirmationPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/voorwaarden" element={<VoorwaardenPage />} />
            <Route path="/certificaat" element={<CertificaatPage />} />
            <Route path="/wp-admin/*" element={<WordPressAdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
