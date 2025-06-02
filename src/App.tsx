
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Index from "./pages/Index";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminZonnepanelenPage from "./pages/AdminZonnepanelenPage";
import UnifiedAdminDashboard from "./pages/UnifiedAdminDashboard";
import AdminDakkapelPage from "./pages/AdminDakkapelPage";
import AdminZonnepanelenDashboardPage from "./pages/AdminZonnepanelenDashboardPage";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import DienstDetailPage from "./pages/DienstDetailPage";
import BouwhulpPage from "./pages/BouwhulpPage";
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
      <TooltipProvider>
        <Helmet>
          <title>Refurbish Totaal Nederland - Dakkapellen & Zonnepanelen</title>
          <meta name="description" content="Specialist in dakkapellen en zonnepanelen. Kwaliteit, duurzaamheid en vakmanschap voor uw woning." />
        </Helmet>
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dienst/:dienstSlug" element={<DienstDetailPage />} />
          <Route path="/bouwhulp" element={<BouwhulpPage />} />
          
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
    </QueryClientProvider>
  );
}

export default App;
