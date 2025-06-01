
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
import { RefurbishedZonnepaneel } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

const AdminZonnepanelenDashboardPage = () => {
  const navigate = useNavigate();
  const [zonnepanelen, setZonnepanelen] = useState<RefurbishedZonnepaneel[]>([]);
  const [processedZonnepanelen, setProcessedZonnepanelen] = useState<RefurbishedZonnepaneel[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RefurbishedZonnepaneel | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [selectedQuoteRequest, setSelectedQuoteRequest] = useState<RefurbishedZonnepaneel | null>(null);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const fetchData = async () => {
    const { data: activeData } = await supabase
      .from('refurbished_zonnepanelen')
      .select('*')
      .not('status', 'eq', 'afgehandeld')
      .order('created_at', { ascending: false });

    const { data: processedData } = await supabase
      .from('refurbished_zonnepanelen')
      .select('*')
      .eq('status', 'afgehandeld')
      .order('afgehandeld_op', { ascending: false });

    if (activeData) setZonnepanelen(activeData);
    if (processedData) setProcessedZonnepanelen(processedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDetails = (paneel: RefurbishedZonnepaneel) => {
    setSelectedRequest(paneel);
    setIsDetailDialogOpen(true);
  };

  const handleOpenQuoteDialog = (paneel: RefurbishedZonnepaneel) => {
    setSelectedQuoteRequest(paneel);
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
            <h1 className="text-2xl font-bold text-gray-900">☀️ Zonnepanelen Dashboard</h1>
            <p className="text-gray-600">Beheer zonnepanelen bestellingen en klantgegevens</p>
          </div>
        </div>

        <DashboardStats configuraties={zonnepanelen} />
        
        <div className="grid gap-6 mt-6">
          <ConfiguratorRequestsTable 
            zonnepanelen={zonnepanelen}
            onViewDetails={handleViewDetails}
            onOpenQuoteDialog={handleOpenQuoteDialog}
            onDataChange={fetchData}
            sendingQuote={sendingQuote}
            type="zonnepaneel"
          />
          <ProcessedRequestsTable 
            configuraties={processedZonnepanelen}
            onViewDetails={handleViewDetails}
            onDataChange={fetchData}
            type="zonnepaneel"
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

export default AdminZonnepanelenDashboardPage;
