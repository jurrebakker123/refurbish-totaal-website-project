
import React from 'react';
import { StepProps, DakkapelModel } from '../DakkapelConfigurator';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const modelOptions: Array<{
  value: DakkapelModel;
  label: string;
  description: string;
  iconSvg: JSX.Element;
}> = [
  { 
    value: 'flat', 
    label: 'Dakkapel plat dak', 
    description: 'Meest gekozen model',
    iconSvg: (
      <svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 L100 70 L100 40 L60 20 L20 40 Z" fill="#a9d0f5" stroke="#1a73e8" strokeWidth="2" />
        <line x1="20" y1="70" x2="20" y2="90" stroke="#1a73e8" strokeWidth="2" />
        <line x1="100" y1="70" x2="100" y2="90" stroke="#1a73e8" strokeWidth="2" />
      </svg>
    )
  },
  { 
    value: 'sloped', 
    label: 'Dakkapel schuin dak', 
    description: 'Past bij traditionele woningen',
    iconSvg: (
      <svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 L100 70 L100 40 L60 10 L20 40 Z" fill="#a9d0f5" stroke="#1a73e8" strokeWidth="2" />
        <line x1="20" y1="70" x2="20" y2="90" stroke="#1a73e8" strokeWidth="2" />
        <line x1="100" y1="70" x2="100" y2="90" stroke="#1a73e8" strokeWidth="2" />
        <path d="M30 55 L90 55 L90 35 L60 25 L30 35 Z" fill="#d6eaff" />
      </svg>
    )
  },
  { 
    value: 'double-ridge', 
    label: 'Dubbele nokverhoging', 
    description: 'Voor maximale ruimte',
    iconSvg: (
      <svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 L100 70 L100 40 L60 10 L20 40 Z" fill="#a9d0f5" stroke="#1a73e8" strokeWidth="2" />
        <path d="M30 62 L90 62 L90 35 L60 15 L30 35 Z" fill="#d6eaff" stroke="#1a73e8" strokeWidth="1" />
        <line x1="20" y1="70" x2="20" y2="90" stroke="#1a73e8" strokeWidth="2" />
        <line x1="100" y1="70" x2="100" y2="90" stroke="#1a73e8" strokeWidth="2" />
      </svg>
    )
  },
  { 
    value: 'single-ridge', 
    label: 'Eenzijdige nokverhoging', 
    description: 'Voor extra hoogte',
    iconSvg: (
      <svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 L100 70 L100 30 L60 20 L20 40 Z" fill="#a9d0f5" stroke="#1a73e8" strokeWidth="2" />
        <line x1="20" y1="70" x2="20" y2="90" stroke="#1a73e8" strokeWidth="2" />
        <line x1="100" y1="70" x2="100" y2="90" stroke="#1a73e8" strokeWidth="2" />
      </svg>
    )
  }
];

export const ModelStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  nextStep, 
  prevStep,
  currentPrice
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Stap 3 - Modelkeuze</h2>
      <p className="mb-6 text-lg">Welk model spreekt u aan?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {modelOptions.map((option) => (
          <div 
            key={option.value}
            onClick={() => updateConfiguration({ model: option.value })}
            className={`
              border rounded-lg overflow-hidden cursor-pointer transition-all duration-200
              ${configuration.model === option.value 
                ? 'border-brand-lightGreen ring-2 ring-brand-lightGreen' 
                : 'border-gray-200 hover:border-brand-lightGreen'}
            `}
          >
            <div className="aspect-[4/3] relative flex items-center justify-center bg-white p-4">
              <div className="w-full h-full flex items-center justify-center">
                {option.iconSvg}
              </div>
              {configuration.model === option.value && (
                <div className="absolute top-2 right-2 h-6 w-6 bg-brand-lightGreen rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{option.label}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
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
