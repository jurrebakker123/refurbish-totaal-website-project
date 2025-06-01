import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefurbishedZonnepaneel, ZonnepaneelQuoteItem } from '@/types/admin';
import { loadAdminData } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import AdminFilters, { FilterState } from '@/components/admin/AdminFilters';
import PWAInstallPrompt from '@/components/admin/PWAInstallPrompt';
import MobileAdminHeader from '@/components/admin/MobileAdminHeader';
import { usePWA } from '@/hooks/usePWA';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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
      <MobileAdminHeader 
        title="Zonnepanelen Admin"
        onRefresh={loadDashboardData}
        onDataChange={loadDashboardData}
      />

      <div className={`flex-1 ${isMobile ? 'p-4' : 'p-8'}`}>
        <div className="max-w-7xl mx-auto space-y-6">
          {!isMobile && <h1 className="text-3xl font-bold mb-6">Zonnepanelen Dashboard</h1>}
          
          <Tabs defaultValue="overzicht" className="space-y-6">
            <TabsList className={isMobile ? "grid w-full grid-cols-2" : ""}>
              <TabsTrigger value="overzicht" className={isMobile ? "text-xs" : ""}>
                {isMobile ? 'Overzicht' : 'Overzicht'}
              </TabsTrigger>
              <TabsTrigger value="afgerond" className={isMobile ? "text-xs" : ""}>
                {isMobile ? 'Afgerond' : 'Afgerond'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overzicht" className="space-y-4">
              <Card>
                <CardHeader className={`${isMobile ? 'pb-4 px-4 pt-4' : 'pb-6'}`}>
                  <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'}`}>
                    Zonnepanelen Aanvragen
                  </CardTitle>
                </CardHeader>
                <CardContent className={`space-y-4 ${isMobile ? 'px-4 pb-4' : 'space-y-6'}`}>
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
            
            <TabsContent value="afgerond" className="space-y-4">
              <Card>
                <CardHeader className={`${isMobile ? 'pb-4 px-4 pt-4' : 'pb-6'}`}>
                  <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'}`}>
                    Afgeronde Zonnepanelen Aanvragen
                  </CardTitle>
                </CardHeader>
                <CardContent className={`space-y-4 ${isMobile ? 'px-4 pb-4' : 'space-y-6'}`}>
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
