
import React from 'react';
import { Helmet } from 'react-helmet';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2, 
  Users, 
  Award, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Handshake,
  ArrowRight,
  Euro,
  Target,
  Zap
} from 'lucide-react';

const BedrijvenPage = () => {
  const benefits = [
    {
      icon: <Euro className="h-12 w-12 text-brand-lightGreen" />,
      title: "Meer omzet",
      description: "Vergroot je klantenkring en genereer meer opdrachten door onderdeel te worden van ons netwerk."
    },
    {
      icon: <Target className="h-12 w-12 text-brand-lightGreen" />,
      title: "Kwaliteitsklanten",
      description: "Krijg toegang tot klanten die op zoek zijn naar professionele, betrouwbare aannemers."
    },
    {
      icon: <Zap className="h-12 w-12 text-brand-lightGreen" />,
      title: "Snelle matching",
      description: "Ons platform zorgt voor efficiënte koppeling tussen jouw diensten en klantenvragen."
    }
  ];

  const features = [
    "Gratis aanmelding en profiel",
    "Direct contact met klanten",
    "Geen verborgen kosten",
    "Flexibele samenwerking",
    "Marketing ondersteuning",
    "24/7 platform beschikbaarheid"
  ];

  return (
    <>
      <Helmet>
        <title>Word Partner - Refurbish Totaal Nederland</title>
        <meta name="description" content="Sluit je aan bij ons netwerk van professionele aannemers en bouw samen aan de toekomst. Groei je bedrijf met Refurbish Totaal Nederland." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Header Section - like HomeDeal */}
        <section className="bg-white py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-brand-darkGreen" />
                <span className="text-xl font-bold text-brand-darkGreen">Refurbish Partners</span>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                <span>085 401 3642</span>
                <span>info@refurbishtotaalnederland.nl</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section - HomeDeal style */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Groei je
                    <span className="text-brand-lightGreen"> bouwbedrijf</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Sluit je aan bij Nederland's grootste netwerk van professionele aannemers. 
                    Krijg direct toegang tot nieuwe klanten en projecten.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white text-lg px-8 py-4 rounded-lg"
                  >
                    Gratis aanmelden
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-brand-lightGreen text-brand-darkGreen hover:bg-brand-lightGreen hover:text-white text-lg px-8 py-4 rounded-lg"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    085 401 3642
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center space-x-8 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-darkGreen">500+</div>
                    <div className="text-sm text-gray-600">Actieve partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-darkGreen">1000+</div>
                    <div className="text-sm text-gray-600">Projecten per maand</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-darkGreen">15+</div>
                    <div className="text-sm text-gray-600">Jaar ervaring</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <OptimizedImage
                    src="/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png"
                    alt="Professionele aannemer"
                    className="rounded-xl w-full h-auto"
                  />
                  <div className="absolute -top-4 -right-4 bg-brand-lightGreen text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ✓ Kwaliteit gegarandeerd
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - HomeDeal cards style */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Waarom kiezen meer dan 500 bedrijven voor ons?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ontdek hoe ons platform jouw bedrijf kan laten groeien
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      {benefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid - HomeDeal style */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Alles wat je nodig hebt om te groeien
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <OptimizedImage
                  src="/lovable-uploads/976a3243-6071-40c3-bf04-e4c43cf72f67.png"
                  alt="Platform features"
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - HomeDeal numbered steps */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Zo eenvoudig word je partner
              </h2>
              <p className="text-xl text-gray-600">
                In drie simpele stappen ben je onderdeel van ons netwerk
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center relative">
                <div className="bg-brand-lightGreen text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Meld je aan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vul het aanmeldformulier in met je bedrijfsgegevens en specialisaties. Volledig gratis en zonder verplichtingen.
                </p>
                {/* Connection line */}
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
              </div>
              
              <div className="text-center relative">
                <div className="bg-brand-lightGreen text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Verificatie</h3>
                <p className="text-gray-600 leading-relaxed">
                  We controleren je kwalificaties en voeren een korte screening uit om kwaliteit te waarborgen.
                </p>
                {/* Connection line */}
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-lightGreen text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Start met verdienen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Zodra je goedgekeurd bent, ontvang je direct toegang tot nieuwe klanten en projecten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - HomeDeal style with form preview */}
        <section className="py-20 bg-gradient-to-r from-brand-darkGreen to-brand-lightGreen">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-6">
                  Klaar om je bedrijf te laten groeien?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Sluit je vandaag nog aan bij meer dan 500 professionele partners en begin direct met het uitbreiden van je klantenkring.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span>100% gratis aanmelden</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span>Direct toegang tot klanten</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <span>Geen maandelijkse kosten</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="bg-white text-brand-darkGreen hover:bg-gray-100 text-lg px-8 py-4 rounded-lg"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Nu aanmelden
                </Button>
              </div>

              {/* Mock form card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Start je aanmelding</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrijfsnaam</label>
                    <div className="h-12 bg-gray-100 rounded-lg"></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mailadres</label>
                    <div className="h-12 bg-gray-100 rounded-lg"></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialisatie</label>
                    <div className="h-12 bg-gray-100 rounded-lg"></div>
                  </div>
                  <Button className="w-full bg-brand-lightGreen hover:bg-brand-darkGreen text-white py-3 rounded-lg">
                    Aanmelden
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Contact - Simple like HomeDeal */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Phone className="h-8 w-8 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Bel ons</h3>
                <p className="text-gray-300">085 401 3642</p>
                <p className="text-gray-400 text-sm">Ma-Vr: 08:00 - 17:00</p>
              </div>
              <div>
                <Mail className="h-8 w-8 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">E-mail</h3>
                <p className="text-gray-300">info@refurbishtotaalnederland.nl</p>
                <p className="text-gray-400 text-sm">Reactie binnen 24 uur</p>
              </div>
              <div>
                <MapPin className="h-8 w-8 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Locatie</h3>
                <p className="text-gray-300">Heel Nederland</p>
                <p className="text-gray-400 text-sm">Van Groningen tot Maastricht</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BedrijvenPage;
