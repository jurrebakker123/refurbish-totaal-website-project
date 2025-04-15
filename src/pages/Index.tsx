
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ProjectsPreview from '@/components/ProjectsPreview';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import CallToActionSection from '@/components/CallToActionSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const benefits = [
    {
      title: "20+ Jaar Ervaring",
      description: "Met meer dan twee decennia ervaring hebben wij expertise in alle facetten van renovatie en verbouwing.",
      icon: <Check className="h-10 w-10 text-brand-lightGreen" />
    },
    {
      title: "Gediplomeerde Vakmensen",
      description: "Al onze medewerkers zijn gediplomeerde professionals met ruime ervaring in hun vakgebied.",
      icon: <Check className="h-10 w-10 text-brand-lightGreen" />
    },
    {
      title: "Garantie op Alle Werkzaamheden",
      description: "Wij bieden uitgebreide garantie op al onze werkzaamheden voor uw gemoedsrust.",
      icon: <Check className="h-10 w-10 text-brand-lightGreen" />
    },
    {
      title: "Van Kleine tot Grote Projecten",
      description: "Of het nu gaat om een kleine renovatie of een complete verbouwing, wij staan voor u klaar.",
      icon: <Check className="h-10 w-10 text-brand-lightGreen" />
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        
        {/* Waarom Voor Ons Kiezen */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen animate-fade-in">Waarom Voor Ons Kiezen</h2>
              <p className="text-lg text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Bij Refurbish Totaal Nederland staan kwaliteit, betrouwbaarheid en klanttevredenheid voorop. 
                Ontdek waarom honderden klanten jaarlijks kiezen voor onze diensten.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-in flex" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                  <div className="mr-4 mt-1">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-brand-darkGreen">{benefit.title}</h3>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Link 
                to="/over-ons" 
                className="btn-primary hover:animate-pulse inline-flex items-center"
              >
                Meer Over Ons <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        <ProjectsPreview />
        <Testimonials />
        
        {/* Werkgebied */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-brand-darkGreen animate-fade-in">Ons Werkgebied</h2>
              <p className="text-lg text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Refurbish Totaal Nederland voert projecten uit door heel Nederland. 
                Onze hoofdvestiging bevindt zich in Gennep, van waaruit we klanten in het hele land bedienen.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2470.2752784461224!2d5.9729919!3d51.6982938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c7744f85c553a7%3A0xdd1324f3f9e03ea1!2sNiersweg%2027%2C%206591%20CT%20Gennep!5e0!3m2!1snl!2snl!4v1615306629171!5m2!1snl!2snl" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Werkgebied Refurbish Totaal Nederland"
                ></iframe>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-700">
                  <strong>Hoofdvestiging:</strong> Niersweg 27, 6591 CT Gennep
                </p>
                <Link 
                  to="/contact" 
                  className="btn-primary mt-4 inline-flex items-center"
                >
                  Contact Opnemen <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <CallToActionSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
