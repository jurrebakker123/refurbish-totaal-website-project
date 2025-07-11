
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelConfigurator } from '@/components/dakkapel/configurator/DakkapelConfigurator';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

const DakkapelCalculatorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dakkapel Configurator | Refurbish Totaal Nederland</title>
        <meta name="description" content="Configureer uw dakkapel met onze handige stap-voor-stap configurator. Kies afmetingen, materialen, kleuren en opties." />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12 px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Dakkapel Configurator</h1>
          <p className="text-center text-lg mb-6 max-w-3xl mx-auto">
            Configureer uw dakkapel stap voor stap met onze uitgebreide configurator
          </p>
          
          <div className="mt-8">
            <DakkapelConfigurator />
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default DakkapelCalculatorPage;
