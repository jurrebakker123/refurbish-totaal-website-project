
import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { DakkapelConfiguratie, QuoteItem } from '@/types/admin';
import { loadUnifiedAdminData, updateRequestStatus } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import ProcessedRequestsTable from '@/components/admin/ProcessedRequestsTable';
import DashboardStats from '@/components/admin/DashboardStats';
import AdminFilters, { FilterState } from '@/components/admin/AdminFilters';
import BulkActions from '@/components/admin/BulkActions';
import ConversieStats from '@/components/admin/ConversieStats';
import NotificationCenter from '@/components/admin/NotificationCenter';
import { toast } from 'sonner';
import EmailMarketingDialog from '@/components/admin/EmailMarketingDialog';
import PWAInstallPrompt from '@/components/admin/PWAInstallPrompt';
import { usePWA } from '@/hooks/usePWA';

interface SchilderAanvraag {
  id: string;
  created_at: string;
  updated_at: string;
  voornaam: string;
  achternaam: string;
  emailadres: string;
  telefoon: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  project_type: string;
  oppervlakte: number;
  verf_type: string;
  aantal_kamers?: number;
  voorbewerking_nodig: boolean;
  plafond_meeverven: boolean;
  kozijnen_meeverven: boolean;
  huidige_kleur?: string;
  gewenste_kleur?: string;
  bericht?: string;
  status: string;
  totaal_prijs?: number;
  notities?: string;
  offerte_verzonden_op?: string;
  op_locatie_op?: string;
  in_aanbouw_op?: string;
  afgehandeld_op?: string;
}

interface StukadoorAanvraag {
  id: string;
  created_at: string;
  updated_at: string;
  voornaam: string;
  achternaam: string;
  emailadres: string;
  telefoon: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  werk_type: string;
  oppervlakte: number;
  afwerking: string;
  aantal_kamers?: number;
  huidige_staat?: string;
  voorbewerking?: string;
  isolatie_gewenst: boolean;
  bericht?: string;
  status: string;
  totaal_prijs?: number;
  notities?: string;
  offerte_verzonden_op?: string;
  op_locatie_op?: string;
  in_aanbouw_op?: string;
  afgehandeld_op?: string;
}

const UnifiedAdminDashboard = () => {
  const [allConfiguraties, setAllConfiguraties] = useState<DakkapelConfiguratie[]>([]);
  const [allSchilderAanvragen, setAllSchilderAanvragen] = useState<SchilderAanvraag[]>([]);
  const [allStukadoorAanvragen, setAllStukadoorAanvragen] = useState<StukadoorAanvraag[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectType, setProjectType] = useState('dakkapel');
  const [activeTab, setActiveTab] = useState('nieuw');
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

  const { requestNotificationPermission } = usePWA();

  useEffect(() => {
    loadDashboardData();
    requestNotificationPermission();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const { configuraties, schilderAanvragen, stukadoorAanvragen, success } = await loadUnifiedAdminData();
    
    if (success) {
      setAllConfiguraties(configuraties);
      setAllSchilderAanvragen(schilderAanvragen);
      setAllStukadoorAanvragen(stukadoorAanvragen);
    }
    
    setLoading(false);
  };

  // Get current project data based on selected project type
  const getCurrentProjectData = () => {
    switch (projectType) {
      case 'dakkapel':
        return allConfiguraties;
      case 'schilder':
        return allSchilderAanvragen.map(item => ({
          ...item,
          naam: `${item.voornaam} ${item.achternaam}`,
          email: item.emailadres,
          adres: `${item.straatnaam} ${item.huisnummer}`,
          opmerkingen: item.bericht || ''
        }));
      case 'stukadoor':
        return allStukadoorAanvragen.map(item => ({
          ...item,
          naam: `${item.voornaam} ${item.achternaam}`,
          email: item.emailadres,
          adres: `${item.straatnaam} ${item.huisnummer}`,
          opmerkingen: item.bericht || ''
        }));
      default:
        return [];
    }
  };

  const currentProjectData = getCurrentProjectData();

  const filteredData = useMemo(() => {
    let filtered = [...currentProjectData];

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
  }, [currentProjectData, filters]);

  // Split data by status for tabs
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach(item => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });
    return counts;
  }, [filteredData]);

  const getCurrentTabData = () => {
    if (activeTab === 'all') return filteredData;
    return filteredData.filter(item => item.status === activeTab);
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

  const getTableName = () => {
    switch (projectType) {
      case 'dakkapel':
        return 'dakkapel_calculator_aanvragen';
      case 'schilder':
        return 'schilder_aanvragen';
      case 'stukadoor':
        return 'stukadoor_aanvragen';
      default:
        return 'dakkapel_calculator_aanvragen';
    }
  };

  const handleBulkAction = async (action: string, ids: string[]) => {
    setLoading(true);
    let successCount = 0;
    const table = getTableName();
    
    for (const id of ids) {
      const success = await updateRequestStatus(id, action, table as any);
      if (success) successCount++;
    }
    
    if (successCount > 0) {
      toast.success(`${successCount} ${projectType} project(s) bijgewerkt naar "${action}"`);
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

  const getProjectTypeName = () => {
    switch (projectType) {
      case 'dakkapel':
        return 'Dakkapel';
      case 'schilder':
        return 'Schilderwerk';
      case 'stukadoor':
        return 'Stucwerk';
      default:
        return 'Project';
    }
  };

  const getTotalCount = () => {
    switch (projectType) {
      case 'dakkapel':
        return allConfiguraties.length;
      case 'schilder':
        return allSchilderAanvragen.length;
      case 'stukadoor':
        return allStukadoorAanvragen.length;
      default:
        return 0;
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
          <h1 className="text-xl font-semibold text-brand-darkGreen">Refurbish Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <NotificationCenter configuraties={allConfiguraties} />
          <EmailMarketingDialog onCampaignSent={loadDashboardData} />
          <Button onClick={loadDashboardData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Vernieuwen
          </Button>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Project Type Selector */}
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setProjectType('dakkapel');
                  setSelectedIds([]);
                  setActiveTab('nieuw');
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  projectType === 'dakkapel'
                    ? 'bg-white text-brand-darkGreen shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dakkapel ({allConfiguraties.length})
              </button>
              <button
                onClick={() => {
                  setProjectType('schilder');
                  setSelectedIds([]);
                  setActiveTab('nieuw');
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  projectType === 'schilder'
                    ? 'bg-white text-brand-darkGreen shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Schilderwerk ({allSchilderAanvragen.length})
              </button>
              <button
                onClick={() => {
                  setProjectType('stukadoor');
                  setSelectedIds([]);
                  setActiveTab('nieuw');
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  projectType === 'stukadoor'
                    ? 'bg-white text-brand-darkGreen shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Stucwerk ({allStukadoorAanvragen.length})
              </button>
            </div>
          </div>
          
          {projectType === 'dakkapel' && <DashboardStats configuraties={allConfiguraties} />}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="border-b border-gray-200 pb-4">
              <TabsList className="grid grid-cols-9 w-full gap-2 h-auto p-2 bg-gray-100">
                <TabsTrigger value="all" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Alle ({filteredData.length})
                </TabsTrigger>
                <TabsTrigger value="nieuw" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Nieuw ({statusCounts['nieuw'] || 0})
                </TabsTrigger>
                <TabsTrigger value="in_behandeling" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  In Behandeling ({statusCounts['in_behandeling'] || 0})
                </TabsTrigger>
                <TabsTrigger value="offerte_verzonden" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Offerte Verzonden ({statusCounts['offerte_verzonden'] || 0})
                </TabsTrigger>
                <TabsTrigger value="interesse_bevestigd" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Interesse Bevestigd ({statusCounts['interesse_bevestigd'] || 0})
                </TabsTrigger>
                <TabsTrigger value="akkoord" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Akkoord ({statusCounts['akkoord'] || 0})
                </TabsTrigger>
                <TabsTrigger value="niet_akkoord" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Niet Akkoord ({statusCounts['niet_akkoord'] || 0})
                </TabsTrigger>
                <TabsTrigger value="op_locatie" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Op Locatie ({statusCounts['op_locatie'] || 0})
                </TabsTrigger>
                <TabsTrigger value="afgehandeld" className="text-xs py-3 px-2 h-auto whitespace-normal">
                  Afgehandeld ({statusCounts['afgehandeld'] || 0})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="space-y-6">
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">
                    {activeTab === 'all' ? 'Alle' : 
                     activeTab === 'nieuw' ? 'Nieuwe' :
                     activeTab === 'in_behandeling' ? 'In Behandeling' :
                     activeTab === 'offerte_verzonden' ? 'Offerte Verzonden' :
                     activeTab === 'interesse_bevestigd' ? 'Interesse Bevestigd' :
                     activeTab === 'akkoord' ? 'Akkoord' :
                     activeTab === 'niet_akkoord' ? 'Niet Akkoord' :
                     activeTab === 'op_locatie' ? 'Op Locatie' :
                     activeTab === 'afgehandeld' ? 'Afgehandelde' : ''} {getProjectTypeName()} Aanvragen ({currentTabData.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AdminFilters 
                    filters={filters} 
                    onFiltersChange={setFilters}
                    showStatusFilter={true}
                  />
                  
                  <BulkActions
                    selectedIds={selectedIds}
                    onSelectAll={handleSelectAll}
                    onSelectItem={handleSelectItem}
                    onBulkAction={handleBulkAction}
                    allIds={currentTabData.map(item => item.id)}
                    configurations={currentTabData}
                    type={projectType as any}
                  />
                  
                  {activeTab === 'afgehandeld' ? (
                    <ProcessedRequestsTable 
                      configuraties={currentTabData as DakkapelConfiguratie[]}
                      onViewDetails={openDetails}
                      onDataChange={loadDashboardData}
                      type={projectType as any}
                    />
                  ) : (
                    <ConfiguratorRequestsTable 
                      configuraties={projectType === 'dakkapel' ? currentTabData as DakkapelConfiguratie[] : undefined}
                      schilderAanvragen={projectType === 'schilder' ? allSchilderAanvragen.filter(item => 
                        activeTab === 'all' || item.status === activeTab
                      ) : undefined}
                      stukadoorAanvragen={projectType === 'stukadoor' ? allStukadoorAanvragen.filter(item => 
                        activeTab === 'all' || item.status === activeTab
                      ) : undefined}
                      onViewDetails={openDetails}
                      onOpenQuoteDialog={openQuoteDialog}
                      onDataChange={loadDashboardData}
                      sendingQuote={sendingQuote}
                      selectedIds={selectedIds}
                      onSelectItem={handleSelectItem}
                      type={projectType as any}
                    />
                  )}
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

export default UnifiedAdminDashboard;
