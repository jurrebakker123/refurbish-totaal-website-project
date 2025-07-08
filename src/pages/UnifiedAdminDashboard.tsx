
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, PaintBucket, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { loadUnifiedAdminData } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats from '@/components/admin/DashboardStats';

const UnifiedAdminDashboard = () => {
  const [configuraties, setConfiguraties] = useState([]);
  const [schilderAanvragen, setSchilderAanvragen] = useState([]);
  const [stukadoorAanvragen, setStukadoorAanvragen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState(null);

  const loadData = async () => {
    console.log('Loading unified dashboard data...');
    setLoading(true);
    
    try {
      const result = await loadUnifiedAdminData();
      
      if (result.success) {
        setConfiguraties(result.configuraties);
        setSchilderAanvragen(result.schilderAanvragen);
        setStukadoorAanvragen(result.stukadoorAanvragen);
        console.log('Data loaded successfully:', {
          dakkapel: result.configuraties.length,
          schilder: result.schilderAanvragen.length,
          stukadoor: result.stukadoorAanvragen.length
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Fout bij het laden van gegevens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsDetailDialogOpen(true);
  };

  const handleOpenQuoteDialog = (item) => {
    setSelectedItem(item);
    setIsQuoteDialogOpen(true);
  };

  const getTotalCount = () => {
    return configuraties.length + schilderAanvragen.length + stukadoorAanvragen.length;
  };

  const getNewCount = () => {
    const dakkapelNew = configuraties.filter(item => item.status === 'nieuw').length;
    const schilderNew = schilderAanvragen.filter(item => item.status === 'nieuw').length;
    const stukadoorNew = stukadoorAanvragen.filter(item => item.status === 'nieuw').length;
    return dakkapelNew + schilderNew + stukadoorNew;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Dashboard laden...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Overzicht van alle aanvragen</p>
          </div>
          <Button onClick={loadData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Vernieuwen
          </Button>
        </div>

        <DashboardStats 
          totalRequests={getTotalCount()}
          newRequests={getNewCount()}
          completedRequests={configuraties.filter(c => c.status === 'afgehandeld').length + 
                           schilderAanvragen.filter(s => s.status === 'afgehandeld').length + 
                           stukadoorAanvragen.filter(s => s.status === 'afgehandeld').length}
        />

        <Card>
          <CardHeader>
            <CardTitle>Aanvragen Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dakkapel" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dakkapel" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Dakkapel ({configuraties.length})
                </TabsTrigger>
                <TabsTrigger value="schilder" className="flex items-center gap-2">
                  <PaintBucket className="h-4 w-4" />
                  Schilderwerk ({schilderAanvragen.length})
                </TabsTrigger>
                <TabsTrigger value="stukadoor" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Stukadoorswerk ({stukadoorAanvragen.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dakkapel">
                <ConfiguratorRequestsTable
                  configuraties={configuraties}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type="dakkapel"
                />
              </TabsContent>

              <TabsContent value="schilder">
                <ConfiguratorRequestsTable
                  schilderAanvragen={schilderAanvragen}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type="schilder"
                />
              </TabsContent>

              <TabsContent value="stukadoor">
                <ConfiguratorRequestsTable
                  stukadoorAanvragen={stukadoorAanvragen}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type="stukadoor"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <RequestDetailDialog
        item={selectedItem}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />

      <QuoteDialog
        item={selectedItem}
        open={isQuoteDialogOpen}
        onOpenChange={setIsQuoteDialogOpen}
        onQuoteSent={loadData}
        setSendingQuote={setSendingQuote}
      />
    </div>
  );
};

export default UnifiedAdminDashboard;
