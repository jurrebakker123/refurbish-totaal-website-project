
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { useNavigate } from 'react-router-dom';
import { DakkapelConfiguratie, DakkapelCalculatorAanvraag, QuoteItem } from '@/types/admin';
import { loadAdminData } from '@/utils/adminUtils';
import CalculatorRequestsTable from '@/components/admin/CalculatorRequestsTable';
import ConfiguratorRequestsTable from '@/components/admin/ConfiguratorRequestsTable';
import RequestDetailDialog from '@/components/admin/RequestDetailDialog';
import QuoteDialog from '@/components/admin/QuoteDialog';

const AdminDashboardPage = () => {
  const [configuraties, setConfiguraties] = useState<DakkapelConfiguratie[]>([]);
  const [calculatorAanvragen, setCalculatorAanvragen] = useState<DakkapelCalculatorAanvraag[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('aanvragen');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedQuoteItem, setSelectedQuoteItem] = useState<QuoteItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const { configuraties: configData, calculatorAanvragen: calcData, success } = await loadAdminData();
    
    if (success) {
      setConfiguraties(configData);
      setCalculatorAanvragen(calcData);
    }
    
    setLoading(false);
  };

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const openQuoteDialog = (item: any, isCalculator: boolean) => {
    setSelectedQuoteItem({ ...item, isCalculator });
    setIsQuoteDialogOpen(true);
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
          
          <Tabs defaultValue="aanvragen" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="aanvragen">
                Dakkapel Aanvragen ({calculatorAanvragen.length + configuraties.length})
              </TabsTrigger>
              <TabsTrigger value="prijzen">Prijsbeheer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="aanvragen" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Calculator Aanvragen ({calculatorAanvragen.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalculatorRequestsTable 
                      calculatorAanvragen={calculatorAanvragen}
                      onViewDetails={openDetails}
                      onOpenQuoteDialog={openQuoteDialog}
                      onDataChange={loadDashboardData}
                      sendingQuote={sendingQuote}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Configurator Aanvragen ({configuraties.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ConfiguratorRequestsTable 
                      configuraties={configuraties}
                      onViewDetails={openDetails}
                      onOpenQuoteDialog={openQuoteDialog}
                      onDataChange={loadDashboardData}
                      sendingQuote={sendingQuote}
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
      />
    </div>
  );
};

export default AdminDashboardPage;
