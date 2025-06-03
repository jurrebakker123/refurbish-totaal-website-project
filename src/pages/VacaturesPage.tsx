import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Euro, Users, Wrench, HardHat, Zap } from 'lucide-react';
import ReusableForm from '@/components/common/ReusableForm';
const VacaturesPage = () => {
  const vacancies = [{
    id: 1,
    title: "Ervaren Isolatiemonteur",
    location: "Regio Utrecht/Gelderland",
    type: "Fulltime",
    salary: "€2.800 - €3.500",
    icon: <HardHat className="h-6 w-6 text-brand-green" />,
    description: "Wij zoeken een ervaren isolatiemonteur voor het aanbrengen van verschillende isolatiematerialen in woningen en bedrijfspanden.",
    requirements: ["Minimaal 3 jaar ervaring met isolatiewerkzaamheden", "Rijbewijs B en eigen vervoer", "Kennis van verschillende isolatiematerialen", "VCA certificaat of bereid dit te behalen", "Teamspeler met oog voor detail"],
    offer: ["Salaris tussen €2.800 - €3.500 bruto per maand", "Reiskostenvergoeding", "Pensioenregeling", "Doorgroeimogelijkheden", "Werkkleding en gereedschap van de zaak"]
  }, {
    id: 2,
    title: "Kozijntechnicus / Monteur",
    location: "Regio Amsterdam/Noord-Holland",
    type: "Fulltime",
    salary: "€3.000 - €3.800",
    icon: <Wrench className="h-6 w-6 text-brand-green" />,
    description: "Voor ons groeiende team zoeken wij een ervaren kozijntechnicus voor het plaatsen van ramen en deuren bij particulieren en bedrijven.",
    requirements: ["Ervaring met kozijnen en beglazing", "Technisch inzicht en precisie", "Goede communicatieve vaardigheden", "Rijbewijs B verplicht", "Bereid tot het volgen van cursussen"],
    offer: ["Aantrekkelijk salaris €3.000 - €3.800 bruto", "Bedrijfswagen voor privé gebruik", "Opleidingsmogelijkheden", "Goede secundaire arbeidsvoorwaarden", "Stabiele werkgelegenheid"]
  }, {
    id: 3,
    title: "Elektricien / Installatiemonteur",
    location: "Landelijk werkzaam",
    type: "Fulltime",
    salary: "€3.200 - €4.200",
    icon: <Zap className="h-6 w-6 text-brand-green" />,
    description: "Wij zijn op zoek naar een gekwalificeerde elektricien voor installatie- en onderhoudswerkzaamheden in woningen en utiliteitsgebouwen.",
    requirements: ["MBO-4 diploma elektrotechniek", "NEN 3140 certificering", "Minimaal 2 jaar werkervaring", "Zelfstandig kunnen werken", "Klantgericht en representatief"],
    offer: ["Uitstekend salaris €3.200 - €4.200 bruto", "Bedrijfsauto en telefoon", "Pensioenregeling en ziektekostenverzekering", "Flexibele werktijden mogelijk", "Veel variatie in werkzaamheden"]
  }, {
    id: 4,
    title: "Projectleider Renovatie",
    location: "Kantoor Druten + projectlocaties",
    type: "Fulltime",
    salary: "€3.800 - €5.000",
    icon: <Users className="h-6 w-6 text-brand-green" />,
    description: "Voor de coördinatie van onze renovatieprojecten zoeken wij een ervaren projectleider die de leiding neemt over diverse bouwprojecten.",
    requirements: ["HBO/MBO-4 opleiding richting bouwkunde", "Minimaal 5 jaar ervaring in projectleiding", "Kennis van bouwregelgeving en -processen", "Sterke communicatieve vaardigheden", "Rijbewijs B en eigen vervoer"],
    offer: ["Uitdagend salaris €3.800 - €5.000 bruto", "Leaseauto van de zaak", "Laptop en telefoon", "Veel verantwoordelijkheid en vrijheid", "Doorgroeimogelijkheden binnen het bedrijf"]
  }];
  return <>
      <Helmet>
        <title>Vacatures - Refurbish Totaal Nederland</title>
        <meta name="description" content="Bekijk onze actuele vacatures bij Refurbish Totaal Nederland. Wij zoeken ervaren vakmensen voor isolatie, kozijnen, elektra en projectleiding." />
        <meta name="keywords" content="vacatures, baan, werk, isolatiemonteur, kozijntechnicus, elektricien, projectleider, Druten" />
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-green to-brand-darkGreen text-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-950">
                Werk bij Refurbish Totaal Nederland
              </h1>
              <p className="text-xl mb-8 text-lime-700">
                Wij zijn op zoek naar ervaren vakmensen die samen met ons de toekomst van renovatie vormgeven. 
                Sluit je aan bij ons dynamische team!
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Hecht team
                </div>
                <div className="flex items-center">
                  <Euro className="h-5 w-5 mr-2" />
                  Goede arbeidsvoorwaarden
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Regio Nederland
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waarom bij ons werken */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-brand-darkGreen">
              Waarom werken bij Refurbish Totaal Nederland?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Hecht Team</h3>
                <p className="text-gray-600">
                  Werk samen met ervaren professionals in een informele en collegiale sfeer
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Euro className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Uitstekende Voorwaarden</h3>
                <p className="text-gray-600">
                  Competitief salaris, goede secundaire arbeidsvoorwaarden en doorgroeimogelijkheden
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Uitdagende Projecten</h3>
                <p className="text-gray-600">
                  Werk aan diverse en interessante renovatieprojecten door heel Nederland
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vacatures */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 text-brand-darkGreen">
              Actuele Vacatures
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {vacancies.map(vacancy => <Card key={vacancy.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {vacancy.icon}
                        <div>
                          <CardTitle className="text-xl text-brand-darkGreen">
                            {vacancy.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {vacancy.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {vacancy.type}
                      </div>
                      <div className="flex items-center">
                        <Euro className="h-4 w-4 mr-1" />
                        {vacancy.salary}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{vacancy.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-brand-darkGreen mb-2">Wat wij vragen:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {vacancy.requirements.map((req, index) => <li key={index}>{req}</li>)}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-brand-darkGreen mb-2">Wat wij bieden:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {vacancy.offer.map((offer, index) => <li key={index}>{offer}</li>)}
                      </ul>
                    </div>

                    <Button className="w-full bg-brand-green hover:bg-brand-darkGreen" onClick={() => {
                  const element = document.getElementById('sollicitatie-form');
                  element?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>
                      Solliciteer Direct
                    </Button>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Sollicitatie Formulier */}
        <section className="py-16 bg-gray-50" id="sollicitatie-form">
          <div className="container">
            
          </div>
        </section>
      </main>

      <Footer />
    </>;
};
export default VacaturesPage;