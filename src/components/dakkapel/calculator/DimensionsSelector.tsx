
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { DakkapelRenderer } from './DakkapelRenderer';

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
          <div className="h-[300px] border-2 border-dashed border-gray-300 bg-gray-50">
            <DakkapelRenderer breedte={breedte} hoogte={hoogte} />
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            3D visualisatie (draai met muis)
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium text-gray-800">Breedte:</label>
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
              <label className="font-medium text-gray-800">Hoogte:</label>
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
