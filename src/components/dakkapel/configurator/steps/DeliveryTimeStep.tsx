
import React from 'react';
import { StepProps, DeliveryTime } from '../DakkapelConfigurator';
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';

const deliveryTimeOptions: Array<{
  value: DeliveryTime;
  label: string;
  description: string;
}> = [
  { 
    value: 'asap', 
    label: 'Zo snel mogelijk', 
    description: 'Wij plannen dit zo spoedig mogelijk in'
  },
  { 
    value: '3-6', 
    label: 'Binnen 3 - 6 maanden', 
    description: 'Flexibele planning op middellange termijn'
  },
  { 
    value: '6-9', 
    label: 'Binnen 6 - 9 maanden', 
    description: 'Planning op langere termijn'
  },
  { 
    value: '9+', 
    label: '9 maanden of later', 
    description: 'Ver vooruit plannen'
  }
];

export const DeliveryTimeStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  nextStep, 
  prevStep,
  currentPrice
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Stap 7 - Gewenste levertijd</h2>
      <p className="mb-6 text-lg">Wat is uw gewenste uitvoeringsmoment?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {deliveryTimeOptions.map((option) => (
          <div 
            key={option.value}
            onClick={() => updateConfiguration({ deliveryTime: option.value })}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${configuration.deliveryTime === option.value 
                ? 'border-brand-lightGreen bg-green-50' 
                : 'border-gray-200 hover:border-brand-lightGreen hover:bg-green-50/30'}
            `}
          >
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-darkGreen mr-3">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="font-medium">{option.label}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              
              {configuration.deliveryTime === option.value && (
                <div className="ml-auto h-6 w-6 bg-brand-lightGreen rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
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
