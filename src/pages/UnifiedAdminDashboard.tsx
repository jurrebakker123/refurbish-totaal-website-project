import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
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

  // DAKKAPEL QUERY
  const { data: configuraties, isLoading: isLoadingConfigurations, error: configurationsError, refetch: refetchConfigurations } = useQuery({
    queryKey: ['dakkapel_requests'],
    queryFn: async () => {
      console.log('🏠 Fetching dakkapel requests...');
      const { data, error } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Dakkapel error:', error);
        throw error;
      }
      
      console.log('✅ Dakkapel requests loaded:', data?.length || 0);
      return data || [];
    },
    refetchOnWindowFocus: false,
    retry: 2
  });

  // SCHILDER QUERY
  const { data: schilderAanvragen, isLoading: isLoadingSchilder, error: schilderError, refetch: refetchSchilder } = useQuery({
    queryKey: ['schilder_requests'],
    queryFn: async () => {
      console.log('🎨 Fetching schilder requests...');
      
      // First check if table exists and is accessible
      const { count, error: countError } = await supabase
        .from('schilder_aanvragen')
        .select('*', { count: 'exact', head: true });
        
      if (countError) {
        console.error('❌ Schilder count error:', countError);
        throw countError;
      }
      
      console.log('📊 Schilder table count:', count);
      
      const { data, error } = await supabase
        .from('schilder_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Schilder fetch error:', error);
        throw error;
      }
      
      console.log('✅ Schilder requests loaded:', data?.length || 0);
      return data || [];
    },
    refetchOnWindowFocus: false,
    retry: 2
  });

  // STUKADOOR QUERY
  const { data: stukadoorAanvragen, isLoading: isLoadingStukadoor, error: stukadoorError, refetch: refetchStukadoor } = useQuery({
    queryKey: ['stukadoor_requests'],
    queryFn: async () => {
      console.log('🔨 Fetching stukadoor requests...');
      
      // First check if table exists and is accessible
      const { count, error: countError } = await supabase
        .from('stukadoor_aanvragen')
        .select('*', { count: 'exact', head: true });
        
      if (countError) {
        console.error('❌ Stukadoor count error:', countError);
        throw countError;
      }
      
      console.log('📊 Stukadoor table count:', count);
      
      const { data, error } = await supabase
        .from('stukadoor_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Stukadoor fetch error:', error);
        throw error;
      }
      
      console.log('✅ Stukadoor requests loaded:', data?.length || 0);
      return data || [];
    },
    refetchOnWindowFocus: false,
    retry: 2
  });

  // Manual refresh function
  const refetchData = async () => {
    console.log('🔄 Manual refresh triggered...');
    setRefreshing(true);
    try {
      const results = await Promise.allSettled([
        refetchConfigurations(),
        refetchSchilder(),
        refetchStukadoor()
      ]);
      
      results.forEach((result, index) => {
        const names = ['dakkapel', 'schilder', 'stukadoor'];
        if (result.status === 'fulfilled') {
          console.log(`✅ ${names[index]} refresh successful`);
        } else {
          console.error(`❌ ${names[index]} refresh failed:`, result.reason);
        }
      });
      
      toast.success('Data vernieuwd!');
    } catch (error) {
      console.error('❌ Refresh error:', error);
      toast.error('Fout bij vernieuwen');
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

  const getLoadingState = () => {
    switch (activeService) {
      case 'dakkapel':
        return isLoadingConfigurations;
      case 'schilder':
        return isLoadingSchilder;
      case 'stukadoor':
        return isLoadingStukadoor;
      default:
        return false;
    }
  };

  const getCurrentError = () => {
    switch (activeService) {
      case 'dakkapel':
        return configurationsError;
      case 'schilder':
        return schilderError;
      case 'stukadoor':
        return stukadoorError;
      default:
        return null;
    }
  };

  // Error handling with toast notifications
  useEffect(() => {
    if (configurationsError) {
      console.error('Dakkapel error:', configurationsError);
      toast.error('Fout bij laden dakkapel aanvragen');
    }
    if (schilderError) {
      console.error('Schilder error:', schilderError);
      toast.error('Fout bij laden schilder aanvragen: ' + schilderError.message);
    }
    if (stukadoorError) {
      console.error('Stukadoor error:', stukadoorError);
      toast.error('Fout bij laden stukadoor aanvragen: ' + stukadoorError.message);
    }
  }, [configurationsError, schilderError, stukadoorError]);

  if (getLoadingState()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Gegevens worden geladen...</p>
        </div>
      </div>
    );
  }

  const currentError = getCurrentError();
  if (currentError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Fout bij laden gegevens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Er is een fout opgetreden bij het laden van de {serviceLabels[activeService].toLowerCase()} aanvragen.
            </p>
            <p className="text-sm text-red-600 mb-4">
              {currentError.message}
            </p>
            <Button onClick={refetchData} className="w-full">
              Opnieuw proberen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <p className="text-gray-600">Beheer alle aanvragen en configuraties</p>
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
                  let currentData;
                  switch (key) {
                    case 'dakkapel':
                      currentData = configuraties;
                      break;
                    case 'schilder':
                      currentData = schilderAanvragen;
                      break;
                    case 'stukadoor':
                      currentData = stukadoorAanvragen;
                      break;
                    default:
                      currentData = [];
                  }
                  return (
                    <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label} ({currentData?.length || 0})
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.keys(serviceLabels).map((service) => (
                <TabsContent key={service} value={service} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle>{serviceLabels[service as ServiceType]} Aanvragen Beheer</CardTitle>
                        <BulkActions
                          selectedIds={selectedIds}
                          onSelectAll={handleSelectAll}
                          onSelectItem={handleSelectItem}
                          onBulkAction={handleBulkAction}
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
                            Test de {service === 'schilder' ? 'schilder configurator' : service === 'stukadoor' ? 'stukadoor configurator' : 'dakkapel calculator'} om een aanvraag in te dienen.
                          </p>
                        </div>
                      ) : (
                        <ResponsiveRequestTable
                          items={getCurrentData()}
                          searchTerm={filters.search}
                          selectedStatus={filters.status}
                          onEdit={handleViewDetails}
                          onDataChange={refetchData}
                          sendingQuote={sendingQuote}
                          setSendingQuote={setSendingQuote}
                          onStatusFilter={handleStatusFilter}
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
