
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from '@/components/Footer';

const BedrijvenPage = () => {
  const handleLogin = () => {
    // Demo login functionality
    alert('Demo: Login functionaliteit zou hier werken. Gebruiker wordt doorgestuurd naar het vakspecialist dashboard.');
  };

  const handleSignup = () => {
    // Demo signup functionality
    alert('Demo: Hier zou de aanmeldingsprocedure starten. Vakspecialist vult gegevens in en wordt toegevoegd aan het platform.');
  };

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
                <Button variant="outline" size="sm" onClick={handleLogin}>Log in</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section with Netherlands Map */}
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
                  onClick={handleSignup}
                >
                  Schrijf je gratis in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="relative">
                <div className="relative">
                  {/* Construction workers illustration */}
                  <div className="relative bg-brand-lightGreen rounded-xl p-8 overflow-hidden">
                    <OptimizedImage
                      src="/lovable-uploads/8069b82a-7aa8-4b93-84f1-af687a946ca0.png"
                      alt="Vakspecialisten aan het werk - renovatie en bouw"
                      className="w-full h-auto animate-fade-in"
                    />
                    {/* Animated location pins */}
                    <div className="absolute top-1/4 right-1/3 bg-white rounded-lg px-3 py-2 shadow-lg text-sm animate-pulse">
                      Rita zoekt een isolatie specialist
                    </div>
                    <div className="absolute bottom-1/3 left-1/4 bg-white rounded-lg px-3 py-2 shadow-lg text-sm animate-bounce">
                      Jan wil zijn dak renoveren
                    </div>
                    <div className="absolute top-1/2 left-1/2 bg-white rounded-lg px-3 py-2 shadow-lg text-sm animate-float">
                      Marie zoekt een vakman
                    </div>
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
                  <CheckCircle className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Zicht op serieuze aanvragen</h3>
                <p className="text-gray-600">
                  Check telefoonverificatie en klantentie om betere keuzes te maken.
                </p>
              </div>
              
              <div>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Blijf de concurrentie voor</h3>
                <p className="text-gray-600">
                  Je betaalt alleen voor de offerteaanvragen die je besluit te benaderen.
                </p>
              </div>
              
              <div>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-brand-lightGreen" />
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
                    <div className="bg-brand-lightGreen text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Deel je vakgebied, werkgebied en bedrijfsgegevens.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-lightGreen text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-gray-700">
                        Ontvang dagelijks updates over de nieuwe aanvragen die passen bij je bedrijf.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-lightGreen text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
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
                  onClick={handleSignup}
                >
                  Schrijf je gratis in
                </Button>
              </div>
              
              <div>
                <OptimizedImage
                  src="/lovable-uploads/3321c751-dd2d-47ea-8590-4b48558120ed.png"
                  alt="Bouwvakkers en aannemers in gesprek over een bouwproject"
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
                  <Settings className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Kwalitatieve leads</h3>
                <p className="text-gray-600 text-sm">
                  Ontvang kwalitatieve leads en haal echten klanten binnen.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <FileText className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Duidelijke kosten</h3>
                <p className="text-gray-600 text-sm">
                  Betaal per offerteaanvraag, je weet dus precies waar je aan toe bent.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Mail className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Direct contact</h3>
                <p className="text-gray-600 text-sm">
                  Neem contact op met de klant via mail of telefoon.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <BarChart3 className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Volledige controle</h3>
                <p className="text-gray-600 text-sm">
                  Selecteer zelf je vakgebied(en) en regio('s) in je online account.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Megaphone className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Online bedrijfsprofiel</h3>
                <p className="text-gray-600 text-sm">
                  Bouw je bedrijfsprofiel uit tot je online visitekaartje.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Star className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Klanten reviews</h3>
                <p className="text-gray-600 text-sm">
                  Toon je kwaliteit en verhoog je betrouwbaarheid met reviews.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Eerlijke concurrentie</h3>
                <p className="text-gray-600 text-sm">
                  Per vakgebied een passende verdeling.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Euro className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Controle over je kosten</h3>
                <p className="text-gray-600 text-sm">
                  Je hebt zelf controle over hoeveel je uitgeeft, omdat je alleen betaalt voor de aanvragen die je ontgrendelt.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Wrench className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Flexibiliteit</h3>
                <p className="text-gray-600 text-sm">
                  Maak gebruik van de dienst wanneer je het nodig hebt, zonder langetermijnverplichtingen of vaste maandelijkse kosten.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <HeadphonesIcon className="h-12 w-12 text-brand-lightGreen" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Persoonlijke accountmanager</h3>
                <p className="text-gray-600 text-sm">
                  Eenvoudig contact met je persoonlijke accountmanager.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Euro className="h-12 w-12 text-brand-lightGreen" />
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
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop&crop=center"
                  alt="Tevreden aannemer aan het werk met bouwgereedschap"
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
                onClick={handleSignup}
              >
                Schrijf je gratis in
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section with Working Accordion */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Veelgestelde vragen
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-gray-50 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Hoeveel offerteaanvragen kan ik verwachten?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    Het aantal offerteaanvragen dat je ontvangt hangt af van verschillende factoren zoals je vakgebied, werkgebied en de vraag in jouw regio. Gemiddeld ontvangen onze partners 3-8 relevante aanvragen per week.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="bg-gray-50 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Wat is de prijs per offerteaanvraag?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    De prijs per offerteaanvraag varieert tussen €15 en €45, afhankelijk van het type klus en de complexiteit. Je betaalt alleen voor de aanvragen die je daadwerkelijk ontgrendelt.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="bg-gray-50 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Zijn er onverwachte kosten?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    Nee, er zijn geen verborgen kosten. Je betaalt alleen voor de contactgegevens die je ontgrendelt. Er zijn geen abonnementskosten of andere verplichtingen.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="bg-gray-50 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Op welke manieren kan ik contact opnemen met de klant?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    Na het ontgrendelen van een aanvraag krijg je toegang tot de volledige contactgegevens: telefoonnummer, e-mailadres en postadres. Je kunt de klant direct bellen, mailen of een bezoek inplannen.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="bg-gray-50 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Hoe snel moet ik reageren op een offerteaanvraag?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    We adviseren om binnen 24 uur contact op te nemen met de klant. Snelle reacties verhogen je kans op het binnenhalen van de klus aanzienlijk. Klanten waarderen een snelle en professionele benadering.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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

        {/* Contact Block */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vragen over onze service?
              </h3>
              <a 
                href="mailto:info@refurbishtotaalnederland.nl"
                className="text-brand-lightGreen text-xl font-semibold hover:text-brand-darkGreen transition-colors"
              >
                info@refurbishtotaalnederland.nl
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default BedrijvenPage;
