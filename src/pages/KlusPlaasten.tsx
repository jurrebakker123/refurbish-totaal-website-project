
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Wrench,
  Upload,
  Calendar,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

const KlusPlaasten = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Service selection
    selectedCategory: '',
    
    // Step 2: Location
    postcode: '',
    plaats: '',
    
    // Step 3: What needs to be done
    actions: [] as string[],
    
    // Service-specific questions
    oppervlakte: '',
    hoogte: '',
    kamers: '',
    materiaal: '',
    kleur: '',
    
    // Step 5: Where/Location specific
    locatie: '',
    
    // Step 6: Access
    toegankelijkheid: '',
    toegankelijkheidAnders: '',
    
    // Step 7: Material
    materiaalType: '',
    materiaalAnders: '',
    
    // Step 8: Current state
    huidigeToestand: '',
    huidigeToestandAnders: '',
    
    // Step 9: Timeline
    termijn: '',
    
    // Step 10: Photos
    fotoOptie: '',
    
    // Step 11: Additional info
    aanvullendeInfo: '',
    
    // Step 12: Contact
    email: ''
  });

  const serviceCategories = [
    { id: 'bestrating', name: 'Bestrating', icon: 'square' },
    { id: 'dakkapel', name: 'Dakkapel', icon: 'home' },
    { id: 'schilderwerk', name: 'Schilderwerk', icon: 'paintbrush' },
    { id: 'loodgieterwerk', name: 'Loodgieterswerk', icon: 'wrench' },
    { id: 'tuinonderhoud', name: 'Tuinonderhoud', icon: 'leaf' },
    { id: 'elektriciteit', name: 'Elektriciteitswerk', icon: 'zap' },
    { id: 'isolatie', name: 'Isolatie', icon: 'shield' },
    { id: 'kozijnen', name: 'Kozijnen & Ramen', icon: 'door-open' },
    { id: 'vloeren', name: 'Vloeren', icon: 'square' },
    { id: 'stukadoren', name: 'Stukadoren', icon: 'wall' },
    { id: 'tegellegen', name: 'Tegels leggen', icon: 'grid' },
    { id: 'keukenmontage', name: 'Keuken montage', icon: 'chef-hat' }
  ];

  const actions = [
    'Levering',
    'Installeren',
    'Vervangen',
    'Verwijderen',
    'Repareren'
  ];

  // Service-specific questions configuration
  const getServiceQuestions = (serviceId: string) => {
    switch (serviceId) {
      case 'bestrating':
        return {
          specificQuestion: 'Wat is de geschatte oppervlakte van het gebied dat bestraat moet worden in m²?',
          specificPlaceholder: 'Bijvoorbeeld: 50',
          specificUnit: 'm²',
          locatieOptions: [
            'Tuin of Patio',
            'Looppad of stoep',
            'Oprit',
            'Terras of balkon',
            'Tuinpaden',
            'Anders'
          ],
          materiaalOptions: [
            'Bakstenen (klinkers)',
            'Beton',
            'Kasseien',
            'Grind',
            'Hout',
            'Tegels',
            'In overleg',
            'Anders, namelijk'
          ],
          huidigeToestandOptions: [
            'Oude bestrating',
            'Asfalt of cement',
            'Aarde of gras',
            'Stenen of grind',
            'Anders, namelijk'
          ]
        };
      
      case 'schilderwerk':
        return {
          specificQuestion: 'Hoeveel m² moet er geschilderd worden?',
          specificPlaceholder: 'Bijvoorbeeld: 100',
          specificUnit: 'm²',
          locatieOptions: [
            'Binnen (woonkamer)',
            'Binnen (slaapkamer)',
            'Binnen (keuken)',
            'Binnen (badkamer)',
            'Buiten (gevel)',
            'Buiten (kozijnen)',
            'Anders'
          ],
          materiaalOptions: [
            'Latex verf',
            'Alkydverf',
            'Beits',
            'Grondverf',
            'In overleg',
            'Anders, namelijk'
          ],
          huidigeToestandOptions: [
            'Nog niet geschilderd',
            'Oude verf (goed)',
            'Oude verf (slecht)',
            'Behang',
            'Kale muur',
            'Anders, namelijk'
          ]
        };
      
      case 'dakkapel':
        return {
          specificQuestion: 'Wat is de gewenste breedte van de dakkapel?',
          specificPlaceholder: 'Bijvoorbeeld: 3',
          specificUnit: 'meter',
          locatieOptions: [
            'Voorkant woning',
            'Achterkant woning',
            'Zijkant woning',
            'Nog niet bepaald'
          ],
          materiaalOptions: [
            'Hout',
            'Kunststof',
            'Aluminium',
            'Zink',
            'In overleg',
            'Anders, namelijk'
          ],
          huidigeToestandOptions: [
            'Nieuwbouw',
            'Bestaand dak (goed)',
            'Bestaand dak (renovatie nodig)',
            'Anders, namelijk'
          ]
        };
      
      case 'loodgieterwerk':
        return {
          specificQuestion: 'Hoeveel punten/kranen moeten worden aangesloten?',
          specificPlaceholder: 'Bijvoorbeeld: 2',
          specificUnit: 'stuks',
          locatieOptions: [
            'Keuken',
            'Badkamer',
            'Toilet',
            'Wasruimte',
            'Tuin',
            'Kelder',
            'Anders'
          ],
          materiaalOptions: [
            'Koperen leidingen',
            'Kunststof leidingen',
            'RVS leidingen',
            'In overleg',
            'Anders, namelijk'
          ],
          huidigeToestandOptions: [
            'Nieuwbouw',
            'Bestaande leidingen (goed)',
            'Bestaande leidingen (vervangen)',
            'Lekkage',
            'Anders, namelijk'
          ]
        };
      
      case 'tuinonderhoud':
        return {
          specificQuestion: 'Wat is de geschatte oppervlakte van de tuin?',
          specificPlaceholder: 'Bijvoorbeeld: 200',
          specificUnit: 'm²',
          locatieOptions: [
            'Voor- en achtertuin',
            'Alleen voortuin',
            'Alleen achtertuin',
            'Zijkanten',
            'Dakterras',
            'Anders'
          ],
          materiaalOptions: [
            'Nieuwe beplanting',
            'Graszaad',
            'Kunstgras',
            'Tegels/bestrating',
            'In overleg',
            'Anders, namelijk'
          ],
          huidigeToestandOptions: [
            'Verwilderde tuin',
            'Onderhouden tuin',
            'Kale grond',
            'Veel onkruid',
            'Anders, namelijk'
          ]
        };
      
      default:
        return {
          specificQuestion: 'Kun je de omvang van het project omschrijven?',
          specificPlaceholder: 'Bijvoorbeeld: 3 kamers',
          specificUnit: '',
          locatieOptions: [
            'Binnen',
            'Buiten',
            'Beide',
            'Anders'
          ],
          materiaalOptions: [
            'Standaard materialen',
            'Premium materialen',
            'In overleg',
            'Anders, namelijk'
          ],
          huidigeToestandOptions: [
            'Nieuw',
            'Bestaand (goed)',
            'Bestaand (renovatie nodig)',
            'Anders, namelijk'
          ]
        };
    }
  };

  const termijnOpties = [
    'Met spoed',
    'In overleg',
    'Binnen 2 weken',
    'Binnen een maand',
    'Binnen een paar maanden'
  ];

  const toegankelijkheidOpties = [
    'Vrij toegankelijk',
    'Via de woning',
    'Via het tuinhek / poort',
    'Andere reden, namelijk'
  ];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 12));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleActionToggle = (action: string) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.includes(action)
        ? prev.actions.filter(a => a !== action)
        : [...prev.actions, action]
    }));
  };

  const getCurrentServiceQuestions = () => {
    return getServiceQuestions(formData.selectedCategory);
  };

  const renderStep = () => {
    const serviceQuestions = getCurrentServiceQuestions();
    
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Wat is je klus?</h2>
              <p className="text-gray-600">Vind de dienst die je nodig hebt om in contact te komen met geverifieerde en beoordeelde vakmannen in de buurt.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {serviceCategories.map((category) => (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.selectedCategory === category.id ? 'border-brand-lightGreen bg-green-50' : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, selectedCategory: category.id }))}
                >
                  <CardContent className="p-4 text-center">
                    <Wrench className="h-8 w-8 mx-auto mb-2 text-brand-darkGreen" />
                    <p className="font-medium text-sm">{category.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Wat is de locatie van je klus?</h2>
              <p className="text-gray-600">Postcode van de klus</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, postcode: e.target.value }))}
                  placeholder="1234 AB"
                />
              </div>
              <div>
                <Label htmlFor="plaats">Plaats</Label>
                <Input
                  id="plaats"
                  value={formData.plaats}
                  onChange={(e) => setFormData(prev => ({ ...prev, plaats: e.target.value }))}
                  placeholder="Amsterdam"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Wat moet er gebeuren?</h2>
              <p className="text-gray-600">Selecteer alle gewenste opties</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-3">
              {actions.map((action) => (
                <div key={action} className="flex items-center space-x-2">
                  <Checkbox
                    id={action}
                    checked={formData.actions.includes(action)}
                    onCheckedChange={() => handleActionToggle(action)}
                  />
                  <Label htmlFor={action}>{action}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{serviceQuestions.specificQuestion}</h2>
              <p className="text-gray-600">Een ruwe schatting is voldoende voor de vakman</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Label htmlFor="specifiek">
                {serviceQuestions.specificUnit ? `Aantal/Omvang in ${serviceQuestions.specificUnit}` : 'Omvang'}
              </Label>
              <Input
                id="specifiek"
                value={formData.oppervlakte}
                onChange={(e) => setFormData(prev => ({ ...prev, oppervlakte: e.target.value }))}
                placeholder={serviceQuestions.specificPlaceholder}
                type="number"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Waar moet het werk worden uitgevoerd?</h2>
            </div>
            
            <div className="max-w-md mx-auto">
              <RadioGroup value={formData.locatie} onValueChange={(value) => setFormData(prev => ({ ...prev, locatie: value }))}>
                {serviceQuestions.locatieOptions.map((locatie) => (
                  <div key={locatie} className="flex items-center space-x-2">
                    <RadioGroupItem value={locatie} id={locatie} />
                    <Label htmlFor={locatie}>{locatie}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Hoe kan de werklocatie worden bereikt?</h2>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <RadioGroup value={formData.toegankelijkheid} onValueChange={(value) => setFormData(prev => ({ ...prev, toegankelijkheid: value }))}>
                {toegankelijkheidOpties.map((optie) => (
                  <div key={optie} className="flex items-center space-x-2">
                    <RadioGroupItem value={optie} id={optie} />
                    <Label htmlFor={optie}>{optie}</Label>
                  </div>
                ))}
              </RadioGroup>
              
              {formData.toegankelijkheid === 'Andere reden, namelijk' && (
                <Input
                  value={formData.toegankelijkheidAnders}
                  onChange={(e) => setFormData(prev => ({ ...prev, toegankelijkheidAnders: e.target.value }))}
                  placeholder="Beschrijf de toegankelijkheid"
                />
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Wat voor materiaal wil je gebruiken?</h2>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <RadioGroup value={formData.materiaalType} onValueChange={(value) => setFormData(prev => ({ ...prev, materiaalType: value }))}>
                {serviceQuestions.materiaalOptions.map((materiaal) => (
                  <div key={materiaal} className="flex items-center space-x-2">
                    <RadioGroupItem value={materiaal} id={materiaal} />
                    <Label htmlFor={materiaal}>{materiaal}</Label>
                  </div>
                ))}
              </RadioGroup>
              
              {formData.materiaalType === 'Anders, namelijk' && (
                <Input
                  value={formData.materiaalAnders}
                  onChange={(e) => setFormData(prev => ({ ...prev, materiaalAnders: e.target.value }))}
                  placeholder="Beschrijf het gewenste materiaal"
                />
              )}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Wat is de huidige toestand?</h2>
              <p className="text-gray-600">(optioneel)</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <RadioGroup value={formData.huidigeToestand} onValueChange={(value) => setFormData(prev => ({ ...prev, huidigeToestand: value }))}>
                {serviceQuestions.huidigeToestandOptions.map((toestand) => (
                  <div key={toestand} className="flex items-center space-x-2">
                    <RadioGroupItem value={toestand} id={toestand} />
                    <Label htmlFor={toestand}>{toestand}</Label>
                  </div>
                ))}
              </RadioGroup>
              
              {formData.huidigeToestand === 'Anders, namelijk' && (
                <Input
                  value={formData.huidigeToestandAnders}
                  onChange={(e) => setFormData(prev => ({ ...prev, huidigeToestandAnders: e.target.value }))}
                  placeholder="Beschrijf de huidige toestand"
                />
              )}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Wanneer moet de klus worden uitgevoerd?</h2>
              <p className="text-gray-600">(optioneel)</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <RadioGroup value={formData.termijn} onValueChange={(value) => setFormData(prev => ({ ...prev, termijn: value }))}>
                {termijnOpties.map((termijn) => (
                  <div key={termijn} className="flex items-center space-x-2">
                    <RadioGroupItem value={termijn} id={termijn} />
                    <Label htmlFor={termijn}>{termijn}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Voeg foto's of tekeningen toe</h2>
              <p className="text-gray-600">(optioneel)</p>
              <p className="text-sm text-gray-500">Door foto's toe te voegen kunnen vakmensen de situatie beter inschatten. Let op dat je hier geen persoonlijke gegevens deelt.</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <RadioGroup value={formData.fotoOptie} onValueChange={(value) => setFormData(prev => ({ ...prev, fotoOptie: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ja" id="foto-ja" />
                  <Label htmlFor="foto-ja">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nee" id="foto-nee" />
                  <Label htmlFor="foto-nee">Nee, misschien later</Label>
                </div>
              </RadioGroup>
              
              {formData.fotoOptie === 'ja' && (
                <div className="mt-4 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600">Klik hier om foto's te uploaden</p>
                </div>
              )}
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Aanvullende informatie</h2>
              <p className="text-gray-600">(optioneel)</p>
              <p className="text-sm text-gray-500">Deel hier svp niet je contactgegevens</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Textarea
                value={formData.aanvullendeInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, aanvullendeInfo: e.target.value }))}
                placeholder="Bijvoorbeeld welke termijn de klus echt klaar moet zijn, datum of andere belangrijke info..."
                rows={4}
              />
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Ontvang reacties van vakmensen bij jou in de buurt</h2>
              <p className="text-gray-600">Deze gegevens zijn niet zichtbaar voor vakmannen, totdat jij besluit met ze in contact te komen.</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="jouw@email.com"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.selectedCategory;
      case 2: return formData.postcode && formData.plaats;
      case 3: return formData.actions.length > 0;
      case 12: return formData.email;
      default: return true;
    }
  };

  return (
    <>
      <Helmet>
        <title>Plaats een klus - Refurbish</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/marketplace" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-brand-darkGreen" />
                <span className="text-xl font-bold text-brand-darkGreen">Refurbish</span>
              </Link>
              <Link to="/marketplace" className="text-gray-600 hover:text-gray-900">
                Terug naar marketplace
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Stap {currentStep} van 12</span>
                <span className="text-sm text-gray-600">{Math.round((currentStep / 12) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand-lightGreen h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 12) * 100}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            <Card>
              <CardContent className="p-8">
                {renderStep()}
              </CardContent>
            </Card>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Vorige</span>
              </Button>

              {currentStep < 12 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 bg-brand-lightGreen hover:bg-brand-darkGreen"
                >
                  <span>Volgende</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    console.log('Form submitted:', formData);
                    // Handle form submission
                    navigate('/marketplace');
                  }}
                  disabled={!canProceed()}
                  className="bg-brand-lightGreen hover:bg-brand-darkGreen"
                >
                  Plaats klus
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default KlusPlaasten;
