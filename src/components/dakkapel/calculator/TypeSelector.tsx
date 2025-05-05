
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DakkapelType, DakkapelConfiguration } from './DakkapelCalculator';
import { MoveRight, MoveLeft, CheckCircle } from 'lucide-react';
import { DakkapelRenderer } from './DakkapelRenderer';

interface TypeSelectorProps {
  selectedType: DakkapelType;
  onChange: (type: DakkapelType) => void;
  onNext: () => void;
  onPrevious: () => void;
  configuration: DakkapelConfiguration;
}

export function TypeSelector({ selectedType, onChange, onNext, onPrevious, configuration }: TypeSelectorProps) {
  const types: { id: DakkapelType; name: string; description: string; basePrice: number; width: string }[] = [
    {
      id: 'typeA',
      name: 'Type A',
      description: 'Kleine dakkapel met één draaikiepraam',
      basePrice: 7060,
      width: '1 meter'
    },
    {
      id: 'typeB',
      name: 'Type B',
      description: 'Middelgrote dakkapel met één draaikiepraam',
      basePrice: 7290,
      width: '2 meter'
    },
    {
      id: 'typeC',
      name: 'Type C',
      description: 'Ruime dakkapel met twee draaikiepramen',
      basePrice: 8200,
      width: '3 meter'
    },
    {
      id: 'typeD',
      name: 'Type D',
      description: 'Grote dakkapel met twee of drie draaikiepramen',
      basePrice: 8780,
      width: '4 meter'
    },
    {
      id: 'typeE',
      name: 'Type E',
      description: 'Extra brede dakkapel met drie of vier draaikiepramen',
      basePrice: 9330,
      width: '5 meter'
    }
  ];

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
          {types.map((type) => (
            <Card 
              key={type.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedType === type.id ? 'border-2 border-brand-lightGreen shadow-md' : 'border border-gray-200'
              }`}
              onClick={() => onChange(type.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg">{type.name}</h3>
                  {selectedType === type.id && (
                    <CheckCircle className="h-5 w-5 text-brand-lightGreen" />
                  )}
                </div>
                <p className="text-gray-600 mt-2">{type.description}</p>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">Breedte: {type.width}</div>
                  <div className="font-medium text-brand-darkGreen">
                    Vanaf €{type.basePrice.toLocaleString('nl-NL')},-
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
