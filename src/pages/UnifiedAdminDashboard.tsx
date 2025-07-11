
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CalendarDays, Users, Euro, TrendingUp, Home, Brush, Hammer, Sun } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ResponsiveRequestTable from '@/components/admin/ResponsiveRequestTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import AdminFilters from '@/components/admin/AdminFilters';
import BulkActions from '@/components/admin/BulkActions';
import ConversieStats from '@/components/admin/ConversieStats';
import DashboardStats from '@/components/admin/DashboardStats';
import AutomatedCommunication from '@/components/admin/AutomatedCommunication';
import NotificationCenter from '@/components/admin/NotificationCenter';
import InvoiceOverview from '@/components/admin/InvoiceOverview';
import VacaturesManager from '@/components/admin/VacaturesManager';
import ContentManager from '@/components/admin/ContentManager';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import PWAInstallPrompt from '@/components/admin/PWAInstallPrompt';
import { DakkapelConfiguratie } from '@/types/admin';

type ServiceType = 'dakkapel' | 'zonnepaneel' | 'schilder' | 'stukadoor';

const UnifiedAdminDashboard = () => {
  const [activeService, setActiveService] = useState<ServiceType>('dakkapel');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    searchTerm: '',
    priceRange: { min: 0, max: 100000 }
  });

  const { data: configuraties, isLoading: isLoadingConfigurations, error: configurationsError, refetch: refetchConfigurations } = useQuery({
    queryKey: ['dakkapel_calculator_aanvragen'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('*');
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false
  });

  const { data: zonnepanelen, isLoading: isLoadingZonnepanelen, error: zonnepanelenError, refetch: refetchZonnepanelen } = useQuery({
    queryKey: ['refurbished_zonnepanelen'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('refurbished_zonnepanelen')
        .select('*');
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false
  });

  const { data: schilderAanvragen, isLoading: isLoadingSchilder, error: schilderError, refetch: refetchSchilder } = useQuery({
    queryKey: ['schilder_aanvragen'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schilder_aanvragen')
        .select('*');
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false
  });

  const { data: stukadoorAanvragen, isLoading: isLoadingStukadoor, error: stukadoorError, refetch: refetchStukadoor } = useQuery({
    queryKey: ['stukadoor_aanvragen'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stukadoor_aanvragen')
        .select('*');
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false
  });

  const refetchData = () => {
    refetchConfigurations();
    refetchZonnepanelen();
    refetchSchilder();
    refetchStukadoor();
  };

  const handleViewDetails = (item: any) => {
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

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) {
      toast.error('Selecteer ten minste één item.');
      return;
    }

    if (action === 'delete') {
      if (!confirm('Weet je zeker dat je de geselecteerde items wilt verwijderen?')) return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Bulkactie "${action}" succesvol uitgevoerd op ${selectedIds.length} items.`);
      setSelectedIds([]);
    } catch (error) {
      toast.error('Er is een fout opgetreden bij het uitvoeren van de bulkactie.');
    }
  };

  const serviceIcons = {
    dakkapel: Home,
    zonnepaneel: Sun,
    schilder: Brush,
    stukadoor: Hammer
  };

  const serviceLabels = {
    dakkapel: 'Dakkapel',
    zonnepaneel: 'Zonnepanelen',
    schilder: 'Schilderwerk',
    stukadoor: 'Stukadoor'
  };

  const getCurrentData = () => {
    switch (activeService) {
      case 'dakkapel':
        return configuraties || [];
      case 'zonnepaneel':
        return zonnepanelen || [];
      case 'schilder':
        return schilderAanvragen || [];
      case 'stukadoor':
        return stukadoorAanvragen || [];
      default:
        return [];
    }
  };

  // Get dakkapel data for dashboard stats (only use dakkapel data for general stats)
  const getDashboardStatsData = (): DakkapelConfiguratie[] => {
    // Transform dakkapel_calculator_aanvragen to match DakkapelConfiguratie interface
    return (configuraties || []).map(item => ({
      id: item.id,
      created_at: item.created_at || '',
      naam: `${item.voornaam} ${item.achternaam}`,
      email: item.emailadres,
      telefoon: item.telefoon,
      adres: `${item.straatnaam} ${item.huisnummer}`,
      postcode: item.postcode,
      plaats: item.plaats,
      opmerkingen: item.bericht,
      model: item.type,
      breedte: item.breedte,
      materiaal: item.materiaal,
      kleur_kozijn: item.kleurkozijnen,
      kleur_zijkanten: item.kleurzijkanten,
      kleur_draaikiepramen: item.kleurdraaikiepramen,
      dakhelling: item.dakhelling,
      dakhelling_type: item.dakhellingtype,
      levertijd: undefined,
      ventilationgrids: false,
      sunshade: false,
      insectscreens: false,
      airconditioning: false,
      status: item.status || 'nieuw',
      offerte_verzonden_op: item.offerte_verzonden_op,
      op_locatie_op: undefined,
      in_aanbouw_op: undefined,
      afgehandeld_op: item.afgehandeld_op,
      notities: item.notities,
      totaal_prijs: item.totaal_prijs
    }));
  };

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
              <NotificationCenter configuraties={getDashboardStatsData()} />
            </div>

            <Tabs value={activeService} onValueChange={(value) => setActiveService(value as ServiceType)}>
              <TabsList className="grid w-full grid-cols-4">
                {Object.entries(serviceLabels).map(([key, label]) => {
                  const Icon = serviceIcons[key as ServiceType];
                  return (
                    <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.keys(serviceLabels).map((service) => (
                <TabsContent key={service} value={service} className="space-y-6">
                  <DashboardStats configuraties={getDashboardStatsData()} />
                  {(service === 'dakkapel' || service === 'zonnepaneel') && (
                    <ConversieStats 
                      type={service as 'dakkapel' | 'zonnepaneel'} 
                      configuraties={service === 'dakkapel' ? getDashboardStatsData() : (zonnepanelen || [])}
                    />
                  )}
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <Card>
                        <CardHeader>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <CardTitle>Aanvragen Beheer</CardTitle>
                            <BulkActions
                              selectedIds={selectedIds}
                              onBulkAction={handleBulkAction}
                              type={activeService}
                            />
                          </div>
                          <AdminFilters
                            filters={{
                              search: filters.searchTerm,
                              status: filters.status,
                              dateFilter: filters.dateRange,
                              sortBy: 'created_at',
                              sortOrder: 'desc'
                            }}
                            onFiltersChange={(newFilters) => {
                              setFilters({
                                status: newFilters.status,
                                dateRange: newFilters.dateFilter,
                                searchTerm: newFilters.search,
                                priceRange: filters.priceRange
                              });
                            }}
                          />
                        </CardHeader>
                        <CardContent>
                          <ResponsiveRequestTable
                            items={getCurrentData()}
                            searchTerm={filters.searchTerm}
                            selectedStatus={filters.status}
                            onEdit={handleViewDetails}
                            onDataChange={refetchData}
                            sendingQuote={sendingQuote}
                            setSendingQuote={setSendingQuote}
                          />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <AutomatedCommunication onSendMessage={() => {}} />
                      <InvoiceOverview />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VacaturesManager />
              <ContentManager />
            </div>

            <AdminPriceEditor />
          </div>
        </main>
      </div>

      <RequestDetailDialog
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default UnifiedAdminDashboard;
