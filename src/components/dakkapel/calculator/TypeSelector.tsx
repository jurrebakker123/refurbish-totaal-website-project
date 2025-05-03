
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DakkapelType } from './DakkapelCalculator';
import { MoveRight, MoveLeft, CheckCircle } from 'lucide-react';

interface TypeSelectorProps {
  selectedType: DakkapelType;
  onChange: (type: DakkapelType) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function TypeSelector({ selectedType, onChange, onNext, onPrevious }: TypeSelectorProps) {
  const types: { id: DakkapelType; name: string; description: string }[] = [
    {
      id: 'prefab',
      name: 'Prefab Dakkapel',
      description: 'Voordelige, vooraf gefabriceerde dakkapel die snel geplaatst kan worden.',
    },
    {
      id: 'maatwerk',
      name: 'Maatwerk Dakkapel',
      description: 'Volledig op maat gemaakte dakkapel met meer mogelijkheden voor aanpassingen.',
    },
    {
      id: 'renovatie',
      name: 'Dakkapel Renovatie',
      description: 'Renovatie van een bestaande dakkapel voor een verbeterde uitstraling en isolatie.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Kies uw type dakkapel</h2>
        <p className="mb-6 text-gray-600">
          Selecteer het type dakkapel dat het beste bij uw wensen past.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </CardContent>
          </Card>
        ))}
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
          Volgende <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
