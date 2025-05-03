
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelCalculator } from '@/components/dakkapel/calculator/DakkapelCalculator';
import { Helmet } from 'react-helmet';

const DakkapelCalculatorConceptPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dakkapel Calculator Concept | Refurbish Totaal Nederland</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Dakkapel Calculator</h1>
          <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
            Bereken direct de indicatieprijs voor uw dakkapel op maat. Pas de afmetingen en opties aan om een nauwkeurige prijsindicatie te krijgen.
          </p>
          <DakkapelCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DakkapelCalculatorConceptPage;
