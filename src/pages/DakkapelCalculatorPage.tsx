
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
        <title>Dakkapel Calculator Concept | Refurbish Totaal Nederland</title>
        <meta name="description" content="Test onze dakkapel calculator concept versie. Bereken de kosten van uw dakkapel met onze handige tool." />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <div className="container py-8 md:py-12 px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Dakkapel Calculator (Concept)</h1>
          <p className="text-center text-lg mb-6 max-w-3xl mx-auto">
            Test versie van onze dakkapel calculator
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
