
import React, { useState, useEffect, useCallback } from 'react';
import { TypeSelector } from './TypeSelector';
import { DimensionsSelector } from './DimensionsSelector';
import { MaterialSelector } from './MaterialSelector';
import { OptionsSelector } from './OptionsSelector';
import { PriceDisplay } from './PriceDisplay';
import { calculateTotalPrice } from '@/utils/calculatorUtils';
import { ContactFormSelector } from './ContactFormSelector';
import { DakkapelRenderer } from './DakkapelRenderer';
import { toast } from 'sonner';

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
  
  // Add states to track price changes and loading
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);

  // Calculate the total price whenever the configuration changes
  const updatePrice = useCallback(() => {
    const calculatedPrice = calculateTotalPrice(configuration);
    setTotalPrice(calculatedPrice);
  }, [configuration]);

  // Update price initially and when configuration changes
  useEffect(() => {
    updatePrice();
  }, [configuration, updatePrice]);

  // Handle price updates from admin panel
  const handlePriceUpdate = useCallback(() => {
    console.log('Price update detected in calculator');
    setIsLoadingPrices(true);
    
    // Toast notification
    toast.info('Prijzen worden bijgewerkt...', { duration: 2000 });
    
    // Short delay to show loading state
    setTimeout(() => {
      updatePrice();
      setIsLoadingPrices(false);
      toast.success('Prijzen zijn bijgewerkt', { duration: 2000 });
    }, 500);
  }, [updatePrice]);
  
  // Listen for localStorage changes and custom events
  useEffect(() => {
    // Listen for storage events (from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'calculatorPrices') {
        console.log('Storage event detected for calculatorPrices');
        handlePriceUpdate();
      }
    };
    
    // Listen for custom events (from same tab)
    const handleCustomEvent = () => {
      console.log('Custom priceUpdate event detected');
      handlePriceUpdate();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('priceUpdate', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('priceUpdate', handleCustomEvent);
    };
  }, [handlePriceUpdate]);

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
    <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {isLoadingPrices && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-50 rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mb-4">
              <div className="w-12 h-12 border-4 border-brand-lightGreen border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="text-brand-darkGreen font-medium">Prijzen worden bijgewerkt...</p>
          </div>
        </div>
      )}
      
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
