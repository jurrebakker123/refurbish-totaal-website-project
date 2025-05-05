
import React, { useState } from 'react';
import { TypeSelector } from './TypeSelector';
import { DimensionsSelector } from './DimensionsSelector';
import { MaterialSelector } from './MaterialSelector';
import { OptionsSelector } from './OptionsSelector';
import { PriceDisplay } from './PriceDisplay';
import { calculateTotalPrice } from '@/utils/calculatorUtils';
import { ContactFormSelector } from './ContactFormSelector';

export type DakkapelType = 'typeA' | 'typeB' | 'typeC' | 'typeD' | 'typeE';
export type MaterialType = 'kunststof' | 'hout' | 'aluminium';
export type DakkapelOptions = {
  ventilatie: boolean;
  zonwering: boolean;
  gootafwerking: boolean;
  extra_isolatie: boolean;
  extra_draaikiepraam: boolean;
  horren: boolean;
  elektrisch_rolluik: boolean;
  verwijderen_bestaande: boolean;
  afvoeren_bouwafval: boolean;
};

export interface DakkapelConfiguration {
  type: DakkapelType;
  breedte: number;
  hoogte: number;
  materiaal: MaterialType;
  dakHelling: number;
  aantalRamen: number;
  kleurKozijnen: string;
  kleurZijkanten: string;
  opties: DakkapelOptions;
}

export function DakkapelCalculator() {
  const [step, setStep] = useState(1);
  const [configuration, setConfiguration] = useState<DakkapelConfiguration>({
    type: 'typeC',
    breedte: 300,
    hoogte: 175,
    materiaal: 'kunststof',
    dakHelling: 45,
    aantalRamen: 2,
    kleurKozijnen: 'wit',
    kleurZijkanten: 'wit',
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
    },
  });

  const totalPrice = calculateTotalPrice(configuration);

  const updateType = (type: DakkapelType) => {
    setConfiguration({ ...configuration, type });
  };

  const updateDimensions = (breedte: number, hoogte: number) => {
    setConfiguration({ ...configuration, breedte, hoogte });
  };

  const updateMaterial = (materiaal: MaterialType, kleurKozijnen: string, kleurZijkanten: string, dakHelling: number) => {
    setConfiguration({ 
      ...configuration, 
      materiaal, 
      kleurKozijnen, 
      kleurZijkanten, 
      dakHelling 
    });
  };

  const updateOptions = (opties: Partial<DakkapelOptions>, aantalRamen?: number) => {
    setConfiguration({
      ...configuration,
      opties: { ...configuration.opties, ...opties },
      ...(aantalRamen !== undefined ? { aantalRamen } : {})
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
          onPrevious={() => {}}
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
          kleurKozijnen={configuration.kleurKozijnen}
          kleurZijkanten={configuration.kleurZijkanten}
          dakHelling={configuration.dakHelling}
          onChange={updateMaterial}
          onPrevious={previousStep}
          onNext={nextStep}
        />
      )}

      {step === 4 && (
        <OptionsSelector
          selectedOptions={configuration.opties}
          aantalRamen={configuration.aantalRamen}
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
