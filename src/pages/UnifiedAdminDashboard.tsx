
import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Home, Sun } from 'lucide-react';
import { DakkapelConfiguratie, QuoteItem, RefurbishedZonnepaneel, ZonnepaneelQuoteItem } from '@/types/admin';
import { loadAdminData, updateRequestStatus } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import DashboardStats from '@/components/admin/DashboardStats';
import AdminFilters, { FilterState } from '@/components/admin/AdminFilters';
import BulkActions from '@/components/admin/BulkActions';
import InvoiceActions from '@/components/admin/InvoiceActions';
import InvoiceOverview from '@/components/admin/InvoiceOverview';
import ConversieStats from '@/components/admin/ConversieStats';
import NotificationCenter from '@/components/admin/NotificationCenter';
import AutomatedCommunication from '@/components/admin/AutomatedCommunication';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { toast } from 'sonner';
import EmailMarketingDialog from '@/components/admin/EmailMarketingDialog';
import PWAInstallPrompt from '@/components/admin/PWAInstallPrompt';
import { usePWA } from '@/hooks/usePWA';

const UnifiedAdminDashboard = () => {
  const [allConfiguraties, setAllConfiguraties] = useState<DakkapelConfiguratie[]>([]);
  const [allZonnepanelen, setAllZonnepanelen] = useState<RefurbishedZonnepaneel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dakkapel-overzicht');
  const [activeProjectType, setActiveProjectType] = useState<'dakkapel' | 'zonnepaneel'>('dakkapel');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedQuoteItem, setSelectedQuoteItem] = useState<QuoteItem | ZonnepaneelQuoteItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
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
    const { configuraties: configData, zonnepanelen: solarData, success } = await loadAdminData();
    
    if (success) {
      setAllConfiguraties(configData);
      setAllZonnepanelen(solarData);
    }
    
    setLoading(false);
  };

  // Filter and sort data based on current filters and project type
  const filteredDakkapelData = useMemo(() => {
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

  const filteredZonnepanelenData = useMemo(() => {
    let filtered = [...allZonnepanelen];

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
  }, [allZonnepanelen, filters]);

  // Get current filtered data based on active project type
  const getCurrentFilteredData = () => {
    return activeProjectType === 'dakkapel' ? filteredDakkapelData : filteredZonnepanelenData;
  };

  const currentFilteredData = getCurrentFilteredData();

  // Split data by status categories
  const teVerwerken = currentFilteredData.filter(item => 
    item.status === 'nieuw' || item.status === 'in_behandeling'
  );
  
  const wachtOpReactie = currentFilteredData.filter(item => 
    item.status === 'offerte_verzonden'
  );
  
  const interesseBevestigd = currentFilteredData.filter(item => 
    item.status === 'interesse_bevestigd'
  );
  
  const akkoord = currentFilteredData.filter(item => 
    item.status === 'akkoord'
  );
  
  const nietAkkoord = currentFilteredData.filter(item => 
    item.status === 'niet_akkoord' || item.status === 'geen_interesse'
  );
  
  const opLocatie = currentFilteredData.filter(item => 
    item.status === 'op_locatie'
  );
  
  const inAanbouw = currentFilteredData.filter(item => 
    item.status === 'in_aanbouw'
  );
  
  const afgerond = currentFilteredData.filter(item => 
    item.status === 'afgehandeld'
  );

  const getCurrentTabData = () => {
    const tabName = activeTab.replace(`${activeProjectType}-`, '');
    switch (tabName) {
      case 'overzicht':
        return teVerwerken;
      case 'wacht-op-reactie':
        return wachtOpReactie;
      case 'interesse-bevestigd':
        return interesseBevestigd;
      case 'akkoord':
        return akkoord;
      case 'niet-akkoord':
        return nietAkkoord;
      case 'op-locatie':
        return opLocatie;
      case 'in-aanbouw':
        return inAanbouw;
      case 'afgerond':
        return afgerond;
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
    if (activeProjectType === 'zonnepaneel') {
      setSelectedQuoteItem({ ...item, isZonnepaneel: true });
    } else {
      setSelectedQuoteItem({ ...item, isCalculator: false });
    }
    setIsQuoteDialogOpen(true);
  };

  const handleBulkAction = async (action: string, ids: string[]) => {
    setLoading(true);
    let successCount = 0;
    const tableName = activeProjectType === 'zonnepaneel' ? 'refurbished_zonnepanelen' : 'dakkapel_configuraties';
    
    for (const id of ids) {
      const success = await updateRequestStatus(id, action, tableName);
      if (success) successCount++;
    }
    
    if (successCount > 0) {
      toast.success(`${successCount} ${activeProjectType} project(s) bijgewerkt naar "${action}"`);
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

  const handleSendMessage = (message: any) => {
    toast.success('Bericht verzonden!');
  };

  const handleProjectTypeChange = (type: 'dakkapel' | 'zonnepaneel') => {
    setActiveProjectType(type);
    setSelectedIds([]);
    // Reset to overview tab for the new project type
    setActiveTab(`${type}-overzicht`);
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
          <h1 className="text-xl font-semibold text-brand-darkGreen">Refurbish Totaal Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <NotificationCenter configuraties={allConfiguraties} />
          <AutomatedCommunication onSendMessage={handleSendMessage} />
          <EmailMarketingDialog onCampaignSent={loadDashboardData} />
          <Button onClick={loadDashboardData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Vernieuwen
          </Button>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Unified Admin Dashboard</h1>
            
            {/* Project Type Selector */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border">
              <Button
                variant={activeProjectType === 'dakkapel' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleProjectTypeChange('dakkapel')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Dakkapel ({allConfiguraties.length})
              </Button>
              <Button
                variant={activeProjectType === 'zonnepaneel' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleProjectTypeChange('zonnepaneel')}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Zonnepanelen ({allZonnepanelen.length})
              </Button>
            </div>
          </div>
          
          {/* Stats only for Dakkapel */}
          {activeProjectType === 'dakkapel' && <DashboardStats configuraties={allConfiguraties} />}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="border-b border-gray-200 pb-4">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-11 w-full gap-2 h-auto p-2 bg-gray-100">
                <TabsTrigger value={`${activeProjectType}-overzicht`} className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Te Verwerken ({teVerwerken.length})
                </TabsTrigger>
                <TabsTrigger value={`${activeProjectType}-wacht-op-reactie`} className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Wacht op Reactie ({wachtOpReactie.length})
                </TabsTrigger>
                {activeProjectType === 'dakkapel' && (
                  <TabsTrigger value={`${activeProjectType}-interesse-bevestigd`} className="text-xs py-3 px-2 h-auto whitespace-normal">
                    Interesse Bevestigd ({interesseBevestigd.length})
                  </TabsTrigger>
                )}
                <TabsTrigger value={`${activeProjectType}-akkoord`} className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Akkoord ({akkoord.length})
                </TabsTrigger>
                <TabsTrigger value={`${activeProjectType}-niet-akkoord`} className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Niet Akkoord ({nietAkkoord.length})
                </TabsTrigger>
                <TabsTrigger value={`${activeProjectType}-op-locatie`} className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Op Locatie/Factureren ({opLocatie.length})
                </TabsTrigger>
                <TabsTrigger value={`${activeProjectType}-in-aanbouw`} className="text-xs py-3 px-2 h-auto whitespace-normal">
                  In Aanbouw ({inAanbouw.length})
                </TabsTrigger>
                <TabsTrigger value={`${activeProjectType}-afgerond`} className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Afgerond ({afgerond.length})
                </TabsTrigger>
                <TabsTrigger value="conversie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  📊 Conversie Stats
                </TabsTrigger>
                <TabsTrigger value="facturatie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  💰 Facturatie
                </TabsTrigger>
                <TabsTrigger value="prijzen" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Prijsbeheer
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Status Tabs */}
            <TabsContent value={`${activeProjectType}-overzicht`} className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {activeProjectType === 'dakkapel' ? <Home className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Te Verwerken {activeProjectType === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'} Aanvragen ({teVerwerken.length})
                  </CardTitle>
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
                    type={activeProjectType}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={activeProjectType === 'dakkapel' ? teVerwerken as DakkapelConfiguratie[] : undefined}
                    zonnepanelen={activeProjectType === 'zonnepaneel' ? teVerwerken as RefurbishedZonnepaneel[] : undefined}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    selectedIds={selectedIds}
                    onSelectItem={handleSelectItem}
                    type={activeProjectType}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value={`${activeProjectType}-wacht-op-reactie`} className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {activeProjectType === 'dakkapel' ? <Home className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Wacht op Reactie {activeProjectType === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'} ({wachtOpReactie.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={activeProjectType === 'dakkapel' ? wachtOpReactie as DakkapelConfiguratie[] : undefined}
                    zonnepanelen={activeProjectType === 'zonnepaneel' ? wachtOpReactie as RefurbishedZonnepaneel[] : undefined}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type={activeProjectType}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {activeProjectType === 'dakkapel' && (
              <TabsContent value={`${activeProjectType}-interesse-bevestigd`} className="space-y-6">
                <Card>
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Interesse Bevestigd Dakkapel ({interesseBevestigd.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <AdminFilters 
                      filters={filters} 
                      onFiltersChange={setFilters}
                      showStatusFilter={false}
                    />
                    
                    <ConfiguratorRequestsTable 
                      configuraties={interesseBevestigd as DakkapelConfiguratie[]}
                      onViewDetails={openDetails}
                      onOpenQuoteDialog={openQuoteDialog}
                      onDataChange={loadDashboardData}
                      sendingQuote={sendingQuote}
                      type={activeProjectType}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value={`${activeProjectType}-akkoord`} className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {activeProjectType === 'dakkapel' ? <Home className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Akkoord {activeProjectType === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'} ({akkoord.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={activeProjectType === 'dakkapel' ? akkoord as DakkapelConfiguratie[] : undefined}
                    zonnepanelen={activeProjectType === 'zonnepaneel' ? akkoord as RefurbishedZonnepaneel[] : undefined}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type={activeProjectType}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value={`${activeProjectType}-niet-akkoord`} className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {activeProjectType === 'dakkapel' ? <Home className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Niet Akkoord {activeProjectType === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'} ({nietAkkoord.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={activeProjectType === 'dakkapel' ? nietAkkoord as DakkapelConfiguratie[] : undefined}
                    zonnepanelen={activeProjectType === 'zonnepaneel' ? nietAkkoord as RefurbishedZonnepaneel[] : undefined}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type={activeProjectType}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value={`${activeProjectType}-op-locatie`} className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {activeProjectType === 'dakkapel' ? <Home className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Op Locatie/Factureren {activeProjectType === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'} ({opLocatie.length})
                  </CardTitle>
                  <p className="text-sm text-gray-600">Projecten die klaar zijn voor locatiebezoek en facturering</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <div className="space-y-4">
                    {opLocatie.map((item) => (
                      <Card key={item.id} className="p-4 bg-blue-50 border-blue-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{item.naam}</h3>
                            <p className="text-gray-600">{item.email} • {item.telefoon}</p>
                            <p className="text-gray-600">{item.adres}, {item.postcode} {item.plaats}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {activeProjectType === 'dakkapel' && 'model' in item && (
                                <>
                                  <strong>Dakkapel Model:</strong> {item.model} • <strong>Prijs:</strong> €{item.totaal_prijs}
                                </>
                              )}
                              {activeProjectType === 'zonnepaneel' && 'aantal_panelen' in item && (
                                <>
                                  {item.aantal_panelen}x {item.type_paneel} ({item.vermogen}W) • <strong>Prijs:</strong> €{item.totaal_prijs}
                                </>
                              )}
                            </p>
                            {activeProjectType === 'dakkapel' && 'materiaal' in item && item.materiaal && (
                              <p className="text-sm text-gray-500">
                                <strong>Materiaal:</strong> {item.materiaal}
                              </p>
                            )}
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
                    
                    {opLocatie.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Geen {activeProjectType} projecten op locatie gevonden
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value={`${activeProjectType}-in-aanbouw`} className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {activeProjectType === 'dakkapel' ? <Home className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    In Aanbouw {activeProjectType === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'} ({inAanbouw.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={activeProjectType === 'dakkapel' ? inAanbouw as DakkapelConfiguratie[] : undefined}
                    zonnepanelen={activeProjectType === 'zonnepaneel' ? inAanbouw as RefurbishedZonnepaneel[] : undefined}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type={activeProjectType}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value={`${activeProjectType}-afgerond`} className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {activeProjectType === 'dakkapel' ? <Home className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Afgeronde {activeProjectType === 'dakkapel' ? 'Dakkapel' : 'Zonnepanelen'} Aanvragen ({afgerond.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ProcessedRequestsTable 
                    configuraties={afgerond as DakkapelConfiguratie[]}
                    onViewDetails={openDetails}
                    onDataChange={loadDashboardData}
                    type={activeProjectType}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Conversie Stats Tab */}
            <TabsContent value="conversie" className="space-y-6">
              <ConversieStats 
                configuraties={activeProjectType === 'dakkapel' ? allConfiguraties : allZonnepanelen as any} 
                type={activeProjectType} 
              />
            </TabsContent>
            
            {/* Facturatie Tab */}
            <TabsContent value="facturatie" className="space-y-6">
              <InvoiceOverview />
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
      
      <PWAInstallPrompt />
    </div>
  );
};

export default UnifiedAdminDashboard;
