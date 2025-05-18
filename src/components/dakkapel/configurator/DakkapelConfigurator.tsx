
import React, { useState } from 'react';
import { WidthStep } from './steps/WidthStep';
import { RoofAngleStep } from './steps/RoofAngleStep';
import { ModelStep } from './steps/ModelStep';
import { MaterialStep } from './steps/MaterialStep';
import { ColorStep } from './steps/ColorStep';
import { ExtrasStep } from './steps/ExtrasStep';
import { DeliveryTimeStep } from './steps/DeliveryTimeStep';
import { ContactFormStep } from './steps/ContactFormStep';
import { ConfigurationSummary } from './ConfigurationSummary';

export type DakkapelWidth = '0-180' | '180-240' | '240-300' | '300-360' | '360-420' | '420-480' | '480-540' | '540+';
export type RoofAngle = '45-60' | '35-45' | '25-35' | 'unknown';
export type DakkapelModel = 'flat' | 'sloped' | 'double-ridge' | 'single-ridge';
export type FinishMaterial = 'keralit' | 'wood' | 'zinc';
export type ColorOption = 'wit' | 'crème' | 'blauw' | 'groen' | 'antraciet' | 'kwartsgrijs' | 'anders';
export type DeliveryTime = 'asap' | '3-6' | '6-9' | '9+';

export interface DakkapelConfiguration {
  width: DakkapelWidth;
  roofAngle: RoofAngle;
  model: DakkapelModel;
  material: FinishMaterial;
  colors: {
    rafters: ColorOption;
    sides: ColorOption;
    frames: ColorOption;
    movingParts: ColorOption;
  };
  extras: {
    ventilationGrids: boolean;
    sunShade: boolean;
    insectScreens: boolean;
    airConditioning: boolean;
  };
  deliveryTime: DeliveryTime;
  contact?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    comments: string;
  };
}

export interface StepProps {
  configuration: DakkapelConfiguration;
  updateConfiguration: (updates: Partial<DakkapelConfiguration>) => void;
  nextStep: () => void;
  prevStep?: () => void;
  currentPrice: number;
}

export const DakkapelConfigurator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [configuration, setConfiguration] = useState<DakkapelConfiguration>({
    width: '240-300',
    roofAngle: '45-60',
    model: 'flat',
    material: 'keralit',
    colors: {
      rafters: 'wit',
      sides: 'wit',
      frames: 'wit',
      movingParts: 'wit'
    },
    extras: {
      ventilationGrids: false,
      sunShade: false,
      insectScreens: false,
      airConditioning: false
    },
    deliveryTime: 'asap'
  });

  const calculatePrice = (): number => {
    // Base price based on width
    let basePrice = 0;
    switch(configuration.width) {
      case '0-180': basePrice = 6100; break;
      case '180-240': basePrice = 6575; break;
      case '240-300': basePrice = 6985; break;
      case '300-360': basePrice = 7575; break;
      case '360-420': basePrice = 8000; break;
      case '420-480': basePrice = 8430; break;
      case '480-540': basePrice = 8860; break;
      case '540+': basePrice = 9300; break;
      default: basePrice = 6985;
    }
    
    // Material adjustments
    const materialMultiplier = configuration.material === 'keralit' ? 1 : 
                              configuration.material === 'wood' ? 1.15 : 1.25;
    
    // Extra options
    let extrasPrice = 0;
    if (configuration.extras.ventilationGrids) extrasPrice += 350;
    if (configuration.extras.sunShade) extrasPrice += 850;
    if (configuration.extras.insectScreens) extrasPrice += 250;
    if (configuration.extras.airConditioning) extrasPrice += 1500;
    
    // Model adjustments
    const modelMultiplier = configuration.model === 'flat' ? 1 : 
                          configuration.model === 'sloped' ? 1.1 :
                          configuration.model === 'double-ridge' ? 1.2 : 1.15;
    
    // Calculate final price
    return Math.round((basePrice * materialMultiplier * modelMultiplier) + extrasPrice);
  };

  const updateConfiguration = (updates: Partial<DakkapelConfiguration>) => {
    setConfiguration(prev => ({
      ...prev,
      ...updates,
      colors: {
        ...prev.colors,
        ...(updates.colors || {})
      },
      extras: {
        ...prev.extras,
        ...(updates.extras || {})
      }
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const currentPrice = calculatePrice();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 relative">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-2/3">
          {step === 1 && (
            <WidthStep 
              configuration={configuration} 
              updateConfiguration={updateConfiguration} 
              nextStep={nextStep} 
              currentPrice={currentPrice}
            />
          )}
          {step === 2 && (
            <RoofAngleStep 
              configuration={configuration} 
              updateConfiguration={updateConfiguration} 
              nextStep={nextStep} 
              prevStep={prevStep} 
              currentPrice={currentPrice}
            />
          )}
          {step === 3 && (
            <ModelStep 
              configuration={configuration} 
              updateConfiguration={updateConfiguration} 
              nextStep={nextStep} 
              prevStep={prevStep}
              currentPrice={currentPrice} 
            />
          )}
          {step === 4 && (
            <MaterialStep 
              configuration={configuration} 
              updateConfiguration={updateConfiguration} 
              nextStep={nextStep} 
              prevStep={prevStep}
              currentPrice={currentPrice} 
            />
          )}
          {step === 5 && (
            <ColorStep 
              configuration={configuration} 
              updateConfiguration={updateConfiguration} 
              nextStep={nextStep} 
              prevStep={prevStep} 
              currentPrice={currentPrice}
            />
          )}
          {step === 6 && (
            <ExtrasStep 
              configuration={configuration} 
              updateConfiguration={updateConfiguration} 
              nextStep={nextStep} 
              prevStep={prevStep}
              currentPrice={currentPrice} 
            />
          )}
          {step === 7 && (
            <DeliveryTimeStep 
              configuration={configuration} 
              updateConfiguration={updateConfiguration} 
              nextStep={nextStep} 
              prevStep={prevStep} 
              currentPrice={currentPrice}
            />
          )}
          {step === 8 && (
            <ContactFormStep 
              configuration={configuration} 
              updateConfiguration={updateConfiguration} 
              nextStep={() => {}} 
              prevStep={prevStep} 
              currentPrice={currentPrice}
            />
          )}
        </div>
        
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <ConfigurationSummary 
            configuration={configuration} 
            currentStep={step}
            currentPrice={currentPrice}
          />
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-8">
        <div className="flex justify-between mb-2 text-xs text-gray-500">
          <span>Start</span>
          <span>Afgerond</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-lightGreen h-2 rounded-full transition-all duration-500" 
            style={{ width: `${(step / 8) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-brand-darkGreen font-medium">Stap {step} van 8</span>
          <span>{Math.round((step / 8) * 100)}% voltooid</span>
        </div>
      </div>
    </div>
  );
};
