
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';

interface DimensionsSelectorProps {
  breedte: number;
  hoogte: number;
  onChange: (breedte: number, hoogte: number) => void;
  onNext: () => void;
}

export function DimensionsSelector({ breedte, hoogte, onChange, onNext }: DimensionsSelectorProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Afmetingen van uw dakkapel</h2>
        <p className="mb-6 text-gray-600">
          Pas de afmetingen van uw dakkapel aan voor een nauwkeurige prijsindicatie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative mb-2 p-12 border-2 border-dashed border-gray-300 bg-gray-50">
            <div 
              className="bg-brand-darkGreen"
              style={{ 
                width: '100%', 
                height: '100px', 
                position: 'relative',
              }}
            >
              <div 
                className="absolute bg-white border-2 border-brand-lightGreen"
                style={{
                  width: `${(breedte / 600) * 100}%`,
                  height: `${(hoogte / 250) * 80}px`,
                  bottom: '0',
                  left: `${50 - ((breedte / 600) * 100) / 2}%`,
                  boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-600 mt-2">
              Visuele weergave (niet op schaal)
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium">Breedte:</label>
              <span className="font-bold text-brand-darkGreen">{breedte} cm</span>
            </div>
            <Slider 
              defaultValue={[breedte]} 
              min={150} 
              max={600} 
              step={10}
              onValueChange={(value) => onChange(value[0], hoogte)}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>150 cm</span>
              <span>600 cm</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium">Hoogte:</label>
              <span className="font-bold text-brand-darkGreen">{hoogte} cm</span>
            </div>
            <Slider 
              defaultValue={[hoogte]} 
              min={100} 
              max={250} 
              step={10}
              onValueChange={(value) => onChange(breedte, value[0])}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>100 cm</span>
              <span>250 cm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={onNext} className="bg-brand-lightGreen hover:bg-opacity-90">
          Volgende <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
