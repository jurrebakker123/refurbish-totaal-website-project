
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Building2, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MapboxMap from '@/components/ui/MapboxMap';

const VakmanWerkgebiedPage = () => {
  const [werkgebieden] = useState([
    {
      id: 1,
      locatie: 'Radius 30km vanuit Enschede, Nederland',
      coordinates: [6.8936, 52.2215] as [number, number],
      radius: 30,
      rubrieken: ['Dakkapel plaatsen', 'Dakkapel plaatsen met nokverhoging']
    }
  ]);

  const [selectedLocation, setSelectedLocation] = useState<{ address: string; coordinates: [number, number] } | null>(null);

  const handleLocationSelect = (location: { address: string; coordinates: [number, number] }) => {
    setSelectedLocation(location);
    console.log('Selected location:', location);
  };

  return (
    <>
      <Helmet>
        <title>Werkgebied - Vakman Dashboard</title>
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
                  <Link to="/vakman-dashboard/bedrijfsprofiel" className="text-gray-600 hover:text-gray-900 pb-4">
                    Bedrijfsprofiel
                  </Link>
                  <Link to="/vakman-dashboard/werkgebied" className="text-brand-lightGreen font-medium border-b-2 border-brand-lightGreen pb-4">
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
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Werkgebied</h1>
                <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                  <Plus className="h-4 w-4 mr-2" />
                  Voeg categorie toe
                </Button>
              </div>

              <p className="text-gray-600">
                Breid je vakgebied uit met nieuwe categorieën. Klik op de kaart om je werkgebied aan te passen.
              </p>

              {/* Map Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Werkgebied op kaart</CardTitle>
                </CardHeader>
                <CardContent>
                  <MapboxMap
                    onLocationSelect={handleLocationSelect}
                    center={werkgebieden[0]?.coordinates || [5.2913, 52.1326]}
                    zoom={9}
                    height="400px"
                    showRadiusControl={true}
                    radius={werkgebieden[0]?.radius || 30}
                    onRadiusChange={(radius) => console.log('Radius changed to:', radius)}
                  />
                  {selectedLocation && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>Nieuwe locatie geselecteerd:</strong> {selectedLocation.address}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Current Regions */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Geselecteerde Regio's</CardTitle>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Wijzig
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {werkgebieden.map((gebied) => (
                      <div key={gebied.id} className="border rounded-lg p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium mb-2">Werkgebied</h3>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <span className="text-sm">{gebied.locatie}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Rubrieken</h3>
                            <div className="flex flex-wrap gap-2">
                              {gebied.rubrieken.map((rubriek, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {rubriek}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Prijzen van offerteaanvragen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Prijzen van offerteaanvragen variëren afhankelijk van het type aanvraag.{' '}
                    <Link to="/prijslijst" className="text-brand-lightGreen hover:underline">
                      Bekijk de volledige prijslijst hier.
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hulp nodig?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Tips & Best Practices</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Klik op de kaart om je werklocatie aan te passen
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Gebruik de straal-schuifregelaar om je werkgebied in te stellen
                      </p>
                      <p className="text-sm text-gray-600">
                        Kies uit verschillende rubrieken per regio
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      Helpdesk →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Of neem contact op</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <p className="font-medium">Misja Engelsman</p>
                  </div>
                  <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                    Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default VakmanWerkgebiedPage;
