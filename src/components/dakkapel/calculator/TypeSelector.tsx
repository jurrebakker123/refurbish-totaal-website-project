
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DakkapelType, DakkapelConfiguration } from './DakkapelCalculator';
import { MoveRight, MoveLeft, CheckCircle } from 'lucide-react';
import { DakkapelRenderer } from './DakkapelRenderer';
import { getWidthRangeForType } from '@/utils/calculatorUtils';

interface TypeSelectorProps {
  selectedType: DakkapelType;
  onChange: (type: DakkapelType) => void;
  onNext: () => void;
  onPrevious: () => void;
  configuration: DakkapelConfiguration;
}

export function TypeSelector({ selectedType, onChange, onNext, onPrevious, configuration }: TypeSelectorProps) {
  const types: { id: DakkapelType; name: string; description: string; basePrice: number; windowCount: string }[] = [
    {
      id: 'typeA',
      name: 'Type A',
      description: 'Dakkapel één draaikiepraam',
      basePrice: 7060,
      windowCount: 'één draaikiepraam'
    },
    {
      id: 'typeB',
      name: 'Type B',
      description: 'Dakkapel één draaikiepraam',
      basePrice: 7290,
      windowCount: 'één draaikiepraam'
    },
    {
      id: 'typeC',
      name: 'Type C',
      description: 'Dakkapel twee draaikiepramen',
      basePrice: 8200,
      windowCount: 'twee draaikiepramen'
    },
    {
      id: 'typeD',
      name: 'Type D',
      description: 'Dakkapel twee draaikiepramen',
      basePrice: 8780,
      windowCount: 'twee draaikiepramen'
    },
    {
      id: 'typeE',
      name: 'Type E',
      description: 'Dakkapel twee draaikiepramen en dicht paneel',
      basePrice: 9330,
      windowCount: 'twee draaikiepramen en dicht paneel'
    }
  ];

  // New simplified model illustrations
  const modelIllustrations = {
    'typeA': '/lovable-uploads/ea63b045-9d0d-4409-b624-bea6bfa4a895.png', 
    'typeB': '/lovable-uploads/ea63b045-9d0d-4409-b624-bea6bfa4a895.png',
    'typeC': '/lovable-uploads/ea63b045-9d0d-4409-b624-bea6bfa4a895.png',
    'typeD': '/lovable-uploads/ea63b045-9d0d-4409-b624-bea6bfa4a895.png',
    'typeE': '/lovable-uploads/ea63b045-9d0d-4409-b624-bea6bfa4a895.png',
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Kies uw type dakkapel</h2>
        <p className="mb-6 text-gray-600">
          Selecteer het type dakkapel dat het beste bij uw wensen past.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 3D Preview */}
        <div className="md:col-span-1 h-[350px] border-2 border-dashed border-gray-300 bg-gray-50 rounded-md">
          <DakkapelRenderer 
            configuration={{
              ...configuration,
              type: selectedType
            }}
          />
          <div className="text-center text-sm text-gray-600 mt-2">
            3D visualisatie (draai met muis)
          </div>
        </div>

        {/* Type selection cards */}
        <div className="md:col-span-2 grid grid-cols-1 gap-4">
          {types.map((type) => {
            // Manually set the width ranges for each type
            let minWidth = "1,00";
            let maxWidth = "1,50";
            
            switch (type.id) {
              case 'typeA':
                minWidth = "1,00";
                maxWidth = "1,50";
                break;
              case 'typeB':
                minWidth = "1,50";
                maxWidth = "3,00";
                break;
              case 'typeC':
                minWidth = "3,00";
                maxWidth = "3,50";
                break;
              case 'typeD':
                minWidth = "3,50";
                maxWidth = "5,50";
                break;
              case 'typeE':
                minWidth = "3,50";
                maxWidth = "5,90";
                break;
            }

            return (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedType === type.id ? 'border-2 border-brand-lightGreen shadow-md' : 'border border-gray-200'
                }`}
                onClick={() => onChange(type.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg">{type.name}</h3>
                      {selectedType === type.id && (
                        <CheckCircle className="h-5 w-5 text-brand-lightGreen" />
                      )}
                    </div>
                    
                    {/* Simple blue dakkapel illustration */}
                    <div className="h-32 mb-4 flex items-center justify-center">
                      <img 
                        src={modelIllustrations[type.id]} 
                        alt={type.name} 
                        className="h-24 object-contain" 
                      />
                    </div>
                    
                    <p className="text-gray-600">{type.description}</p>
                    <div className="mt-4">
                      <div className="text-sm text-gray-500">
                        Min {minWidth} m - max {maxWidth} m
                      </div>
                      <div className="font-medium text-brand-darkGreen">
                        Vanaf €{type.basePrice.toLocaleString('nl-NL')},-
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={typeof onPrevious !== 'function'}
        >
          <MoveLeft className="mr-2 h-4 w-4" /> Vorige
        </Button>
        <Button 
          onClick={onNext} 
          className="bg-brand-lightGreen hover:bg-opacity-90"
        >
          Volgende <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
