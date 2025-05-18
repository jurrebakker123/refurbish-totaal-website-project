
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DakkapelType, DakkapelConfiguration } from './DakkapelCalculator';
import { MoveRight, MoveLeft, CheckCircle, Home } from 'lucide-react';
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
  
  // Function to render the icon for each type
  const renderDakkapelIcon = (type: DakkapelType) => {
    switch(type) {
      case 'typeA':
        // Simple flat roof dakkapel with one window
        return (
          <div className="flex flex-col items-center justify-center h-28 w-full">
            <div className="w-32 h-4 bg-gray-400"></div>
            <div className="w-28 h-20 border-2 border-gray-400 flex items-center justify-center">
              <div className="w-16 h-16 border border-gray-500"></div>
            </div>
          </div>
        );
      case 'typeB':
        // Wider flat roof dakkapel with one window
        return (
          <div className="flex flex-col items-center justify-center h-28 w-full">
            <div className="w-36 h-4 bg-gray-400"></div>
            <div className="w-32 h-20 border-2 border-gray-400 flex items-center justify-center">
              <div className="w-16 h-16 border border-gray-500"></div>
            </div>
          </div>
        );
      case 'typeC':
        // Flat roof dakkapel with two windows
        return (
          <div className="flex flex-col items-center justify-center h-28 w-full">
            <div className="w-36 h-4 bg-gray-400"></div>
            <div className="w-32 h-20 border-2 border-gray-400 flex items-center justify-center gap-1">
              <div className="w-14 h-16 border border-gray-500"></div>
              <div className="w-14 h-16 border border-gray-500"></div>
            </div>
          </div>
        );
      case 'typeD':
        // Wider flat roof dakkapel with two windows
        return (
          <div className="flex flex-col items-center justify-center h-28 w-full">
            <div className="w-40 h-4 bg-gray-400"></div>
            <div className="w-36 h-20 border-2 border-gray-400 flex items-center justify-center gap-3">
              <div className="w-14 h-16 border border-gray-500"></div>
              <div className="w-14 h-16 border border-gray-500"></div>
            </div>
          </div>
        );
      case 'typeE':
        // Flat roof dakkapel with two windows and panel
        return (
          <div className="flex flex-col items-center justify-center h-28 w-full">
            <div className="w-44 h-4 bg-gray-400"></div>
            <div className="w-40 h-20 border-2 border-gray-400 flex items-center justify-center gap-2">
              <div className="w-12 h-16 border border-gray-500"></div>
              <div className="w-12 h-16 border border-gray-500"></div>
              <div className="w-10 h-16 bg-gray-300"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-28 w-full">
            <Home size={48} className="text-gray-400" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Kies uw type dakkapel</h2>
        <p className="mb-6 text-gray-600">
          Selecteer het type dakkapel dat het beste bij uw wensen past.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg">{type.name}</h3>
                  {selectedType === type.id && (
                    <CheckCircle className="h-5 w-5 text-brand-lightGreen" />
                  )}
                </div>
                
                {/* Dakkapel icon */}
                <div className="flex justify-center my-4">
                  {renderDakkapelIcon(type.id)}
                </div>
                
                <p className="text-gray-600 text-center">{type.description}</p>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">
                    Min {minWidth} m - max {maxWidth} m
                  </div>
                  <div className="font-medium text-brand-darkGreen">
                    Vanaf €{type.basePrice.toLocaleString('nl-NL')},-
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
