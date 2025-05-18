
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DakkapelConfigurator } from '@/components/dakkapel/calculator/DakkapelConfigurator';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadPricesAsExcel } from '@/utils/excelUtils';

const DakkapelCalculatorConceptPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is admin (very simple check - in production you would use a proper auth system)
    const checkAdminStatus = () => {
      const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
      setIsAdmin(isLoggedIn);
    };
    
    // Initialize or validate localStorage for calculator prices
    const initializeCalculatorPrices = () => {
      try {
        // Check if localStorage is available
        if (typeof localStorage !== 'undefined') {
          // Check if data already exists
          const savedPrices = localStorage.getItem('calculatorPrices');
          if (!savedPrices) {
            console.log('Setting default calculator prices');
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
            
            // Dispatch event to notify components that prices are available
            const event = new Event('priceUpdate');
            window.dispatchEvent(event);
          } else {
            // Validate saved prices and ensure all required fields exist
            try {
              const parsedPrices = JSON.parse(savedPrices);
              // Check for minimal required structure
              if (!parsedPrices.basePrices || !parsedPrices.materialMultipliers || !parsedPrices.optionCosts) {
                console.warn('Incomplete price data found, resetting to defaults');
                localStorage.removeItem('calculatorPrices');
                // Call self recursively to set defaults
                initializeCalculatorPrices();
              }
            } catch (parseError) {
              console.error('Invalid JSON in saved prices', parseError);
              localStorage.removeItem('calculatorPrices');
              // Call self recursively to set defaults
              initializeCalculatorPrices();
            }
          }
        }
      } catch (error) {
        console.error('Error accessing localStorage', error);
      }
    };
    
    checkAdminStatus();
    initializeCalculatorPrices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dakkapel Configurator | Refurbish Totaal Nederland</title>
        <meta name="description" content="Configureer eenvoudig uw ideale dakkapel op maat. Pas afmetingen, materialen en opties aan voor een nauwkeurige prijsindicatie en direct een offerte." />
      </Helmet>
      
      <Header />
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container">
          {isAdmin && (
            <div className="mb-8 flex justify-center">
              <Button 
                onClick={downloadPricesAsExcel}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Download Prijzen als Excel
              </Button>
            </div>
          )}
          
          <DakkapelConfigurator />
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default DakkapelCalculatorConceptPage;
