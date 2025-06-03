
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Euro, Users, Wrench, HardHat, Zap } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { useVacatures } from '@/hooks/useVacatures';
import SollicitatieForm from '@/components/vacatures/SollicitatieForm';

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    'hard-hat': HardHat,
    'wrench': Wrench,
    'zap': Zap,
    'users': Users,
    'briefcase': Users
  };
  
  const IconComponent = icons[iconName] || Users;
  return <IconComponent className="h-6 w-6 text-brand-green" />;
};

const VacaturesPage = () => {
  const { getTitle, getText, loading: contentLoading } = useContent('vacatures');
  const { vacatures, loading: vacaturesLoading } = useVacatures();

  if (contentLoading || vacaturesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <>
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
                {getTitle('hero_title') || 'Werk bij Refurbish Totaal Nederland'}
              </h1>
              <p className="text-xl mb-8 text-lime-700">
                {getText('hero_subtitle') || 'Wij zijn op zoek naar ervaren vakmensen die samen met ons de toekomst van renovatie vormgeven. Sluit je aan bij ons dynamische team!'}
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
              {getTitle('why_work_title') || 'Waarom werken bij Refurbish Totaal Nederland?'}
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
              {vacatures.map(vacancy => (
                <Card key={vacancy.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getIconComponent(vacancy.icon_name)}
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
                      {vacancy.salary_range && (
                        <div className="flex items-center">
                          <Euro className="h-4 w-4 mr-1" />
                          {vacancy.salary_range}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{vacancy.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-brand-darkGreen mb-2">Wat wij vragen:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {vacancy.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-brand-darkGreen mb-2">Wat wij bieden:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {vacancy.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full bg-brand-green hover:bg-brand-darkGreen" 
                      onClick={() => {
                        const element = document.getElementById('sollicitatie-form');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Solliciteer Direct
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {vacatures.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Momenteel zijn er geen openstaande vacatures.</p>
                <p className="text-gray-500">Stuur gerust een open sollicitatie!</p>
              </div>
            )}
          </div>
        </section>

        {/* Sollicitatie Formulier */}
        <section className="py-16 bg-gray-50" id="sollicitatie-form">
          <div className="container">
            <SollicitatieForm vacatures={vacatures} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default VacaturesPage;
