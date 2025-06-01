import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import { RefurbishedZonnepaneel, ZonnepaneelQuoteItem } from '@/types/admin';
import { loadAdminData, updateRequestStatus } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import AdminFilters, { FilterState } from '@/components/admin/AdminFilters';
import EmailMarketingDialog from '@/components/admin/EmailMarketingDialog';
import PWAInstallPrompt from '@/components/admin/PWAInstallPrompt';
import { usePWA } from '@/hooks/usePWA';
import { toast } from 'sonner';

const AdminZonnepanelenDashboardPage = () => {
  const [allZonnepanelen, setAllZonnepanelen] = useState<RefurbishedZonnepaneel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedQuoteItem, setSelectedQuoteItem] = useState<ZonnepaneelQuoteItem | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    dateFilter: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const { requestNotificationPermission } = usePWA();

  useEffect(() => {
    loadDashboardData();
    requestNotificationPermission();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const { zonnepanelen: solarData, success } = await loadAdminData();
    
    if (success) {
      setAllZonnepanelen(solarData);
    }
    
    setLoading(false);
  };

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const openQuoteDialog = (item: any) => {
    setSelectedQuoteItem({ ...item, isZonnepaneel: true });
    setIsQuoteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Zonnepanelen gegevens worden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-brand-darkGreen">Zonnepanelen Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <EmailMarketingDialog onCampaignSent={loadDashboardData} />
          <Button onClick={loadDashboardData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Vernieuwen
          </Button>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold mb-6">Zonnepanelen Dashboard</h1>
          
          <Tabs defaultValue="overzicht" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overzicht">Overzicht</TabsTrigger>
              <TabsTrigger value="afgerond">Afgerond</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overzicht" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Zonnepanelen Aanvragen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={true}
                  />
                  
                  <ConfiguratorRequestsTable 
                    zonnepanelen={allZonnepanelen}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="afgerond" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Afgeronde Zonnepanelen Aanvragen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ProcessedRequestsTable 
                    configuraties={allZonnepanelen.filter(z => z.status === 'afgehandeld')}
                    onViewDetails={openDetails}
                    onDataChange={loadDashboardData}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <RequestDetailDialog
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        item={selectedItem}
        onDataChange={loadDashboardData}
      />
      
      <QuoteDialog
        isOpen={isQuoteDialogOpen}
        onClose={() => setIsQuoteDialogOpen(false)}
        selectedItem={selectedQuoteItem}
        onDataChange={loadDashboardData}
        setSendingQuote={setSendingQuote}
      />
      
      <PWAInstallPrompt />
    </div>
  );
};

export default AdminZonnepanelenDashboardPage;
