
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
import { Eye, Edit, Mail, CheckCircle, Clock, AlertCircle, Download } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import AdminPriceEditor from '@/components/admin/AdminPriceEditor';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    console.log('Starting to load admin dashboard data...');
    
    try {
      // Load configurator data - geen RLS check, gewoon alle data ophalen
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

      // Load calculator data - geen RLS check, gewoon alle data ophalen
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
        <Button onClick={loadData} variant="outline">
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
                                      onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'in_behandeling')}
                                      title="In behandeling"
                                    >
                                      <Clock className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'offerte_verzonden')}
                                      title="Offerte verzonden"
                                    >
                                      <Mail className="h-4 w-4" />
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
                                      onClick={() => updateStatus('dakkapel_configuraties', config.id, 'in_behandeling')}
                                      title="In behandeling"
                                    >
                                      <Clock className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateStatus('dakkapel_configuraties', config.id, 'offerte_verzonden')}
                                      title="Offerte verzonden"
                                    >
                                      <Mail className="h-4 w-4" />
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
    </div>
  );
};

export default AdminDashboardPage;
