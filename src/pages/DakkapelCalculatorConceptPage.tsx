
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelConfigurator } from '@/components/dakkapel/configurator/DakkapelConfigurator';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

const DakkapelCalculatorConceptPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dakkapel Configurator | Refurbish Totaal Nederland</title>
        <meta name="description" content="Configureer uw dakkapel binnen 1 minuut. Stel gratis en vrijblijvend uw ideale dakkapel samen, op basis van uw woning en wensen." />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12 px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Configureer uw dakkapel</h1>
          <p className="text-center text-lg mb-6 max-w-3xl mx-auto">
            Stel gratis en vrijblijvend uw ideale dakkapel samen, op basis van uw woning en wensen.
          </p>
          <p className="text-center text-md mb-8 max-w-2xl mx-auto text-brand-lightGreen font-medium">
            Configureer uw dakkapel binnen 1 minuut
          </p>
          
          <div className="flex justify-center mb-8">
            <a 
              href="#configurator" 
              className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              Start met samenstellen
            </a>
          </div>
          
          <div id="configurator">
            <DakkapelConfigurator />
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default DakkapelCalculatorConceptPage;
