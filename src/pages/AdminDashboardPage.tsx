import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Eye, 
  Edit, 
  Mail, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download,
  RefreshCw 
} from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface DakkapelConfiguratie {
  id: string;
  created_at: string;
  naam: string;
  email: string;
  telefoon: string;
  adres: string;
  postcode: string;
  plaats: string;
  opmerkingen?: string;
  model: string;
  breedte: number;
  materiaal: string;
  kleur_kozijn: string;
  kleur_zijkanten: string;
  kleur_draaikiepramen: string;
  dakhelling?: number;
  dakhelling_type?: string;
  levertijd?: string;
  ventilationgrids: boolean;
  sunshade: boolean;
  insectscreens: boolean;
  airconditioning: boolean;
  status: string;
  offerte_verzonden_op?: string;
  afgehandeld_op?: string;
  notities?: string;
  totaal_prijs?: number;
}

interface DakkapelCalculatorAanvraag {
  id: string;
  created_at: string;
  voornaam: string;
  achternaam: string;
  straatnaam: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  telefoon: string;
  emailadres: string;
  bericht?: string;
  type: string;
  breedte: number;
  hoogte: number;
  materiaal: string;
  aantalramen: number;
  kozijnhoogte: string;
  dakhelling: number;
  dakhellingtype: string;
  kleurkozijnen: string;
  kleurzijkanten: string;
  kleurdraaikiepramen: string;
  rcwaarde: string;
  woningzijde: string;
  opties: any;
  status: string;
  offerte_verzonden_op?: string;
  afgehandeld_op?: string;
  notities?: string;
  totaal_prijs?: number;
}

const AdminDashboardPage = () => {
  const [configuraties, setConfiguraties] = useState<DakkapelConfiguratie[]>([]);
  const [calculatorAanvragen, setCalculatorAanvragen] = useState<DakkapelCalculatorAanvraag[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('aanvragen');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState<string | null>(null);
  const [quoteMessage, setQuoteMessage] = useState('');
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedQuoteItem, setSelectedQuoteItem] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    console.log('Starting to load admin dashboard data...');
    
    try {
      // Load configurator data
      console.log('Loading configurator data...');
      const { data: configData, error: configError } = await supabase
        .from('dakkapel_configuraties')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Configurator data:', configData, 'Error:', configError);
      if (configError) {
        console.error('Config error:', configError);
        toast.error("Fout bij laden configuraties: " + configError.message);
      } else {
        setConfiguraties(configData || []);
        console.log(`Loaded ${configData?.length || 0} configurations`);
      }

      // Load calculator data
      console.log('Loading calculator data...');
      const { data: calcData, error: calcError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Calculator data:', calcData, 'Error:', calcError);
      if (calcError) {
        console.error('Calculator error:', calcError);
        toast.error("Fout bij laden calculator aanvragen: " + calcError.message);
      } else {
        setCalculatorAanvragen(calcData || []);
        console.log(`Loaded ${calcData?.length || 0} calculator requests`);
      }

      toast.success(`Dashboard geladen! ${(configData?.length || 0) + (calcData?.length || 0)} aanvragen gevonden`);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error("Onverwachte fout bij het laden van gegevens");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (table: 'dakkapel_configuraties' | 'dakkapel_calculator_aanvragen', id: string, status: string) => {
    console.log(`Updating status for ${table} ${id} to ${status}`);
    
    const updateData: any = { 
      status,
      updated_at: new Date().toISOString()
    };
    
    if (status === 'offerte_verzonden') {
      updateData.offerte_verzonden_op = new Date().toISOString();
    }
    if (status === 'afgehandeld') {
      updateData.afgehandeld_op = new Date().toISOString();
    }

    const { error } = await supabase
      .from(table)
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Update error:', error);
      toast.error("Fout bij het bijwerken van status: " + error.message);
      return;
    }

    toast.success("Status succesvol bijgewerkt");
    loadData(); // Herlaad data
  };

  const updateItemDetails = async () => {
    if (!selectedItem) return;
    
    const isCalculator = 'emailadres' in selectedItem;
    const table = isCalculator ? 'dakkapel_calculator_aanvragen' : 'dakkapel_configuraties';
    
    const updateData: any = {};
    
    if (notes.trim()) {
      updateData.notities = notes;
    }
    
    if (price.trim()) {
      const priceValue = parseFloat(price.replace(',', '.'));
      if (!isNaN(priceValue)) {
        updateData.totaal_prijs = priceValue;
      }
    }
    
    if (Object.keys(updateData).length === 0) {
      setIsDetailOpen(false);
      return;
    }
    
    const { error } = await supabase
      .from(table)
      .update(updateData)
      .eq('id', selectedItem.id);
    
    if (error) {
      console.error('Update error:', error);
      toast.error("Fout bij het bijwerken van gegevens: " + error.message);
      return;
    }
    
    toast.success("Gegevens succesvol bijgewerkt");
    loadData();
    setIsDetailOpen(false);
  };

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setNotes(item.notities || '');
    setPrice(item.totaal_prijs ? item.totaal_prijs.toString() : '');
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'nieuw':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Nieuw</Badge>;
      case 'in_behandeling':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />In behandeling</Badge>;
      case 'offerte_verzonden':
        return <Badge variant="default"><Mail className="w-3 h-3 mr-1" />Offerte verzonden</Badge>;
      case 'afgehandeld':
        return <Badge variant="outline"><CheckCircle className="w-3 h-3 mr-1" />Afgehandeld</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderDetailContent = () => {
    if (!selectedItem) return null;
    
    const isCalculator = 'emailadres' in selectedItem;
    const contactInfo = isCalculator ? (
      <div>
        <p><strong>Naam:</strong> {selectedItem.voornaam} {selectedItem.achternaam}</p>
        <p><strong>Email:</strong> {selectedItem.emailadres}</p>
        <p><strong>Telefoon:</strong> {selectedItem.telefoon}</p>
        <p><strong>Adres:</strong> {selectedItem.straatnaam} {selectedItem.huisnummer}, {selectedItem.postcode} {selectedItem.plaats}</p>
      </div>
    ) : (
      <div>
        <p><strong>Naam:</strong> {selectedItem.naam}</p>
        <p><strong>Email:</strong> {selectedItem.email}</p>
        <p><strong>Telefoon:</strong> {selectedItem.telefoon}</p>
        <p><strong>Adres:</strong> {selectedItem.adres}, {selectedItem.postcode} {selectedItem.plaats}</p>
      </div>
    );
    
    const productInfo = isCalculator ? (
      <div>
        <p><strong>Type:</strong> {selectedItem.type}</p>
        <p><strong>Afmetingen:</strong> {selectedItem.breedte}cm x {selectedItem.hoogte}cm</p>
        <p><strong>Materiaal:</strong> {selectedItem.materiaal}</p>
        <p><strong>Dakhelling:</strong> {selectedItem.dakhelling}° ({selectedItem.dakhellingtype})</p>
        <p><strong>Aantal ramen:</strong> {selectedItem.aantalramen}</p>
        <p><strong>Kozijnhoogte:</strong> {selectedItem.kozijnhoogte}</p>
        <p><strong>Kleuren:</strong> Kozijnen: {selectedItem.kleurkozijnen}, Zijkanten: {selectedItem.kleurzijkanten}, Draaikiepramen: {selectedItem.kleurdraaikiepramen}</p>
        <p><strong>RC-waarde:</strong> {selectedItem.rcwaarde}</p>
        <p><strong>Woningzijde:</strong> {selectedItem.woningzijde}</p>
      </div>
    ) : (
      <div>
        <p><strong>Model:</strong> {selectedItem.model}</p>
        <p><strong>Breedte:</strong> {selectedItem.breedte}cm</p>
        <p><strong>Materiaal:</strong> {selectedItem.materiaal}</p>
        <p><strong>Dakhelling:</strong> {selectedItem.dakhelling ? `${selectedItem.dakhelling}° (${selectedItem.dakhelling_type})` : 'Niet opgegeven'}</p>
        <p><strong>Kleuren:</strong> Kozijn: {selectedItem.kleur_kozijn}, Zijkanten: {selectedItem.kleur_zijkanten}, Draaikiepramen: {selectedItem.kleur_draaikiepramen}</p>
        <p><strong>Opties:</strong></p>
        <ul>
          <li>Ventilatierooster: {selectedItem.ventilationgrids ? 'Ja' : 'Nee'}</li>
          <li>Zonwering: {selectedItem.sunshade ? 'Ja' : 'Nee'}</li>
          <li>Insectenhorren: {selectedItem.insectscreens ? 'Ja' : 'Nee'}</li>
          <li>Airconditioning: {selectedItem.airconditioning ? 'Ja' : 'Nee'}</li>
        </ul>
      </div>
    );
    
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Contactgegevens</CardTitle>
            </CardHeader>
            <CardContent>
              {contactInfo}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              {productInfo}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Bericht/Opmerkingen</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{isCalculator ? selectedItem.bericht : selectedItem.opmerkingen || 'Geen opmerkingen'}</p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Notities voor intern gebruik</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen text-black"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Interne notities..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Prijs (€)</label>
            <Input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0,00"
              className="mb-4"
            />
            
            <div className="flex justify-between">
              <div>
                <p className="text-sm"><strong>Status:</strong> {selectedItem.status}</p>
                {selectedItem.offerte_verzonden_op && (
                  <p className="text-sm"><strong>Offerte verzonden:</strong> {format(new Date(selectedItem.offerte_verzonden_op), 'dd MMM yyyy')}</p>
                )}
                {selectedItem.afgehandeld_op && (
                  <p className="text-sm"><strong>Afgehandeld op:</strong> {format(new Date(selectedItem.afgehandeld_op), 'dd MMM yyyy')}</p>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  title="In behandeling"
                  onClick={() => {
                    const table = isCalculator ? 'dakkapel_calculator_aanvragen' : 'dakkapel_configuraties';
                    updateStatus(table, selectedItem.id, 'in_behandeling');
                    setIsDetailOpen(false);
                  }}
                >
                  <Clock className="h-4 w-4 mr-1" /> In behandeling
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  title="Offerte verzonden"
                  onClick={() => {
                    const table = isCalculator ? 'dakkapel_calculator_aanvragen' : 'dakkapel_configuraties';
                    updateStatus(table, selectedItem.id, 'offerte_verzonden');
                    setIsDetailOpen(false);
                  }}
                >
                  <Mail className="h-4 w-4 mr-1" /> Offerte verzonden
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  title="Afgehandeld"
                  onClick={() => {
                    const table = isCalculator ? 'dakkapel_calculator_aanvragen' : 'dakkapel_configuraties';
                    updateStatus(table, selectedItem.id, 'afgehandeld');
                    setIsDetailOpen(false);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" /> Afgehandeld
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const sendQuoteEmail = async (item: any, isCalculator: boolean, customMessage?: string) => {
    const itemId = item.id;
    setSendingQuote(itemId);
    
    try {
      console.log('Sending quote email for:', itemId);
      
      const { data, error } = await supabase.functions.invoke('send-quote', {
        body: {
          requestId: itemId,
          type: isCalculator ? 'calculator' : 'configurator',
          customMessage: customMessage
        }
      });

      if (error) {
        console.error('Error sending quote:', error);
        throw error;
      }

      console.log('Quote sent successfully:', data);
      toast.success("Offerte succesvol verzonden naar de klant!");
      loadData(); // Reload data to update status
    } catch (error: any) {
      console.error('Error sending quote:', error);
      toast.error("Fout bij het verzenden van offerte: " + (error.message || 'Onbekende fout'));
    } finally {
      setSendingQuote(null);
      setIsQuoteDialogOpen(false);
      setQuoteMessage('');
      setSelectedQuoteItem(null);
    }
  };

  const openQuoteDialog = (item: any, isCalculator: boolean) => {
    setSelectedQuoteItem({ ...item, isCalculator });
    setQuoteMessage('');
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
        <Button onClick={loadData} variant="outline" className="flex items-center gap-2">
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
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Datum</TableHead>
                            <TableHead>Naam</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telefoon</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Prijs</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Acties</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {calculatorAanvragen.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-4">
                                Geen calculator aanvragen gevonden
                              </TableCell>
                            </TableRow>
                          ) : (
                            calculatorAanvragen.map((aanvraag) => (
                              <TableRow key={aanvraag.id}>
                                <TableCell>
                                  {format(new Date(aanvraag.created_at), 'dd MMM yyyy HH:mm', { locale: nl })}
                                </TableCell>
                                <TableCell>
                                  {aanvraag.voornaam} {aanvraag.achternaam}
                                </TableCell>
                                <TableCell>{aanvraag.emailadres}</TableCell>
                                <TableCell>{aanvraag.telefoon}</TableCell>
                                <TableCell>{aanvraag.type}</TableCell>
                                <TableCell>
                                  {aanvraag.totaal_prijs ? `€${aanvraag.totaal_prijs}` : '-'}
                                </TableCell>
                                <TableCell>{getStatusBadge(aanvraag.status)}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => openDetails(aanvraag)}
                                      title="Details bekijken"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'in_behandeling')}
                                      title="In behandeling"
                                    >
                                      <Clock className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="bg-blue-50 hover:bg-blue-100"
                                      onClick={() => openQuoteDialog(aanvraag, true)}
                                      title="Offerte verzenden"
                                      disabled={sendingQuote === aanvraag.id}
                                    >
                                      {sendingQuote === aanvraag.id ? (
                                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Mail className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'afgehandeld')}
                                      title="Afgehandeld"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Configurator Aanvragen ({configuraties.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Datum</TableHead>
                            <TableHead>Naam</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telefoon</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>Prijs</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Acties</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {configuraties.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-4">
                                Geen configurator aanvragen gevonden
                              </TableCell>
                            </TableRow>
                          ) : (
                            configuraties.map((config) => (
                              <TableRow key={config.id}>
                                <TableCell>
                                  {format(new Date(config.created_at), 'dd MMM yyyy HH:mm', { locale: nl })}
                                </TableCell>
                                <TableCell>{config.naam}</TableCell>
                                <TableCell>{config.email}</TableCell>
                                <TableCell>{config.telefoon}</TableCell>
                                <TableCell>{config.model}</TableCell>
                                <TableCell>
                                  {config.totaal_prijs ? `€${config.totaal_prijs}` : '-'}
                                </TableCell>
                                <TableCell>{getStatusBadge(config.status)}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => openDetails(config)}
                                      title="Details bekijken"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateStatus('dakkapel_configuraties', config.id, 'in_behandeling')}
                                      title="In behandeling"
                                    >
                                      <Clock className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="bg-blue-50 hover:bg-blue-100"
                                      onClick={() => openQuoteDialog(config, false)}
                                      title="Offerte verzenden"
                                      disabled={sendingQuote === config.id}
                                    >
                                      {sendingQuote === config.id ? (
                                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Mail className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateStatus('dakkapel_configuraties', config.id, 'afgehandeld')}
                                      title="Afgehandeld"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
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
      
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aanvraag Details</DialogTitle>
            <DialogDescription>
              Bekijk en bewerk de details van deze aanvraag
            </DialogDescription>
          </DialogHeader>
          
          {renderDetailContent()}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Annuleren</Button>
            <Button onClick={updateItemDetails}>Opslaan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Quote Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Offerte Verzenden</DialogTitle>
            <DialogDescription>
              Verstuur een automatische offerte naar {selectedQuoteItem ? (
                selectedQuoteItem.isCalculator ? 
                `${selectedQuoteItem.voornaam} ${selectedQuoteItem.achternaam}` : 
                selectedQuoteItem.naam
              ) : ''}
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuoteItem && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Klantgegevens:</h4>
                <p><strong>Naam:</strong> {selectedQuoteItem.isCalculator ? 
                  `${selectedQuoteItem.voornaam} ${selectedQuoteItem.achternaam}` : 
                  selectedQuoteItem.naam}</p>
                <p><strong>Email:</strong> {selectedQuoteItem.isCalculator ? 
                  selectedQuoteItem.emailadres : 
                  selectedQuoteItem.email}</p>
                <p><strong>Prijs:</strong> {selectedQuoteItem.totaal_prijs ? 
                  `€${selectedQuoteItem.totaal_prijs}` : 
                  'Nog niet ingesteld'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Persoonlijk bericht (optioneel)
                </label>
                <Textarea
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  placeholder="Voeg een persoonlijk bericht toe aan de offerte..."
                  rows={4}
                  className="w-full"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuoteDialogOpen(false)}>
              Annuleren
            </Button>
            <Button 
              onClick={() => selectedQuoteItem && sendQuoteEmail(selectedQuoteItem, selectedQuoteItem.isCalculator, quoteMessage)}
              disabled={!selectedQuoteItem || sendingQuote === selectedQuoteItem?.id}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {sendingQuote === selectedQuoteItem?.id ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Verzenden...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Offerte Verzenden
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboardPage;
