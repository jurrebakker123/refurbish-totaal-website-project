import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Building2,
  PaintBucket,
  Home,
  Sun
} from 'lucide-react';
import { ResponsiveRequestTable } from '@/components/admin/ResponsiveRequestTable';
import { RequestDetailDialog } from '@/components/admin/RequestDetailDialog';
import { AdminFilters } from '@/components/admin/AdminFilters';
import { BulkActions } from '@/components/admin/BulkActions';
import { ConversieStats } from '@/components/admin/ConversieStats';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { AutomatedCommunication } from '@/components/admin/AutomatedCommunication';
import { NotificationCenter } from '@/components/admin/NotificationCenter';
import { InvoiceOverview } from '@/components/admin/InvoiceOverview';
import { VacaturesManager } from '@/components/admin/VacaturesManager';
import { ContentManager } from '@/components/admin/ContentManager';
import { AdminPriceEditor } from '@/components/admin/AdminPriceEditor';
import { PWAInstallPrompt } from '@/components/admin/PWAInstallPrompt';
import { toast } from 'sonner';

type ServiceType = 'dakkapel' | 'schilder' | 'zonnepaneel' | 'stukadoor';

const UnifiedAdminDashboard = () => {
  const [activeService, setActiveService] = useState<ServiceType>('dakkapel');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc' as 'asc' | 'desc'
  });

  // Queries and functions
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const tableName = activeService === 'dakkapel' ? 'dakkapel_calculator_aanvragen' :
                     activeService === 'schilder' ? 'schilder_aanvragen' :
                     activeService === 'stukadoor' ? 'stukadoor_aanvragen' :
                     'refurbished_zonnepanelen';

    try {
      const { error } = await supabase
        .from(tableName)
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Invalidate the query to refetch data
      if (activeService === 'dakkapel') {
        // @ts-ignore
        queryClient.invalidateQueries('dakkapel-requests');
      } else if (activeService === 'schilder') {
        // @ts-ignore
        queryClient.invalidateQueries('schilder-requests');
      } else if (activeService === 'stukadoor') {
        // @ts-ignore
        queryClient.invalidateQueries('stukadoor-requests');
      } else if (activeService === 'zonnepaneel') {
        // @ts-ignore
        queryClient.invalidateQueries('zonnepaneel-requests');
      }

      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update status');
    }
  };

  const { data: dakkapelData, isLoading: dakkapelLoading } = useQuery({
    queryKey: ['dakkapel-requests', filters],
    queryFn: async () => {
      let query = supabase.from('dakkapel_calculator_aanvragen').select('*');
      
      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      
      if (filters.dateRange !== 'all') {
        const days = filters.dateRange === 'week' ? 7 : filters.dateRange === 'month' ? 30 : 90;
        const date = new Date();
        date.setDate(date.getDate() - days);
        query = query.gte('created_at', date.toISOString());
      }
      
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: schilderData, isLoading: schilderLoading } = useQuery({
    queryKey: ['schilder-requests', filters],
    queryFn: async () => {
      let query = supabase.from('schilder_aanvragen').select('*');
      
      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      
      if (filters.dateRange !== 'all') {
        const days = filters.dateRange === 'week' ? 7 : filters.dateRange === 'month' ? 30 : 90;
        const date = new Date();
        date.setDate(date.getDate() - days);
        query = query.gte('created_at', date.toISOString());
      }
      
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: stukadoorData, isLoading: stukadoorLoading } = useQuery({
    queryKey: ['stukadoor-requests', filters],
    queryFn: async () => {
      let query = supabase.from('stukadoor_aanvragen').select('*');
      
      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      
      if (filters.dateRange !== 'all') {
        const days = filters.dateRange === 'week' ? 7 : filters.dateRange === 'month' ? 30 : 90;
        const date = new Date();
        date.setDate(date.getDate() - days);
        query = query.gte('created_at', date.toISOString());
      }
      
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: zonnepaneelData, isLoading: zonnepaneelLoading } = useQuery({
    queryKey: ['zonnepaneel-requests', filters],
    queryFn: async () => {
      let query = supabase.from('refurbished_zonnepanelen').select('*');
      
      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      
      if (filters.dateRange !== 'all') {
        const days = filters.dateRange === 'week' ? 7 : filters.dateRange === 'month' ? 30 : 90;
        const date = new Date();
        date.setDate(date.getDate() - days);
        query = query.gte('created_at', date.toISOString());
      }
      
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const getCurrentData = () => {
    switch (activeService) {
      case 'dakkapel': return dakkapelData || [];
      case 'schilder': return schilderData || [];
      case 'stukadoor': return stukadoorData || [];
      case 'zonnepaneel': return zonnepaneelData || [];
      default: return [];
    }
  };

  const getCurrentLoading = () => {
    switch (activeService) {
      case 'dakkapel': return dakkapelLoading;
      case 'schilder': return schilderLoading;
      case 'stukadoor': return stukadoorLoading;
      case 'zonnepaneel': return zonnepaneelLoading;
      default: return false;
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedRequests.length === 0) {
      toast.error('Selecteer eerst aanvragen');
      return;
    }

    const tableName = activeService === 'dakkapel' ? 'dakkapel_calculator_aanvragen' :
                     activeService === 'schilder' ? 'schilder_aanvragen' :
                     activeService === 'stukadoor' ? 'stukadoor_aanvragen' :
                     'refurbished_zonnepanelen';

    try {
      if (action === 'delete') {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .in('id', selectedRequests);
        
        if (error) throw error;
        toast.success(`${selectedRequests.length} aanvragen verwijderd`);
      } else {
        const { error } = await supabase
          .from(tableName)
          .update({ status: action })
          .in('id', selectedRequests);
        
        if (error) throw error;
        toast.success(`${selectedRequests.length} aanvragen bijgewerkt naar ${action}`);
      }
      
      setSelectedRequests([]);
    } catch (error) {
      console.error('Bulk action error:', error);
      toast.error('Er ging iets mis');
    }
  };

  const totalRequests = getCurrentData().length;
  const newRequests = getCurrentData().filter((req: any) => req.status === 'nieuw').length;
  const processedRequests = getCurrentData().filter((req: any) => req.status === 'afgehandeld').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <PWAInstallPrompt />
      
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-semibold text-gray-900">
              Unified Admin Dashboard
            </h1>
            <NotificationCenter />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeService} onValueChange={(value) => setActiveService(value as ServiceType)} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="dakkapel" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Dakkapel
            </TabsTrigger>
            <TabsTrigger value="schilder" className="flex items-center gap-2">
              <PaintBucket className="h-4 w-4" />
              Schilder
            </TabsTrigger>
            <TabsTrigger value="stukadoor" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Stukadoor
            </TabsTrigger>
            <TabsTrigger value="zonnepaneel" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Zonnepaneel
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeService} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Totaal</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRequests}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nieuwe</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{newRequests}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Afgehandeld</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{processedRequests}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversie</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {totalRequests > 0 ? Math.round((processedRequests / totalRequests) * 100) : 0}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <AdminFilters 
                  filters={filters}
                  onFiltersChange={setFilters}
                />
                
                <BulkActions
                  selectedCount={selectedRequests.length}
                  onBulkAction={handleBulkAction}
                />

                <ResponsiveRequestTable
                  data={getCurrentData()}
                  isLoading={getCurrentLoading()}
                  selectedRequests={selectedRequests}
                  onSelectionChange={setSelectedRequests}
                  onRequestClick={setSelectedRequest}
                  serviceType={activeService}
                />
              </div>

              <div className="space-y-6">
                <ConversieStats serviceType={activeService} />
                <DashboardStats serviceType={activeService} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 space-y-8">
          <Tabs defaultValue="automation" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="automation">Automatisering</TabsTrigger>
              <TabsTrigger value="invoices">Facturen</TabsTrigger>
              <TabsTrigger value="vacatures">Vacatures</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="prices">Prijzen</TabsTrigger>
            </TabsList>

            <TabsContent value="automation" className="space-y-6">
              <AutomatedCommunication />
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              <InvoiceOverview />
            </TabsContent>

            <TabsContent value="vacatures" className="space-y-6">
              <VacaturesManager />
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <ContentManager />
            </TabsContent>

            <TabsContent value="prices" className="space-y-6">
              <AdminPriceEditor />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedRequest && (
        <RequestDetailDialog
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          serviceType={activeService}
        />
      )}
    </div>
  );
};

export default UnifiedAdminDashboard;
