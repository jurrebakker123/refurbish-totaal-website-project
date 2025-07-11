
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TypeSelector } from './TypeSelector';
import { DimensionSelector } from './DimensionSelector';
import { MaterialSelector } from './MaterialSelector';
import { OptionsSelector } from './OptionsSelector';
import { ContactForm } from './ContactForm';
import { PriceSummary } from './PriceSummary';
import { calculateTotalPrice } from '@/utils/calculatorUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type DakkapelType = 'typeA' | 'typeB' | 'typeC' | 'typeD' | 'typeE';
export type MaterialType = 'kunststof' | 'hout' | 'aluminium' | 'standaard' | 'kunststof_rabat' | 'kunststof_rabat_boeideel' | 'polyester_glad' | 'polyester_rabat';
export type KozijnHoogte = 'standaard' | 'medium' | 'large' | 'extra_large';
export type RCWaarde = 'standaard' | 'upgrade_6_0' | 'upgrade_6_5';

export interface DakkapelConfiguration {
  type: DakkapelType;
  breedte: number;
  hoogte: number;
  diepte: number;
  materiaal: MaterialType;
  kozijnHoogte: KozijnHoogte;
  rcWaarde: RCWaarde;
  dakHelling: number;
  dakHellingType: string;
  aantalRamen: number;
  kleurKozijnen: string;
  kleurZijkanten: string;
  kleurDraaikiepramen: string;
  opties: {
    ventilatie: boolean;
    zonwering: boolean;
    gootafwerking: boolean;
    extra_isolatie: boolean;
    extra_draaikiepraam: boolean;
    horren: boolean;
    elektrisch_rolluik: boolean;
    verwijderen_bestaande: boolean;
    afvoeren_bouwafval: boolean;
    kader_dakkapel: boolean;
    voorbereiden_rolluiken: boolean;
    minirooftop: boolean;
    dak_versteviging: boolean;
    ventilatieroosters: boolean;
    sporenkap: boolean;
  };
  contactInfo?: {
    naam: string;
    email: string;
    telefoon: string;
    adres: string;
    postcode: string;
    plaats: string;
    opmerkingen: string;
  };
}

const initialConfiguration: DakkapelConfiguration = {
  type: 'typeB',
  breedte: 200,
  hoogte: 110,
  diepte: 80,
  materiaal: 'kunststof',
  kozijnHoogte: 'standaard',
  rcWaarde: 'standaard',
  dakHelling: 42,
  dakHellingType: 'tussen_40_45',
  aantalRamen: 1,
  kleurKozijnen: 'wit',
  kleurZijkanten: 'wit',
  kleurDraaikiepramen: 'wit',
  opties: {
    ventilatie: false,
    zonwering: false,
    gootafwerking: false,
    extra_isolatie: false,
    extra_draaikiepraam: false,
    horren: false,
    elektrisch_rolluik: false,
    verwijderen_bestaande: false,
    afvoeren_bouwafval: false,
    kader_dakkapel: false,
    voorbereiden_rolluiken: false,
    minirooftop: false,
    dak_versteviging: false,
    ventilatieroosters: false,
    sporenkap: false,
  }
};

export function DakkapelCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [configuration, setConfiguration] = useState<DakkapelConfiguration>(initialConfiguration);
  
  const steps = [
    { title: 'Type selecteren', component: TypeSelector },
    { title: 'Afmetingen', component: DimensionSelector },
    { title: 'Materiaal', component: MaterialSelector },
    { title: 'Opties', component: OptionsSelector },
    { title: 'Contactgegevens', component: ContactForm }
  ];

  const currentPrice = calculateTotalPrice(configuration);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateConfiguration = (updates: Partial<DakkapelConfiguration>) => {
    setConfiguration(prev => ({ ...prev, ...updates }));
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Dakkapel Calculator</h1>
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index <= currentStep ? 'text-brand-lightGreen' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep
                    ? 'border-brand-lightGreen bg-brand-lightGreen text-white'
                    : 'border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 hidden md:inline">{step.title}</span>
              {index < steps.length - 1 && (
                <ChevronRight className="mx-2 h-4 w-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <StepComponent
                configuration={configuration}
                updateConfiguration={updateConfiguration}
                onNext={nextStep}
                onPrevious={previousStep}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <PriceSummary 
            configuration={configuration} 
            totalPrice={currentPrice}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={previousStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Vorige
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="bg-brand-lightGreen hover:bg-brand-darkGreen"
        >
          Volgende
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
