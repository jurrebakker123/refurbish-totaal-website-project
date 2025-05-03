
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MaterialType } from './DakkapelCalculator';
import { MoveRight, MoveLeft, CheckCircle } from 'lucide-react';

interface MaterialSelectorProps {
  selectedMaterial: MaterialType;
  onChange: (material: MaterialType) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function MaterialSelector({ 
  selectedMaterial, 
  onChange, 
  onNext, 
  onPrevious 
}: MaterialSelectorProps) {
  const materials: { id: MaterialType; name: string; description: string }[] = [
    {
      id: 'kunststof',
      name: 'Kunststof',
      description: 'Onderhoudsvriendelijk en voordelig. Goede isolatiewaarde en lange levensduur.',
    },
    {
      id: 'hout',
      name: 'Hout',
      description: 'Klassieke uitstraling met natuurlijke charme. Vakkundig onderhouden voor lange levensduur.',
    },
    {
      id: 'aluminium',
      name: 'Aluminium',
      description: 'Modern en duurzaam. Onderhoudsarm met uitstekende weerbestendigheid.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Kies uw materiaal</h2>
        <p className="mb-6 text-gray-600">
          Selecteer het materiaal voor de kozijnen en afwerking van uw dakkapel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materials.map((material) => (
          <Card 
            key={material.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedMaterial === material.id ? 'border-2 border-brand-lightGreen shadow-md' : 'border border-gray-200'
            }`}
            onClick={() => onChange(material.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-lg">{material.name}</h3>
                {selectedMaterial === material.id && (
                  <CheckCircle className="h-5 w-5 text-brand-lightGreen" />
                )}
              </div>
              <p className="text-gray-600 mt-2">{material.description}</p>
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
