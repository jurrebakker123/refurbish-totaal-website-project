
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Info, Calculator } from 'lucide-react';

const IsolatieCalculator = () => {
  const [homeType, setHomeType] = useState<string>('');
  const [constructionYear, setConstructionYear] = useState<string>('');
  const [currentInsulation, setCurrentInsulation] = useState<string>('');
  const [squareMeters, setSquareMeters] = useState<string>('');
  const [insulation, setInsulation] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  const handleInsulationChange = (value: string) => {
    if (insulation.includes(value)) {
      setInsulation(insulation.filter(item => item !== value));
    } else {
      setInsulation([...insulation, value]);
    }
  };
  
  const calculateSavings = () => {
    setShowResults(true);
  };
  
  const resetCalculator = () => {
    setHomeType('');
    setConstructionYear('');
    setCurrentInsulation('');
    setSquareMeters('');
    setInsulation([]);
    setShowResults(false);
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Bereken uw besparing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ontdek hoeveel u kunt besparen met onze isolatieoplossingen. 
            Vul de onderstaande gegevens in voor een indicatie van uw jaarlijkse besparing.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {!showResults ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Type woning</label>
                      <select 
                        className="w-full p-3 border rounded-md"
                        value={homeType}
                        onChange={(e) => setHomeType(e.target.value)}
                      >
                        <option value="">Selecteer type woning</option>
                        <option value="tussenwoning">Tussenwoning</option>
                        <option value="hoekwoning">Hoekwoning</option>
                        <option value="2-onder-1-kap">2-onder-1-kap</option>
                        <option value="vrijstaand">Vrijstaande woning</option>
                        <option value="appartement">Appartement</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Bouwjaar</label>
                      <select 
                        className="w-full p-3 border rounded-md"
                        value={constructionYear}
                        onChange={(e) => setConstructionYear(e.target.value)}
                      >
                        <option value="">Selecteer bouwjaar</option>
                        <option value="voor-1945">Voor 1945</option>
                        <option value="1945-1975">1945 - 1975</option>
                        <option value="1976-1990">1976 - 1990</option>
                        <option value="1991-2005">1991 - 2005</option>
                        <option value="na-2005">Na 2005</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Huidige isolatie</label>
                      <select 
                        className="w-full p-3 border rounded-md"
                        value={currentInsulation}
                        onChange={(e) => setCurrentInsulation(e.target.value)}
                      >
                        <option value="">Selecteer huidige isolatie</option>
                        <option value="geen">Geen isolatie</option>
                        <option value="matig">Matige isolatie</option>
                        <option value="goed">Goede isolatie</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Woonoppervlakte (m²)</label>
                      <input 
                        type="number" 
                        className="w-full p-3 border rounded-md"
                        placeholder="Bijv. 120"
                        value={squareMeters}
                        onChange={(e) => setSquareMeters(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Gewenste isolatie (meerdere opties mogelijk)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="spouwmuur" 
                          className="w-4 h-4 mr-2"
                          checked={insulation.includes('spouwmuur')}
                          onChange={() => handleInsulationChange('spouwmuur')}
                        />
                        <label htmlFor="spouwmuur">Spouwmuurisolatie</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="dak" 
                          className="w-4 h-4 mr-2"
                          checked={insulation.includes('dak')}
                          onChange={() => handleInsulationChange('dak')}
                        />
                        <label htmlFor="dak">Dakisolatie</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="vloer" 
                          className="w-4 h-4 mr-2"
                          checked={insulation.includes('vloer')}
                          onChange={() => handleInsulationChange('vloer')}
                        />
                        <label htmlFor="vloer">Vloerisolatie</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="glas" 
                          className="w-4 h-4 mr-2"
                          checked={insulation.includes('glas')}
                          onChange={() => handleInsulationChange('glas')}
                        />
                        <label htmlFor="glas">HR++ Glasisolatie</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={calculateSavings}
                    className="w-full"
                    disabled={!homeType || !constructionYear || !currentInsulation || !squareMeters || insulation.length === 0}
                  >
                    <Calculator className="mr-2 h-4 w-4" /> Bereken mijn besparing
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-brand-darkGreen mb-4">Uw besparingsresultaat</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between pb-4 border-b">
                        <span className="font-medium">Jaarlijkse energiebesparing</span>
                        <span className="font-bold text-lg">€ 750 - € 1.250</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b">
                        <span className="font-medium">CO2-reductie per jaar</span>
                        <span className="font-bold text-lg">1.200 - 2.000 kg</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b">
                        <span className="font-medium">Comfortverbetering</span>
                        <span className="font-bold text-lg">++</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Terugverdientijd</span>
                        <span className="font-bold text-lg">3 - 7 jaar</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded flex items-start">
                      <Info className="h-5 w-5 text-yellow-700 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-yellow-700">
                        Dit is een indicatie gebaseerd op gemiddelde waarden. Voor een exacte berekening 
                        kunt u een vrijblijvende afspraak maken voor een inspectie aan huis.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <h4 className="font-bold text-lg">Aanbevolen isolatieoplossingen</h4>
                    
                    {insulation.includes('spouwmuur') && (
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-brand-lightGreen mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Spouwmuurisolatie</span>
                          <p className="text-sm text-gray-600">
                            Bespaart tot 30% op uw energierekening en verhoogt het wooncomfort aanzienlijk.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {insulation.includes('dak') && (
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-brand-lightGreen mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Dakisolatie</span>
                          <p className="text-sm text-gray-600">
                            Voorkomt tot 30% warmteverlies via het dak en zorgt voor een aangenamer binnenklimaat.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {insulation.includes('vloer') && (
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-brand-lightGreen mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Vloerisolatie</span>
                          <p className="text-sm text-gray-600">
                            Elimineert koude vloeren en bespaart ongeveer 15% op uw energierekening.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {insulation.includes('glas') && (
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-brand-lightGreen mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium">HR++ Glasisolatie</span>
                          <p className="text-sm text-gray-600">
                            Isoleert tot 3x beter dan enkelglas en zorgt voor minder geluid van buitenaf.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button 
                      variant="outline"
                      onClick={resetCalculator}
                      className="flex-1"
                    >
                      Opnieuw berekenen
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Vrijblijvende offerte aanvragen
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IsolatieCalculator;
