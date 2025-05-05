
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DakkapelConfiguration } from './DakkapelCalculator';
import { MoveLeft, Mail, Phone, Printer, Download } from 'lucide-react';
import { DakkapelRenderer } from './DakkapelRenderer';

interface PriceDisplayProps {
  configuration: DakkapelConfiguration;
  totalPrice: number;
  onPrevious: () => void;
}

export function PriceDisplay({ configuration, totalPrice, onPrevious }: PriceDisplayProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const typeLabels = {
    'typeA': 'Type A (1 meter)',
    'typeB': 'Type B (2 meter)',
    'typeC': 'Type C (3 meter)',
    'typeD': 'Type D (4 meter)',
    'typeE': 'Type E (5 meter)'
  };

  const materiaalLabels = {
    'kunststof': 'Kunststof',
    'hout': 'Hout',
    'aluminium': 'Aluminium'
  };

  const basePrices = {
    'typeA': 7060,
    'typeB': 7290,
    'typeC': 8200,
    'typeD': 8780,
    'typeE': 9330
  };

  const materialMultipliers = {
    'kunststof': 1.0,
    'hout': 1.2,
    'aluminium': 1.3
  };

  // Calculate component prices
  const basePrice = basePrices[configuration.type];
  const materialPrice = basePrice * materialMultipliers[configuration.materiaal] - basePrice;
  
  const optionPrices = {
    'ventilatie': configuration.opties.ventilatie ? 450 : 0,
    'zonwering': configuration.opties.zonwering ? 850 : 0,
    'gootafwerking': configuration.opties.gootafwerking ? 350 : 0,
    'extra_isolatie': configuration.opties.extra_isolatie ? 650 : 0,
    'extra_draaikiepraam': 0, // Will be calculated below
    'horren': configuration.opties.horren ? (240 * configuration.aantalRamen) : 0,
    'elektrisch_rolluik': configuration.opties.elektrisch_rolluik ? (281.75 * (configuration.breedte / 100)) : 0,
    'verwijderen_bestaande': configuration.opties.verwijderen_bestaande ? 402.50 : 0,
    'afvoeren_bouwafval': configuration.opties.afvoeren_bouwafval ? 150 : 0
  };

  // Calculate default and extra windows
  let defaultWindows = 1;
  if (configuration.type === 'typeC') defaultWindows = 2;
  else if (configuration.type === 'typeD') defaultWindows = 2;
  else if (configuration.type === 'typeE') defaultWindows = 3;
  
  // Calculate cost for extra windows
  const extraWindowsCount = Math.max(0, configuration.aantalRamen - defaultWindows);
  optionPrices.extra_draaikiepraam = extraWindowsCount * 192.77;

  // Create options labels array
  const optiesLabels: { [key: string]: string } = {
    'ventilatie': 'Ventilatie',
    'zonwering': 'Zonwering',
    'gootafwerking': 'Gootafwerking',
    'extra_isolatie': 'Extra Isolatie',
    'extra_draaikiepraam': `Extra ${extraWindowsCount} draaikiepraam${extraWindowsCount !== 1 ? 's' : ''}`,
    'horren': `Horren in ${configuration.aantalRamen} draaikiepramen`,
    'elektrisch_rolluik': `Elektrisch rolluik (${configuration.breedte/100} meter)`,
    'verwijderen_bestaande': 'Verwijderen bestaande dakkapel',
    'afvoeren_bouwafval': 'Afvoeren bouwafval'
  };

  const offerteURL = `/offerte?type=${configuration.type}&breedte=${configuration.breedte}&hoogte=${configuration.hoogte}&materiaal=${configuration.materiaal}`;

  // Warning for low roof pitch
  const lowRoofPitchWarning = configuration.dakHelling < 36;

  const printOffer = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:m-4">
      <div className="print:hidden">
        <h2 className="text-2xl font-bold mb-4">Uw Dakkapel Prijsindicatie</h2>
        <p className="mb-6 text-gray-600">
          Op basis van uw selecties hebben we een prijsindicatie berekend. 
          Voor een exacte offerte kunt u contact met ons opnemen.
        </p>
        {lowRoofPitchWarning && (
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 mb-6">
            <p className="text-amber-800">
              <strong>Let op:</strong> Bij een dakhelling lager dan 36° adviseren wij u contact met ons op te nemen voor een nauwkeurige prijsopgave, omdat er dan speciale aanpassingen nodig kunnen zijn.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="print:hidden h-[350px] border-2 border-dashed border-gray-300 bg-gray-50 rounded-md">
          <DakkapelRenderer configuration={configuration} />
          <div className="text-center text-sm text-gray-600 mt-2">
            3D visualisatie (draai met muis)
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="font-semibold text-lg">Uw Configuratie:</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{typeLabels[configuration.type]}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Afmetingen:</span>
              <span className="font-medium">{configuration.breedte} × {configuration.hoogte} cm</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Aantal ramen:</span>
              <span className="font-medium">{configuration.aantalRamen}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Materiaal:</span>
              <span className="font-medium">{materiaalLabels[configuration.materiaal]}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Kleur kozijnen:</span>
              <span className="font-medium">{configuration.kleurKozijnen}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Kleur zijkanten:</span>
              <span className="font-medium">{configuration.kleurZijkanten}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Dakhelling:</span>
              <span className="font-medium">{configuration.dakHelling}°</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 className="font-semibold text-lg mb-4">Gedetailleerde Prijsopbouw:</h3>
        
        {/* Base price */}
        <div className="flex justify-between items-center mb-2 border-b pb-2">
          <span className="text-gray-700">Basisprijs {typeLabels[configuration.type]}:</span>
          <span className="font-medium">{formatPrice(basePrice)}</span>
        </div>
        
        {/* Material upgrade */}
        {configuration.materiaal !== 'kunststof' && (
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            <span className="text-gray-700">Meerprijs {materiaalLabels[configuration.materiaal]}:</span>
            <span className="font-medium">{formatPrice(materialPrice)}</span>
          </div>
        )}
        
        {/* Selected options */}
        {Object.entries(configuration.opties).map(([key, isSelected]) => {
          const optionKey = key as keyof typeof optionPrices;
          if (isSelected && optionPrices[optionKey] > 0) {
            return (
              <div key={key} className="flex justify-between items-center mb-2 border-b pb-2">
                <span className="text-gray-700">{optiesLabels[key]}:</span>
                <span className="font-medium">{formatPrice(optionPrices[optionKey])}</span>
              </div>
            );
          }
          return null;
        })}
        
        {/* Extra windows cost (if any) */}
        {extraWindowsCount > 0 && (
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            <span className="text-gray-700">Extra {extraWindowsCount} draaikiepraam{extraWindowsCount !== 1 ? 's' : ''}:</span>
            <span className="font-medium">{formatPrice(optionPrices.extra_draaikiepraam)}</span>
          </div>
        )}
        
        {/* Subtotal */}
        <div className="flex justify-between items-center mb-2 pt-2">
          <span className="text-gray-600">Subtotaal:</span>
          <span className="font-medium">{formatPrice(totalPrice * 0.9)}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">BTW (10%):</span>
          <span className="font-medium">{formatPrice(totalPrice * 0.1)}</span>
        </div>
        
        <div className="flex justify-between items-center border-t pt-4 text-xl">
          <span className="font-bold">Totaalbedrag:</span>
          <span className="font-bold text-brand-darkGreen">{formatPrice(totalPrice)}</span>
        </div>
        
        <p className="text-sm text-gray-500 mt-4 print:text-xs">
          * Deze prijsindicatie is exclusief eventuele installatiekosten en aanvullende werkzaamheden.
          Voor een exacte offerte kunt u contact met ons opnemen.
        </p>
      </div>

      <div className="pt-6 border-t print:hidden">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Tevreden met uw dakkapel configuratie?</h3>
          <p className="mb-6">
            Vraag direct een vrijblijvende offerte aan of neem contact met ons op voor meer informatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={printOffer}
              className="flex items-center justify-center"
            >
              <Printer className="h-5 w-5 mr-2" />
              <span>Print Offerte</span>
            </Button>
            
            <Button
              asChild
              className="bg-white text-brand-darkGreen hover:bg-gray-100 border border-gray-300" 
            >
              <a href="tel:+31854444255">
                <Phone className="h-5 w-5 mr-2" />
                <span>Bel Direct: 085 4444 255</span>
              </a>
            </Button>

            <Button 
              asChild
              className="bg-brand-lightGreen text-white hover:bg-opacity-90"
            >
              <Link to={offerteURL}>
                <Mail className="h-5 w-5 mr-2" />
                <span>Offerte Aanvragen</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-start mt-6 print:hidden">
        <Button 
          variant="outline" 
          onClick={onPrevious}
        >
          <MoveLeft className="mr-2 h-4 w-4" /> Wijzig Opties
        </Button>
      </div>
    </div>
  );
}
