
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { DakkapelRenderer } from './DakkapelRenderer';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DimensionsSelectorProps {
  breedte: number;
  hoogte: number;
  onChange: (breedte: number, hoogte: number) => void;
  onNext: () => void;
}

export function DimensionsSelector({ breedte, hoogte, onChange, onNext }: DimensionsSelectorProps) {
  // Updated width options based on Benelux Dakkapellen website
  const breedteOptions = [150, 175, 200, 250, 300, 350, 400, 450, 500, 550, 600];
  
  // Updated height options based on Benelux Dakkapellen website
  const hoogteOptions = [100, 125, 150, 175, 200, 225, 250];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Afmetingen van uw dakkapel</h2>
        <p className="mb-6 text-gray-600">
          Selecteer de gewenste afmetingen van uw dakkapel voor een nauwkeurige prijsindicatie.
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
              <label className="font-medium text-gray-800">Breedte dakkapel:</label>
              <span className="font-bold text-brand-darkGreen">{breedte} cm</span>
            </div>
            <div className="w-full">
              <Select
                value={breedte.toString()}
                onValueChange={(value) => onChange(parseInt(value), hoogte)}
              >
                <SelectTrigger className="w-full bg-white text-black">
                  <SelectValue placeholder="Kies een optie..." />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {breedteOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option} cm
                    </SelectItem>
                  ))}
                  <SelectItem value="advies">Weet ik niet, adviseer mij.</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium text-gray-800">Hoogte dakkapel:</label>
              <span className="font-bold text-brand-darkGreen">{hoogte} cm</span>
            </div>
            <div className="w-full">
              <Select
                value={hoogte.toString()}
                onValueChange={(value) => {
                  const parsedValue = parseInt(value);
                  if (!isNaN(parsedValue)) {
                    onChange(breedte, parsedValue);
                  }
                }}
              >
                <SelectTrigger className="w-full bg-white text-black">
                  <SelectValue placeholder="Kies een optie..." />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {hoogteOptions.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option} cm
                    </SelectItem>
                  ))}
                  <SelectItem value="advies">Weet ik niet, adviseer mij.</SelectItem>
                </SelectContent>
              </Select>
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
