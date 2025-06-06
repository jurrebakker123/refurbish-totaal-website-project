
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Users, ThumbsUp, Award, Target, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CallToActionSection from '@/components/CallToActionSection';
import ReusableForm from '@/components/common/ReusableForm';

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
                    Refurbish Totaal Nederland is in 2024 opgericht door Gerard Groeneveld, met als doel om renovatie-, verbouw- en verduurzamingsprojecten uit te voeren volgens hoge kwaliteitsnormen én met persoonlijke aandacht voor de klant. Vanuit zijn jarenlange ervaring in de bouwsector merkte Gerard dat er behoefte was aan een partij die vakmanschap, betrouwbaarheid en complete ontzorging kon combineren.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    Wat begon als een visie van één ondernemer, groeide al snel uit tot een krachtig netwerk van zelfstandige vakspecialisten. Samen vormen wij een multidisciplinair team dat klaarstaat voor zowel particuliere als zakelijke opdrachtgevers. Onze expertise beslaat onder andere kozijntechniek, isolatietechniek, schilderwerk, dakrenovatie, stucadoren, installatietechniek, aan- en verbouw, behangen en PVC vloeren.
                  </p>
                  <p className="text-lg text-gray-700">
                    Hoewel we als bedrijf nog jong zijn, bundelen we tientallen jaren aan praktijkervaring. Wij geloven in samenwerken op basis van vertrouwen, vakkennis en gedeelde verantwoordelijkheid — en dat merkt u in elk project dat we uitvoeren. Refurbish Totaal Nederland staat voor heldere communicatie, kwalitatieve uitvoering en een duurzaam resultaat.
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
                        <h3 className="font-semibold text-lg">Kozijntechniek</h3>
                        <p className="text-gray-600">Levering en plaatsing van hoogwaardige kozijnen, ramen en deuren.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-brand-lightGreen mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">Isolatietechniek</h3>
                        <p className="text-gray-600">Effectieve isolatieoplossingen voor optimaal comfort en energiebesparing.</p>
                      </div>
                    </div>
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
                    Bij Refurbish Totaal Nederland staat de klant écht centraal. Wij geloven dat succesvolle renovatie- en verduurzamingsprojecten beginnen met heldere communicatie, vakmanschap en wederzijds vertrouwen. Onze aanpak is transparant, gestructureerd en resultaatgericht — met oog voor detail én de mens achter het project.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="rounded-full bg-brand-lightGreen/10 p-3 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <Target className="h-6 w-6 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Persoonlijke benadering</h3>
                        <p className="text-gray-700">We starten elk traject met een goed gesprek. Door te luisteren naar uw wensen, ideeën en prioriteiten kunnen we een oplossing op maat bieden die perfect aansluit bij uw situatie.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-brand-lightGreen/10 p-3 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <ThumbsUp className="h-6 w-6 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Kwaliteit als standaard</h3>
                        <p className="text-gray-700">Wij werken uitsluitend met hoogwaardige materialen en ervaren vakspecialisten. Of het nu gaat om schilderwerk, installatietechniek of bouwkundige aanpassingen — wij leveren vakwerk dat staat en blijft staan.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-brand-lightGreen/10 p-3 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <Users className="h-6 w-6 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Betrouwbaarheid & transparantie</h3>
                        <p className="text-gray-700">Afspraak is afspraak. Tijdens het hele proces houden wij u op de hoogte van de voortgang en maken we duidelijke afspraken over planning, budget en uitvoering.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-brand-lightGreen/10 p-3 w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-brand-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Vooruitstrevend & efficiënt</h3>
                        <p className="text-gray-700">Wij volgen de nieuwste technieken, materialen en duurzame oplossingen op de voet. Zo bieden we u altijd de meest efficiënte en toekomstbestendige aanpak.</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 mt-6">
                    Met deze aanpak zorgen we ervoor dat ieder project soepel verloopt en het eindresultaat voldoet aan de hoogste verwachtingen.
                  </p>
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

                  <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Neem Contact Op</h3>
                    <ReusableForm 
                      title=""
                      description="Heeft u vragen of wilt u een offerte aanvragen? Vul het formulier in."
                      showFileUpload={false}
                      templateId="template_ezfzaao"
                      buttonText="Verstuur bericht"
                      showServiceInput={true}
                    />
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
