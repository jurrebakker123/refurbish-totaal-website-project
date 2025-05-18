
import React from 'react';
import { StepProps, DakkapelWidth } from '../DakkapelConfigurator';
import { ArrowRight } from 'lucide-react';

const widthOptions: Array<{
  value: DakkapelWidth;
  label: string;
  price: string;
  width: number;
}> = [
  { value: '0-180', label: '0 - 180 cm', price: '6.100', width: 180 },
  { value: '180-240', label: '180 - 240 cm', price: '6.575', width: 240 },
  { value: '240-300', label: '240 - 300 cm', price: '6.985', width: 300 },
  { value: '300-360', label: '300 - 360 cm', price: '7.575', width: 360 },
  { value: '360-420', label: '360 - 420 cm', price: '8.000', width: 420 },
  { value: '420-480', label: '420 - 480 cm', price: '8.430', width: 480 },
  { value: '480-540', label: '480 - 540 cm', price: '8.860', width: 540 },
  { value: '540+', label: 'Groter dan 540 cm', price: '9.300', width: 600 }
];

export const WidthStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  nextStep,
  currentPrice
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Stap 1 - Breedte van de dakkapel</h2>
      <p className="mb-6 text-lg">Hoe breed moet uw dakkapel worden?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {widthOptions.map((option) => (
          <div 
            key={option.value}
            onClick={() => updateConfiguration({ width: option.value })}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all duration-200 relative
              ${configuration.width === option.value 
                ? 'border-brand-lightGreen bg-green-50' 
                : 'border-gray-200 hover:border-brand-lightGreen hover:bg-green-50/30'}
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div 
                  className="h-12 bg-gray-700 rounded"
                  style={{ width: `${option.width / 12}px`, minWidth: '15px' }}
                ></div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{option.label}</h3>
                <p className="text-sm text-gray-600">vanaf €{option.price}</p>
              </div>
              {configuration.width === option.value && (
                <div className="h-6 w-6 bg-brand-lightGreen rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-10">
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
