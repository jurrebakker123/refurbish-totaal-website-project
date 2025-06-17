
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
  Zap,
  Settings,
  FileText,
  Megaphone,
  HeadphonesIcon,
  BarChart3,
  Wrench,
  ChevronDown
} from 'lucide-react';

const BedrijvenPage = () => {
  return (
    <>
      <Helmet>
        <title>Word Partner - Refurbish Totaal Nederland</title>
        <meta name="description" content="Sluit je aan bij ons netwerk van professionele aannemers en bouw samen aan de toekomst. Groei je bedrijf met Refurbish Totaal Nederland." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Simple Header */}
        <section className="bg-white py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-brand-darkGreen" />
                <span className="text-xl font-bold text-brand-darkGreen">Refurbish Totaal Nederland</span>
                <span className="text-sm text-gray-500">Voor bedrijven</span>
              </div>
              <div className="text-sm">
                <Button variant="outline" size="sm">Log in</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section - Exactly like HomeDeal */}
        <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Altijd nieuwe klussen binnen handbereik
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Kom in contact met klanten die op zoek zijn naar vakmensen zoals jij
                </p>
                
                <Button 
                  size="lg" 
                  className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white text-lg px-8 py-4 rounded-lg"
                >
                  Schrijf je gratis in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="relative">
                <div className="relative">
                  {/* Netherlands Map Illustration - Using existing image as placeholder */}
                  <OptimizedImage
                    src="/lovable-uploads/976a3243-6071-40c3-bf04-e4c43cf72f67.png"
                    alt="Nederland kaart met locaties"
                    className="rounded-xl w-full h-auto"
                  />
                  {/* Sample location pins */}
                  <div className="absolute top-1/4 right-1/3 bg-white rounded-lg px-3 py-2 shadow-lg text-sm">
                    Rita zoekt een isolatie specialist
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Benefits - 3 column icons */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Zicht op serieuze aanvragen</h3>
                <p className="text-gray-600">
                  Check telefoonverificatie en klantentie om betere keuzes te maken.
                </p>
              </div>
              
              <div>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Blijf de concurrentie voor</h3>
                <p className="text-gray-600">
                  Je betaalt alleen voor de offerteaanvragen die je besluit te benaderen.
                </p>
              </div>
              
              <div>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexibiliteit zonder verplichtingen</h3>
                <p className="text-gray-600">
                  Volledige controle: geen abonnement, alleen betalen als jij kiest voor een klus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Zo werkt het</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Deel je vakgebied, werkgebied en bedrijfsgegevens.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Ontvang dagelijks updates over de nieuwe aanvragen die passen bij je bedrijf.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Ontgrendel de contactgegevens van de aanvragers die je interessant vindt, zodat je contact kunt opnemen met de aanvrager.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white mt-6"
                >
                  Schrijf je gratis in
                </Button>
              </div>
              
              <div>
                <OptimizedImage
                  src="/lovable-uploads/69fecf8d-ab7b-4e38-a678-41f8e4e80ad2.png"
                  alt="Professionele vakmensen aan het werk"
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What we offer - Grid with icons */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Wat Refurbish Totaal Nederland jou biedt
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Settings className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Kwalitatieve leads</h3>
                <p className="text-gray-600 text-sm">
                  Ontvang kwalitatieve leads en haal echten klanten binnen.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <FileText className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Duidelijke kosten</h3>
                <p className="text-gray-600 text-sm">
                  Betaal per offerteaanvraag, je weet dus precies waar je aan toe bent.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Mail className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Direct contact</h3>
                <p className="text-gray-600 text-sm">
                  Neem contact op met de klant via mail of telefoon.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <BarChart3 className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Volledige controle</h3>
                <p className="text-gray-600 text-sm">
                  Selecteer zelf je vakgebied(en) en regio('s) in je online account.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Megaphone className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Online bedrijfsprofiel</h3>
                <p className="text-gray-600 text-sm">
                  Bouw je bedrijfsprofiel uit tot je online visitekaartje.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Star className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Klanten reviews</h3>
                <p className="text-gray-600 text-sm">
                  Toon je kwaliteit en verhoog je betrouwbaarheid met reviews.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Eerlijke concurrentie</h3>
                <p className="text-gray-600 text-sm">
                  Per vakgebied een passende verdeling.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Euro className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Controle over je kosten</h3>
                <p className="text-gray-600 text-sm">
                  Je hebt zelf controle over hoeveel je uitgeeft, omdat je alleen betaalt voor de aanvragen die je ontgrendelt.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Wrench className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Flexibiliteit</h3>
                <p className="text-gray-600 text-sm">
                  Maak gebruik van de dienst wanneer je het nodig hebt, zonder langetermijnverplichtingen of vaste maandelijkse kosten.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HeadphonesIcon className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Persoonlijke accountmanager</h3>
                <p className="text-gray-600 text-sm">
                  Eenvoudig contact met je persoonlijke accountmanager.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Euro className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Reclameservice</h3>
                <p className="text-gray-600 text-sm">
                  Eerlijk is eerlijk: betaal alleen voor kwalitatieve leads.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Wat vakspecialisten over Refurbish Totaal Nederland vertellen
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    "Wij doen al erg lang mee met Refurbish Totaal Nederland. Vanaf het begin houden wij er veel klanten aan over. Als ik een vraag heb, krijg ik ook altijd heel snel een reactie! Wij zijn heel tevreden!"
                  </p>
                  
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">Kimberly Van den Wijngaert</p>
                    <p className="text-brand-lightGreen font-medium">van EMVE Zonwering & Raamdecoratie vof</p>
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <div className="flex space-x-2">
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                    <ArrowRight className="h-5 w-5 rotate-180" />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div>
                <OptimizedImage
                  src="/lovable-uploads/976a3243-6071-40c3-bf04-e4c43cf72f67.png"
                  alt="Tevreden vakspecialist aan het werk"
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-12 bg-blue-100">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Wil jij ook in contact komen met nieuwe klanten?
              </h3>
              <Button 
                className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white px-8"
              >
                Schrijf je gratis in
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Veelgestelde vragen
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <span className="text-lg font-medium">Hoeveel offerteaanvragen kan ik verwachten?</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <span className="text-lg font-medium">Wat is de prijs per offerteaanvraag?</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <span className="text-lg font-medium">Zijn er onverwachte kosten?</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <span className="text-lg font-medium">Op welke manieren kan ik contact opnemen met de klant?</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <span className="text-lg font-medium">Hoe snel moet ik reageren op een offerteaanvraag?</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              500+ bedrijven maken gebruik van Refurbish Totaal Nederland om nieuwe klanten te werven
            </h2>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder logos - in real implementation these would be actual partner logos */}
              <div className="bg-gray-200 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">Partner Logo</span>
              </div>
              <div className="bg-gray-200 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">Partner Logo</span>
              </div>
              <div className="bg-gray-200 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">Partner Logo</span>
              </div>
              <div className="bg-gray-200 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">Partner Logo</span>
              </div>
              <div className="bg-gray-200 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">Partner Logo</span>
              </div>
              <div className="bg-gray-200 h-16 w-32 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">Partner Logo</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Jouw project</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-brand-lightGreen">Voor consumenten</a></li>
                  <li><a href="#" className="hover:text-brand-lightGreen">Inspiratie</a></li>
                  <li><a href="#" className="hover:text-brand-lightGreen">Prijsgidsen</a></li>
                  <li><a href="#" className="hover:text-brand-lightGreen">Veelgestelde vragen</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Vakspecialisten</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-brand-lightGreen">Aanmelden</a></li>
                  <li><a href="#" className="hover:text-brand-lightGreen">Meer informatie</a></li>
                  <li><a href="#" className="hover:text-brand-lightGreen">Blog</a></li>
                  <li><a href="#" className="hover:text-brand-lightGreen">Inloggen</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Over Refurbish Totaal Nederland</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-brand-lightGreen">Ons verhaal</a></li>
                  <li><a href="#" className="hover:text-brand-lightGreen">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Vragen over onze service?</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-brand-lightGreen font-semibold">info@refurbishtotaalnederland.nl</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 flex justify-between items-center text-sm text-gray-500">
              <div className="flex space-x-4">
                <span>© 2024 Refurbish Totaal Nederland</span>
                <a href="#" className="hover:text-brand-lightGreen">Disclaimer</a>
                <a href="#" className="hover:text-brand-lightGreen">Privacy</a>
                <a href="#" className="hover:text-brand-lightGreen">Cookies</a>
              </div>
              
              <div className="flex items-center space-x-2">
                <Building2 className="h-6 w-6 text-brand-lightGreen" />
                <span className="font-semibold text-brand-lightGreen">Refurbish Totaal Nederland</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BedrijvenPage;
