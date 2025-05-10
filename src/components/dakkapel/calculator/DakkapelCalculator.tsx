import React, { useState, useEffect } from 'react';
import { TypeSelector } from './TypeSelector';
import { DimensionsSelector } from './DimensionsSelector';
import { MaterialSelector } from './MaterialSelector';
import { OptionsSelector } from './OptionsSelector';
import { PriceDisplay } from './PriceDisplay';
import { calculateTotalPrice } from '@/utils/calculatorUtils';
import { ContactFormSelector } from './ContactFormSelector';
import { DakkapelRenderer } from './DakkapelRenderer';

export type DakkapelType = 'typeA' | 'typeB' | 'typeC' | 'typeD' | 'typeE';
export type MaterialType = 'kunststof' | 'hout' | 'aluminium' | 'standaard' | 'kunststof_rabat' | 'kunststof_rabat_boeideel' | 'polyester_glad' | 'polyester_rabat';
export type KozijnHoogte = 'standaard' | 'medium' | 'large' | 'extra_large';
export type WoningZijde = 'achter' | 'voor' | 'zijkant';
export type RCWaarde = 'standaard' | 'upgrade_6_0' | 'upgrade_6_5';
export type DakHelling = 'kleiner_dan_40' | 'tussen_40_45' | 'groter_dan_45';

export type KleurOptie = 'wit' | 'crème' | 'grijs' | 'antraciet' | 'zwart' | 'staalblauw' | 'dennengroen';

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
  kader_dakkapel: boolean;
  voorbereiden_rolluiken: boolean;
  minirooftop: boolean;
  dak_versteviging: boolean;
  ventilatieroosters: boolean;
  sporenkap: boolean;
};

export interface DakkapelConfiguration {
  type: DakkapelType;
  breedte: number;
  hoogte: number;
  materiaal: MaterialType;
  dakHelling: number;
  dakHellingType: DakHelling;
  aantalRamen: number;
  kleurKozijnen: KleurOptie;
  kleurZijkanten: KleurOptie;
  kleurDraaikiepramen: KleurOptie;
  kozijnHoogte: KozijnHoogte;
  woningZijde: WoningZijde;
  rcWaarde: RCWaarde;
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
    dakHellingType: 'tussen_40_45',
    aantalRamen: 2,
    kleurKozijnen: 'wit',
    kleurZijkanten: 'wit',
    kleurDraaikiepramen: 'wit',
    kozijnHoogte: 'standaard',
    woningZijde: 'achter',
    rcWaarde: 'standaard',
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
    },
  });
  
  // Add a state to track price changes
  const [priceUpdateCounter, setPriceUpdateCounter] = useState(0);
  const totalPrice = calculateTotalPrice(configuration);

  // Listen for localStorage changes to refresh prices
  useEffect(() => {
    const handleStorageChange = () => {
      setPriceUpdateCounter(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // This will force the price to recalculate when prices are updated in admin
  useEffect(() => {
    const interval = setInterval(() => {
      // Check if localStorage has changed every 5 seconds
      setPriceUpdateCounter(prev => prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const updateType = (type: DakkapelType) => {
    setConfiguration({ ...configuration, type });
  };

  const updateDimensions = (breedte: number, hoogte: number) => {
    setConfiguration({ ...configuration, breedte, hoogte });
  };

  const updateMaterial = (materiaal: MaterialType, kleurKozijnen: KleurOptie, kleurZijkanten: KleurOptie, dakHelling: number, dakHellingType: DakHelling, rcWaarde: RCWaarde) => {
    setConfiguration({ 
      ...configuration, 
      materiaal, 
      kleurKozijnen, 
      kleurZijkanten, 
      dakHelling,
      dakHellingType,
      rcWaarde
    });
  };

  const updateOptions = (
    opties: Partial<DakkapelOptions>, 
    aantalRamen?: number, 
    kozijnHoogte?: KozijnHoogte, 
    woningZijde?: WoningZijde,
    kleurDraaikiepramen?: KleurOptie
  ) => {
    setConfiguration({
      ...configuration,
      opties: { ...configuration.opties, ...opties },
      ...(aantalRamen !== undefined ? { aantalRamen } : {}),
      ...(kozijnHoogte !== undefined ? { kozijnHoogte } : {}),
      ...(woningZijde !== undefined ? { woningZijde } : {}),
      ...(kleurDraaikiepramen !== undefined ? { kleurDraaikiepramen } : {})
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
          configuration={configuration}
        />
      )}

      {step === 2 && (
        <DimensionsSelector
          breedte={configuration.breedte}
          hoogte={configuration.hoogte}
          onChange={updateDimensions}
          onNext={nextStep}
          configuration={configuration}
        />
      )}

      {step === 3 && (
        <MaterialSelector
          selectedMaterial={configuration.materiaal}
          kleurKozijnen={configuration.kleurKozijnen}
          kleurZijkanten={configuration.kleurZijkanten}
          dakHelling={configuration.dakHelling}
          dakHellingType={configuration.dakHellingType}
          rcWaarde={configuration.rcWaarde}
          onChange={updateMaterial}
          onPrevious={previousStep}
          onNext={nextStep}
          configuration={configuration}
        />
      )}

      {step === 4 && (
        <OptionsSelector
          selectedOptions={configuration.opties}
          aantalRamen={configuration.aantalRamen}
          kozijnHoogte={configuration.kozijnHoogte}
          woningZijde={configuration.woningZijde}
          kleurDraaikiepramen={configuration.kleurDraaikiepramen}
          onChange={updateOptions}
          onPrevious={previousStep}
          onNext={nextStep}
          configuration={configuration}
        />
      )}

      {step === 5 && (
        <PriceDisplay
          configuration={configuration}
          totalPrice={totalPrice}
          onPrevious={previousStep}
          onNext={nextStep}
        />
      )}

      {step === 6 && (
        <ContactFormSelector
          configuration={configuration}
          onPrevious={previousStep}
          onNext={() => {}}
        />
      )}
    </div>
  );
}
