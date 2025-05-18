
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelCalculator } from '@/components/dakkapel/calculator/DakkapelCalculator';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

const DakkapelCalculatorPage = () => {
  useEffect(() => {
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
          
          <div className="mt-8">
            <DakkapelCalculator />
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default DakkapelCalculatorPage;
