
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MaterialType, DakkapelConfiguration, DakHelling, RCWaarde, KleurOptie } from './DakkapelCalculator';
import { MoveRight, MoveLeft, CheckCircle, Thermometer } from 'lucide-react';
import { DakkapelRenderer } from './DakkapelRenderer';
import { getDakHellingFromType } from '@/utils/calculatorUtils';
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
  kleurKozijnen: KleurOptie;
  kleurZijkanten: KleurOptie;
  dakHelling: number;
  dakHellingType: DakHelling;
  rcWaarde: RCWaarde;
  onChange: (materiaal: MaterialType, kleurKozijnen: KleurOptie, kleurZijkanten: KleurOptie, dakHelling: number, dakHellingType: DakHelling, rcWaarde: RCWaarde) => void;
  onNext: () => void;
  onPrevious: () => void;
  configuration: DakkapelConfiguration;
}

export function MaterialSelector({ 
  selectedMaterial,
  kleurKozijnen,
  kleurZijkanten,
  dakHelling, 
  dakHellingType,
  rcWaarde,
  onChange, 
  onNext, 
  onPrevious,
  configuration
}: MaterialSelectorProps) {
  const materials = [
    {
      id: 'standaard',
      name: 'Standaard',
      description: 'Standaard volkern plaat in de kleur wit of grijs',
    },
    {
      id: 'kunststof',
      name: 'Kunststof',
      description: 'Onderhoudsvriendelijk en voordelig. Goede isolatiewaarde en lange levensduur.',
    },
    {
      id: 'kunststof_rabat',
      name: 'Kunststof rabat(keralit) delen',
      description: 'Beide zijkanten kunststof gevelbekleding in de kleur wit of grijs zonder schroefgaten over de gehele breedte. Voorzijde en de boeideel bekleed met volkern plaat',
      price: 497,
    },
    {
      id: 'kunststof_rabat_boeideel',
      name: 'Kunststof rabat(keralit) delen incl. boeideel',
      description: 'Beide zijkanten en boeideel en voorzijde dakkapel van kunststof gevelbekleding standaard kleuren.',
      price: 751,
    },
    {
      id: 'polyester_glad',
      name: 'Polyester glad',
      description: 'Kunststof naadloos gladde uitvoering',
      price: 750,
    },
    {
      id: 'polyester_rabat',
      name: 'Polyester rabat',
      description: 'Kunststof naadloos rabat uitvoering',
      price: 850,
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
    { id: 'wit', naam: 'Standaard wit (RAL9016)', price: 0 },
    { id: 'crème', naam: 'Standaard crème wit (RAL9001)', price: 0 },
    { id: 'grijs', naam: 'Grijs', price: 210 },
    { id: 'antraciet', naam: 'Antraciet (RAL7016)', price: 210 },
    { id: 'zwart', naam: 'Zwart (RAL9005)', price: 210 },
    { id: 'staalblauw', naam: 'Staalblauw (RAL5011)', price: 210 },
    { id: 'dennengroen', naam: 'Dennengroen (RAL6009)', price: 210 }
  ];

  const dakHellingOptions = [
    { value: 'kleiner_dan_40', label: 'Kleiner dan 40°', description: 'Vlakke dakhelling, kleiner dan 40 graden.' },
    { value: 'tussen_40_45', label: 'Tussen 40-45°', description: 'Standaard dakhelling, tussen 40 - 45 graden.' },
    { value: 'groter_dan_45', label: 'Groter dan 45°', description: 'Steile dakhelling, meer dan 45 graden.' }
  ];

  const rcWaardeOptions = [
    { value: 'standaard', label: 'Standaard Rc-waarde 3.5', description: 'Dit is een standaard isolatie waarde', price: 0 },
    { value: 'upgrade_6_0', label: 'Upgrade Rc-waarde 6.0', description: 'Hoge Rc-waarde', price: 218 },
    { value: 'upgrade_6_5', label: 'Extra Upgrade Rc-waarde 6.5', description: 'Extra hoge Rc-waarde', price: 250 }
  ];

  const handleDakHellingTypeChange = (value: string) => {
    const newDakHellingType = value as DakHelling;
    const newDakHelling = getDakHellingFromType(newDakHellingType);
    onChange(selectedMaterial, kleurKozijnen, kleurZijkanten, newDakHelling, newDakHellingType, rcWaarde);
  };

  const handleRCWaardeChange = (value: string) => {
    onChange(selectedMaterial, kleurKozijnen, kleurZijkanten, dakHelling, dakHellingType, value as RCWaarde);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Kies uw materiaal en stijl</h2>
        <p className="mb-6 text-gray-600">
          Selecteer het materiaal en de kleuren voor uw dakkapel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 3D Preview */}
        <div className="md:col-span-1 h-[350px] border-2 border-dashed border-gray-300 bg-gray-50 rounded-md">
          <DakkapelRenderer configuration={configuration} />
          <div className="text-center text-sm text-gray-600 mt-2">
            3D visualisatie (draai met muis)
          </div>
        </div>

        {/* Material selection */}
        <div className="md:col-span-2">
          <h3 className="font-bold text-lg mb-4">Materiaal keuze dakkapel</h3>
          <div className="grid grid-cols-1 gap-4">
            {materials.map((material) => (
              <Card 
                key={material.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMaterial === material.id ? 'border-2 border-brand-lightGreen shadow-md' : 'border border-gray-200'
                }`}
                onClick={() => onChange(material.id as MaterialType, kleurKozijnen, kleurZijkanten, dakHelling, dakHellingType, rcWaarde)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">{material.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{material.description}</p>
                    </div>
                    <div className="flex items-center">
                      {material.price && (
                        <span className="text-sm font-medium text-brand-darkGreen mr-2">
                          +€{material.price.toLocaleString('nl-NL')}
                        </span>
                      )}
                      {selectedMaterial === material.id && (
                        <CheckCircle className="h-5 w-5 text-brand-lightGreen" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <label className="font-medium text-gray-800">Welke kleur voor de kozijnen?</label>
              <Select
                value={kleurKozijnen}
                onValueChange={(value) => onChange(selectedMaterial, value as KleurOptie, kleurZijkanten, dakHelling, dakHellingType, rcWaarde)}
              >
                <SelectTrigger className="w-full bg-white text-black">
                  <SelectValue placeholder="Kies een kleur..." />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {kleuropties.map((kleur) => (
                    <SelectItem key={kleur.id} value={kleur.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{kleur.naam}</span>
                        {kleur.price > 0 && (
                          <span className="text-xs text-brand-darkGreen">+ €{kleur.price}</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="font-medium text-gray-800">Welke kleur voor de zijkanten van de dakkapel?</label>
              <Select
                value={kleurZijkanten}
                onValueChange={(value) => onChange(selectedMaterial, kleurKozijnen, value as KleurOptie, dakHelling, dakHellingType, rcWaarde)}
              >
                <SelectTrigger className="w-full bg-white text-black">
                  <SelectValue placeholder="Kies een kleur..." />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {kleuropties.map((kleur) => (
                    <SelectItem key={kleur.id} value={kleur.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{kleur.naam}</span>
                        {kleur.price > 0 && (
                          <span className="text-xs text-brand-darkGreen">+ €{kleur.price}</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <label className="font-medium text-gray-800">Wilt u een hogere RC waarde?</label>
            <Select
              value={rcWaarde}
              onValueChange={handleRCWaardeChange}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Kies een RC-waarde..." />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {rcWaardeOptions.map((optie) => (
                  <SelectItem key={optie.value} value={optie.value}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span>{optie.label}</span>
                        <p className="text-xs text-gray-500">{optie.description}</p>
                      </div>
                      {optie.price > 0 && (
                        <span className="text-xs text-brand-darkGreen">+ €{optie.price}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 mt-8">
            <label className="font-medium text-gray-800">Wat is uw dakhelling?</label>
            <Select
              value={dakHellingType}
              onValueChange={handleDakHellingTypeChange}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Kies een dakhelling..." />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {dakHellingOptions.map((optie) => (
                  <SelectItem key={optie.value} value={optie.value}>
                    <div>
                      <div>{optie.label}</div>
                      <div className="text-xs text-gray-500">{optie.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-sm mt-2">
              <Thermometer className="h-4 w-4 text-gray-600" />
              <span className="text-gray-600">Huidige dakhelling: {dakHelling}°</span>
            </div>
          </div>
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
