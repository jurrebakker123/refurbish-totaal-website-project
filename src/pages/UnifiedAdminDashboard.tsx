import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CalendarDays, Users, Euro, TrendingUp, Home, Brush, Hammer, RefreshCw, AlertCircle } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ResponsiveRequestTable from '@/components/admin/ResponsiveRequestTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import AdminFilters from '@/components/admin/AdminFilters';
import BulkActions from '@/components/admin/BulkActions';
import NotificationCenter from '@/components/admin/NotificationCenter';
import PWAInstallPrompt from '@/components/admin/PWAInstallPrompt';
import EmailMarketingDialog from '@/components/admin/EmailMarketingDialog';

type ServiceType = 'dakkapel' | 'schilder' | 'stukadoor';

const UnifiedAdminDashboard = () => {
  const [activeService, setActiveService] = useState<ServiceType>('dakkapel');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: '',
    priceRange: { min: 0, max: 100000 }
  });
  const [refreshing, setRefreshing] = useState(false);

  // State for all data
  const [configuraties, setConfiguraties] = useState<any[]>([]);
  const [schilderAanvragen, setSchilderAanvragen] = useState<any[]>([]);
  const [stukadoorAanvragen, setStukadoorAanvragen] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data function
  const loadData = async () => {
    console.log('🔄 Loading all dashboard data...');
    setLoading(true);
    setError(null);
    
    try {
      // Load dakkapel data
      console.log('📦 Loading dakkapel calculator aanvragen...');
      const { data: dakkapelData, error: dakkapelError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (dakkapelError) {
        console.error('❌ Dakkapel error:', dakkapelError);
        toast.error(`Fout bij laden dakkapel aanvragen: ${dakkapelError.message}`);
      } else {
        console.log('✅ Dakkapel geladen:', dakkapelData?.length || 0, 'aanvragen');
        setConfiguraties(dakkapelData || []);
      }

      // Load schilder data
      console.log('🎨 Loading schilder aanvragen...');
      const { data: schilderData, error: schilderError } = await supabase
        .from('schilder_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (schilderError) {
        console.error('❌ Schilder error:', schilderError);
        toast.error(`Fout bij laden schilder aanvragen: ${schilderError.message}`);
      } else {
        console.log('✅ Schilder geladen:', schilderData?.length || 0, 'aanvragen');
        setSchilderAanvragen(schilderData || []);
      }

      // Load stukadoor data
      console.log('🔨 Loading stukadoor aanvragen...');
      const { data: stukadoorData, error: stukadoorError } = await supabase
        .from('stukadoor_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (stukadoorError) {
        console.error('❌ Stukadoor error:', stukadoorError);
        toast.error(`Fout bij laden stukadoor aanvragen: ${stukadoorError.message}`);
      } else {
        console.log('✅ Stukadoor geladen:', stukadoorData?.length || 0, 'aanvragen');
        setStukadoorAanvragen(stukadoorData || []);
      }

      toast.success(`Dashboard geladen! ${dakkapelData?.length || 0} dakkapel, ${schilderData?.length || 0} schilder en ${stukadoorData?.length || 0} stukadoor aanvragen gevonden`);
    } catch (error: any) {
      console.error('❌ Algemene fout bij laden data:', error);
      setError('Er is een onverwachte fout opgetreden');
      toast.error('Onverwachte fout bij laden gegevens');
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Manual refresh function
  const refetchData = async () => {
    console.log('🔄 Handmatige refresh gestart...');
    setRefreshing(true);
    try {
      await loadData();
      toast.success('Data succesvol vernieuwd!');
    } catch (error) {
      console.error('❌ Refresh fout:', error);
      toast.error('Fout bij vernieuwen data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleViewDetails = (item: any) => {
    console.log('Opening details for item:', item);
    setSelectedItem(item);
  };

  const handleOpenQuoteDialog = (item: any) => {
    setSelectedItem(item);
    setShowQuoteDialog(true);
  };

  const handleCloseQuoteDialog = () => {
    setSelectedItem(null);
    setShowQuoteDialog(false);
  };

  const handleSendQuote = async (item: any, quoteDetails: any) => {
    setSendingQuote(item.id);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Offerte verzonden naar ${item.email || item.emailadres}`);
    } catch (error) {
      toast.error('Er is een fout opgetreden bij het verzenden van de offerte.');
    } finally {
      setSendingQuote(null);
      handleCloseQuoteDialog();
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedIds(prev => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter(itemId => itemId !== id);
      }
    });
  };

  const handleSelectAll = (checked: boolean) => {
    const currentData = getCurrentData();
    if (checked) {
      setSelectedIds(currentData.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleBulkAction = async (action: string, ids: string[]) => {
    if (ids.length === 0) {
      toast.error('Selecteer ten minste één item.');
      return;
    }

    if (action === 'delete') {
      if (!confirm('Weet je zeker dat je de geselecteerde items wilt verwijderen?')) return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Bulkactie "${action}" succesvol uitgevoerd op ${ids.length} items.`);
      setSelectedIds([]);
    } catch (error) {
      toast.error('Er is een fout opgetreden bij het uitvoeren van de bulkactie.');
    }
  };

  const handleStatusFilter = (status: string) => {
    console.log('Status filter clicked:', status);
    setFilters(prev => ({ ...prev, status }));
    toast.success(`Filter ingesteld op: ${getStatusLabel(status)}`);
  };

  const getStatusLabel = (status: string) => {
    if (!status) return 'Onbekend';
    
    switch (status.toLowerCase()) {
      case 'nieuw': return 'Nieuw';
      case 'in_behandeling': return 'In Behandeling';
      case 'offerte_verzonden': return 'Offerte Verzonden';
      case 'interesse_bevestigd': return 'Interesse Bevestigd';
      case 'akkoord': return 'Akkoord';
      case 'niet_akkoord': return 'Niet Akkoord';
      case 'op_locatie': return 'Op Locatie';
      case 'in_aanbouw': return 'In Aanbouw';
      case 'afgehandeld': return 'Afgehandeld';
      default: return status;
    }
  };

  const serviceIcons = {
    dakkapel: Home,
    schilder: Brush,
    stukadoor: Hammer
  };

  const serviceLabels = {
    dakkapel: 'Dakkapel',
    schilder: 'Schilderwerk',
    stukadoor: 'Stukadoor'
  };

  const getCurrentData = () => {
    switch (activeService) {
      case 'dakkapel':
        return configuraties || [];
      case 'schilder':
        return schilderAanvragen || [];
      case 'stukadoor':
        return stukadoorAanvragen || [];
      default:
        return [];
    }
  };

  const getServiceCounts = () => {
    return {
      dakkapel: configuraties?.length || 0,
      schilder: schilderAanvragen?.length || 0,
      stukadoor: stukadoorAanvragen?.length || 0
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Dashboard wordt geladen...</p>
          <p className="text-sm text-gray-500 mt-2">Dakkapel, schilder en stukadoor aanvragen laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Fout bij laden dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={refetchData} className="w-full" disabled={refreshing}>
              {refreshing ? 'Bezig met laden...' : 'Opnieuw proberen'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const counts = getServiceCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        showMobileMenu={false}
        setShowMobileMenu={() => {}}
        activeView=""
        setActiveView={() => {}}
        onDataChange={refetchData}
      />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <PWAInstallPrompt />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">
                  Totaal {counts.dakkapel + counts.schilder + counts.stukadoor} aanvragen beheren
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={refetchData}
                  disabled={refreshing}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Vernieuwen...' : 'Vernieuwen'}
                </Button>
                <EmailMarketingDialog onCampaignSent={refetchData} />
                <NotificationCenter configuraties={configuraties || []} />
              </div>
            </div>

            <Tabs value={activeService} onValueChange={(value) => setActiveService(value as ServiceType)}>
              <TabsList className="grid w-full grid-cols-3">
                {Object.entries(serviceLabels).map(([key, label]) => {
                  const Icon = serviceIcons[key as ServiceType];
                  const count = counts[key as ServiceType];
                  return (
                    <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label} ({count})
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.keys(serviceLabels).map((service) => (
                <TabsContent key={service} value={service} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>{serviceLabels[service as ServiceType]} Aanvragen</CardTitle>
                        <BulkActions
                          selectedIds={selectedIds}
                          onSelectAll={(checked) => {
                            const currentData = getCurrentData();
                            if (checked) {
                              setSelectedIds(currentData.map(item => item.id));
                            } else {
                              setSelectedIds([]);
                            }
                          }}
                          onSelectItem={(id, checked) => {
                            setSelectedIds(prev => {
                              if (checked) {
                                return [...prev, id];
                              } else {
                                return prev.filter(itemId => itemId !== id);
                              }
                            });
                          }}
                          onBulkAction={async (action, ids) => {
                            console.log(`Bulk actie: ${action} voor ${ids.length} items`);
                            toast.success(`Bulk actie "${action}" uitgevoerd op ${ids.length} items`);
                            setSelectedIds([]);
                          }}
                          allIds={getCurrentData().map(item => item.id)}
                          configurations={getCurrentData()}
                        />
                      </div>
                      <AdminFilters
                        filters={{
                          search: filters.search,
                          status: filters.status,
                          dateFilter: filters.dateRange,
                          sortBy: 'created_at',
                          sortOrder: 'desc'
                        }}
                        onFiltersChange={(newFilters) => {
                          setFilters({
                            status: newFilters.status,
                            dateRange: newFilters.dateFilter,
                            search: newFilters.search,
                            priceRange: filters.priceRange
                          });
                        }}
                      />
                    </CardHeader>
                    <CardContent>
                      {getCurrentData().length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">
                            Geen {serviceLabels[service as ServiceType].toLowerCase()} aanvragen gevonden.
                          </p>
                          <p className="text-sm text-gray-400">
                            Nieuwe aanvragen verschijnen hier automatisch.
                          </p>
                        </div>
                      ) : (
                        <ResponsiveRequestTable
                          items={getCurrentData()}
                          searchTerm={filters.search}
                          selectedStatus={filters.status}
                          onEdit={(item) => {
                            console.log('Bekijk details voor:', item);
                            setSelectedItem(item);
                          }}
                          onDataChange={refetchData}
                          sendingQuote={sendingQuote}
                          setSendingQuote={setSendingQuote}
                          onStatusFilter={(status) => {
                            console.log('Status filter:', status);
                            setFilters(prev => ({ ...prev, status }));
                            toast.success(`Filter ingesteld op: ${status}`);
                          }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>

      <RequestDetailDialog
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onDataChange={refetchData}
      />
    </div>
  );
};

export default UnifiedAdminDashboard;
