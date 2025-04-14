
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/diensten" element={<Index />} />
          <Route path="/diensten/:serviceId" element={<Index />} />
          <Route path="/over-ons" element={<Index />} />
          <Route path="/projecten" element={<Index />} />
          <Route path="/projecten/:projectId" element={<Index />} />
          <Route path="/offerte" element={<Index />} />
          <Route path="/contact" element={<Index />} />
          <Route path="/privacy" element={<Index />} />
          <Route path="/voorwaarden" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
