
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Building2, Filter, Search, Calendar, MapPin, Euro, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const VakmanOffertePage = () => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    project: 'all',
    search: ''
  });

  const offerteAanvragen = [
    {
      id: 1,
      title: 'Dakkapel plaatsen in Almelo',
      client: 'B. Poutros',
      location: 'Almelo',
      time: '15:24',
      budget: '€3,500 - €5,000',
      urgent: true,
      description: 'Ik wil graag een dakkapel laten plaatsen aan de voorzijde van mijn huis. Het gaat om een standaard dakkapel van ongeveer 3 meter breed.',
      requirements: ['Dakkapel 3m breed', 'Voorzijde huis', 'Standaard uitvoering']
    },
    {
      id: 2,
      title: 'Dakkapel plaatsen in Hengelo',
      client: 'N. Buyuktipi',
      location: 'Hengelo',
      time: '08:41',
      budget: '€4,000 - €6,500',
      urgent: false,
      description: 'Wij zoeken een vakman voor het plaatsen van een dakkapel met nokverhoging.',
      requirements: ['Nokverhoging', 'Dakkapel 2.5m', 'Achterzijde woning']
    },
    {
      id: 3,
      title: 'Dakkapel plaatsen in Almelo',
      client: 'L. Braghuis',
      location: 'Almelo',
      time: '11 jun',
      budget: '€2,800 - €4,200',
      urgent: false,
      description: 'Dakkapel gewenst voor extra ruimte op zolder.',
      requirements: ['Standaard dakkapel', '2.8m breed', 'Zijkant huis']
    },
    {
      id: 4,
      title: 'Dakkapel plaatsen met nokverhoging in Rijssen',
      client: 'M. Laet',
      location: 'Rijssen',
      time: '10 jun',
      budget: '€5,500 - €7,000',
      urgent: false,
      description: 'Complete dakkapel met nokverhoging voor maximale ruimte.',
      requirements: ['Nokverhoging', 'Dakkapel 3.5m', 'Complexe uitvoering']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Offerteaanvragen - Vakman Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header - Same as dashboard */}
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
                  <Link to="/vakman-dashboard/offerteaanvragen" className="text-brand-lightGreen font-medium border-b-2 border-brand-lightGreen pb-4">
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
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Offerteaanvragen</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Datum vanaf"
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Datum t/m"
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <Select value={filters.project} onValueChange={(value) => setFilters({ ...filters, project: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle projecten</SelectItem>
                          <SelectItem value="dakkapel">Dakkapel</SelectItem>
                          <SelectItem value="schilderwerk">Schilderwerk</SelectItem>
                          <SelectItem value="loodgieter">Loodgieterwerk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Bijv. Peter"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      />
                    </div>
                    <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                      Zoek
                    </Button>
                  </div>

                  {/* Offers List */}
                  <div className="space-y-4">
                    {offerteAanvragen.map((offer) => (
                      <Card key={offer.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-lg">{offer.title}</h3>
                                {offer.urgent && (
                                  <Badge variant="destructive">Urgent</Badge>
                                )}
                              </div>
                              <p className="text-gray-600 mb-2">{offer.client}</p>
                              <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                              
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">{offer.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Euro className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm">{offer.budget}</span>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <h4 className="font-medium text-sm mb-2">Vereisten:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {offer.requirements.map((req, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {req}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
                                <Clock className="h-4 w-4" />
                                <span>{offer.time}</span>
                              </div>
                              <Button className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                                Bekijk details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-8">
                    <Button variant="outline">← Nieuwer</Button>
                    <span className="text-sm text-gray-600">Pagina 1 van 5</span>
                    <Button variant="outline">Ouder →</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Hoe ontvang ik reviews van tevreden klanten?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-green-700">
                    <div className="flex items-start space-x-2">
                      <div className="bg-green-200 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span>Wijzig de status van je project om de voortuitgang te monitoren</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="bg-green-200 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span>Als de status van het project op afgerond staat, vraag dan een review aan</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="bg-green-200 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span>Ingevulde reviews verschijnen op je bedrijfsprofiel</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hulp nodig?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Tips & Best Practices</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Om je kans op het binnenhalen van een opdracht te vergroten, adviseren wij om binnen 8 uur contact op te nemen met je potentiële klant
                      </p>
                      <p className="text-sm text-gray-600">
                        Als je de potentiële klant niet kunt bereiken, stuur dan een e-mail om contact te zoeken
                      </p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Gebruik onze Reclameer-service als er foutieve telefoonnummers zijn ingevuld. Kijk in de{' '}
                        <Link to="/voorwaarden" className="text-brand-lightGreen hover:underline">
                          Algemene Voorwaarden
                        </Link>
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      Helpdesk →
                    </Button>
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

export default VakmanOffertePage;
