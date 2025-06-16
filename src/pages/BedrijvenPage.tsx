
import React from 'react';
import { Helmet } from 'react-helmet';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Handshake
} from 'lucide-react';

const BedrijvenPage = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-brand-lightGreen" />,
      title: "Groei je bedrijf",
      description: "Bereik meer klanten en vergroot je omzet door deel te nemen aan ons netwerk van betrouwbare aannemers."
    },
    {
      icon: <Shield className="h-8 w-8 text-brand-lightGreen" />,
      title: "Kwaliteitsgarantie",
      description: "We selecteren alleen de beste bedrijven die voldoen aan onze hoge kwaliteitseisen en standaarden."
    },
    {
      icon: <Clock className="h-8 w-8 text-brand-lightGreen" />,
      title: "24/7 ondersteuning",
      description: "Onze klanten kunnen altijd bij ons terecht voor vragen en ondersteuning tijdens projecten."
    },
    {
      icon: <Handshake className="h-8 w-8 text-brand-lightGreen" />,
      title: "Betrouwbare samenwerking",
      description: "Langdurige partnerships gebaseerd op vertrouwen, transparantie en wederzijds succes."
    }
  ];

  const stats = [
    { number: "500+", label: "Tevreden klanten" },
    { number: "1000+", label: "Voltooide projecten" },
    { number: "50+", label: "Partner bedrijven" },
    { number: "15+", label: "Jaar ervaring" }
  ];

  const requirements = [
    "KvK registratie en geldig BTW nummer",
    "Minimaal 3 jaar ervaring in de branche",
    "Positieve klantbeoordelingen en referenties",
    "Adequate verzekeringen (WA, CAR, etc.)",
    "Certificeringen relevante beroepsorganisaties",
    "Bereidheid tot transparante communicatie"
  ];

  return (
    <>
      <Helmet>
        <title>Word Partner - Refurbish Totaal Nederland</title>
        <meta name="description" content="Sluit je aan bij ons netwerk van professionele aannemers en bouw samen aan de toekomst. Groei je bedrijf met Refurbish Totaal Nederland." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-darkGreen to-brand-lightGreen text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Word Partner van Refurbish Totaal Nederland
                </h1>
                <p className="text-xl lg:text-2xl opacity-90">
                  Sluit je aan bij ons netwerk van professionele aannemers en bouw samen aan de toekomst van de bouwsector.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-brand-darkGreen hover:bg-gray-100 text-lg px-8 py-4"
                  >
                    <Building2 className="mr-2 h-5 w-5" />
                    Word Partner
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-brand-darkGreen text-lg px-8 py-4"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Bel ons direct
                  </Button>
                </div>
              </div>
              <div className="relative">
                <OptimizedImage
                  src="/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png"
                  alt="Professionele aannemers aan het werk"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-brand-darkGreen mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkGreen mb-4">
                Waarom kiezen voor partnerschap?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ontdek de voordelen van samenwerken met Refurbish Totaal Nederland en 
                hoe we samen kunnen groeien in de bouwsector.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl text-brand-darkGreen">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkGreen mb-6">
                  Vereisten voor partnerschap
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Om de hoogste kwaliteit te waarborgen, hanteren we strenge selectiecriteria 
                  voor onze partners. Voldoe je aan onderstaande vereisten?
                </p>
                <div className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <OptimizedImage
                  src="/lovable-uploads/976a3243-6071-40c3-bf04-e4c43cf72f67.png"
                  alt="Professioneel team bij bouwproject"
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-darkGreen mb-4">
                Hoe werkt het?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                In drie eenvoudige stappen word je onderdeel van ons professionele netwerk.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-lightGreen text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold text-brand-darkGreen mb-4">Aanmelden</h3>
                <p className="text-gray-600">
                  Vul ons partnerformulier in met je bedrijfsgegevens en certificeringen.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-lightGreen text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold text-brand-darkGreen mb-4">Screening</h3>
                <p className="text-gray-600">
                  We controleren je kwalificaties en voeren een grondige screening uit.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-lightGreen text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold text-brand-darkGreen mb-4">Welkom!</h3>
                <p className="text-gray-600">
                  Na goedkeuring word je onderdeel van ons netwerk en kun je direct beginnen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-darkGreen to-brand-lightGreen text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Klaar om partner te worden?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Sluit je vandaag nog aan bij ons netwerk van professionele aannemers 
              en begin met het uitbreiden van je klantenkring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-brand-darkGreen hover:bg-gray-100 text-lg px-8 py-4"
              >
                <Mail className="mr-2 h-5 w-5" />
                Partner worden
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-darkGreen text-lg px-8 py-4"
              >
                <Phone className="mr-2 h-5 w-5" />
                085 401 3642
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Phone className="h-8 w-8 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Telefonisch contact</h3>
                <p className="text-gray-300">085 401 3642</p>
                <p className="text-gray-400 text-sm">Ma-Vr: 08:00 - 17:00</p>
              </div>
              <div>
                <Mail className="h-8 w-8 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">E-mail contact</h3>
                <p className="text-gray-300">info@refurbishtotaalnederland.nl</p>
                <p className="text-gray-400 text-sm">We reageren binnen 24 uur</p>
              </div>
              <div>
                <MapPin className="h-8 w-8 text-brand-lightGreen mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Locaties</h3>
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
