
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Camera, 
  Edit, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Plus,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const VakmanProfielPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    bedrijfsnaam: 'JBEcommerce',
    locatie: 'Enschede',
    telefoon: '06 48200064',
    email: 'info@jbe-commerce.com',
    website: '',
    beschrijving: '',
    vraagAntwoorden: {
      hoeBeginnen: '',
      pluspunten: '',
      advies: ''
    }
  });

  return (
    <>
      <Helmet>
        <title>Bedrijfsprofiel - Vakman Dashboard</title>
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
                  <Link to="/vakman-dashboard" className="text-gray-600 hover:text-gray-900 pb-4">
                    Overzicht
                  </Link>
                  <Link to="/vakman-dashboard/offerteaanvragen" className="text-gray-600 hover:text-gray-900 pb-4">
                    Offerteaanvragen
                  </Link>
                  <Link to="/vakman-dashboard/bedrijfsprofiel" className="text-brand-lightGreen font-medium border-b-2 border-brand-lightGreen pb-4">
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
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Profile Header */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    {/* Logo/Avatar Section */}
                    <div className="relative">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Building2 className="h-12 w-12 text-gray-400" />
                      </div>
                      <Button 
                        size="sm" 
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-600 hover:bg-gray-700"
                      >
                        <Camera className="h-4 w-4 mr-1" />
                        Logo vervangen
                      </Button>
                    </div>

                    {/* Company Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-2xl font-bold">{profileData.bedrijfsnaam}</h1>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{profileData.locatie}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Star className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">-/10</span>
                        <span className="text-sm text-gray-500">Geen reviews</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Dit bedrijf heeft zich recent bij Refurbish Totaal Nederland aangesloten
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="text-right">
                      <h3 className="font-semibold mb-3">Contactgegevens</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{profileData.telefoon}</span>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{profileData.email}</span>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        className="mt-4 bg-brand-lightGreen hover:bg-brand-darkGreen"
                        variant="outline"
                      >
                        Bedrijfsprofiel delen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Tabs */}
              <div className="border-b">
                <nav className="flex space-x-8">
                  <button className="border-b-2 border-brand-lightGreen text-brand-lightGreen pb-2">Over Ons</button>
                  <button className="text-gray-500 hover:text-gray-700 pb-2">Projectfoto's</button>
                  <button className="text-gray-500 hover:text-gray-700 pb-2">Reviews</button>
                  <button className="text-gray-500 hover:text-gray-700 pb-2">Vraag & Antwoord</button>
                </nav>
              </div>

              {/* Company Description */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Bedrijfsomschrijving</CardTitle>
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {profileData.beschrijving ? (
                    <p>{profileData.beschrijving}</p>
                  ) : (
                    <p className="text-gray-500 italic">Er is nog geen informatie ingevuld.</p>
                  )}
                </CardContent>
              </Card>

              {/* Project Photos */}
              <Card>
                <CardHeader>
                  <CardTitle>Projectfoto's</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Foto toevoegen</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Voeg foto's toe van je voltooide projecten om klanten te overtuigen
                    </p>
                    <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload foto's
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Reviews</span>
                    <Badge variant="outline">-/10</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-2">Geen reviews</p>
                    <p className="text-sm text-gray-500 mb-4">Project afgerond?</p>
                    <p className="text-sm text-gray-600 mb-6">
                      Er zijn nog geen reviews over dit bedrijf.
                    </p>
                    
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-2">Vraag reviews aan</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Om je bedrijfsprofiel sterker te maken kan je reviews opvragen van afgeronde projecten 
                        buiten Refurbish. De eerste drie reviews zullen we op je profiel weergeven. 
                        Voordat we de reviews laten zien zullen we deze verifiëren.
                      </p>
                      <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                        Reviews aanvragen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Q&A Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Vraag & Antwoord</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Hoe ben je begonnen met het bedrijf?</h4>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-500 italic">Er is nog geen antwoord ingevuld.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Wat zijn de pluspunten van je bedrijf?</h4>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-500 italic">Er is nog geen antwoord ingevuld.</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Wat is je beste advies voor klanten?</h4>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-500 italic">Er is nog geen antwoord ingevuld.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Business Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Bedrijfslocatie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Kaart wordt hier getoond</p>
                    <p className="text-sm text-gray-500">{profileData.locatie}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Refurbish Top Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-700 mb-4">
                    Leer meer over onze beloning voor de best beoordeelde vakspecialisten.
                  </p>
                  <Button size="sm" className="bg-brand-lightGreen hover:bg-brand-darkGreen mb-4">
                    Controleer je voortgang
                  </Button>
                  
                  <div className="p-3 bg-green-100 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Maak het bedrijfsprofiel compleet</h4>
                    <div className="space-y-2 text-sm text-green-700">
                      <div className="flex items-center space-x-2">
                        <Edit className="h-4 w-4" />
                        <span>Klik op het potlood om de bedrijfsinformatie toe te voegen</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4" />
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

export default VakmanProfielPage;
