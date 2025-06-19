
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DakkapelConfiguratie, QuoteItem } from '@/types/admin';
import { loadAdminData } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import DashboardStats from '@/components/admin/DashboardStats';
import AdminFilters, { FilterState } from '@/components/admin/AdminFilters';
import PWAInstallPrompt from '@/components/admin/PWAInstallPrompt';
import MobileAdminHeader from '@/components/admin/MobileAdminHeader';
import MobileAdminFilters from '@/components/admin/MobileAdminFilters';
import ResponsiveRequestTable from '@/components/admin/ResponsiveRequestTable';
import AutoQuoteManager from '@/components/admin/AutoQuoteManager';
import { usePWA } from '@/hooks/usePWA';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminDakkapelPage = () => {
  const [allConfiguraties, setAllConfiguraties] = useState<DakkapelConfiguratie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedQuoteItem, setSelectedQuoteItem] = useState<QuoteItem | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    dateFilter: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const { requestNotificationPermission } = usePWA();
  const isMobile = useIsMobile();

  useEffect(() => {
    loadDashboardData();
    requestNotificationPermission();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const { configuraties: configData, success } = await loadAdminData();
    
    if (success) {
      setAllConfiguraties(configData);
    }
    
    setLoading(false);
  };

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const openQuoteDialog = (item: any) => {
    setSelectedQuoteItem({ ...item, isCalculator: false });
    setIsQuoteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Dakkapel gegevens worden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MobileAdminHeader 
        title="Dakkapel Admin"
        onRefresh={loadDashboardData}
        onDataChange={loadDashboardData}
      />

      <div className={`flex-1 ${isMobile ? 'p-3' : 'p-8'}`}>
        <div className="max-w-7xl mx-auto space-y-6">
          {!isMobile && <h1 className="text-3xl font-bold mb-6">Dakkapel Dashboard</h1>}
          
          {!isMobile && <DashboardStats configuraties={allConfiguraties} />}
          
          <Tabs defaultValue="overzicht" className="space-y-6">
            <TabsList className={isMobile ? "grid w-full grid-cols-2" : ""}>
              <TabsTrigger value="overzicht" className={isMobile ? "text-xs" : ""}>
                Overzicht
              </TabsTrigger>
              <TabsTrigger value="afgerond" className={isMobile ? "text-xs" : ""}>
                Afgerond
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overzicht" className="space-y-4">
              <Card>
                <CardHeader className={`${isMobile ? 'pb-3 px-3 pt-3' : 'pb-6'}`}>
                  <CardTitle className={`${isMobile ? 'text-base' : 'text-xl'}`}>
                    Dakkapel Aanvragen
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${isMobile ? 'px-3 pb-3' : 'space-y-6'}`}>
                  {isMobile ? (
                    <MobileAdminFilters 
                      filters={filters} 
                      onFiltersChange={setFilters}
                      showStatusFilter={true}
                    />
                  ) : (
                    <AdminFilters 
                      filters={filters} 
                      onFiltersChange={setFilters}
                      showStatusFilter={true}
                    />
                  )}
                  
                  <ResponsiveRequestTable 
                    configuraties={allConfiguraties}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="afgerond" className="space-y-4">
              <Card>
                <CardHeader className={`${isMobile ? 'pb-3 px-3 pt-3' : 'pb-6'}`}>
                  <CardTitle className={`${isMobile ? 'text-base' : 'text-xl'}`}>
                    Afgeronde Dakkapel Aanvragen
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${isMobile ? 'px-3 pb-3' : 'space-y-6'}`}>
                  <ProcessedRequestsTable 
                    configuraties={allConfiguraties.filter(c => c.status === 'afgehandeld')}
                    onViewDetails={openDetails}
                    onDataChange={loadDashboardData}
                    type="dakkapel"
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

export default AdminDakkapelPage;
