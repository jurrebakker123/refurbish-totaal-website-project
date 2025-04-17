
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Users, ThumbsUp, Award, Target, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CallToActionSection from '@/components/CallToActionSection';

const OverOnsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="relative py-16">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1574359411659-15573a27fd0c?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-50"></div>
          </div>
          <div className="container relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Over Ons</h1>
            <p className="text-xl max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Refurbish Totaal Nederland is uw betrouwbare partner voor renovatie- en verbouwprojecten, 
              met focus op kwaliteit en klanttevredenheid.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Ons Verhaal</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Refurbish Totaal Nederland werd in 2024 opgericht door Gerard Groeneveld met een duidelijke visie: 
                    renovatie- en verbouwprojecten met de hoogste kwaliteitsnormen uitvoeren en daarbij een uitstekende 
                    service bieden aan onze klanten.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    Gerard begon zijn carrière in de bouwsector en heeft uitgebreide ervaring opgedaan in diverse 
                    aspecten van renovatie en verbouwing voordat hij besloot om Refurbish Totaal Nederland op te richten. 
                    Zijn passie voor vakmanschap en oog voor detail vormen nog steeds de kern van ons bedrijf.
                  </p>
                  <p className="text-lg text-gray-700">
                    Hoewel we een jong bedrijf zijn, brengt ons team een schat aan ervaring met zich mee op het gebied van 
                    schilderwerk, dakrenovatie, stucadoren, installatietechniek, aan- en verbouw, behangen en PVC vloeren. 
                    We zijn trots op ons vermogen om totaaloplossingen te bieden voor zowel particuliere als zakelijke klanten.
                  </p>
                </div>

                <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Onze Diensten</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Bij Refurbish Totaal Nederland bieden wij een breed scala aan diensten om aan al uw renovatie- en 
                    verbouwingsbehoeften te voldoen:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">Schilderwerk</h3>
                        <p className="text-gray-600">Professioneel binnen- en buitenschilderwerk met premium verfproducten.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">Dakrenovatie</h3>
                        <p className="text-gray-600">Complete oplossingen voor waterdichte en energiezuinige daken.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">Stucadoren</h3>
                        <p className="text-gray-600">Vakkundige afwerking van wanden en plafonds.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">Installatietechniek</h3>
                        <p className="text-gray-600">Elektra- en loodgieterswerkzaamheden volgens de nieuwste normen.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">Aan- en verbouw</h3>
                        <p className="text-gray-600">Van kleine verbouwingen tot complete uitbreidingen.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">Behangen</h3>
                        <p className="text-gray-600">Professioneel behangwerk voor een prachtige wandafwerking.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">PVC Vloeren</h3>
                        <p className="text-gray-600">Levering en installatie van duurzame, onderhoudsvriendelijke vloeren.</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">
                    Voor elk project streven wij ernaar om hoogwaardige resultaten te leveren die voldoen aan uw 
                    verwachtingen en binnen het afgesproken budget en tijdschema blijven.
                  </p>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Onze Aanpak</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Bij Refurbish Totaal Nederland geloven we in transparantie, communicatie en kwaliteit. 
                    Onze werkwijze is erop gericht om u als klant centraal te stellen:
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="rounded-full bg-brand-lightGreen/10 p-3 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <Target className="h-6 w-6 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Persoonlijke benadering</h3>
                        <p className="text-gray-700">We luisteren naar uw wensen en behoeften om een op maat gemaakte oplossing te bieden.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-brand-lightGreen/10 p-3 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <ThumbsUp className="h-6 w-6 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Kwaliteit voorop</h3>
                        <p className="text-gray-700">We gebruiken alleen hoogwaardige materialen en werken met ervaren vakmensen.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-brand-lightGreen/10 p-3 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <Users className="h-6 w-6 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Betrouwbaarheid</h3>
                        <p className="text-gray-700">Wij komen onze afspraken na en zijn transparant gedurende het hele proces.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-brand-lightGreen/10 p-3 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Innovatie</h3>
                        <p className="text-gray-700">We blijven op de hoogte van de nieuwste technieken en materialen om u de beste oplossingen te bieden.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Waarom Kiezen voor Ons?</h3>
                    <Separator className="my-4 bg-gray-200" />
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-brand-lightGreen mr-2" />
                        <span>Gekwalificeerde vakmensen</span>
                      </li>
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-brand-lightGreen mr-2" />
                        <span>Kwaliteitsmaterialen</span>
                      </li>
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-brand-lightGreen mr-2" />
                        <span>Persoonlijke aandacht</span>
                      </li>
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-brand-lightGreen mr-2" />
                        <span>Garantie op werkzaamheden</span>
                      </li>
                      <li className="flex items-center">
                        <Award className="h-5 w-5 text-brand-lightGreen mr-2" />
                        <span>Transparante prijzen</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-brand-darkGreen text-white p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <h3 className="text-xl font-bold mb-4">Contact</h3>
                    <p className="mb-6">
                      Heeft u vragen over onze diensten of wilt u een offerte aanvragen? Neem gerust contact met ons op.
                    </p>
                    <a 
                      href="/contact" 
                      className="block bg-white text-brand-darkGreen py-3 px-6 rounded-md font-medium text-center hover:bg-gray-100 transition-colors"
                    >
                      Neem Contact Op
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default OverOnsPage;
