
import React from 'react';
import { StepProps, FinishMaterial } from '../DakkapelConfigurator';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const materialOptions: Array<{
  value: FinishMaterial;
  label: string;
  description: string;
  iconSvg: JSX.Element;
}> = [
  { 
    value: 'keralit', 
    label: 'Keralit', 
    description: 'Onderhoudsarm en duurzaam',
    iconSvg: (
      <svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="80" height="60" fill="none" stroke="#3498db" strokeWidth="2" />
        <line x1="20" y1="30" x2="100" y2="30" stroke="#3498db" strokeWidth="1" />
        <line x1="20" y1="40" x2="100" y2="40" stroke="#3498db" strokeWidth="1" />
        <line x1="20" y1="50" x2="100" y2="50" stroke="#3498db" strokeWidth="1" />
        <line x1="20" y1="60" x2="100" y2="60" stroke="#3498db" strokeWidth="1" />
        <line x1="20" y1="70" x2="100" y2="70" stroke="#3498db" strokeWidth="1" />
      </svg>
    )
  },
  { 
    value: 'wood', 
    label: 'Hout', 
    description: 'Natuurlijke uitstraling',
    iconSvg: (
      <svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="80" height="60" fill="none" stroke="#3498db" strokeWidth="2" />
        <path d="M30,20 C35,30 25,40 30,50 C35,60 25,70 30,80" fill="none" stroke="#3498db" strokeWidth="1.5" />
        <path d="M50,20 C55,30 45,40 50,50 C55,60 45,70 50,80" fill="none" stroke="#3498db" strokeWidth="1.5" />
        <path d="M70,20 C75,30 65,40 70,50 C75,60 65,70 70,80" fill="none" stroke="#3498db" strokeWidth="1.5" />
        <path d="M90,20 C95,30 85,40 90,50 C95,60 85,70 90,80" fill="none" stroke="#3498db" strokeWidth="1.5" />
      </svg>
    )
  },
  { 
    value: 'zinc', 
    label: 'Zink', 
    description: 'Stijlvol en modern',
    iconSvg: (
      <svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="80" height="60" fill="none" stroke="#3498db" strokeWidth="2" />
        <line x1="20" y1="20" x2="100" y2="80" stroke="#3498db" strokeWidth="1.5" />
        <line x1="100" y1="20" x2="20" y2="80" stroke="#3498db" strokeWidth="1.5" />
      </svg>
    )
  }
];

export const MaterialStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  nextStep, 
  prevStep,
  currentPrice
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Stap 4 - Afwerkmateriaal</h2>
      <p className="mb-6 text-lg">Kies uw afwerkmateriaal</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {materialOptions.map((option) => (
          <div 
            key={option.value}
            onClick={() => updateConfiguration({ material: option.value })}
            className={`
              border rounded-lg overflow-hidden cursor-pointer transition-all duration-200
              ${configuration.material === option.value 
                ? 'border-brand-lightGreen ring-2 ring-brand-lightGreen' 
                : 'border-gray-200 hover:border-brand-lightGreen'}
            `}
          >
            <div className="aspect-[3/2] relative flex items-center justify-center bg-white p-4">
              <div className="w-full h-full flex items-center justify-center">
                {option.iconSvg}
              </div>
              {configuration.material === option.value && (
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
