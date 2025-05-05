
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MaterialType } from './DakkapelCalculator';
import { MoveRight, MoveLeft, CheckCircle, Thermometer } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface MaterialSelectorProps {
  selectedMaterial: MaterialType;
  kleurKozijnen: string;
  kleurZijkanten: string;
  dakHelling: number;
  onChange: (materiaal: MaterialType, kleurKozijnen: string, kleurZijkanten: string, dakHelling: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function MaterialSelector({ 
  selectedMaterial,
  kleurKozijnen,
  kleurZijkanten,
  dakHelling, 
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

  const kleuropties = [
    { id: 'wit', naam: 'Wit' },
    { id: 'crème', naam: 'Crème' },
    { id: 'grijs', naam: 'Grijs' },
    { id: 'antraciet', naam: 'Antraciet' },
    { id: 'zwart', naam: 'Zwart' }
  ];

  const handleDakHellingChange = (value: number[]) => {
    onChange(selectedMaterial, kleurKozijnen, kleurZijkanten, value[0]);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Kies uw materiaal en stijl</h2>
        <p className="mb-6 text-gray-600">
          Selecteer het materiaal en de kleuren voor uw dakkapel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materials.map((material) => (
          <Card 
            key={material.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedMaterial === material.id ? 'border-2 border-brand-lightGreen shadow-md' : 'border border-gray-200'
            }`}
            onClick={() => onChange(material.id, kleurKozijnen, kleurZijkanten, dakHelling)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <label className="font-medium text-gray-800">Kleur kozijnen</label>
          <Select
            value={kleurKozijnen}
            onValueChange={(value) => onChange(selectedMaterial, value, kleurZijkanten, dakHelling)}
          >
            <SelectTrigger className="w-full bg-white text-black">
              <SelectValue placeholder="Kies een kleur..." />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {kleuropties.map((kleur) => (
                <SelectItem key={kleur.id} value={kleur.id}>
                  {kleur.naam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <label className="font-medium text-gray-800">Kleur zijkanten</label>
          <Select
            value={kleurZijkanten}
            onValueChange={(value) => onChange(selectedMaterial, kleurKozijnen, value, dakHelling)}
          >
            <SelectTrigger className="w-full bg-white text-black">
              <SelectValue placeholder="Kies een kleur..." />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {kleuropties.map((kleur) => (
                <SelectItem key={kleur.id} value={kleur.id}>
                  {kleur.naam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 mt-8">
        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-800">Dakhelling</label>
          <span className="font-medium text-brand-darkGreen">
            {dakHelling}° {dakHelling < 36 && <span className="text-amber-500 text-sm">(Neem contact op voor exacte prijs)</span>}
          </span>
        </div>
        <div className="px-2">
          <Slider
            defaultValue={[dakHelling]}
            onValueChange={handleDakHellingChange}
            max={70}
            min={15}
            step={1}
            className="my-4"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-2">
          <span>15°</span>
          <span>45°</span>
          <span>70°</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <Thermometer className="h-4 w-4" />
          <span>Standaard RC-waarde: 3.5</span>
        </div>
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
