
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DakkapelOptions, DakkapelConfiguration } from './DakkapelCalculator';
import { MoveRight, MoveLeft } from 'lucide-react';
import { DakkapelRenderer } from './DakkapelRenderer';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OptionsSelectorProps {
  selectedOptions: DakkapelOptions;
  aantalRamen: number;
  onChange: (options: Partial<DakkapelOptions>, aantalRamen?: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  configuration: DakkapelConfiguration;
}

export function OptionsSelector({ 
  selectedOptions, 
  aantalRamen,
  onChange, 
  onNext, 
  onPrevious,
  configuration
}: OptionsSelectorProps) {
  const options = [
    {
      id: 'ventilatie',
      label: 'Ventilatie',
      description: 'Mechanische ventilatie voor optimale luchtcirculatie',
      price: 450,
    },
    {
      id: 'zonwering',
      label: 'Zonwering',
      description: 'Buitenzonwering om warmte en lichtinval te reguleren',
      price: 850,
    },
    {
      id: 'gootafwerking',
      label: 'Gootafwerking',
      description: 'Hoogwaardige afwerking van dakgoten en regenwaterafvoer',
      price: 350,
    },
    {
      id: 'extra_isolatie',
      label: 'Extra Isolatie',
      description: 'Verbeterde isolatie voor optimaal energiebehoud',
      price: 650,
    },
    {
      id: 'extra_draaikiepraam',
      label: 'Extra draaikiepraam',
      description: 'Extra raam voor meer licht en ventilatie',
      price: 192.77,
    },
    {
      id: 'horren',
      label: 'Horren in draaikiepramen',
      description: 'Insectenhor voor frisse lucht zonder insecten',
      price: 240,
    },
    {
      id: 'elektrisch_rolluik',
      label: 'Elektrisch rolluik',
      description: 'Elektrisch bedienbaar rolluik voor privacy en zonwering',
      price: 281.75,
      unit: 'per strekkende meter',
    },
    {
      id: 'verwijderen_bestaande',
      label: 'Verwijderen bestaande dakkapel',
      description: 'Professionele demontage en verwijdering van oude dakkapel',
      price: 402.50,
    },
    {
      id: 'afvoeren_bouwafval',
      label: 'Afvoeren bouwafval',
      description: 'Volledige afvoer en verantwoorde verwerking van bouwafval',
      price: 150,
    }
  ];

  const handleOptionChange = (optionId: keyof DakkapelOptions, checked: boolean) => {
    onChange({
      [optionId]: checked,
    });
  };

  const formatPrice = (price: number, unit?: string) => {
    return `+ €${price.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${unit ? ` ${unit}` : ''}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Extra Opties</h2>
        <p className="mb-6 text-gray-600">
          Selecteer de gewenste aanvullende opties voor uw dakkapel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[350px] border-2 border-dashed border-gray-300 bg-gray-50 rounded-md">
          <DakkapelRenderer configuration={configuration} />
          <div className="text-center text-sm text-gray-600 mt-2">
            3D visualisatie (draai met muis)
          </div>
        </div>

        <div className="space-y-4">
          <label className="font-medium text-gray-800">Aantal draaikiepramen</label>
          <Select
            value={aantalRamen.toString()}
            onValueChange={(value) => onChange({}, parseInt(value))}
          >
            <SelectTrigger className="w-full bg-white text-black">
              <SelectValue placeholder="Kies aantal..." />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {[1, 2, 3, 4].map((aantal) => (
                <SelectItem key={aantal} value={aantal.toString()}>
                  {aantal} {aantal === 1 ? 'raam' : 'ramen'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor={option.id} 
                    className="font-medium text-gray-900 cursor-pointer"
                  >
                    {option.label}
                  </label>
                  <span className="text-sm font-medium text-brand-darkGreen">
                    {formatPrice(option.price, option.unit)}
                  </span>
                </div>
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
          Prijsopgave Bekijken <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
