
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DakkapelOptions } from './DakkapelCalculator';
import { MoveRight, MoveLeft } from 'lucide-react';

interface OptionsSelectorProps {
  selectedOptions: DakkapelOptions;
  onChange: (options: DakkapelOptions) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function OptionsSelector({ 
  selectedOptions, 
  onChange, 
  onNext, 
  onPrevious 
}: OptionsSelectorProps) {
  const options = [
    {
      id: 'ventilatie',
      label: 'Ventilatie',
      description: 'Mechanische ventilatie voor optimale luchtcirculatie',
    },
    {
      id: 'zonwering',
      label: 'Zonwering',
      description: 'Buitenzonwering om warmte en lichtinval te reguleren',
    },
    {
      id: 'gootafwerking',
      label: 'Gootafwerking',
      description: 'Hoogwaardige afwerking van dakgoten en regenwaterafvoer',
    },
    {
      id: 'extra_isolatie',
      label: 'Extra Isolatie',
      description: 'Verbeterde isolatie voor optimaal energiebehoud',
    },
  ];

  const handleOptionChange = (optionId: keyof DakkapelOptions, checked: boolean) => {
    onChange({
      ...selectedOptions,
      [optionId]: checked,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Extra Opties</h2>
        <p className="mb-6 text-gray-600">
          Selecteer de gewenste aanvullende opties voor uw dakkapel.
        </p>
      </div>

      <div className="space-y-4">
        {options.map((option) => {
          const optionId = option.id as keyof DakkapelOptions;
          return (
            <div key={option.id} className="flex items-start space-x-4 p-4 border rounded-md hover:bg-gray-50">
              <Checkbox 
                id={option.id}
                checked={selectedOptions[optionId]} 
                onCheckedChange={(checked) => handleOptionChange(optionId, checked === true)}
                className="mt-1"
              />
              <div>
                <label 
                  htmlFor={option.id} 
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  {option.label}
                </label>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
        >
          <MoveLeft className="mr-2 h-4 w-4" /> Vorige
        </Button>
        <Button 
          onClick={onNext} 
          className="bg-brand-lightGreen hover:bg-opacity-90"
        >
          Bekijk Resultaat <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
