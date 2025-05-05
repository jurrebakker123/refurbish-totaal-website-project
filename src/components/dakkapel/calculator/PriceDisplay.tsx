
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DakkapelConfiguration } from './DakkapelCalculator';
import { MoveLeft, MoveRight, Mail, Phone, Download, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { getKozijnHeight } from '@/utils/calculatorUtils';

interface PriceDisplayProps {
  configuration: DakkapelConfiguration;
  totalPrice: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function PriceDisplay({ configuration, totalPrice, onPrevious, onNext }: PriceDisplayProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-NL', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const typeLabels = {
    'typeA': 'Type A (Min 1,00m - max 1,50m)',
    'typeB': 'Type B (Min 1,50m - max 3,00m)',
    'typeC': 'Type C (Min 3,00m - max 5,00m)',
    'typeD': 'Type D (Min 3,50m - max 5,50m)',
    'typeE': 'Type E (Min 3,50m - max 5,90m)'
  };

  const materiaalLabels = {
    'kunststof': 'Kunststof',
    'hout': 'Hout',
    'aluminium': 'Aluminium',
    'standaard': 'Standaard volkern plaat',
    'kunststof_rabat': 'Kunststof rabat(keralit) delen',
    'kunststof_rabat_boeideel': 'Kunststof rabat(keralit) delen incl. boeideel',
    'polyester_glad': 'Polyester glad',
    'polyester_rabat': 'Polyester rabat'
  };

  const dakHellingLabels = {
    'kleiner_dan_40': 'Kleiner dan 40°',
    'tussen_40_45': 'Tussen 40-45°',
    'groter_dan_45': 'Groter dan 45°'
  };

  const rcWaardeLabels = {
    'standaard': 'Standaard Rc-waarde 3.5',
    'upgrade_6_0': 'Upgrade Rc-waarde 6.0',
    'upgrade_6_5': 'Extra Upgrade Rc-waarde 6.5'
  };

  const kozijnHoogteLabels = {
    'standaard': 'Standaard',
    'medium': 'Medium',
    'large': 'Large',
    'extra_large': 'Extra large'
  };

  const woningZijdeLabels = {
    'achter': 'Achterzijde',
    'voor': 'Voorzijde',
    'zijkant': 'Zijkant'
  };

  const kozijnHoogteDimensions = getKozijnHeight(configuration.kozijnHoogte);

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
        case 'kader_dakkapel': return 'Kader dakkapel';
        case 'voorbereiden_rolluiken': return 'Voorbereidingen treffen voor rolluiken';
        case 'minirooftop': return 'Minirooftop (niet zichtbare airco)';
        case 'dak_versteviging': return 'Versteviging dak t.b.v. zonnepanelen';
        case 'ventilatieroosters': return 'Ventilatieroosters';
        case 'sporenkap': return 'Sporenkap';
        default: return '';
      }
    });

  const offerteURL = `/offerte?type=${configuration.type}&breedte=${configuration.breedte}&hoogte=${configuration.hoogte}&materiaal=${configuration.materiaal}`;

  // Warning for low roof pitch
  const lowRoofPitchWarning = configuration.dakHelling < 36;
  
  // Function to generate and download PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById('prijsindicatie');
    const opt = {
      margin: 10,
      filename: 'dakkapel-offerte.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };
  
  // Function to print the price display
  const handlePrint = () => {
    window.print();
  };

  // Calculate price components
  const basePricesByType = {
    'typeA': 7060,
    'typeB': 7290,
    'typeC': 8200,
    'typeD': 8780,
    'typeE': 9330
  };
  
  const materiaalMultipliers = {
    'kunststof': 1.0,
    'hout': 1.2,
    'aluminium': 1.3,
    'standaard': 1.0,
    'kunststof_rabat': 1.05,
    'kunststof_rabat_boeideel': 1.08,
    'polyester_glad': 1.07,
    'polyester_rabat': 1.09
  };

  const materiaalExtraCosts = {
    'kunststof_rabat': 497,
    'kunststof_rabat_boeideel': 751,
    'polyester_glad': 750,
    'polyester_rabat': 850
  };
  
  const basePrice = basePricesByType[configuration.type];
  const materiaalFactor = materiaalMultipliers[configuration.materiaal];
  const materiaalPrijs = basePrice * materiaalFactor;
  const materiaalMeerprijs = (materiaalPrijs - basePrice);
  
  const rcWaardePrices = {
    'standaard': 0,
    'upgrade_6_0': 218,
    'upgrade_6_5': 250
  };
  
  const kozijnHoogtePrices = {
    'standaard': 0,
    'medium': 150,
    'large': 300,
    'extra_large': 450
  };
  
  const kleurPrices = {
    'wit': 0,
    'crème': 0,
    'grijs': 210,
    'antraciet': 210,
    'zwart': 210,
    'staalblauw': 210,
    'dennengroen': 210
  };
  
  const kleurKozijnenPrijs = kleurPrices[configuration.kleurKozijnen];
  const kleurZijkantenPrijs = kleurPrices[configuration.kleurZijkanten];
  const kleurDraaikiepramenPrijs = kleurPrices[configuration.kleurDraaikiepramen];
  
  const rcWaardePrijs = rcWaardePrices[configuration.rcWaarde];
  const kozijnHoogtePrijs = kozijnHoogtePrices[configuration.kozijnHoogte];

  // Option prices
  const optionPrices = {
    'ventilatie': 450,
    'zonwering': 850,
    'gootafwerking': 350,
    'extra_isolatie': 650,
    'extra_draaikiepraam': 192.77 * Math.max(0, configuration.aantalRamen - (configuration.type === 'typeE' ? 3 : 2)),
    'horren': 240 * configuration.aantalRamen,
    'elektrisch_rolluik': 281.75 * (configuration.breedte / 100),
    'verwijderen_bestaande': 402.50,
    'afvoeren_bouwafval': 150,
    'kader_dakkapel': 1140.26,
    'voorbereiden_rolluiken': configuration.opties.elektrisch_rolluik ? 0 : 125, // If electric shutters, this is included
    'minirooftop': 3177.69,
    'dak_versteviging': 400,
    'ventilatieroosters': 120 * (configuration.breedte / 100),
    'sporenkap': 275
  };

  // Calculate total options price
  let optiesPrijs = 0;
  Object.entries(configuration.opties).forEach(([key, isSelected]) => {
    if (isSelected) {
      optiesPrijs += optionPrices[key as keyof typeof optionPrices] || 0;
    }
  });

  return (
    <div className="space-y-8" id="prijsindicatie">
      <div>
        <h2 className="text-2xl font-bold mb-4">Uw Dakkapel Prijsindicatie</h2>
        <p className="mb-6 text-gray-600">
          Op basis van uw selecties hebben we een prijsindicatie berekend. 
          Voor een exacte offerte kunt u contact met ons opnemen of uw gegevens achterlaten.
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
              <span className="text-gray-600">Kozijnhoogte:</span>
              <span className="font-medium">{kozijnHoogteLabels[configuration.kozijnHoogte]} ({kozijnHoogteDimensions.kozijn}cm)</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Dakkapelhoogte:</span>
              <span className="font-medium">{kozijnHoogteDimensions.dakkapel}cm</span>
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
              <span className="text-gray-600">Kleur draaikiepramen:</span>
              <span className="font-medium">{configuration.kleurDraaikiepramen}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Dakhelling:</span>
              <span className="font-medium">{configuration.dakHelling}° ({dakHellingLabels[configuration.dakHellingType]})</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">RC-waarde:</span>
              <span className="font-medium">{rcWaardeLabels[configuration.rcWaarde]}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Plaatsing zijde:</span>
              <span className="font-medium">{woningZijdeLabels[configuration.woningZijde]}</span>
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
          <h3 className="font-semibold text-lg mb-4">Gedetailleerde Prijsopbouw:</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Basisprijs {typeLabels[configuration.type].split(' ')[0]} {typeLabels[configuration.type].split(' ')[1]}:</span>
              <span className="font-medium">{formatPrice(basePrice)}</span>
            </div>
            
            {materiaalExtraCosts[configuration.materiaal as keyof typeof materiaalExtraCosts] ? (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Meerprijs {materiaalLabels[configuration.materiaal]}:</span>
                <span className="font-medium">+ {formatPrice(materiaalExtraCosts[configuration.materiaal as keyof typeof materiaalExtraCosts])}</span>
              </div>
            ) : materiaalMeerprijs > 0 ? (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Meerprijs {materiaalLabels[configuration.materiaal]}:</span>
                <span className="font-medium">+ {formatPrice(materiaalMeerprijs)}</span>
              </div>
            ) : null}
            
            {kleurKozijnenPrijs > 0 && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Meerprijs kleur kozijnen ({configuration.kleurKozijnen}):</span>
                <span className="font-medium">+ {formatPrice(kleurKozijnenPrijs)}</span>
              </div>
            )}
            
            {kleurZijkantenPrijs > 0 && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Meerprijs kleur zijkanten ({configuration.kleurZijkanten}):</span>
                <span className="font-medium">+ {formatPrice(kleurZijkantenPrijs)}</span>
              </div>
            )}
            
            {kleurDraaikiepramenPrijs > 0 && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Meerprijs kleur draaikiepramen ({configuration.kleurDraaikiepramen}):</span>
                <span className="font-medium">+ {formatPrice(kleurDraaikiepramenPrijs)}</span>
              </div>
            )}
            
            {rcWaardePrijs > 0 && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Meerprijs {rcWaardeLabels[configuration.rcWaarde]}:</span>
                <span className="font-medium">+ {formatPrice(rcWaardePrijs)}</span>
              </div>
            )}
            
            {kozijnHoogtePrijs > 0 && (
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Meerprijs kozijnhoogte ({kozijnHoogteLabels[configuration.kozijnHoogte]}):</span>
                <span className="font-medium">+ {formatPrice(kozijnHoogtePrijs)}</span>
              </div>
            )}
            
            {/* Display each selected option with its price */}
            {Object.entries(configuration.opties)
              .filter(([_, isSelected]) => isSelected)
              .map(([key]) => {
                const optionKey = key as keyof typeof optionPrices;
                const price = optionPrices[optionKey];
                if (!price) return null;
                
                let priceDisplay = formatPrice(price);
                if (optionKey === 'elektrisch_rolluik' || optionKey === 'ventilatieroosters') {
                  priceDisplay = `${formatPrice(price)} (${configuration.breedte/100} meter)`;
                } else if (optionKey === 'horren') {
                  priceDisplay = `${formatPrice(240)} × ${configuration.aantalRamen}`;
                } else if (optionKey === 'extra_draaikiepraam' && configuration.aantalRamen > (configuration.type === 'typeE' ? 3 : 2)) {
                  const extraRamen = configuration.aantalRamen - (configuration.type === 'typeE' ? 3 : 2);
                  priceDisplay = `${formatPrice(192.77)} × ${extraRamen}`;
                }
                
                return (
                  <div key={key} className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">
                      {key === 'ventilatie' ? 'Ventilatie' : 
                       key === 'zonwering' ? 'Zonwering' :
                       key === 'gootafwerking' ? 'Gootafwerking' :
                       key === 'extra_isolatie' ? 'Extra Isolatie' :
                       key === 'extra_draaikiepraam' ? 'Extra draaikiepraam' :
                       key === 'horren' ? 'Horren in draaikiepramen' :
                       key === 'elektrisch_rolluik' ? 'Elektrisch rolluik' :
                       key === 'verwijderen_bestaande' ? 'Verwijderen bestaande dakkapel' :
                       key === 'afvoeren_bouwafval' ? 'Afvoeren bouwafval' :
                       key === 'kader_dakkapel' ? 'Kader dakkapel' :
                       key === 'voorbereiden_rolluiken' ? 'Voorbereidingen treffen voor rolluiken' :
                       key === 'minirooftop' ? 'Minirooftop (niet zichtbare airco)' :
                       key === 'dak_versteviging' ? 'Versteviging dak t.b.v. zonnepanelen' :
                       key === 'ventilatieroosters' ? 'Ventilatieroosters' :
                       key === 'sporenkap' ? 'Sporenkap' : key}:
                    </span>
                    <span className="font-medium">+ {priceDisplay}</span>
                  </div>
                );
              })}
            
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-gray-600">Subtotaal:</span>
              <span className="font-medium">{formatPrice(totalPrice * 0.9)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">BTW (10%):</span>
              <span className="font-medium">{formatPrice(totalPrice * 0.1)}</span>
            </div>
            
            <div className="flex justify-between items-center border-t pt-4 text-xl">
              <span className="font-bold">Totaalbedrag:</span>
              <span className="font-bold text-brand-darkGreen">{formatPrice(totalPrice)}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            * Deze prijsindicatie is exclusief eventuele installatiekosten en aanvullende werkzaamheden.
            Voor een exacte offerte kunt u contact met ons opnemen.
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownloadPDF}
              className="text-xs flex items-center"
            >
              <Download className="mr-1 h-3 w-3" /> PDF downloaden
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrint}
              className="text-xs flex items-center"
            >
              <Printer className="mr-1 h-3 w-3" /> Printen
            </Button>
          </div>
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
              className="bg-brand-lightGreen text-white hover:bg-opacity-90"
              onClick={onNext}
            >
              <Mail className="h-5 w-5 mr-2" />
              <span>Offerte Aanvragen</span>
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
