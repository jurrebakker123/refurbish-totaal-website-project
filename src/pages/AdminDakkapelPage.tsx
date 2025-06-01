
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DakkapelConfiguratie } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

const AdminDakkapelPage = () => {
  const navigate = useNavigate();
  const [configuraties, setConfiguraties] = useState<DakkapelConfiguratie[]>([]);
  const [processedConfigurations, setProcessedConfigurations] = useState<DakkapelConfiguratie[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DakkapelConfiguratie | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [selectedQuoteRequest, setSelectedQuoteRequest] = useState<DakkapelConfiguratie | null>(null);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const fetchData = async () => {
    const { data: activeData } = await supabase
      .from('dakkapel_configuraties')
      .select('*')
      .not('status', 'eq', 'afgehandeld')
      .order('created_at', { ascending: false });

    const { data: processedData } = await supabase
      .from('dakkapel_configuraties')
      .select('*')
      .eq('status', 'afgehandeld')
      .order('afgehandeld_op', { ascending: false });

    if (activeData) setConfiguraties(activeData);
    if (processedData) setProcessedConfigurations(processedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDetails = (config: DakkapelConfiguratie) => {
    setSelectedRequest(config);
    setIsDetailDialogOpen(true);
  };

  const handleOpenQuoteDialog = (config: DakkapelConfiguratie) => {
    setSelectedQuoteRequest(config);
    setQuoteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar Selectie
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🏠 Dakkapel Dashboard</h1>
            <p className="text-gray-600">Beheer dakkapel configuraties en aanvragen</p>
          </div>
        </div>

        <DashboardStats configuraties={configuraties} />
        
        <div className="grid gap-6 mt-6">
          <ConfiguratorRequestsTable 
            configuraties={configuraties}
            onViewDetails={handleViewDetails}
            onOpenQuoteDialog={handleOpenQuoteDialog}
            onDataChange={fetchData}
            sendingQuote={sendingQuote}
            type="dakkapel"
          />
          <ProcessedRequestsTable 
            configuraties={processedConfigurations}
            onViewDetails={handleViewDetails}
            onDataChange={fetchData}
            type="dakkapel"
          />
        </div>
      </div>

      <RequestDetailDialog
        request={selectedRequest}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />

      <QuoteDialog
        isOpen={quoteDialogOpen}
        onClose={() => setQuoteDialogOpen(false)}
        request={selectedQuoteRequest}
        onQuoteSent={fetchData}
        setSendingQuote={setSendingQuote}
      />
    </div>
  );
};

export default AdminDakkapelPage;
