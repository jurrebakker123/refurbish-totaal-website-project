
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Search, Filter, MapPin, Euro, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  service_categories?: {
    naam: string;
  };
  klus_reacties?: {
    vakman_id: string;
  }[];
}

const VakmanOfferteaanvragenPage = () => {
  const [klussen, setKlussen] = useState<Klus[]>([]);
  const [filteredKlussen, setFilteredKlussen] = useState<Klus[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrgentie, setSelectedUrgentie] = useState('alle');
  const [selectedBudget, setSelectedBudget] = useState('alle');
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    filterKlussen();
  }, [klussen, searchTerm, selectedUrgentie, selectedBudget]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/marketplace/login');
      return;
    }

    // Check if user is vakman
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', session.user.id)
      .single();

    if (profile?.user_type !== 'vakman') {
      navigate('/marketplace/klant-dashboard');
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
          klus_reacties(vakman_id)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setKlussen(data || []);
    } catch (error: any) {
      toast.error('Fout bij ophalen klussen: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterKlussen = () => {
    let filtered = klussen;

    if (searchTerm) {
      filtered = filtered.filter(klus => 
        klus.titel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        klus.beschrijving.toLowerCase().includes(searchTerm.toLowerCase()) ||
        klus.plaats.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedUrgentie !== 'alle') {
      filtered = filtered.filter(klus => klus.urgentie === selectedUrgentie);
    }

    if (selectedBudget !== 'alle') {
      filtered = filtered.filter(klus => {
        if (!klus.budget_max) return true;
        switch (selectedBudget) {
          case 'laag': return klus.budget_max <= 500;
          case 'middel': return klus.budget_max > 500 && klus.budget_max <= 2000;
          case 'hoog': return klus.budget_max > 2000;
          default: return true;
        }
      });
    }

    setFilteredKlussen(filtered);
  };

  const handleReageren = async (klusId: string) => {
    // Navigate to offerte page with klus ID
    navigate(`/marketplace/vakman-offerte/${klusId}`);
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

  const hasUserReacted = (klus: Klus) => {
    return klus.klus_reacties?.some(reactie => reactie.vakman_id === user?.id) || false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-lightGreen mx-auto mb-4"></div>
          <p>Klussen laden...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Offerteaanvragen - Vakman Dashboard</title>
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
              <nav className="hidden md:flex space-x-6">
                <Link to="/marketplace/vakman-dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link to="/marketplace/vakman-dashboard/offerteaanvragen" className="text-brand-lightGreen font-medium">
                  Offerteaanvragen
                </Link>
                <Link to="/marketplace/vakman-dashboard/bedrijfsprofiel" className="text-gray-600 hover:text-gray-900">
                  Profiel
                </Link>
              </nav>
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
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Offerteaanvragen</h1>
            <p className="text-gray-600">Vind nieuwe klussen en stuur je offertes</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Input
                    placeholder="Zoek op titel, beschrijving of plaats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedUrgentie} onValueChange={setSelectedUrgentie}>
                  <SelectTrigger>
                    <SelectValue placeholder="Urgentie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle urgentie</SelectItem>
                    <SelectItem value="spoed">Spoed</SelectItem>
                    <SelectItem value="hoog">Hoog</SelectItem>
                    <SelectItem value="normaal">Normaal</SelectItem>
                    <SelectItem value="flexibel">Flexibel</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle budgetten</SelectItem>
                    <SelectItem value="laag">Tot €500</SelectItem>
                    <SelectItem value="middel">€500 - €2000</SelectItem>
                    <SelectItem value="hoog">Boven €2000</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center text-sm text-gray-600">
                  <Search className="h-4 w-4 mr-2" />
                  {filteredKlussen.length} klussen gevonden
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Klussen List */}
          {filteredKlussen.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mb-6">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Geen klussen gevonden</h3>
                  <p className="text-gray-600">Probeer je filters aan te passen</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredKlussen.map((klus) => (
                <Card key={klus.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{klus.titel}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          {getUrgentieBadge(klus.urgentie)}
                          {klus.service_categories && (
                            <Badge variant="outline">{klus.service_categories.naam}</Badge>
                          )}
                          {hasUserReacted(klus) && (
                            <Badge className="bg-blue-100 text-blue-800">Gereageerd</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {klus.plaats} ({klus.postcode})
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(klus.created_at).toLocaleDateString('nl-NL')}
                          </div>
                          {klus.budget_min && klus.budget_max && (
                            <div className="flex items-center gap-1">
                              <Euro className="h-4 w-4" />
                              €{klus.budget_min} - €{klus.budget_max}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{klus.beschrijving}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{klus.klus_reacties?.length || 0} reacties</span>
                      </div>
                      
                      <Button 
                        onClick={() => handleReageren(klus.id)}
                        disabled={hasUserReacted(klus)}
                        className={hasUserReacted(klus) ? '' : 'bg-brand-lightGreen hover:bg-brand-darkGreen'}
                      >
                        {hasUserReacted(klus) ? 'Al gereageerd' : 'Reageer met Offerte'}
                      </Button>
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

export default VakmanOfferteaanvragenPage;
