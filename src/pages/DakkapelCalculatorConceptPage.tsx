
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelCalculator } from '@/components/dakkapel/calculator/DakkapelCalculator';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

const DakkapelCalculatorConceptPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dakkapel Calculator | Refurbish Totaal Nederland</title>
        <meta name="description" content="Bereken direct de kosten voor uw dakkapel op maat. Pas de afmetingen, materialen en opties aan voor een nauwkeurige prijsindicatie." />
        <meta name="keywords" content="dakkapel calculator, dakkapel kosten, dakkapel prijs, dakkapel op maat, dakkapel berekenen" />
        <link rel="canonical" href="https://www.refurbishtotaalnederland.nl/dakkapel-calculator/" />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Dakkapel Calculator</h1>
          <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
            Bereken direct de indicatieprijs voor uw dakkapel op maat. Pas de afmetingen en opties aan om een nauwkeurige prijsindicatie te krijgen.
          </p>
          <p className="text-center text-md mb-8 max-w-2xl mx-auto text-brand-lightGreen font-medium">
            Nieuw: Bekijk een 3D-weergave van uw dakkapel terwijl u de instellingen aanpast!
          </p>
          <DakkapelCalculator />
          <Toaster position="top-center" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DakkapelCalculatorConceptPage;
