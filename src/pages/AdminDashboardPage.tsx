
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Eye, Edit, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

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

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("U moet ingelogd zijn om toegang te krijgen tot het admin dashboard");
      return;
    }

    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !adminUser) {
      toast.error("U heeft geen toegang tot het admin dashboard");
      return;
    }

    setIsAdmin(true);
    loadData();
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

  const updateStatus = async (table: string, id: string, status: string) => {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Dakkapel Aanvragen</h1>
        
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList>
            <TabsTrigger value="calculator">Calculator Aanvragen ({calculatorAanvragen.length})</TabsTrigger>
            <TabsTrigger value="configurator">Configurator Aanvragen ({configuraties.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4">
            <div className="grid gap-4">
              {calculatorAanvragen.map((aanvraag) => (
                <Card key={aanvraag.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {aanvraag.voornaam} {aanvraag.achternaam}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {format(new Date(aanvraag.created_at), 'dd MMMM yyyy HH:mm', { locale: nl })}
                        </p>
                      </div>
                      {getStatusBadge(aanvraag.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Contact</h4>
                        <p className="text-sm">{aanvraag.emailadres}</p>
                        <p className="text-sm">{aanvraag.telefoon}</p>
                        <p className="text-sm">{aanvraag.straatnaam} {aanvraag.huisnummer}</p>
                        <p className="text-sm">{aanvraag.postcode} {aanvraag.plaats}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Configuratie</h4>
                        <p className="text-sm">Type: {aanvraag.type}</p>
                        <p className="text-sm">Afmetingen: {aanvraag.breedte}x{aanvraag.hoogte} cm</p>
                        <p className="text-sm">Materiaal: {aanvraag.materiaal}</p>
                        <p className="text-sm">Aantal ramen: {aanvraag.aantalramen}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Prijs & Status</h4>
                        {aanvraag.totaal_prijs && (
                          <p className="text-lg font-bold text-brand-darkGreen">
                            €{aanvraag.totaal_prijs.toLocaleString('nl-NL')}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'in_behandeling')}
                          >
                            In behandeling
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'offerte_verzonden')}
                          >
                            Offerte verzonden
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus('dakkapel_calculator_aanvragen', aanvraag.id, 'afgehandeld')}
                          >
                            Afgehandeld
                          </Button>
                        </div>
                      </div>
                    </div>
                    {aanvraag.bericht && (
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <h4 className="font-semibold mb-1">Bericht van klant:</h4>
                        <p className="text-sm">{aanvraag.bericht}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="configurator" className="space-y-4">
            <div className="grid gap-4">
              {configuraties.map((config) => (
                <Card key={config.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{config.naam}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {format(new Date(config.created_at), 'dd MMMM yyyy HH:mm', { locale: nl })}
                        </p>
                      </div>
                      {getStatusBadge(config.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Contact</h4>
                        <p className="text-sm">{config.email}</p>
                        <p className="text-sm">{config.telefoon}</p>
                        <p className="text-sm">{config.adres}</p>
                        <p className="text-sm">{config.postcode} {config.plaats}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Configuratie</h4>
                        <p className="text-sm">Model: {config.model}</p>
                        <p className="text-sm">Breedte: {config.breedte} cm</p>
                        <p className="text-sm">Materiaal: {config.materiaal}</p>
                        <p className="text-sm">Kozijn: {config.kleur_kozijn}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Prijs & Status</h4>
                        {config.totaal_prijs && (
                          <p className="text-lg font-bold text-brand-darkGreen">
                            €{config.totaal_prijs.toLocaleString('nl-NL')}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus('dakkapel_configuraties', config.id, 'in_behandeling')}
                          >
                            In behandeling
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus('dakkapel_configuraties', config.id, 'offerte_verzonden')}
                          >
                            Offerte verzonden
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus('dakkapel_configuraties', config.id, 'afgehandeld')}
                          >
                            Afgehandeld
                          </Button>
                        </div>
                      </div>
                    </div>
                    {config.opmerkingen && (
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <h4 className="font-semibold mb-1">Opmerkingen:</h4>
                        <p className="text-sm">{config.opmerkingen}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
