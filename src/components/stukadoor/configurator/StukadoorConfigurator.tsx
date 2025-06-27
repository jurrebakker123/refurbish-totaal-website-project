
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Construction, Home, Layers, Clock, Euro, CheckCircle } from 'lucide-react';

interface StukadoorConfig {
  workType: string;
  surfaceArea: number;
  rooms: string[];
  finishType: string;
  preparation: string[];
  thickness: string;
  timeline: string;
  extras: string[];
}

const StukadoorConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<StukadoorConfig>({
    workType: '',
    surfaceArea: 0,
    rooms: [],
    finishType: '',
    preparation: [],
    thickness: '',
    timeline: '',
    extras: []
  });

  const workTypes = [
    { id: 'nieuw', name: 'Nieuw stucwerk', description: 'Complete nieuwe stuc aanbrengen' },
    { id: 'renovatie', name: 'Stuc renovatie', description: 'Herstel en renovatie bestaand stucwerk' },
    { id: 'decoratief', name: 'Decoratief stucwerk', description: 'Sierpleister en decoratieve afwerkingen' }
  ];

  const finishTypes = [
    { id: 'glad', name: 'Glad stucwerk', description: 'Sausklare afwerking', price: 15 },
    { id: 'spachtel', name: 'Spachtelputz', description: 'Structuur afwerking', price: 22 },
    { id: 'beton', name: 'Betonlook', description: 'Moderne betonlook afwerking', price: 28 },
    { id: 'kalk', name: 'Kalkpleister', description: 'Natuurlijke ademende afwerking', price: 25 }
  ];

  const preparationOptions = [
    { id: 'schoonmaken', name: 'Ondergrond schoonmaken', price: 3 },
    { id: 'repareren', name: 'Scheuren repareren', price: 8 },
    { id: 'primer', name: 'Hechtprimer aanbrengen', price: 4 },
    { id: 'isoleren', name: 'Isolatieplaten plaatsen', price: 12 }
  ];

  const extraOptions = [
    { id: 'plafond', name: 'Plafond meestucen', price: 18 },
    { id: 'ronding', name: 'Rondingen en hoeken', price: 25 },
    { id: 'nissen', name: 'Nissen en uitsparingen', price: 35 },
    { id: 'textuur', name: 'Extra textuurlaag', price: 15 }
  ];

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base price per m² based on finish type
    const finishType = finishTypes.find(f => f.id === config.finishType);
    if (finishType) basePrice = finishType.price;

    let totalPrice = basePrice * config.surfaceArea;

    // Work type multiplier
    if (config.workType === 'decoratief') totalPrice *= 1.4;
    else if (config.workType === 'renovatie') totalPrice *= 1.2;

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
            <h3 className="text-xl font-semibold mb-4">Wat voor stucwerk wilt u laten uitvoeren?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {workTypes.map(type => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all ${config.workType === type.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setConfig({...config, workType: type.id})}
                >
                  <CardContent className="p-4 text-center">
                    <Construction className="h-8 w-8 mx-auto mb-2 text-blue-500" />
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
            <h3 className="text-xl font-semibold mb-4">Hoeveel vierkante meter moet gestukadoord worden?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Oppervlakte in m²</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Bijv. 40"
                  value={config.surfaceArea || ''}
                  onChange={(e) => setConfig({...config, surfaceArea: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Meet alleen de oppervlakte die gestukadoord moet worden.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Welke afwerking wenst u?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {finishTypes.map(finish => (
                <Card 
                  key={finish.id}
                  className={`cursor-pointer transition-all ${config.finishType === finish.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setConfig({...config, finishType: finish.id})}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Layers className="h-6 w-6 text-blue-500" />
                      <Badge variant="outline">€{finish.price}/m²</Badge>
                    </div>
                    <h4 className="font-medium">{finish.name}</h4>
                    <p className="text-sm text-gray-600">{finish.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
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

      case 5:
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

      case 6:
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
                  className={`cursor-pointer transition-all ${config.timeline === time.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setConfig({...config, timeline: time.id})}
                >
                  <CardContent className="p-4">
                    <Clock className="h-6 w-6 mb-2 text-blue-500" />
                    <h4 className="font-medium">{time.name}</h4>
                    <p className="text-sm text-gray-600">{time.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Uw configuratie is compleet!</h3>
              <p className="text-gray-600">Bekijk hieronder uw stucwerk overzicht</p>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-blue-800">Geschatte prijs</h4>
                  <div className="text-3xl font-bold text-blue-600">
                    €{calculatePrice().toLocaleString()}
                  </div>
                </div>
                <p className="text-sm text-blue-700">Inclusief materiaal en arbeid</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuratie overzicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div><strong>Werktype:</strong> {workTypes.find(w => w.id === config.workType)?.name}</div>
                <div><strong>Oppervlakte:</strong> {config.surfaceArea} m²</div>
                <div><strong>Afwerking:</strong> {finishTypes.find(f => f.id === config.finishType)?.name}</div>
                {config.preparation.length > 0 && (
                  <div><strong>Voorbereiding:</strong> {config.preparation.map(p => preparationOptions.find(prep => prep.id === p)?.name).join(', ')}</div>
                )}
                {config.extras.length > 0 && (
                  <div><strong>Extra's:</strong> {config.extras.map(e => extraOptions.find(extra => extra.id === e)?.name).join(', ')}</div>
                )}
              </CardContent>
            </Card>

            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3">
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
          <Construction className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Stucwerk Configurator</h1>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Stap {currentStep} van 7</p>
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
            
            {currentStep < 7 && (
              <Button 
                onClick={nextStep}
                className="bg-blue-500 hover:bg-blue-600"
                disabled={
                  (currentStep === 1 && !config.workType) ||
                  (currentStep === 2 && !config.surfaceArea) ||
                  (currentStep === 3 && !config.finishType) ||
                  (currentStep === 6 && !config.timeline)
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

export default StukadoorConfigurator;
