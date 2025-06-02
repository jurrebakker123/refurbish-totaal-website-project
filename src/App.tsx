
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Index from "./pages/Index";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminZonnepanelenPage from "./pages/AdminZonnepanelenPage";
import UnifiedAdminDashboard from "./pages/UnifiedAdminDashboard";
import AdminDakkapelPage from "./pages/AdminDakkapelPage";
import AdminZonnepanelenDashboardPage from "./pages/AdminZonnepanelenDashboardPage";
import DakkapelPage from "./pages/DakkapelPage";
import DakkapelCalculatorPage from "./pages/DakkapelCalculatorPage";
import DakkapelConfiguratorPage from "./pages/DakkapelConfiguratorPage";
import ZonnepanelenPage from "./pages/ZonnepanelenPage";
import RefurbishedZonnepanelenPage from "./pages/RefurbishedZonnepanelenPage";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import CityServicePage from "./pages/CityServicePage";
import DienstDetailPage from "./pages/DienstDetailPage";
import IsolatiePage from "./pages/IsolatiePage";
import BouwhulpPage from "./pages/BouwhulpPage";
import TuinhuisPage from "./pages/TuinhuisPage";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Helmet>
            <title>Refurbish Totaal Nederland - Dakkapellen & Zonnepanelen</title>
            <meta name="description" content="Specialist in dakkapellen en zonnepanelen. Kwaliteit, duurzaamheid en vakmanschap voor uw woning." />
          </Helmet>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dakkapel" element={<DakkapelPage />} />
            <Route path="/dakkapel-calculator" element={<DakkapelCalculatorPage />} />
            <Route path="/dakkapel-configurator" element={<DakkapelConfiguratorPage />} />
            <Route path="/zonnepanelen" element={<ZonnepanelenPage />} />
            <Route path="/refurbished-zonnepanelen" element={<RefurbishedZonnepanelenPage />} />
            <Route path="/isolatie" element={<IsolatiePage />} />
            <Route path="/bouwhulp" element={<BouwhulpPage />} />
            <Route path="/tuinhuis" element={<TuinhuisPage />} />
            <Route path="/dienst/:dienstSlug" element={<DienstDetailPage />} />
            <Route path="/:city" element={<CityServicePage />} />
            
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={
              <ProtectedAdminRoute>
                <UnifiedAdminDashboard />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-dashboard-old" element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-dakkapel" element={
              <ProtectedAdminRoute>
                <AdminDakkapelPage />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin-zonnepanelen-dashboard" element={
              <ProtectedAdminRoute>
                <AdminZonnepanelenDashboardPage />
              </ProtectedAdminRoute>
            } />
          </Routes>
          <Toaster />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
