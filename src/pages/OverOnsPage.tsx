
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from "@/components/ui/progress";
import { Shield, ThumbsUp, Clock, Users, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverOnsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="bg-brand-darkGreen text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Over Refurbish Totaal Nederland</h1>
              <p className="text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Al meer dan 20 jaar uw betrouwbare partner voor renovatie en verbouwingen door heel Nederland.
              </p>
            </div>
          </div>
        </section>

        {/* Over Ons */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen">Onze Geschiedenis</h2>
                <p className="text-lg mb-4 text-gray-700">
                  Refurbish Totaal Nederland werd opgericht in 2003 door Jan Jansen, een ervaren vakman met een passie voor kwaliteit en duurzaamheid. Wat begon als een klein schildersbedrijf is uitgegroeid tot een veelzijdig renovatiebedrijf met meer dan 30 vakmensen in dienst.
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  Met een focus op kwaliteit, duurzaamheid en klanttevredenheid hebben we door de jaren heen duizenden projecten succesvol afgerond, van kleine opknapbeurten tot complete woningrenovaties.
                </p>
                <p className="text-lg mb-6 text-gray-700">
                  Vandaag de dag staat Refurbish Totaal Nederland bekend om zijn betrouwbare service, vakkundig personeel en het vermogen om projecten netjes, op tijd en binnen budget af te ronden.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
                  alt="Team Refurbish Totaal Nederland"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Onze Waarden */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen animate-fade-in">Onze Kernwaarden</h2>
              <p className="text-lg text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Deze waarden vormen het fundament van alles wat wij doen en elke beslissing die wij nemen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Kwaliteit</h3>
                <p className="text-gray-700">
                  Wij streven naar de hoogste kwaliteit in al onze werkzaamheden. Geen enkel project wordt afgerond zonder dat het voldoet aan onze strenge kwaliteitseisen.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <ThumbsUp className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Betrouwbaarheid</h3>
                <p className="text-gray-700">
                  Wij komen onze afspraken na. Van de eerste offerte tot de laatste inspectie, u kunt erop vertrouwen dat wij doen wat we beloven.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Punctualiteit</h3>
                <p className="text-gray-700">
                  Tijd is kostbaar. Wij respecteren uw tijd door projecten binnen de afgesproken termijn af te ronden en altijd op tijd te komen voor afspraken.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Klantvriendelijkheid</h3>
                <p className="text-gray-700">
                  Onze klanten staan centraal. Wij luisteren naar uw wensen, bieden eerlijk advies en zorgen voor een prettige communicatie van begin tot eind.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Vakmanschap</h3>
                <p className="text-gray-700">
                  Al onze medewerkers zijn gediplomeerde vakmensen met jarenlange ervaring. Wij investeren voortdurend in hun ontwikkeling en scholing.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="rounded-full bg-brand-lightGreen/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-brand-darkGreen" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Duurzaamheid</h3>
                <p className="text-gray-700">
                  Wij dragen zorg voor het milieu door te werken met duurzame materialen en afval te minimaliseren. Zo dragen we bij aan een betere toekomst.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Onze Expertise */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen animate-fade-in">Onze Expertise</h2>
              <p className="text-lg text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Met meer dan 20 jaar ervaring hebben wij een brede expertise opgebouwd in verschillende renovatie- en verbouwtechnieken.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-brand-darkGreen">Schilderwerk</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2 bg-gray-200" />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-brand-darkGreen">Dakrenovatie</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2 bg-gray-200" />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-brand-darkGreen">Stucadoren</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-200" />
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-brand-darkGreen">Installatietechniek</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-200" />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-brand-darkGreen">Aan- en verbouw</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2 bg-gray-200" />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-brand-darkGreen">PVC Vloeren</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-brand-darkGreen text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6 animate-fade-in">Klaar om met ons samen te werken?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Wij staan klaar om uw project tot een succes te maken. Neem vrijblijvend contact met ons op om uw wensen te bespreken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link 
                to="/contact" 
                className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen"
              >
                Contact Opnemen
              </Link>
              <Link 
                to="/offerte" 
                className="btn-primary hover:animate-pulse"
              >
                Offerte Aanvragen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OverOnsPage;
