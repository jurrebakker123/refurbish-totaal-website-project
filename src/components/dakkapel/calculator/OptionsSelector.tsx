
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { DakkapelOptions, DakkapelConfiguration, KozijnHoogte, WoningZijde, KleurOptie } from './DakkapelCalculator';
import { MoveRight, MoveLeft, CheckCircle } from 'lucide-react';
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
  kozijnHoogte: KozijnHoogte;
  woningZijde: WoningZijde;
  kleurDraaikiepramen: KleurOptie;
  onChange: (
    options: Partial<DakkapelOptions>, 
    aantalRamen?: number, 
    kozijnHoogte?: KozijnHoogte, 
    woningZijde?: WoningZijde,
    kleurDraaikiepramen?: KleurOptie
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
  configuration: DakkapelConfiguration;
}

export function OptionsSelector({ 
  selectedOptions, 
  aantalRamen,
  kozijnHoogte,
  woningZijde,
  kleurDraaikiepramen,
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
    },
    {
      id: 'ventilatieroosters',
      label: 'Ventilatieroosters',
      description: 'Roosters voor natuurlijke ventilatie',
      price: 120,
      unit: 'per strekkende meter',
    },
    {
      id: 'sporenkap',
      label: 'Sporenkap',
      description: 'Montage dakkapel op sporenkap',
      price: 275,
    }
  ];

  // Show dependent options
  useEffect(() => {
    if (selectedOptions.elektrisch_rolluik && !selectedOptions.voorbereiden_rolluiken) {
      onChange({
        voorbereiden_rolluiken: true
      });
    }
  }, [selectedOptions.elektrisch_rolluik]);

  const handleOptionChange = (optionId: keyof DakkapelOptions, checked: boolean) => {
    onChange({
      [optionId]: checked,
    });
  };

  const handleKozijnHoogteChange = (value: string) => {
    onChange({}, undefined, value as KozijnHoogte);
  };

  const handleWoningZijdeChange = (value: string) => {
    onChange({}, undefined, undefined, value as WoningZijde);
  };

  const handleKleurDraaikiepramenChange = (value: string) => {
    onChange({}, undefined, undefined, undefined, value as KleurOptie);
  };

  const formatPrice = (price: number, unit?: string) => {
    return `+ €${price.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${unit ? ` ${unit}` : ''}`;
  };

  const kozijnHoogteOptions = [
    { value: 'standaard', label: 'Standaard', description: 'Hoogte kozijn 110cm - Hoogte dakkapel 145cm' },
    { value: 'medium', label: 'Medium', description: 'Hoogte kozijn 120cm - Hoogte dakkapel 155cm' },
    { value: 'large', label: 'Large', description: 'Hoogte kozijn 130cm - Hoogte dakkapel 165cm' },
    { value: 'extra_large', label: 'Extra large', description: 'Hoogte kozijn 140cm - Hoogte dakkapel 175cm' },
  ];

  const woningZijdeOptions = [
    { value: 'achter', label: 'Achter', description: 'Aan de achterzijde van de woning' },
    { value: 'voor', label: 'Voor', description: 'Aan de voorzijde van de woning' },
    { value: 'zijkant', label: 'Zijkant', description: 'Aan de zijkant van de woning' },
  ];

  const kleurOpties = [
    { value: 'wit', label: 'Standaard wit (RAL9016)', price: 0 },
    { value: 'crème', label: 'Standaard crème wit (RAL9001)', price: 0 },
    { value: 'antraciet', label: 'Antraciet (RAL7016)', price: 210 },
    { value: 'zwart', label: 'Zwart (RAL9005)', price: 210 },
    { value: 'staalblauw', label: 'Staalblauw (RAL5011)', price: 210 },
    { value: 'dennengroen', label: 'Dennengroen (RAL6009)', price: 210 },
  ];

  // Get image based on selected options
  const getDakkapelImage = () => {
    // Base image paths
    const baseImages = {
      standard: '/lovable-uploads/b080c873-1f58-400e-8855-b4cc787a6859.png',
      zonwering: '/lovable-uploads/f73444a4-98da-45bd-b6aa-7cd2faa43809.png',
      rolluik: '/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png',
      kader: '/lovable-uploads/e4d081e7-d3f8-4e19-b2bf-0bf8c01f0dce.png'
    };

    // Logic to determine which image to show based on options
    if (selectedOptions.kader_dakkapel) {
      return baseImages.kader;
    } else if (selectedOptions.elektrisch_rolluik) {
      return baseImages.rolluik;
    } else if (selectedOptions.zonwering) {
      return baseImages.zonwering;
    } else {
      return baseImages.standard;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-3">Configureer uw dakkapel</h2>
        <p className="mb-5 text-gray-600 text-sm">
          Pas alle opties aan naar uw wensen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[350px] border-2 border-gray-300 bg-gray-50 rounded-md overflow-hidden">
          <img 
            src={getDakkapelImage()}
            alt="Dakkapel voorbeeld" 
            className="w-full h-full object-cover"
          />
          <div className="text-center text-sm text-gray-600 mt-2">
            Voorbeeld dakkapel
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="font-medium text-gray-800 text-sm">Bepaal de hoogte van het kozijn</label>
            <Select
              value={kozijnHoogte}
              onValueChange={handleKozijnHoogteChange}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Kies een hoogte..." />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {kozijnHoogteOptions.map((optie) => (
                  <SelectItem key={optie.value} value={optie.value}>
                    <div>
                      <div className="text-sm">{optie.label}</div>
                      <div className="text-xs text-gray-500">{optie.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <label className="font-medium text-gray-800 text-sm">Aan welke zijde van de woning wilt u een dakkapel?</label>
            <Select
              value={woningZijde}
              onValueChange={handleWoningZijdeChange}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Kies een zijde..." />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {woningZijdeOptions.map((optie) => (
                  <SelectItem key={optie.value} value={optie.value}>
                    <div>
                      <div className="text-sm">{optie.label}</div>
                      <div className="text-xs text-gray-500">{optie.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <label className="font-medium text-gray-800 text-sm">Aantal ramen</label>
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

          <div className="space-y-4">
            <label className="font-medium text-gray-800 text-sm">Welke kleur voor de draaikiepramen?</label>
            <Select
              value={kleurDraaikiepramen}
              onValueChange={handleKleurDraaikiepramenChange}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Kies een kleur..." />
              </SelectTrigger>
              <SelectContent className="bg-white text-black max-h-72">
                {kleurOpties.map((kleur) => (
                  <SelectItem key={kleur.value} value={kleur.value}>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm">{kleur.label}</span>
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
      </div>

      <div className="space-y-4">
        {/* Toggle options with Switch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-4 p-3 border rounded-md hover:bg-gray-50">
            <div className="flex items-center h-5 mt-1">
              <Switch 
                checked={selectedOptions.kader_dakkapel} 
                onCheckedChange={(checked) => handleOptionChange('kader_dakkapel', checked)} 
                id="kader_dakkapel"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="kader_dakkapel" className="font-medium text-gray-900 cursor-pointer text-sm">
                  Wilt u een kader dakkapel?
                </label>
                <span className="text-xs font-medium text-brand-darkGreen">
                  + €1.140,26
                </span>
              </div>
              <p className="text-gray-600 text-xs">Fraai afgewerkt kader rondom de dakkapel</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-3 border rounded-md hover:bg-gray-50">
            <div className="flex items-center h-5 mt-1">
              <Switch 
                checked={selectedOptions.minirooftop} 
                onCheckedChange={(checked) => handleOptionChange('minirooftop', checked)} 
                id="minirooftop"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="minirooftop" className="font-medium text-gray-900 cursor-pointer text-sm">
                  Wilt u een minirooftop (niet zichtbare airco)?
                </label>
                <span className="text-xs font-medium text-brand-darkGreen">
                  + €3.177,69
                </span>
              </div>
              <p className="text-gray-600 text-xs">Onzichtbare airconditioning geïntegreerd in uw dakkapel</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-3 border rounded-md hover:bg-gray-50">
            <div className="flex items-center h-5 mt-1">
              <Switch 
                checked={selectedOptions.dak_versteviging} 
                onCheckedChange={(checked) => handleOptionChange('dak_versteviging', checked)} 
                id="dak_versteviging"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label htmlFor="dak_versteviging" className="font-medium text-gray-900 cursor-pointer text-sm">
                  Versteviging dak t.b.v. zonnepanelen?
                </label>
                <span className="text-xs font-medium text-brand-darkGreen">
                  + €400,-
                </span>
              </div>
              <p className="text-gray-600 text-xs">Extra versteviging voor het plaatsen van zonnepanelen</p>
            </div>
          </div>

          {/* Show this option conditionally if electric shutters are selected */}
          {selectedOptions.elektrisch_rolluik && (
            <div className="flex items-start space-x-4 p-3 border rounded-md hover:bg-gray-50 bg-gray-50">
              <div className="flex items-center h-5 mt-1">
                <Switch 
                  checked={selectedOptions.voorbereiden_rolluiken} 
                  onCheckedChange={(checked) => handleOptionChange('voorbereiden_rolluiken', checked)} 
                  id="voorbereiden_rolluiken"
                  disabled={true}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="voorbereiden_rolluiken" className="font-medium text-gray-900 text-sm">
                    Voorbereidingen treffen voor rolluiken
                  </label>
                  <span className="text-xs font-medium text-brand-darkGreen">
                    Inbegrepen
                  </span>
                </div>
                <p className="text-gray-600 text-xs">Automatisch inbegrepen bij elektrische rolluiken</p>
              </div>
            </div>
          )}
        </div>

        {/* Standard checkbox options */}
        {options.map((option) => {
          const optionId = option.id as keyof DakkapelOptions;
          return (
            <div key={option.id} className="flex items-start space-x-4 p-3 border rounded-md hover:bg-gray-50">
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
                    className="font-medium text-gray-900 cursor-pointer text-sm"
                  >
                    {option.label}
                  </label>
                  <span className="text-xs font-medium text-brand-darkGreen">
                    {formatPrice(option.price, option.unit)}
                  </span>
                </div>
                <p className="text-gray-600 text-xs">{option.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          size="sm"
        >
          <MoveLeft className="mr-2 h-4 w-4" /> Vorige
        </Button>
        <Button 
          onClick={onNext} 
          className="bg-brand-lightGreen hover:bg-opacity-90"
          size="sm"
        >
          Bekijk Resultaat <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
