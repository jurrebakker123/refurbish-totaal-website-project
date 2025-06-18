
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Briefcase, 
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  Euro
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';

const MarketplacePage = () => {
  return (
    <>
      <Helmet>
        <title>Marketplace - Verbind Klanten met Vakmannen</title>
        <meta name="description" content="Het platform waar klanten hun klussen plaatsen en vakmannen nieuwe opdrachten vinden. Gratis klus plaatsen of registreren als vakman." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-white py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/bedrijven" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-brand-darkGreen" />
                <span className="text-xl font-bold text-brand-darkGreen">Refurbish Totaal Nederland</span>
                <span className="text-sm text-gray-500">Marketplace</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/marketplace/login">
                  <Button variant="outline" size="sm">Inloggen</Button>
                </Link>
                <Link to="/marketplace/vakman-registratie">
                  <Button size="sm" className="bg-brand-lightGreen hover:bg-brand-darkGreen">
                    Word Vakman
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-lightGreen to-brand-darkGreen py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Vind de perfecte vakman voor elke klus
            </h1>
            <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              Plaats je klus gratis en ontvang offertes van gekwalificeerde vakmannen in jouw buurt
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white text-gray-900 p-8">
                <Users className="h-16 w-16 text-brand-lightGreen mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Voor Klanten</h2>
                <p className="text-gray-600 mb-6">
                  Plaats je klus in 3 minuten en ontvang binnen 24 uur offertes van vakmannen
                </p>
                <Link to="/marketplace/klus-plaatsen">
                  <Button size="lg" className="w-full bg-brand-lightGreen hover:bg-brand-darkGreen">
                    Plaats Je Klus Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </Card>
              
              <Card className="bg-white text-gray-900 p-8">
                <Briefcase className="h-16 w-16 text-brand-lightGreen mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Voor Vakmannen</h2>
                <p className="text-gray-600 mb-6">
                  Vind nieuwe klussen in jouw vakgebied en vergroot je klantenkring
                </p>
                <Link to="/marketplace/vakman-registratie">
                  <Button size="lg" className="w-full bg-brand-lightGreen hover:bg-brand-darkGreen">
                    Word Vakman Partner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works for Customers */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Zo werkt het voor klanten
              </h2>
              <p className="text-xl text-gray-600">
                In 3 eenvoudige stappen van klus naar resultaat
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-brand-lightGreen text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Plaats je klus gratis</h3>
                <p className="text-gray-600">
                  Beschrijf je klus, kies de juiste categorie en geef je budget aan. Volledig gratis en zonder verplichtingen.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-lightGreen text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">Vakmensen reageren</h3>
                <p className="text-gray-600">
                  Gekwalificeerde vakmannen in jouw buurt reageren met een offerte en planning voor je klus.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-lightGreen text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Bekijk profielen en kies</h3>
                <p className="text-gray-600">
                  Vergelijk offertes, bekijk reviews en kies de vakman die het beste bij je past.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Populaire vakgebieden
              </h2>
              <p className="text-xl text-gray-600">
                Vind de juiste specialist voor elke klus
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Schilderwerk', jobs: '156 klussen', color: 'bg-blue-100 text-blue-700' },
                { name: 'Loodgieterswerk', jobs: '89 klussen', color: 'bg-green-100 text-green-700' },
                { name: 'Elektricien', jobs: '112 klussen', color: 'bg-yellow-100 text-yellow-700' },
                { name: 'Timmerman', jobs: '203 klussen', color: 'bg-orange-100 text-orange-700' },
                { name: 'Dakdekker', jobs: '67 klussen', color: 'bg-red-100 text-red-700' },
                { name: 'Tuinman', jobs: '134 klussen', color: 'bg-emerald-100 text-emerald-700' },
                { name: 'Tegelleger', jobs: '91 klussen', color: 'bg-purple-100 text-purple-700' },
                { name: 'Isolatie', jobs: '45 klussen', color: 'bg-indigo-100 text-indigo-700' }
              ].map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-4`}>
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.jobs}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Waarom kiezen voor ons platform?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Geverifieerde Vakmannen</h3>
                <p className="text-gray-600">
                  Alle vakmannen zijn gecontroleerd op kwalificaties en verzekeringen
                </p>
              </div>
              
              <div className="text-center">
                <Star className="h-12 w-12 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Beoordelingen & Reviews</h3>
                <p className="text-gray-600">
                  Bekijk eerlijke reviews van eerdere klanten voor een goede keuze
                </p>
              </div>
              
              <div className="text-center">
                <MapPin className="h-12 w-12 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Lokale Vakmannen</h3>
                <p className="text-gray-600">
                  Vind vakmannen in jouw buurt voor snelle service en lage reiskosten
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-lightGreen text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Of je nu een klus hebt of vakman bent, ons platform brengt vraag en aanbod samen
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace/klus-plaatsen">
                <Button size="lg" className="bg-white text-brand-darkGreen hover:bg-gray-100">
                  Plaats Een Klus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/marketplace/vakman-registratie">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-darkGreen">
                  Word Vakman Partner
                  <Briefcase className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MarketplacePage;
