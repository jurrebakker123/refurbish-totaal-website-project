
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelCalculator } from '@/components/dakkapel/calculator/DakkapelCalculator';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';

const DakkapelCalculatorConceptPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Ensure localStorage is available and initialized for calculator prices
    if (!localStorage.getItem('calculatorPrices')) {
      // Set default prices if not available
      const defaultPrices = {
        basePrices: {
          typeA: 7060,
          typeB: 7290,
          typeC: 8200,
          typeD: 8780,
          typeE: 9330,
        },
        materialMultipliers: {
          kunststof: 1.0,
          hout: 1.2,
          aluminium: 1.3,
          standaard: 1.0,
          kunststof_rabat: 1.05,
          kunststof_rabat_boeideel: 1.08,
          polyester_glad: 1.07,
          polyester_rabat: 1.09
        },
        optionCosts: {
          ventilatie: 450,
          zonwering: 850,
          gootafwerking: 350,
          extra_isolatie: 650,
          extra_draaikiepraam: 192.77,
          horren: 240,
          elektrisch_rolluik: 281.75,
          verwijderen_bestaande: 402.50,
          afvoeren_bouwafval: 150,
          kader_dakkapel: 1140.26,
          voorbereiden_rolluiken: 125,
          minirooftop: 3177.69,
          dak_versteviging: 400,
          ventilatieroosters: 120,
          sporenkap: 275
        },
        rcValueCosts: {
          standaard: 0,
          upgrade_6_0: 218,
          upgrade_6_5: 250
        },
        kozijnHoogteAdjustments: {
          standaard: 0,
          medium: 150,
          large: 300,
          extra_large: 450
        },
        colorSurcharges: {
          wit: 0,
          crème: 0,
          grijs: 210,
          antraciet: 210,
          zwart: 210,
          staalblauw: 210,
          dennengroen: 210
        }
      };
      localStorage.setItem('calculatorPrices', JSON.stringify(defaultPrices));
    }
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
          <p className="text-center text-md mb-8 max-w-2xl mx-auto text-brand-lightGreen font-medium">
            Nieuw: Bekijk een 3D-weergave van uw dakkapel terwijl u de instellingen aanpast!
          </p>
          <DakkapelCalculator />
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default DakkapelCalculatorConceptPage;
