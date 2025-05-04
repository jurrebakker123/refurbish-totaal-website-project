
import React, { useState } from 'react';
import { TypeSelector } from './TypeSelector';
import { DimensionsSelector } from './DimensionsSelector';
import { MaterialSelector } from './MaterialSelector';
import { OptionsSelector } from './OptionsSelector';
import { PriceDisplay } from './PriceDisplay';
import { calculateTotalPrice } from '@/utils/calculatorUtils';
import { ContactFormSelector } from './ContactFormSelector';

export interface DakkapelConfiguration {
  type: 'prefab' | 'maatwerk' | 'renovatie';
  breedte: number;
  hoogte: number;
  materiaal: 'kunststof' | 'hout' | 'aluminium';
  opties: {
    ventilatie: boolean;
    zonwering: boolean;
    gootafwerking: boolean;
    extra_isolatie: boolean;
  };
}

export function DakkapelCalculator() {
  const [step, setStep] = useState(1);
  const [configuration, setConfiguration] = useState<DakkapelConfiguration>({
    type: 'prefab',
    breedte: 300,
    hoogte: 175,
    materiaal: 'kunststof',
    opties: {
      ventilatie: false,
      zonwering: false,
      gootafwerking: false,
      extra_isolatie: false,
    },
  });

  const totalPrice = calculateTotalPrice(configuration);

  const updateType = (type: 'prefab' | 'maatwerk' | 'renovatie') => {
    setConfiguration({ ...configuration, type });
  };

  const updateDimensions = (breedte: number, hoogte: number) => {
    setConfiguration({ ...configuration, breedte, hoogte });
  };

  const updateMaterial = (materiaal: 'kunststof' | 'hout' | 'aluminium') => {
    setConfiguration({ ...configuration, materiaal });
  };

  const updateOptions = (opties: { [key: string]: boolean }) => {
    setConfiguration({
      ...configuration,
      opties: { ...configuration.opties, ...opties },
    });
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const previousStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {step === 1 && (
        <TypeSelector
          selectedType={configuration.type}
          onChange={updateType}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <DimensionsSelector
          breedte={configuration.breedte}
          hoogte={configuration.hoogte}
          onChange={updateDimensions}
          onNext={nextStep}
        />
      )}

      {step === 3 && (
        <MaterialSelector
          selectedMaterial={configuration.materiaal}
          onChange={updateMaterial}
          onPrevious={previousStep}
          onNext={nextStep}
        />
      )}

      {step === 4 && (
        <OptionsSelector
          options={configuration.opties}
          onChange={updateOptions}
          onPrevious={previousStep}
          onNext={nextStep}
        />
      )}

      {step === 5 && (
        <ContactFormSelector
          configuration={configuration}
          onPrevious={previousStep}
          onNext={nextStep}
        />
      )}

      {step === 6 && (
        <PriceDisplay
          configuration={configuration}
          totalPrice={totalPrice}
          onPrevious={previousStep}
        />
      )}
    </div>
  );
}
