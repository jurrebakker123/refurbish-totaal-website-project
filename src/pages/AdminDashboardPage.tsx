import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { DakkapelConfiguratie, QuoteItem, RefurbishedZonnepaneel, ZonnepaneelQuoteItem } from '@/types/admin';
import { loadAdminData, updateRequestStatus } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import DashboardStats from '@/components/admin/DashboardStats';
import AdminFilters, { FilterState } from '@/components/admin/AdminFilters';
import BulkActions from '@/components/admin/BulkActions';
import { toast } from 'sonner';

const AdminDashboardPage = () => {
  const [allConfiguraties, setAllConfiguraties] = useState<DakkapelConfiguratie[]>([]);
  const [allZonnepanelen, setAllZonnepanelen] = useState<RefurbishedZonnepaneel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dakkapel-te-verwerken');
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

  useEffect(() => {
    loadDashboardData();
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

  // Filter and sort zonnepanelen data
  const filteredZonnepanelen = useMemo(() => {
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

    // Date filter logic (same as above)
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

  // Split dakkapel data by categories for tabs
  const dakkapelTeVerwerken = filteredConfiguraties.filter(config => 
    config.status === 'nieuw' || config.status === 'in_behandeling'
  );
  
  const dakkapelWachtOpReactie = filteredConfiguraties.filter(config => 
    config.status === 'offerte_verzonden'
  );
  
  const dakkapelAkkoord = filteredConfiguraties.filter(config => 
    config.status === 'akkoord'
  );
  
  const dakkapelOpLocatie = filteredConfiguraties.filter(config => 
    config.status === 'op_locatie'
  );
  
  const dakkapelInAanbouw = filteredConfiguraties.filter(config => 
    config.status === 'in_aanbouw'
  );
  
  const dakkapelNietAkkoord = filteredConfiguraties.filter(config => 
    config.status === 'niet_akkoord'
  );
  
  const dakkapelAfgerond = filteredConfiguraties.filter(config => 
    config.status === 'afgehandeld'
  );

  // Split zonnepanelen data by categories for tabs
  const zonnepanelenTeVerwerken = filteredZonnepanelen.filter(item => 
    item.status === 'nieuw' || item.status === 'in_behandeling'
  );
  
  const zonnepanelenWachtOpReactie = filteredZonnepanelen.filter(item => 
    item.status === 'offerte_verzonden'
  );
  
  const zonnepanelenAkkoord = filteredZonnepanelen.filter(item => 
    item.status === 'akkoord'
  );
  
  const zonnepanelenOpLocatie = filteredZonnepanelen.filter(item => 
    item.status === 'op_locatie'
  );
  
  const zonnepanelenInAanbouw = filteredZonnepanelen.filter(item => 
    item.status === 'in_aanbouw'
  );
  
  const zonnepanelenNietAkkoord = filteredZonnepanelen.filter(item => 
    item.status === 'niet_akkoord'
  );
  
  const zonnepanelenAfgerond = filteredZonnepanelen.filter(item => 
    item.status === 'afgehandeld'
  );

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'dakkapel-te-verwerken':
        return { data: dakkapelTeVerwerken, type: 'dakkapel' as const };
      case 'dakkapel-wacht-op-reactie':
        return { data: dakkapelWachtOpReactie, type: 'dakkapel' as const };
      case 'dakkapel-akkoord':
        return { data: dakkapelAkkoord, type: 'dakkapel' as const };
      case 'dakkapel-op-locatie':
        return { data: dakkapelOpLocatie, type: 'dakkapel' as const };
      case 'dakkapel-in-aanbouw':
        return { data: dakkapelInAanbouw, type: 'dakkapel' as const };
      case 'dakkapel-niet-akkoord':
        return { data: dakkapelNietAkkoord, type: 'dakkapel' as const };
      case 'dakkapel-afgerond':
        return { data: dakkapelAfgerond, type: 'dakkapel' as const };
      case 'zonnepanelen-te-verwerken':
        return { data: zonnepanelenTeVerwerken, type: 'zonnepaneel' as const };
      case 'zonnepanelen-wacht-op-reactie':
        return { data: zonnepanelenWachtOpReactie, type: 'zonnepaneel' as const };
      case 'zonnepanelen-akkoord':
        return { data: zonnepanelenAkkoord, type: 'zonnepaneel' as const };
      case 'zonnepanelen-op-locatie':
        return { data: zonnepanelenOpLocatie, type: 'zonnepaneel' as const };
      case 'zonnepanelen-in-aanbouw':
        return { data: zonnepanelenInAanbouw, type: 'zonnepaneel' as const };
      case 'zonnepanelen-niet-akkoord':
        return { data: zonnepanelenNietAkkoord, type: 'zonnepaneel' as const };
      case 'zonnepanelen-afgerond':
        return { data: zonnepanelenAfgerond, type: 'zonnepaneel' as const };
      default:
        return { data: [], type: 'dakkapel' as const };
    }
  };

  const { data: currentTabData, type: currentTabType } = getCurrentTabData();

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const openQuoteDialog = (item: any) => {
    if (currentTabType === 'zonnepaneel') {
      setSelectedQuoteItem({ ...item, isZonnepaneel: true });
    } else {
      setSelectedQuoteItem({ ...item, isCalculator: false });
    }
    setIsQuoteDialogOpen(true);
  };

  const handleBulkAction = async (action: string, ids: string[]) => {
    setLoading(true);
    let successCount = 0;
    const tableName = currentTabType === 'zonnepaneel' ? 'refurbished_zonnepanelen' : 'dakkapel_configuraties';
    
    for (const id of ids) {
      const success = await updateRequestStatus(id, action, tableName);
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
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <DashboardStats configuraties={allConfiguraties} />
          
          <Tabs defaultValue="dakkapel-te-verwerken" className="space-y-8" onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 pb-4">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 w-full gap-2 h-auto p-2 bg-gray-100">
                <TabsTrigger value="dakkapel-te-verwerken" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Dakkapel Te Verwerken ({dakkapelTeVerwerken.length})
                </TabsTrigger>
                <TabsTrigger value="dakkapel-wacht-op-reactie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Dakkapel Wacht ({dakkapelWachtOpReactie.length})
                </TabsTrigger>
                <TabsTrigger value="dakkapel-akkoord" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Dakkapel Akkoord ({dakkapelAkkoord.length})
                </TabsTrigger>
                <TabsTrigger value="dakkapel-op-locatie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Dakkapel Op Locatie ({dakkapelOpLocatie.length})
                </TabsTrigger>
                <TabsTrigger value="dakkapel-in-aanbouw" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Dakkapel In Aanbouw ({dakkapelInAanbouw.length})
                </TabsTrigger>
                <TabsTrigger value="dakkapel-niet-akkoord" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Dakkapel Niet Akkoord ({dakkapelNietAkkoord.length})
                </TabsTrigger>
                <TabsTrigger value="dakkapel-afgerond" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Dakkapel Afgerond ({dakkapelAfgerond.length})
                </TabsTrigger>
                <TabsTrigger value="prijzen" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Prijsbeheer
                </TabsTrigger>
              </TabsList>
              
              {/* Second row for Zonnepanelen tabs */}
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 w-full gap-2 h-auto p-2 bg-gray-100 mt-2">
                <TabsTrigger value="zonnepanelen-te-verwerken" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Zonnepanelen Te Verwerken ({zonnepanelenTeVerwerken.length})
                </TabsTrigger>
                <TabsTrigger value="zonnepanelen-wacht-op-reactie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Zonnepanelen Wacht ({zonnepanelenWachtOpReactie.length})
                </TabsTrigger>
                <TabsTrigger value="zonnepanelen-akkoord" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Zonnepanelen Akkoord ({zonnepanelenAkkoord.length})
                </TabsTrigger>
                <TabsTrigger value="zonnepanelen-op-locatie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Zonnepanelen Op Locatie ({zonnepanelenOpLocatie.length})
                </TabsTrigger>
                <TabsTrigger value="zonnepanelen-in-aanbouw" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Zonnepanelen In Aanbouw ({zonnepanelenInAanbouw.length})
                </TabsTrigger>
                <TabsTrigger value="zonnepanelen-niet-akkoord" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Zonnepanelen Niet Akkoord ({zonnepanelenNietAkkoord.length})
                </TabsTrigger>
                <TabsTrigger value="zonnepanelen-afgerond" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Zonnepanelen Afgerond ({zonnepanelenAfgerond.length})
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Dakkapel Tabs */}
            <TabsContent value="dakkapel-te-verwerken" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Dakkapel Te Verwerken Aanvragen ({dakkapelTeVerwerken.length})</CardTitle>
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
                    type={currentTabType}
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

            {/* Other Dakkapel tabs follow the same pattern with improved spacing */}
            <TabsContent value="dakkapel-wacht-op-reactie" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Dakkapel Wacht op Reactie ({dakkapelWachtOpReactie.length})</CardTitle>
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

            <TabsContent value="dakkapel-akkoord" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Dakkapel Akkoord ({dakkapelAkkoord.length})</CardTitle>
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

            <TabsContent value="dakkapel-op-locatie" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Dakkapel Op Locatie ({dakkapelOpLocatie.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    configuraties={dakkapelOpLocatie}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="dakkapel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dakkapel-in-aanbouw" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Dakkapel In Aanbouw ({dakkapelInAanbouw.length})</CardTitle>
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

            <TabsContent value="dakkapel-niet-akkoord" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Dakkapel Niet Akkoord ({dakkapelNietAkkoord.length})</CardTitle>
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

            <TabsContent value="dakkapel-afgerond" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Dakkapel Afgeronde Aanvragen ({dakkapelAfgerond.length})</CardTitle>
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

            {/* Zonnepanelen Tabs */}
            <TabsContent value="zonnepanelen-te-verwerken" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Zonnepanelen Te Verwerken Aanvragen ({zonnepanelenTeVerwerken.length})</CardTitle>
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
                    type={currentTabType}
                  />
                  
                  <ConfiguratorRequestsTable 
                    zonnepanelen={zonnepanelenTeVerwerken}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    selectedIds={selectedIds}
                    onSelectItem={handleSelectItem}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other Zonnepanelen tabs follow similar pattern with improved spacing */}
            <TabsContent value="zonnepanelen-wacht-op-reactie" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Zonnepanelen Wacht op Reactie ({zonnepanelenWachtOpReactie.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    zonnepanelen={zonnepanelenWachtOpReactie}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zonnepanelen-akkoord" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Zonnepanelen Akkoord ({zonnepanelenAkkoord.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    zonnepanelen={zonnepanelenAkkoord}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zonnepanelen-op-locatie" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Zonnepanelen Op Locatie ({zonnepanelenOpLocatie.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    zonnepanelen={zonnepanelenOpLocatie}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zonnepanelen-in-aanbouw" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Zonnepanelen In Aanbouw ({zonnepanelenInAanbouw.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    zonnepanelen={zonnepanelenInAanbouw}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zonnepanelen-niet-akkoord" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Zonnepanelen Niet Akkoord ({zonnepanelenNietAkkoord.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ConfiguratorRequestsTable 
                    zonnepanelen={zonnepanelenNietAkkoord}
                    onViewDetails={openDetails}
                    onOpenQuoteDialog={openQuoteDialog}
                    onDataChange={loadDashboardData}
                    sendingQuote={sendingQuote}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zonnepanelen-afgerond" className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Zonnepanelen Afgeronde Aanvragen ({zonnepanelenAfgerond.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={false}
                  />
                  
                  <ProcessedRequestsTable 
                    configuraties={zonnepanelenAfgerond}
                    onViewDetails={openDetails}
                    onDataChange={loadDashboardData}
                    type="zonnepaneel"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
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
