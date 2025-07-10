
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, PaintBucket, Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { loadUnifiedAdminData } from '@/utils/adminUtils';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';
import MobileAdminHeader from '@/components/admin/MobileAdminHeader';

const UnifiedAdminDashboard = () => {
  const [configuraties, setConfiguraties] = useState([]);
  const [schilderAanvragen, setSchilderAanvragen] = useState([]);
  const [stukadoorAanvragen, setStukadoorAanvragen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState(null);
  const [activeService, setActiveService] = useState('dakkapel');

  const loadData = async () => {
    console.log('Loading unified dashboard data...');
    setLoading(true);
    
    try {
      const result = await loadUnifiedAdminData();
      
      if (result.success) {
        setConfiguraties(result.configuraties);
        setSchilderAanvragen(result.schilderAanvragen);
        setStukadoorAanvragen(result.stukadoorAanvragen);
        console.log('Data loaded successfully:', {
          dakkapel: result.configuraties.length,
          schilder: result.schilderAanvragen.length,
          stukadoor: result.stukadoorAanvragen.length
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Fout bij het laden van gegevens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsDetailDialogOpen(true);
  };

  const handleOpenQuoteDialog = (item) => {
    setSelectedItem(item);
    setIsQuoteDialogOpen(true);
  };

  const getTotalCount = () => {
    return configuraties.length + schilderAanvragen.length + stukadoorAanvragen.length;
  };

  const getNewCount = () => {
    const dakkapelNew = configuraties.filter(item => item.status === 'nieuw').length;
    const schilderNew = schilderAanvragen.filter(item => item.status === 'nieuw').length;
    const stukadoorNew = stukadoorAanvragen.filter(item => item.status === 'nieuw').length;
    return dakkapelNew + schilderNew + stukadoorNew;
  };

  const getCompletedCount = () => {
    return configuraties.filter(c => c.status === 'afgehandeld').length + 
           schilderAanvragen.filter(s => s.status === 'afgehandeld').length + 
           stukadoorAanvragen.filter(s => s.status === 'afgehandeld').length;
  };

  // Get current service data based on active service
  const getCurrentServiceData = () => {
    switch (activeService) {
      case 'dakkapel':
        return configuraties;
      case 'schilder':
        return schilderAanvragen;
      case 'stukadoor':
        return stukadoorAanvragen;
      default:
        return [];
    }
  };

  const currentData = getCurrentServiceData();

  // Filter data by status for different tabs
  const teVerwerken = currentData.filter(item => 
    item.status === 'nieuw' || item.status === 'in_behandeling'
  );
  
  const wachtOpReactie = currentData.filter(item => 
    item.status === 'offerte_verzonden'
  );
  
  const interesseBevestigd = currentData.filter(item => 
    item.status === 'interesse_bevestigd'
  );
  
  const akkoord = currentData.filter(item => 
    item.status === 'akkoord'
  );
  
  const nietAkkoord = currentData.filter(item => 
    item.status === 'niet_akkoord' || item.status === 'geen_interesse'
  );
  
  const opLocatie = currentData.filter(item => 
    item.status === 'op_locatie'
  );
  
  const inAanbouw = currentData.filter(item => 
    item.status === 'in_aanbouw'
  );
  
  const afgerond = currentData.filter(item => 
    item.status === 'afgehandeld'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileAdminHeader 
          title="Admin Dashboard"
          onRefresh={loadData}
          onDataChange={loadData}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Dashboard laden...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileAdminHeader 
        title="Admin Dashboard"
        onRefresh={loadData}
        onDataChange={loadData}
      />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Overzicht van alle aanvragen</p>
            </div>
            
            {/* Service selector tabs next to title */}
            <div className="flex gap-2">
              <Button
                variant={activeService === 'dakkapel' ? 'default' : 'outline'}
                onClick={() => setActiveService('dakkapel')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Dakkapel ({configuraties.length})
              </Button>
              <Button
                variant={activeService === 'schilder' ? 'default' : 'outline'}
                onClick={() => setActiveService('schilder')}
                className="flex items-center gap-2"
              >
                <PaintBucket className="h-4 w-4" />
                Schilderwerk ({schilderAanvragen.length})
              </Button>
              <Button
                variant={activeService === 'stukadoor' ? 'default' : 'outline'}
                onClick={() => setActiveService('stukadoor')}
                className="flex items-center gap-2"
              >
                <Building className="h-4 w-4" />
                Stukadoorswerk ({stukadoorAanvragen.length})
              </Button>
            </div>
          </div>
          
          <Button onClick={loadData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Vernieuwen
          </Button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Aanvragen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalCount()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nieuwe Aanvragen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getNewCount()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Afgehandeld</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCompletedCount()}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Aanvragen Overzicht - {activeService === 'dakkapel' ? 'Dakkapel' : activeService === 'schilder' ? 'Schilderwerk' : 'Stukadoorswerk'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="te-verwerken" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1 h-auto p-1 bg-gray-100">
                <TabsTrigger value="te-verwerken" className="text-xs py-2 px-2 h-auto whitespace-normal">
                  Te Verwerken ({teVerwerken.length})
                </TabsTrigger>
                <TabsTrigger value="wacht-op-reactie" className="text-xs py-2 px-2 h-auto whitespace-normal">
                  Wacht op Reactie ({wachtOpReactie.length})
                </TabsTrigger>
                <TabsTrigger value="interesse-bevestigd" className="text-xs py-2 px-2 h-auto whitespace-normal">
                  Interesse Bevestigd ({interesseBevestigd.length})
                </TabsTrigger>
                <TabsTrigger value="akkoord" className="text-xs py-2 px-2 h-auto whitespace-normal">
                  Akkoord ({akkoord.length})
                </TabsTrigger>
                <TabsTrigger value="niet-akkoord" className="text-xs py-2 px-2 h-auto whitespace-normal">
                  Niet Akkoord ({nietAkkoord.length})
                </TabsTrigger>
                <TabsTrigger value="op-locatie" className="text-xs py-2 px-2 h-auto whitespace-normal">
                  Op Locatie ({opLocatie.length})
                </TabsTrigger>
                <TabsTrigger value="in-aanbouw" className="text-xs py-2 px-2 h-auto whitespace-normal">
                  In Aanbouw ({inAanbouw.length})
                </TabsTrigger>
                <TabsTrigger value="afgerond" className="text-xs py-2 px-2 h-auto whitespace-normal">
                  Afgerond ({afgerond.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="te-verwerken">
                <ConfiguratorRequestsTable
                  configuraties={activeService === 'dakkapel' ? teVerwerken : []}
                  schilderAanvragen={activeService === 'schilder' ? teVerwerken : []}
                  stukadoorAanvragen={activeService === 'stukadoor' ? teVerwerken : []}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type={activeService}
                />
              </TabsContent>

              <TabsContent value="wacht-op-reactie">
                <ConfiguratorRequestsTable
                  configuraties={activeService === 'dakkapel' ? wachtOpReactie : []}
                  schilderAanvragen={activeService === 'schilder' ? wachtOpReactie : []}
                  stukadoorAanvragen={activeService === 'stukadoor' ? wachtOpReactie : []}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type={activeService}
                />
              </TabsContent>

              <TabsContent value="interesse-bevestigd">
                <ConfiguratorRequestsTable
                  configuraties={activeService === 'dakkapel' ? interesseBevestigd : []}
                  schilderAanvragen={activeService === 'schilder' ? interesseBevestigd : []}
                  stukadoorAanvragen={activeService === 'stukadoor' ? interesseBevestigd : []}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type={activeService}
                />
              </TabsContent>

              <TabsContent value="akkoord">
                <ConfiguratorRequestsTable
                  configuraties={activeService === 'dakkapel' ? akkoord : []}
                  schilderAanvragen={activeService === 'schilder' ? akkoord : []}
                  stukadoorAanvragen={activeService === 'stukadoor' ? akkoord : []}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type={activeService}
                />
              </TabsContent>

              <TabsContent value="niet-akkoord">
                <ConfiguratorRequestsTable
                  configuraties={activeService === 'dakkapel' ? nietAkkoord : []}
                  schilderAanvragen={activeService === 'schilder' ? nietAkkoord : []}
                  stukadoorAanvragen={activeService === 'stukadoor' ? nietAkkoord : []}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type={activeService}
                />
              </TabsContent>

              <TabsContent value="op-locatie">
                <ConfiguratorRequestsTable
                  configuraties={activeService === 'dakkapel' ? opLocatie : []}
                  schilderAanvragen={activeService === 'schilder' ? opLocatie : []}
                  stukadoorAanvragen={activeService === 'stukadoor' ? opLocatie : []}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type={activeService}
                />
              </TabsContent>

              <TabsContent value="in-aanbouw">
                <ConfiguratorRequestsTable
                  configuraties={activeService === 'dakkapel' ? inAanbouw : []}
                  schilderAanvragen={activeService === 'schilder' ? inAanbouw : []}
                  stukadoorAanvragen={activeService === 'stukadoor' ? inAanbouw : []}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type={activeService}
                />
              </TabsContent>

              <TabsContent value="afgerond">
                <ConfiguratorRequestsTable
                  configuraties={activeService === 'dakkapel' ? afgerond : []}
                  schilderAanvragen={activeService === 'schilder' ? afgerond : []}
                  stukadoorAanvragen={activeService === 'stukadoor' ? afgerond : []}
                  onViewDetails={handleViewDetails}
                  onOpenQuoteDialog={handleOpenQuoteDialog}
                  onDataChange={loadData}
                  sendingQuote={sendingQuote}
                  type={activeService}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <RequestDetailDialog
        item={selectedItem}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />

      <QuoteDialog
        selectedItem={selectedItem}
        isOpen={isQuoteDialogOpen}
        onClose={() => setIsQuoteDialogOpen(false)}
        setSendingQuote={setSendingQuote}
      />
    </div>
  );
};

export default UnifiedAdminDashboard;
