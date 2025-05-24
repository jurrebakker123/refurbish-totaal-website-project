import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { useNavigate } from 'react-router-dom';
import { DakkapelConfiguratie, QuoteItem } from '@/types/admin';
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

  const navigate = useNavigate();

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
  const filteredData = useMemo(() => {
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

  // Split data by categories for tabs
  const teVerwerken = filteredData.filter(config => 
    config.status === 'nieuw' || config.status === 'in_behandeling'
  );
  
  const wachtOpReactie = filteredData.filter(config => 
    config.status === 'offerte_verzonden'
  );
  
  const akkoord = filteredData.filter(config => 
    config.status === 'akkoord'
  );
  
  const nietAkkoord = filteredData.filter(config => 
    config.status === 'niet_akkoord'
  );
  
  const afgerond = filteredData.filter(config => 
    config.status === 'afgehandeld'
  );

  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'te-verwerken':
        return teVerwerken;
      case 'wacht-op-reactie':
        return wachtOpReactie;
      case 'akkoord':
        return akkoord;
      case 'niet-akkoord':
        return nietAkkoord;
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
    setSelectedQuoteItem({ ...item, isCalculator: false });
    setIsQuoteDialogOpen(true);
  };

  const handleBulkAction = async (action: string, ids: string[]) => {
    setLoading(true);
    let successCount = 0;
    
    for (const id of ids) {
      const success = await updateRequestStatus(id, action);
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
        <Button onClick={loadDashboardData} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Vernieuwen
        </Button>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <DashboardStats configuraties={allConfiguraties} />
          
          <Tabs defaultValue="te-verwerken" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="te-verwerken">
                Te Verwerken ({teVerwerken.length})
              </TabsTrigger>
              <TabsTrigger value="wacht-op-reactie">
                Wacht op Reactie ({wachtOpReactie.length})
              </TabsTrigger>
              <TabsTrigger value="akkoord">
                Akkoord/Opvolgen ({akkoord.length})
              </TabsTrigger>
              <TabsTrigger value="niet-akkoord">
                Niet Akkoord ({nietAkkoord.length})
              </TabsTrigger>
              <TabsTrigger value="afgerond">
                Afgerond ({afgerond.length})
              </TabsTrigger>
              <TabsTrigger value="prijzen">Prijsbeheer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="te-verwerken" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Te Verwerken Aanvragen ({teVerwerken.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                    />
                    
                    <ConfiguratorRequestsTable 
                      configuraties={currentTabData}
                      onViewDetails={openDetails}
                      onOpenQuoteDialog={openQuoteDialog}
                      onDataChange={loadDashboardData}
                      sendingQuote={sendingQuote}
                      selectedIds={selectedIds}
                      onSelectItem={handleSelectItem}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="wacht-op-reactie" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wacht op Reactie ({wachtOpReactie.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                    />
                    
                    <ConfiguratorRequestsTable 
                      configuraties={currentTabData}
                      onViewDetails={openDetails}
                      onOpenQuoteDialog={openQuoteDialog}
                      onDataChange={loadDashboardData}
                      sendingQuote={sendingQuote}
                      selectedIds={selectedIds}
                      onSelectItem={handleSelectItem}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="akkoord" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Akkoord/Opvolgen ({akkoord.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                    />
                    
                    <ConfiguratorRequestsTable 
                      configuraties={currentTabData}
                      onViewDetails={openDetails}
                      onOpenQuoteDialog={openQuoteDialog}
                      onDataChange={loadDashboardData}
                      sendingQuote={sendingQuote}
                      selectedIds={selectedIds}
                      onSelectItem={handleSelectItem}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="niet-akkoord" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Niet Akkoord ({nietAkkoord.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                    />
                    
                    <ConfiguratorRequestsTable 
                      configuraties={currentTabData}
                      onViewDetails={openDetails}
                      onOpenQuoteDialog={openQuoteDialog}
                      onDataChange={loadDashboardData}
                      sendingQuote={sendingQuote}
                      selectedIds={selectedIds}
                      onSelectItem={handleSelectItem}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="afgerond" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Afgeronde Aanvragen ({afgerond.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminFilters 
                      filters={filters} 
                      onFiltersChange={setFilters}
                      showStatusFilter={false}
                    />
                    
                    <ProcessedRequestsTable 
                      configuraties={currentTabData}
                      onViewDetails={openDetails}
                      onDataChange={loadDashboardData}
                    />
                  </CardContent>
                </Card>
              </div>
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
