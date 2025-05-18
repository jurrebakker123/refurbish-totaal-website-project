
import React from 'react';
import { StepProps, FinishMaterial } from '../DakkapelConfigurator';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

const materialOptions: Array<{
  value: FinishMaterial;
  label: string;
  description: string;
  imagePath: string;
}> = [
  { 
    value: 'keralit', 
    label: 'Keralit', 
    description: 'Onderhoudsarm en duurzaam',
    imagePath: '/lovable-uploads/33476cb2-cc9e-44d6-8401-288c1a3cf6e6.png'
  },
  { 
    value: 'wood', 
    label: 'Hout', 
    description: 'Natuurlijke uitstraling',
    imagePath: '/lovable-uploads/1ef85418-8169-4287-a7a9-d17396d8680b.png'
  },
  { 
    value: 'zinc', 
    label: 'Zink', 
    description: 'Stijlvol en modern',
    imagePath: '/lovable-uploads/dc6d5fa1-8797-4d60-9de0-5493bc6fe9b3.png'
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
            <div className="aspect-[3/2] relative bg-gray-50">
              <OptimizedImage
                src={option.imagePath}
                alt={option.label}
                className="w-full h-full object-cover"
                objectFit="cover"
              />
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
