
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DakkapelConfiguration } from './DakkapelCalculator';
import { MoveLeft, Mail, Phone } from 'lucide-react';

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

  const optiesArray = Object.entries(configuration.opties)
    .filter(([_, isSelected]) => isSelected)
    .map(([key]) => {
      switch(key) {
        case 'ventilatie': return 'Ventilatie';
        case 'zonwering': return 'Zonwering';
        case 'gootafwerking': return 'Gootafwerking';
        case 'extra_isolatie': return 'Extra Isolatie';
        case 'extra_draaikiepraam': return 'Extra draaikiepraam';
        case 'horren': return 'Horren in draaikiepramen';
        case 'elektrisch_rolluik': return 'Elektrisch rolluik';
        case 'verwijderen_bestaande': return 'Verwijderen bestaande dakkapel';
        case 'afvoeren_bouwafval': return 'Afvoeren bouwafval';
        default: return '';
      }
    });

  const offerteURL = `/offerte?type=${configuration.type}&breedte=${configuration.breedte}&hoogte=${configuration.hoogte}&materiaal=${configuration.materiaal}`;

  // Warning for low roof pitch
  const lowRoofPitchWarning = configuration.dakHelling < 36;

  return (
    <div className="space-y-8">
      <div>
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
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Extra opties:</span>
              <span className="font-medium">
                {optiesArray.length > 0 ? optiesArray.join(', ') : 'Geen'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="font-semibold text-lg mb-4">Prijsindicatie:</h3>
          
          <div className="flex justify-between items-center mb-2">
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
          
          <p className="text-sm text-gray-500 mt-4">
            * Deze prijsindicatie is exclusief eventuele installatiekosten en aanvullende werkzaamheden.
            Voor een exacte offerte kunt u contact met ons opnemen.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Tevreden met uw configuratie?</h3>
          <p className="mb-6">
            Vraag direct een vrijblijvende offerte aan of neem contact met ons op voor meer informatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      <div className="flex justify-start mt-6">
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
