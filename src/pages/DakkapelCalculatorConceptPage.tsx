
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
        <title>3D Dakkapel Configurator | Refurbish Totaal Nederland</title>
        <meta name="description" content="Ontwerp uw eigen dakkapel in 3D. Kies uw materialen, afmetingen en opties en bekijk direct het resultaat in onze 3D configurator." />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12 px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Dakkapel 3D Configurator</h1>
          <p className="text-center text-lg mb-6 max-w-3xl mx-auto">
            Configureer uw dakkapel en zie direct het resultaat in 3D
          </p>
          <p className="text-center text-md mb-8 max-w-2xl mx-auto text-brand-lightGreen font-medium">
            Configureer uw dakkapel binnen 1 minuut
          </p>
          
          <div className="flex justify-center mb-8">
            
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
