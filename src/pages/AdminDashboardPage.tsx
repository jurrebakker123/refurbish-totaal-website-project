import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
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
import DakkapelPricesTable from '@/components/admin/DakkapelPricesTable';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '@/components/admin/AdminHeader';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('aanvragen');
  const navigate = useNavigate();

  // Automatische login functie voor ontwikkeling
  const autoLogin = async () => {
    try {
      // Controleer eerst of er al een sessie is
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Eerst uitloggen om schone staat te garanderen
        await supabase.auth.signOut();
        
        // Auto-login met test account
        const testEmail = 'admin@test.com';
        const testPassword = 'admin123';
        
        // Probeer in te loggen
        const { data, error } = await supabase.auth.signUp({
          email: testEmail,
          password: testPassword,
        });
        
        if (error) {
          // Als registratie niet lukt (bijv. omdat account al bestaat), probeer dan in te loggen
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword,
          });
          
          if (loginError) {
            console.error('Login error:', loginError);
            toast.error('Automatisch inloggen mislukt');
            return false;
          }
          
          // Voeg gebruiker toe aan admin_users als deze nog niet bestaat
          const { data: adminExists } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', loginData.user?.id)
            .single();
            
          if (!adminExists && loginData.user) {
            await supabase
              .from('admin_users')
              .insert({
                id: loginData.user.id,
                created_at: new Date().toISOString()
              });
          }
          
          return loginData.user !== null;
        } else if (data.user) {
          // Voeg nieuwe gebruiker toe aan admin_users
          await supabase
            .from('admin_users')
            .insert({
              id: data.user.id,
              created_at: new Date().toISOString()
            });
            
          toast.success('Test admin account aangemaakt en ingelogd');
          return true;
        }
      } else {
        // Er is al een sessie, controleer of het een admin is
        return true;
      }
    } catch (e) {
      console.error('Auto login error:', e);
      return false;
    }
  };

  useEffect(() => {
    const initAdminCheck = async () => {
      // Probeer auto-login
      const loginSuccess = await autoLogin();
      
      if (loginSuccess) {
        // Na succesvolle login, check admin toegang
        await checkAdminAccess();
      } else {
        // Als auto-login mislukt, redirect naar login pagina
        navigate('/admin-login');
      }
    };
    
    initAdminCheck();
  }, [navigate]);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("U moet ingelogd zijn om toegang te krijgen tot het admin dashboard");
      navigate('/admin-login');
      return;
    }

    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !adminUser) {
      toast.error("U heeft geen toegang tot het admin dashboard");
      navigate('/admin-login');
      return;
    }

    setIsAdmin(true);
    loadData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
    toast.success("U bent uitgelogd");
  };

  const loadData = async () => {
    setLoading(true);
    
    try {
      // Load configurator data
      const { data: configData, error: configError } = await supabase
        .from('dakkapel_configuraties')
        .select('*')
        .order('created_at', { ascending: false });

      if (configError) throw configError;
      setConfiguraties(configData || []);

      // Load calculator data
      const { data: calcData, error: calcError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .select('*')
        .order('created_at', { ascending: false });

      if (calcError) throw calcError;
      setCalculatorAanvragen(calcData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error("Fout bij het laden van gegevens");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (table: 'dakkapel_configuraties' | 'dakkapel_calculator_aanvragen', id: string, status: string) => {
    const { error } = await supabase
      .from(table)
      .update({ 
        status,
        ...(status === 'offerte_verzonden' ? { offerte_verzonden_op: new Date().toISOString() } : {}),
        ...(status === 'afgehandeld' ? { afgehandeld_op: new Date().toISOString() } : {})
      })
      .eq('id', id);

    if (error) {
      toast.error("Fout bij het bijwerken van status");
      return;
    }

    toast.success("Status succesvol bijgewerkt");
    loadData();
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-bold mb-4">Toegang geweigerd</h2>
            <p>U heeft geen toegang tot het admin dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Gegevens laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader onLogout={handleLogout} />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs defaultValue="aanvragen" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="aanvragen">Dakkapel Aanvragen ({calculatorAanvragen.length + configuraties.length})</TabsTrigger>
              <TabsTrigger value="prijzen">Prijsbeheer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="aanvragen" className="space-y-6">
              <h2 className="text-2xl font-bold">Calculator Aanvragen</h2>
              
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
                          <TableHead>Status</TableHead>
                          <TableHead>Acties</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {calculatorAanvragen.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4">
                              Geen calculator aanvragen gevonden
                            </TableCell>
                          </TableRow>
                        ) : (
                          calculatorAanvragen.map((aanvraag) => (
                            <TableRow key={aanvraag.id}>
                              <TableCell>
                                {format(new Date(aanvraag.created_at), 'dd MMM yyyy', { locale: nl })}
                              </TableCell>
                              <TableCell>
                                {aanvraag.voornaam} {aanvraag.achternaam}
                              </TableCell>
                              <TableCell>{aanvraag.emailadres}</TableCell>
                              <TableCell>{aanvraag.telefoon}</TableCell>
                              <TableCell>{aanvraag.type}</TableCell>
                              <TableCell>{getStatusBadge(aanvraag.status)}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'in_behandeling')}
                                  >
                                    <Clock className="h-4 w-4 mr-1" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'offerte_verzonden')}
                                  >
                                    <Mail className="h-4 w-4 mr-1" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'afgehandeld')}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
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
              
              <h2 className="text-2xl font-bold mt-8">Configurator Aanvragen</h2>
              
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
                          <TableHead>Status</TableHead>
                          <TableHead>Acties</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {configuraties.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4">
                              Geen configurator aanvragen gevonden
                            </TableCell>
                          </TableRow>
                        ) : (
                          configuraties.map((config) => (
                            <TableRow key={config.id}>
                              <TableCell>
                                {format(new Date(config.created_at), 'dd MMM yyyy', { locale: nl })}
                              </TableCell>
                              <TableCell>{config.naam}</TableCell>
                              <TableCell>{config.email}</TableCell>
                              <TableCell>{config.telefoon}</TableCell>
                              <TableCell>{config.model}</TableCell>
                              <TableCell>{getStatusBadge(config.status)}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateStatus('dakkapel_configuraties', config.id, 'in_behandeling')}
                                  >
                                    <Clock className="h-4 w-4 mr-1" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateStatus('dakkapel_configuraties', config.id, 'offerte_verzonden')}
                                  >
                                    <Mail className="h-4 w-4 mr-1" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateStatus('dakkapel_configuraties', config.id, 'afgehandeld')}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
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
            </TabsContent>
            
            <TabsContent value="prijzen">
              <DakkapelPricesTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
