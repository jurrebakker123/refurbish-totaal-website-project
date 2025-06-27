
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Paintbrush, Home, Palette, Clock, Euro, CheckCircle } from 'lucide-react';

interface SchilderConfig {
  projectType: string;
  surfaceArea: number;
  rooms: string[];
  paintType: string;
  colors: string[];
  finishType: string;
  preparation: string[];
  timeline: string;
  extras: string[];
}

const SchilderConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<SchilderConfig>({
    projectType: '',
    surfaceArea: 0,
    rooms: [],
    paintType: '',
    colors: [],
    finishType: '',
    preparation: [],
    timeline: '',
    extras: []
  });

  const projectTypes = [
    { id: 'binnen', name: 'Binnenschilderwerk', description: 'Wanden, plafonds, kozijnen binnen' },
    { id: 'buiten', name: 'Buitenschilderwerk', description: 'Gevels, kozijnen, deuren buiten' },
    { id: 'compleet', name: 'Binnen + Buiten', description: 'Complete schilderbeurt' }
  ];

  const paintTypes = [
    { id: 'latex', name: 'Latex verf', description: 'Standaard wandverf, geschikt voor de meeste ruimtes' },
    { id: 'alkyd', name: 'Alkydverf', description: 'Duurzame verf voor hout en metaal' },
    { id: 'acryl', name: 'Acrylverf', description: 'Watergedragen verf voor binnen en buiten' },
    { id: 'kalkverf', name: 'Kalkverf', description: 'Natuurlijke, ademende verf' }
  ];

  const finishTypes = [
    { id: 'mat', name: 'Mat', description: 'Matte afwerking zonder glans' },
    { id: 'zijdemat', name: 'Zijdemat', description: 'Subtiele glans, goed afwasbaar' },
    { id: 'zijdeglans', name: 'Zijdeglans', description: 'Meer glans, zeer goed afwasbaar' }
  ];

  const preparationOptions = [
    { id: 'schuren', name: 'Schuren', price: 5 },
    { id: 'plamuren', name: 'Plamuurwerk', price: 8 },
    { id: 'primer', name: 'Primer aanbrengen', price: 3 },
    { id: 'behang_verwijderen', name: 'Behang verwijderen', price: 12 }
  ];

  const extraOptions = [
    { id: 'plafond', name: 'Plafond meeschilderen', price: 15 },
    { id: 'kozijnen', name: 'Kozijnen behandelen', price: 25 },
    { id: 'deuren', name: 'Deuren schilderen', price: 35 },
    { id: 'radiatoren', name: 'Radiatoren schilderen', price: 20 }
  ];

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base price per m²
    if (config.projectType === 'binnen') basePrice = 25;
    else if (config.projectType === 'buiten') basePrice = 35;
    else if (config.projectType === 'compleet') basePrice = 50;

    let totalPrice = basePrice * config.surfaceArea;

    // Paint type multiplier
    if (config.paintType === 'alkyd') totalPrice *= 1.2;
    else if (config.paintType === 'kalkverf') totalPrice *= 1.3;

    // Preparation costs
    config.preparation.forEach(prepId => {
      const prep = preparationOptions.find(p => p.id === prepId);
      if (prep) totalPrice += prep.price * config.surfaceArea;
    });

    // Extra options
    config.extras.forEach(extraId => {
      const extra = extraOptions.find(e => e.id === extraId);
      if (extra) totalPrice += extra.price * config.surfaceArea;
    });

    return Math.round(totalPrice);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Wat voor schilderwerk wilt u laten uitvoeren?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {projectTypes.map(type => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all ${config.projectType === type.id ? 'ring-2 ring-brand-lightGreen' : ''}`}
                  onClick={() => setConfig({...config, projectType: type.id})}
                >
                  <CardContent className="p-4 text-center">
                    <Home className="h-8 w-8 mx-auto mb-2 text-brand-lightGreen" />
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Hoeveel vierkante meter moet geschilderd worden?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Oppervlakte in m²</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Bijv. 50"
                  value={config.surfaceArea || ''}
                  onChange={(e) => setConfig({...config, surfaceArea: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Reken ongeveer 2,5m² per m² vloeroppervlak voor wanden en plafond.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Welk type verf heeft uw voorkeur?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {paintTypes.map(paint => (
                <Card 
                  key={paint.id}
                  className={`cursor-pointer transition-all ${config.paintType === paint.id ? 'ring-2 ring-brand-lightGreen' : ''}`}
                  onClick={() => setConfig({...config, paintType: paint.id})}
                >
                  <CardContent className="p-4">
                    <Palette className="h-6 w-6 mb-2 text-brand-lightGreen" />
                    <h4 className="font-medium">{paint.name}</h4>
                    <p className="text-sm text-gray-600">{paint.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Welke afwerking wenst u?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {finishTypes.map(finish => (
                <Card 
                  key={finish.id}
                  className={`cursor-pointer transition-all ${config.finishType === finish.id ? 'ring-2 ring-brand-lightGreen' : ''}`}
                  onClick={() => setConfig({...config, finishType: finish.id})}
                >
                  <CardContent className="p-4 text-center">
                    <div className="h-8 w-8 mx-auto mb-2 bg-brand-lightGreen rounded-full"></div>
                    <h4 className="font-medium">{finish.name}</h4>
                    <p className="text-sm text-gray-600">{finish.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Welke voorbereidende werkzaamheden zijn nodig?</h3>
            <p className="text-gray-600 mb-4">Selecteer alle opties die van toepassing zijn</p>
            <div className="space-y-3">
              {preparationOptions.map(prep => (
                <div key={prep.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={config.preparation.includes(prep.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setConfig({...config, preparation: [...config.preparation, prep.id]});
                        } else {
                          setConfig({...config, preparation: config.preparation.filter(p => p !== prep.id)});
                        }
                      }}
                      className="rounded"
                    />
                    <span className="font-medium">{prep.name}</span>
                  </div>
                  <Badge variant="outline">+€{prep.price}/m²</Badge>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Extra werkzaamheden</h3>
            <p className="text-gray-600 mb-4">Selecteer eventuele extra's</p>
            <div className="space-y-3">
              {extraOptions.map(extra => (
                <div key={extra.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={config.extras.includes(extra.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setConfig({...config, extras: [...config.extras, extra.id]});
                        } else {
                          setConfig({...config, extras: config.extras.filter(e => e !== extra.id)});
                        }
                      }}
                      className="rounded"
                    />
                    <span className="font-medium">{extra.name}</span>
                  </div>
                  <Badge variant="outline">+€{extra.price}/m²</Badge>
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Wanneer wilt u het laten uitvoeren?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { id: 'asap', name: 'Zo snel mogelijk', description: 'Binnen 2-4 weken' },
                { id: '1-2months', name: '1-2 maanden', description: 'Flexibele planning' },
                { id: '3-6months', name: '3-6 maanden', description: 'Voor komend seizoen' },
                { id: 'later', name: 'Later dit jaar', description: 'Geen haast' }
              ].map(time => (
                <Card 
                  key={time.id}
                  className={`cursor-pointer transition-all ${config.timeline === time.id ? 'ring-2 ring-brand-lightGreen' : ''}`}
                  onClick={() => setConfig({...config, timeline: time.id})}
                >
                  <CardContent className="p-4">
                    <Clock className="h-6 w-6 mb-2 text-brand-lightGreen" />
                    <h4 className="font-medium">{time.name}</h4>
                    <p className="text-sm text-gray-600">{time.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Uw configuratie is compleet!</h3>
              <p className="text-gray-600">Bekijk hieronder uw schilderwerk overzicht</p>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-green-800">Geschatte prijs</h4>
                  <div className="text-3xl font-bold text-green-600">
                    €{calculatePrice().toLocaleString()}
                  </div>
                </div>
                <p className="text-sm text-green-700">Inclusief materiaal en arbeid</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuratie overzicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div><strong>Project:</strong> {projectTypes.find(p => p.id === config.projectType)?.name}</div>
                <div><strong>Oppervlakte:</strong> {config.surfaceArea} m²</div>
                <div><strong>Verftype:</strong> {paintTypes.find(p => p.id === config.paintType)?.name}</div>
                <div><strong>Afwerking:</strong> {finishTypes.find(f => f.id === config.finishType)?.name}</div>
                {config.preparation.length > 0 && (
                  <div><strong>Voorbereiding:</strong> {config.preparation.map(p => preparationOptions.find(prep => prep.id === p)?.name).join(', ')}</div>
                )}
                {config.extras.length > 0 && (
                  <div><strong>Extra's:</strong> {config.extras.map(e => extraOptions.find(extra => extra.id === e)?.name).join(', ')}</div>
                )}
              </CardContent>
            </Card>

            <Button className="w-full bg-brand-lightGreen hover:bg-brand-darkGreen text-white py-3">
              Offerte Aanvragen
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Paintbrush className="h-8 w-8 text-brand-lightGreen" />
          <h1 className="text-3xl font-bold">Schilderwerk Configurator</h1>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-lightGreen h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Stap {currentStep} van 8</p>
      </div>

      <Card>
        <CardContent className="p-8">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
            >
              Vorige
            </Button>
            
            {currentStep < 8 && (
              <Button 
                onClick={nextStep}
                className="bg-brand-lightGreen hover:bg-brand-darkGreen"
                disabled={
                  (currentStep === 1 && !config.projectType) ||
                  (currentStep === 2 && !config.surfaceArea) ||
                  (currentStep === 3 && !config.paintType) ||
                  (currentStep === 4 && !config.finishType) ||
                  (currentStep === 7 && !config.timeline)
                }
              >
                Volgende
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchilderConfigurator;
