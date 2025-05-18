
import React from 'react';
import { StepProps, RoofAngle } from '../DakkapelConfigurator';
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';

const roofAngleOptions: Array<{
  value: RoofAngle;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  { 
    value: '45-60', 
    label: '45° - 60°', 
    description: 'Meest gekozen', 
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 22L12 6L21 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) 
  },
  { 
    value: '35-45', 
    label: '35° - 45°', 
    description: 'Gemiddelde helling', 
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 22L12 10L21 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) 
  },
  { 
    value: '25-35', 
    label: '25° - 35°', 
    description: 'Lage helling', 
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 22L12 14L21 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) 
  },
  { 
    value: 'unknown', 
    label: 'Weet ik niet', 
    description: 'Wij meten dit gratis voor u in', 
    icon: <HelpCircle className="w-12 h-12" />
  }
];

export const RoofAngleStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  nextStep, 
  prevStep,
  currentPrice
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Stap 2 - Helling van het dak</h2>
      <p className="mb-6 text-lg">Wat is de helling van uw dak?</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {roofAngleOptions.map((option) => (
          <div 
            key={option.value}
            onClick={() => updateConfiguration({ roofAngle: option.value })}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${configuration.roofAngle === option.value 
                ? 'border-brand-lightGreen bg-green-50' 
                : 'border-gray-200 hover:border-brand-lightGreen hover:bg-green-50/30'}
            `}
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-gray-700 mb-2">
                {option.icon}
              </div>
              <h3 className="font-medium text-lg">{option.label}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
            
            {configuration.roofAngle === option.value && (
              <div className="absolute top-3 right-3 h-6 w-6 bg-brand-lightGreen rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={prevStep}
          className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300"
        >
          <ArrowLeft size={18} />
          <span>Vorige stap</span>
        </button>
        
        <button
          onClick={nextStep}
          className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300"
        >
          <span>Volgende stap</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
