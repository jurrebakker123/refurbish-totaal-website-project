
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  User, 
  MapPin, 
  Settings,
  HelpCircle,
  Bell,
  Star,
  Briefcase,
  Clock,
  Euro,
  Plus,
  Edit,
  Mail,
  Phone,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const VakmanDashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/marketplace/login');
        return;
      }

      setUser(session.user);
      
      // Get profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/marketplace');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-lightGreen mx-auto mb-4"></div>
          <p>Dashboard laden...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Vakman Dashboard - Refurbish Totaal Nederland</title>
        <meta name="description" content="Beheer je vakman account en ontvang nieuwe klussen" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link to="/marketplace" className="flex items-center space-x-2">
                  <Building2 className="h-8 w-8 text-brand-darkGreen" />
                  <span className="text-xl font-bold text-brand-darkGreen">Refurbish</span>
                </Link>
                <nav className="hidden md:flex space-x-6">
                  <Link to="/vakman-dashboard" className="text-brand-lightGreen font-medium border-b-2 border-brand-lightGreen pb-4">
                    Overzicht
                  </Link>
                  <Link to="/vakman-dashboard/offerteaanvragen" className="text-gray-600 hover:text-gray-900 pb-4">
                    Offerteaanvragen
                  </Link>
                  <Link to="/vakman-dashboard/bedrijfsprofiel" className="text-gray-600 hover:text-gray-900 pb-4">
                    Bedrijfsprofiel
                  </Link>
                  <Link to="/vakman-dashboard/werkgebied" className="text-gray-600 hover:text-gray-900 pb-4">
                    Werkgebied
                  </Link>
                  <Link to="/vakman-dashboard/nieuw" className="text-gray-600 hover:text-gray-900 pb-4">
                    Nieuw
                  </Link>
                  <Link to="/vakman-dashboard/helpdesk" className="text-gray-600 hover:text-gray-900 pb-4">
                    Helpdesk
                  </Link>
                </nav>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>
                      {profile?.voornaam?.charAt(0)}{profile?.achternaam?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" onClick={handleLogout} size="sm">
                    Account ▼
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Verification Notice */}
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-2">Je bent nog niet geverifieerd</h3>
                  <p className="text-blue-700 text-sm mb-4">
                    Voltooi de verificatie om interessante offerteaanvragen direct te kunnen ontgrendelen. 
                    Totdat de verificatie afgerond is kun je de offerteaanvragen alleen bekijken. 
                    Het verificatieproces is snel, eenvoudig en zorgt voor een veiligere ervaring voor iedereen.
                  </p>
                  <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white">
                    Voltooi verificatie
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Recent Offers */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>5 mest recente offerteaanvragen</CardTitle>
                  <Button variant="outline" size="sm">
                    Alle bekijken
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Dakkapel plaatsen in Almelo', client: 'B. Poutros', time: '15:24', urgent: true },
                      { title: 'Dakkapel plaatsen in Hengelo', client: 'N. Buyuktipi', time: '08:41', urgent: false },
                      { title: 'Dakkapel plaatsen in Almelo', client: 'L. Braghuis', time: '11 jun', urgent: false },
                      { title: 'Dakkapel plaatsen met nokverhoging in Rijssen', client: 'M. Laet', time: '10 jun', urgent: false }
                    ].map((offer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium">{offer.title}</h4>
                            <p className="text-sm text-gray-600">{offer.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {offer.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500">{offer.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Deze week</p>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-gray-600">Nieuwe aanvragen</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-brand-lightGreen" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Totaal</p>
                        <p className="text-2xl font-bold">€2.450</p>
                        <p className="text-sm text-gray-600">Potentiële waarde</p>
                      </div>
                      <Euro className="h-8 w-8 text-brand-lightGreen" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Reactietijd</p>
                        <p className="text-2xl font-bold">2.5u</p>
                        <p className="text-sm text-gray-600">Gemiddeld</p>
                      </div>
                      <Clock className="h-8 w-8 text-brand-lightGreen" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{profile?.voornaam} {profile?.achternaam}</p>
                      <p className="text-sm text-gray-600">{profile?.bedrijfsnaam}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Account status</span>
                      <Badge variant="outline" className="text-blue-600">
                        🔒 Verificatie vereist
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Werkgebied</span>
                    </div>
                    <p className="text-sm">{profile?.plaats || 'Niet ingesteld'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Help Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hulp nodig?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full mb-4">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Helpdesk
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Of neem contact op</p>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-sm font-medium">Misja Engelsman</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800">Refurbish Top Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-700 mb-4">
                    Leer meer over onze beloning voor de best beoordeelde vakspecialisten.
                  </p>
                  <Button size="sm" className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                    Controleer je voortgang
                  </Button>
                  
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Maak het bedrijfsprofiel compleet</h4>
                    <div className="space-y-2 text-sm text-green-700">
                      <div className="flex items-center space-x-2">
                        <Edit className="h-4 w-4" />
                        <span>Klik op het potlood om de bedrijfsinformatie toe te voegen</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Deel je profiel met klanten die interesse hebben in je bedrijf</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4" />
                        <span>Wow! Een sterk bedrijfsprofiel zorgt ervoor dat klanten tot 3 keer sneller akkoord gaan met de offerte</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default VakmanDashboardPage;
