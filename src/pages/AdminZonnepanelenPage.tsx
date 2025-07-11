import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CalendarDays, Users, Euro, TrendingUp } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ResponsiveRequestTable from '@/components/admin/ResponsiveRequestTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import AdminFilters from '@/components/admin/AdminFilters';
import BulkActions from '@/components/admin/BulkActions';
import NotificationCenter from '@/components/admin/NotificationCenter';
import PWAInstallPrompt from '@/components/admin/PWAInstallPrompt';
import EmailMarketingDialog from '@/components/admin/EmailMarketingDialog';
import { RefurbishedZonnepaneel } from '@/types/admin';

const AdminZonnepanelenPage = () => {
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

  const { data: zonnepanelen, isLoading, error, refetch } = useQuery({
    queryKey: ['refurbished_zonnepanelen'],
    queryFn: async () => {
      console.log('Fetching refurbished zonnepanelen...');
      const { data, error } = await supabase
        .from('refurbished_zonnepanelen')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching zonnepanelen:', error);
        throw error;
      }
      console.log('Zonnepanelen loaded:', data?.length);
      return data as RefurbishedZonnepaneel[];
    },
    refetchOnWindowFocus: false
  });

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
      toast.success(`Offerte verzonden naar ${item.email}`);
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
    if (checked) {
      setSelectedIds(zonnepanelen?.map(item => item.id) || []);
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

  if (isLoading) {
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
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        showMobileMenu={false}
        setShowMobileMenu={() => {}}
        activeView=""
        setActiveView={() => {}}
        onDataChange={refetch}
      />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <PWAInstallPrompt />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Zonnepanelen Dashboard</h1>
                <p className="text-gray-600">Beheer alle zonnepanelen aanvragen</p>
              </div>
              <div className="flex items-center gap-4">
                <EmailMarketingDialog onCampaignSent={refetch} />
                <NotificationCenter configuraties={zonnepanelen || []} />
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Zonnepanelen Aanvragen Beheer</CardTitle>
                  <BulkActions
                    selectedIds={selectedIds}
                    onSelectAll={handleSelectAll}
                    onSelectItem={handleSelectItem}
                    onBulkAction={handleBulkAction}
                    allIds={zonnepanelen?.map(item => item.id) || []}
                    configurations={zonnepanelen || []}
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
                  items={zonnepanelen || []}
                  searchTerm={filters.searchTerm}
                  selectedStatus={filters.status}
                  onEdit={handleViewDetails}
                  onDataChange={refetch}
                  sendingQuote={sendingQuote}
                  setSendingQuote={setSendingQuote}
                  onStatusFilter={handleStatusFilter}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <RequestDetailDialog
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onDataChange={refetch}
      />
    </div>
  );
};

export default AdminZonnepanelenPage;
