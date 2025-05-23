
import React from 'react';
import { StepProps } from '../DakkapelConfigurator';
import { ArrowRight, ArrowLeft, Wind, Sun, Shield, Snowflake } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const extraOptions = [
  { 
    id: 'ventilationGrids', 
    name: 'Ventilatieroosters', 
    description: 'Zorgt voor goede luchtcirculatie', 
    price: 350,
    icon: <Wind className="h-16 w-16 text-brand-darkGreen" />
  },
  { 
    id: 'sunShade', 
    name: 'Zonwering (Somfy-Ilmo motor)', 
    description: 'Houdt de warmte buiten', 
    price: 850,
    icon: <Sun className="h-16 w-16 text-brand-darkGreen" />
  },
  { 
    id: 'insectScreens', 
    name: 'Horren', 
    description: 'Houdt insecten buiten', 
    price: 250,
    icon: <Shield className="h-16 w-16 text-brand-darkGreen" />
  },
  { 
    id: 'airConditioning', 
    name: 'Airco', 
    description: 'Voor optimaal klimaatbeheer', 
    price: 1500,
    icon: <Snowflake className="h-16 w-16 text-brand-darkGreen" />
  }
];

export const ExtrasStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  nextStep, 
  prevStep,
  currentPrice
}) => {
  const handleExtraToggle = (extraId: keyof typeof configuration.extras) => {
    updateConfiguration({
      extras: {
        ...configuration.extras,
        [extraId]: !configuration.extras[extraId]
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Stap 6 - Extra's</h2>
      <p className="mb-6 text-lg">Wilt u extra opties?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {extraOptions.map((option) => {
          const optionId = option.id as keyof typeof configuration.extras;
          return (
            <div 
              key={option.id}
              className={`
                border rounded-lg overflow-hidden transition-all duration-200 p-4
                ${configuration.extras[optionId] 
                  ? 'border-brand-lightGreen bg-green-50' 
                  : 'border-gray-200'}
              `}
            >
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <Checkbox 
                    id={option.id}
                    checked={configuration.extras[optionId]}
                    onCheckedChange={() => handleExtraToggle(optionId)}
                  />
                </div>
                <div className="ml-3 flex-grow">
                  <label htmlFor={option.id} className="font-medium text-lg cursor-pointer">
                    {option.name}
                  </label>
                  <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                  <p className="text-sm font-medium text-brand-darkGreen">+ €{option.price.toLocaleString('nl-NL')},-</p>
                </div>
                <div className="w-20 h-20 ml-3 flex items-center justify-center">
                  {option.icon}
                </div>
              </div>
            </div>
          );
        })}
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
