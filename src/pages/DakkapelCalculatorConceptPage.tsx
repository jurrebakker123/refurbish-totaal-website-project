
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import { InteractiveDakkapelCalculator } from '@/components/dakkapel/calculator/InteractiveDakkapelCalculator';
import { CheckCircle } from 'lucide-react';

const DakkapelCalculatorConceptPage = () => {
  const [startConfig, setStartConfig] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Dakkapel Configurator | Refurbish Totaal Nederland</title>
        <meta 
          name="description" 
          content="Configureer gratis en vrijblijvend uw ideale dakkapel binnen 1 minuut, op basis van uw woning en wensen. Direct een persoonlijke offerte op maat." 
        />
      </Helmet>
      
      <Header />

      <main className="flex-grow">
        {!startConfig ? (
          <div className="container max-w-5xl mx-auto py-16 px-4">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-darkGreen">
                Configureer uw dakkapel
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stel gratis en vrijblijvend uw ideale dakkapel samen, op basis van uw woning en wensen.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8 mb-10">
                <div className="flex items-center text-brand-darkGreen">
                  <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen" />
                  <span>Configureer binnen 1 minuut</span>
                </div>
                <div className="flex items-center text-brand-darkGreen">
                  <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen" />
                  <span>Direct prijsindicatie</span>
                </div>
                <div className="flex items-center text-brand-darkGreen">
                  <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen" />
                  <span>Persoonlijke offerte op maat</span>
                </div>
              </div>
              
              <button
                onClick={() => setStartConfig(true)}
                className="bg-brand-lightGreen hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md text-lg shadow-lg transform transition hover:scale-105"
              >
                Start met samenstellen
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="font-bold text-xl mb-4 text-brand-darkGreen">Waarom een dakkapel?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>Tot 40% meer woonruimte</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>Meer daglicht in uw woning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>Verhoging van uw woningwaarde</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>Binnen één dag geplaatst</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>10 jaar garantie</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="font-bold text-xl mb-4 text-brand-darkGreen">Onze voordelen</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>Gratis inmeten</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>Hoogwaardige materialen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>Eigen productiefaciliteit</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>Eigen montageteams</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-brand-lightGreen shrink-0 mt-0.5" />
                    <span>A-kwaliteit isolatiematerialen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <InteractiveDakkapelCalculator onBack={() => setStartConfig(false)} />
        )}
      </main>
      
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default DakkapelCalculatorConceptPage;
