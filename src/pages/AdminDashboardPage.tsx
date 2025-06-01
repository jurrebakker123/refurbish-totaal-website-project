import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { DakkapelConfiguratie, QuoteItem } from '@/types/admin';
import { loadAdminData, updateRequestStatus } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import DashboardStats from '@/components/admin/DashboardStats';
import AdminFilters, { FilterState } from '@/components/admin/AdminFilters';
import BulkActions from '@/components/admin/BulkActions';
import InvoiceActions from '@/components/admin/InvoiceActions';
import { toast } from 'sonner';

const AdminDashboardPage = () => {
  const [allConfiguraties, setAllConfiguraties] = useState<DakkapelConfiguratie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('te-verwerken');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedQuoteItem, setSelectedQuoteItem] = useState<QuoteItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    dateFilter: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const { configuraties: configData, success } = await loadAdminData();
    
    if (success) {
      setAllConfiguraties(configData);
    }
    
    setLoading(false);
  };

  // Filter and sort data based on current filters
  const filteredConfiguraties = useMemo(() => {
    let filtered = [...allConfiguraties];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.naam.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.plaats.toLowerCase().includes(searchLower) ||
        item.telefoon.includes(filters.search)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    // Date filter
    if (filters.dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      if (filters.dateFilter !== 'all') {
        filtered = filtered.filter(item => 
          new Date(item.created_at) >= filterDate
        );
      }
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'naam':
          aValue = a.naam.toLowerCase();
          bValue = b.naam.toLowerCase();
          break;
        case 'totaal_prijs':
          aValue = a.totaal_prijs || 0;
          bValue = b.totaal_prijs || 0;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [allConfiguraties, filters]);

  // Split dakkapel data by categories for tabs
  const dakkapelTeVerwerken = filteredConfiguraties.filter(config => 
    config.status === 'nieuw' || config.status === 'in_behandeling'
  );
  
  const dakkapelWachtOpReactie = filteredConfiguraties.filter(config => 
    config.status === 'offerte_verzonden'
  );
  
  const dakkapelInteresseBevestigd = filteredConfiguraties.filter(config => 
    config.status === 'interesse_bevestigd'
  );
  
  const dakkapelAkkoord = filteredConfiguraties.filter(config => 
    config.status === 'akkoord'
  );
  
  const dakkapelNietAkkoord = filteredConfiguraties.filter(config => 
    config.status === 'niet_akkoord' || config.status === 'geen_interesse'
  );
  
  const dakkapelOpLocatie = filteredConfiguraties.filter(config => 
    config.status === 'op_locatie'
  );
  
  const dakkapelInAanbouw = filteredConfiguraties.filter(config => 
    config.status === 'in_aanbouw'
  );
  
  const dakkapelAfgerond = filteredConfiguraties.filter(config => 
    config.status === 'afgehandeld'
  );

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'te-verwerken':
        return dakkapelTeVerwerken;
      case 'wacht-op-reactie':
        return dakkapelWachtOpReactie;
      case 'interesse-bevestigd':
        return dakkapelInteresseBevestigd;
      case 'akkoord':
        return dakkapelAkkoord;
      case 'niet-akkoord':
        return dakkapelNietAkkoord;
      case 'op-locatie':
        return dakkapelOpLocatie;
      case 'in-aanbouw':
        return dakkapelInAanbouw;
      case 'afgerond':
        return dakkapelAfgerond;
      default:
        return [];
    }
  };

  const currentTabData = getCurrentTabData();

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const openQuoteDialog = (item: any) => {
    setSelectedQuoteItem({ ...item, isCalculator: false });
    setIsQuoteDialogOpen(true);
  };

  const handleBulkAction = async (action: string, ids: string[]) => {
    setLoading(true);
    let successCount = 0;
    
    for (const id of ids) {
      const success = await updateRequestStatus(id, action, 'dakkapel_configuraties');
      if (success) successCount++;
    }
    
    if (successCount > 0) {
      toast.success(`${successCount} item(s) bijgewerkt naar "${action}"`);
      loadDashboardData();
      setSelectedIds([]);
    }
    
    setLoading(false);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(currentTabData.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Gegevens worden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-brand-darkGreen">Refurbish Dakkapel Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={loadDashboardData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Vernieuwen
          </Button>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold mb-6">Dakkapel Admin Dashboard</h1>
          
          <DashboardStats configuraties={allConfiguraties} />
          
          <Tabs defaultValue="te-verwerken" className="space-y-8" onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 pb-4">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-9 w-full gap-2 h-auto p-2 bg-gray-100">
                <TabsTrigger value="te-verwerken" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Te Verwerken ({dakkapelTeVerwerken.length})
                </TabsTrigger>
                <TabsTrigger value="wacht-op-reactie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Wacht op Reactie ({dakkapelWachtOpReactie.length})
                </TabsTrigger>
                <TabsTrigger value="interesse-bevestigd" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Interesse Bevestigd ({dakkapelInteresseBevestigd.length})
                </TabsTrigger>
                <TabsTrigger value="akkoord" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Akkoord ({dakkapelAkkoord.length})
                </TabsTrigger>
                <TabsTrigger value="niet-akkoord" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Niet Akkoord ({dakkapelNietAkkoord.length})
                </TabsTrigger>
                <TabsTrigger value="op-locatie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Op Locatie/Factureren ({dakkapelOpLocatie.length})
                </TabsTrigger>
                <TabsTrigger value="in-aanbouw" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  In Aanbouw ({dakkapelInAanbouw.length})
                </TabsTrigger>
                <TabsTrigger value="afgerond" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Afgerond ({dakkapelAfgerond.length})
                </TabsTrigger>
                <TabsTrigger value="prijzen" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Prijsbeheer
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Te Verwerken Tab */}
            <TabsContent value="te-verwerken" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Te Verwerken Aanvragen ({dakkapelTeVerwerken.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <BulkActions
                    selectedIds={selectedIds}
                    onSelectAll={handleSelectAll}
                    onSelectItem={handleSelectItem}
                    onBulkAction={handleBulkAction}
                    allIds={currentTabData.map(item => item.id)}
                    configurations={currentTabData}
                    type="dakkapel"
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={dakkapelTeVerwerken}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    selectedIds={selectedIds}
                    onSelectItem={handleSelectItem}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wacht op Reactie Tab */}
            <TabsContent value="wacht-op-reactie" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Wacht op Reactie ({dakkapelWachtOpReactie.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={dakkapelWachtOpReactie}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Interesse Bevestigd Tab */}
            <TabsContent value="interesse-bevestigd" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Interesse Bevestigd ({dakkapelInteresseBevestigd.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={dakkapelInteresseBevestigd}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Akkoord Tab */}
            <TabsContent value="akkoord" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Akkoord ({dakkapelAkkoord.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={dakkapelAkkoord}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Niet Akkoord Tab */}
            <TabsContent value="niet-akkoord" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Niet Akkoord ({dakkapelNietAkkoord.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={dakkapelNietAkkoord}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Op Locatie/Factureren Tab */}
            <TabsContent value="op-locatie" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Op Locatie/Factureren ({dakkapelOpLocatie.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <div className="space-y-4">
                    {dakkapelOpLocatie.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{item.naam}</h3>
                            <p className="text-gray-600">{item.email} • {item.telefoon}</p>
                            <p className="text-gray-600">{item.adres}, {item.postcode} {item.plaats}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Model: {item.model} • Prijs: €{item.totaal_prijs}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openDetails(item)}
                              className="text-xs"
                            >
                              Details
                            </Button>
                            <InvoiceActions 
                              item={item} 
                              onInvoiceSent={loadDashboardData}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {dakkapelOpLocatie.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Geen projecten op locatie gevonden
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* In Aanbouw Tab */}
            <TabsContent value="in-aanbouw" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">In Aanbouw ({dakkapelInAanbouw.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={dakkapelInAanbouw}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Afgerond Tab */}
            <TabsContent value="afgerond" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Afgeronde Aanvragen ({dakkapelAfgerond.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ProcessedRequestsTable 
                    configuraties={dakkapelAfgerond}
                    onViewDetails={openDetails}
                    onDataChange={loadDashboardData}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Prijsbeheer Tab */}
            <TabsContent value="prijzen">
              <AdminPriceEditor />
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
    </div>
  );
};

export default AdminDashboardPage;
