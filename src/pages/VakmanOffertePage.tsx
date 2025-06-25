
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Building2, ArrowLeft, Send, MapPin, Euro, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  klant_id: string;
  service_categories?: {
    naam: string;
  };
}

const VakmanOffertePage = () => {
  const { klusId } = useParams();
  const [klus, setKlus] = useState<Klus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    geschatte_prijs: '',
    geschatte_duur: '',
    beschikbaarheid: '',
    bericht: ''
  });

  useEffect(() => {
    checkUser();
  }, []);

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
    if (klusId) {
      fetchKlus();
    }
  };

  const fetchKlus = async () => {
    try {
      const { data, error } = await supabase
        .from('klussen')
        .select(`
          *,
          service_categories(naam)
        `)
        .eq('id', klusId)
        .single();

      if (error) throw error;
      
      if (data.status !== 'open') {
        toast.error('Deze klus is niet meer beschikbaar voor nieuwe offertes');
        navigate('/marketplace/vakman-dashboard/offerteaanvragen');
        return;
      }

      setKlus(data);
    } catch (error: any) {
      toast.error('Fout bij ophalen klus: ' + error.message);
      navigate('/marketplace/vakman-dashboard/offerteaanvragen');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !klus) return;

    // Validation
    if (!formData.geschatte_prijs || !formData.bericht) {
      toast.error('Vul alle verplichte velden in');
      return;
    }

    setSubmitting(true);

    try {
      // Check if user already reacted
      const { data: existingReaction, error: checkError } = await supabase
        .from('klus_reacties')
        .select('id')
        .eq('klus_id', klus.id)
        .eq('vakman_id', user.id)
        .single();

      if (existingReaction) {
        toast.error('Je hebt al gereageerd op deze klus');
        navigate('/marketplace/vakman-dashboard/offerteaanvragen');
        return;
      }

      // Insert reaction
      const { error } = await supabase
        .from('klus_reacties')
        .insert({
          klus_id: klus.id,
          vakman_id: user.id,
          geschatte_prijs: parseFloat(formData.geschatte_prijs),
          geschatte_duur: formData.geschatte_duur,
          beschikbaarheid: formData.beschikbaarheid,
          bericht: formData.bericht,
          status: 'verzonden'
        });

      if (error) throw error;

      toast.success('Je offerte is succesvol verzonden!');
      navigate('/marketplace/vakman-dashboard/offerteaanvragen');
    } catch (error: any) {
      toast.error('Fout bij verzenden offerte: ' + error.message);
    } finally {
      setSubmitting(false);
    }
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
          <p>Klus laden...</p>
        </div>
      </div>
    );
  }

  if (!klus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Klus niet gevonden</h3>
            <p className="text-gray-600 mb-4">De opgevraagde klus bestaat niet of is niet meer beschikbaar.</p>
            <Link to="/marketplace/vakman-dashboard/offerteaanvragen">
              <Button>Terug naar offerteaanvragen</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Offerte Maken - {klus.titel}</title>
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
              <Link to="/marketplace/vakman-dashboard/offerteaanvragen" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar offerteaanvragen
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Klus Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Klus Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{klus.titel}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        {getUrgentieBadge(klus.urgentie)}
                        {klus.service_categories && (
                          <Badge variant="outline">{klus.service_categories.naam}</Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{klus.plaats} ({klus.postcode})</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Geplaatst op {new Date(klus.created_at).toLocaleDateString('nl-NL')}</span>
                      </div>
                      {klus.budget_min && klus.budget_max && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Euro className="h-4 w-4" />
                          <span>Budget: €{klus.budget_min} - €{klus.budget_max}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Beschrijving</h4>
                      <p className="text-gray-700">{klus.beschrijving}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Offerte Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Maak je offerte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="geschatte_prijs">Geschatte prijs (€) *</Label>
                        <Input
                          id="geschatte_prijs"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.geschatte_prijs}
                          onChange={(e) => setFormData(prev => ({ ...prev, geschatte_prijs: e.target.value }))}
                          placeholder="0.00"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="geschatte_duur">Geschatte duur</Label>
                        <Select 
                          value={formData.geschatte_duur} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, geschatte_duur: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer geschatte duur" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="halve_dag">Halve dag</SelectItem>
                            <SelectItem value="1_dag">1 dag</SelectItem>
                            <SelectItem value="2-3_dagen">2-3 dagen</SelectItem>
                            <SelectItem value="1_week">1 week</SelectItem>
                            <SelectItem value="2_weken">2 weken</SelectItem>
                            <SelectItem value="1_maand">1 maand</SelectItem>
                            <SelectItem value="meer_dan_1_maand">Meer dan 1 maand</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="beschikbaarheid">Beschikbaarheid</Label>
                        <Select 
                          value={formData.beschikbaarheid} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, beschikbaarheid: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Wanneer kun je starten?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="direct">Direct beschikbaar</SelectItem>
                            <SelectItem value="deze_week">Deze week</SelectItem>
                            <SelectItem value="volgende_week">Volgende week</SelectItem>
                            <SelectItem value="binnen_2_weken">Binnen 2 weken</SelectItem>
                            <SelectItem value="binnen_1_maand">Binnen 1 maand</SelectItem>
                            <SelectItem value="na_1_maand">Na 1 maand</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="bericht">Persoonlijk bericht *</Label>
                        <Textarea
                          id="bericht"
                          value={formData.bericht}
                          onChange={(e) => setFormData(prev => ({ ...prev, bericht: e.target.value }))}
                          placeholder="Beschrijf hoe je deze klus gaat aanpakken, je ervaring en waarom de klant jou zou moeten kiezen..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-brand-lightGreen hover:bg-brand-darkGreen"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Offerte verzenden...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Verstuur Offerte
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default VakmanOffertePage;
