
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Plus, Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Klus {
  id: string;
  titel: string;
  beschrijving: string;
  postcode: string;
  plaats: string;
  budget_min?: number;
  budget_max?: number;
  urgentie: string;
  status: string;
  created_at: string;
  category_id: string;
  service_categories?: {
    naam: string;
  };
  klus_reacties?: {
    id: string;
    geschatte_prijs?: number;
    bericht: string;
    status: string;
    profiles?: {
      voornaam: string;
      achternaam: string;
      bedrijfsnaam?: string;
    };
  }[];
}

const KlantDashboardPage = () => {
  const [klussen, setKlussen] = useState<Klus[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/marketplace/login');
      return;
    }
    setUser(session.user);
    fetchKlussen(session.user.id);
  };

  const fetchKlussen = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('klussen')
        .select(`
          *,
          service_categories(naam),
          klus_reacties(
            id,
            geschatte_prijs,
            bericht,
            status,
            profiles(voornaam, achternaam, bedrijfsnaam)
          )
        `)
        .eq('klant_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setKlussen(data || []);
    } catch (error: any) {
      toast.error('Fout bij ophalen klussen: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'open': { variant: 'secondary' as const, label: 'Open', icon: Clock },
      'in_behandeling': { variant: 'default' as const, label: 'In behandeling', icon: AlertCircle },
      'toegewezen': { variant: 'default' as const, label: 'Toegewezen', icon: CheckCircle },
      'afgerond': { variant: 'outline' as const, label: 'Afgerond', icon: CheckCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.open;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getUrgentieBadge = (urgentie: string) => {
    const colors = {
      'spoed': 'bg-red-100 text-red-800',
      'hoog': 'bg-orange-100 text-orange-800',
      'normaal': 'bg-blue-100 text-blue-800',
      'flexibel': 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={colors[urgentie as keyof typeof colors] || colors.normaal}>
        {urgentie}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-lightGreen mx-auto mb-4"></div>
          <p>Gegevens laden...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mijn Klussen - Klant Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/marketplace" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-brand-darkGreen" />
                <span className="text-xl font-bold text-brand-darkGreen">Refurbish Marketplace</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/marketplace/klus-plaasten">
                  <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                    <Plus className="h-4 w-4 mr-2" />
                    Nieuwe Klus
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    await supabase.auth.signOut();
                    navigate('/marketplace');
                  }}
                >
                  Uitloggen
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mijn Klussen</h1>
            <p className="text-gray-600">Beheer je geplaatste klussen en bekijk reacties van vakmannen</p>
          </div>

          {klussen.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mb-6">
                  <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nog geen klussen geplaatst</h3>
                  <p className="text-gray-600 mb-6">Plaats je eerste klus en ontvang offertes van vakmannen</p>
                  <Link to="/marketplace/klus-plaasten">
                    <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                      <Plus className="h-4 w-4 mr-2" />
                      Plaats Je Eerste Klus
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {klussen.map((klus) => (
                <Card key={klus.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{klus.titel}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(klus.status)}
                          {getUrgentieBadge(klus.urgentie)}
                          {klus.service_categories && (
                            <Badge variant="outline">{klus.service_categories.naam}</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {klus.plaats} ({klus.postcode}) • {new Date(klus.created_at).toLocaleDateString('nl-NL')}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{klus.beschrijving}</p>
                    
                    {klus.budget_min && klus.budget_max && (
                      <p className="text-sm text-gray-600 mb-4">
                        Budget: €{klus.budget_min} - €{klus.budget_max}
                      </p>
                    )}

                    {klus.klus_reacties && klus.klus_reacties.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Reacties ({klus.klus_reacties.length})
                        </h4>
                        <div className="space-y-3">
                          {klus.klus_reacties.slice(0, 2).map((reactie) => (
                            <div key={reactie.id} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">
                                  {reactie.profiles?.bedrijfsnaam || 
                                   `${reactie.profiles?.voornaam} ${reactie.profiles?.achternaam}`}
                                </span>
                                {reactie.geschatte_prijs && (
                                  <span className="text-brand-darkGreen font-semibold">
                                    €{reactie.geschatte_prijs}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-700">{reactie.bericht}</p>
                            </div>
                          ))}
                          {klus.klus_reacties.length > 2 && (
                            <p className="text-sm text-gray-500">
                              +{klus.klus_reacties.length - 2} meer reacties
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Bekijk Details
                      </Button>
                      {klus.status === 'open' && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Bewerken
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default KlantDashboardPage;
