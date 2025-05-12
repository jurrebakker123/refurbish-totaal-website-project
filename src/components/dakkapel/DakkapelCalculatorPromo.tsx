
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DakkapelCalculatorPromo() {
  return (
    <section className="bg-white py-8 border-b border-gray-200 shadow-sm">
      <div className="container">
        <div className="bg-brand-lightGreen/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left space-y-4 md:max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-darkGreen">
                  Ontvang nu €250 korting op jouw dakkapel
                </h2>
                
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-brand-green mr-2 flex-shrink-0" />
                    <span className="text-gray-700">15 jaar garantie op dakkapel constructie</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-brand-green mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Binnen één dag vakkundig geplaatst</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-6 w-6 text-brand-green mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Snelle levertijd, binnen 6 weken</span>
                  </li>
                </ul>
                
                <p className="text-gray-500 text-sm">
                  2.000+ tevreden klanten gingen jou al voor
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <Link to="/dakkapel-calculator">
                  <Button size="lg" className="bg-brand-green hover:bg-brand-darkGreen text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all px-6 py-6 text-lg">
                    <Calculator className="h-5 w-5" />
                    <span>Bereken direct uw prijs</span>
                  </Button>
                </Link>
                <p className="mt-3 text-sm text-gray-600">Direct uw dakkapel samenstellen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
