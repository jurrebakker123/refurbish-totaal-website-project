
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, Check, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const VakmanRegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Location
    werklocatie: '',
    straal: '30',
    
    // Step 2: Services
    selectedServices: [] as string[],
    selectedSubServices: {} as Record<string, string[]>,
    
    // Step 3: Company details
    bedrijfsnaam: '',
    kvkNummer: '',
    website: '',
    aantalMedewerkers: '',
    adres: '',
    postcode: '',
    plaats: '',
    
    // Step 4: Contact details
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    acceptTerms: false
  });

  const serviceCategories = [
    {
      name: 'Dakkapel',
      subServices: ['Dakkapel plaatsen', 'Dakkapel plaatsen met nokverhoging', 'Dakkapel renovatie']
    },
    {
      name: 'Schilderwerk',
      subServices: ['Binnenschilderwerk', 'Buitenschilderwerk', 'Behangen', 'Spuitwerk']
    },
    {
      name: 'Loodgieterswerk',
      subServices: ['Sanitair installatie', 'Leidingwerk', 'CV-installatie', 'Reparaties']
    },
    {
      name: 'Elektricien',
      subServices: ['Elektrotechniek', 'Bedrading', 'Verlichting', 'Meterkast', 'Storingen']
    },
    {
      name: 'Timmerman',
      subServices: ['Timmerwerk', 'Meubels op maat', 'Constructies', 'Kozijnen', 'Deuren']
    },
    {
      name: 'Tegelleger',
      subServices: ['Badkamer tegels', 'Keuken tegels', 'Vloertegels', 'Wandtegels']
    },
    {
      name: 'Dakdekker',
      subServices: ['Dakbedekking', 'Goten', 'Dakgoot reparatie', 'Dakisolatie']
    },
    {
      name: 'Tuinman',
      subServices: ['Tuinonderhoud', 'Tuinaanleg', 'Snoeiwerk', 'Bestrating']
    },
    {
      name: 'Isolatie',
      subServices: ['Spouwmuurisolatie', 'Dakisolatie', 'Vloerisolatie', 'Gevelisolatie']
    },
    {
      name: 'Stukadoor',
      subServices: ['Pleisterwerk', 'Afwerking wanden', 'Sierpleister', 'Reparaties']
    },
    {
      name: 'Vloerlegger',
      subServices: ['Laminaat', 'Parket', 'Vinyl', 'PVC vloeren', 'Tegelvloeren']
    },
    {
      name: 'Zonnepanelen',
      subServices: ['Zonnepanelen installatie', 'Omvormer', 'Batterij systemen']
    }
  ];

  const steps = [
    { number: 1, title: 'Werkgebied', completed: currentStep > 1 },
    { number: 2, title: 'Vakgebieden', completed: currentStep > 2 },
    { number: 3, title: 'Bedrijfsgegevens', completed: currentStep > 3 },
    { number: 4, title: 'Contactgegevens', completed: currentStep > 4 }
  ];

  const handleServiceToggle = (serviceName: string) => {
    const newSelected = formData.selectedServices.includes(serviceName)
      ? formData.selectedServices.filter(s => s !== serviceName)
      : [...formData.selectedServices, serviceName];
    
    if (newSelected.length <= 6) {
      setFormData({ ...formData, selectedServices: newSelected });
    } else {
      toast.error('Je kunt maximaal 6 vakgebieden selecteren');
    }
  };

  const handleSubServiceToggle = (serviceName: string, subService: string) => {
    const currentSubs = formData.selectedSubServices[serviceName] || [];
    const newSubs = currentSubs.includes(subService)
      ? currentSubs.filter(s => s !== subService)
      : [...currentSubs, subService];
    
    setFormData({
      ...formData,
      selectedSubServices: {
        ...formData.selectedSubServices,
        [serviceName]: newSubs
      }
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.acceptTerms) {
      toast.error('Je moet akkoord gaan met de algemene voorwaarden');
      return;
    }

    setIsLoading(true);
    try {
      // Create user account
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: 'TempPassword123!', // In real app, user would set password
        options: {
          data: {
            user_type: 'vakman',
            voornaam: formData.voornaam,
            achternaam: formData.achternaam,
            bedrijfsnaam: formData.bedrijfsnaam,
            telefoon: formData.telefoon,
            postcode: formData.postcode,
            plaats: formData.plaats,
            adres: formData.adres,
            kvk_nummer: formData.kvkNummer,
            website: formData.website
          }
        }
      });

      if (error) throw error;

      toast.success('Account succesvol aangemaakt! Check je email voor bevestiging.');
      navigate('/marketplace/vakman-dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Er ging iets mis bij het aanmelden');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Wat is je werkgebied?</h2>
              <p className="text-gray-600 mb-6">Kies je werklocatie en selecteer een straal</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="werklocatie">Je werklocatie</Label>
                  <div className="relative">
                    <Input
                      id="werklocatie"
                      placeholder="Zoek je adres of postcode"
                      value={formData.werklocatie}
                      onChange={(e) => setFormData({ ...formData, werklocatie: e.target.value })}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="straal">Straal</Label>
                  <Select value={formData.straal} onValueChange={(value) => setFormData({ ...formData, straal: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 Km</SelectItem>
                      <SelectItem value="20">20 Km</SelectItem>
                      <SelectItem value="30">30 Km</SelectItem>
                      <SelectItem value="50">50 Km</SelectItem>
                      <SelectItem value="100">100 Km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Map placeholder - In real app, integrate with Google Maps or similar */}
              <div className="mt-6 bg-green-50 rounded-lg p-8 text-center border-2 border-dashed border-green-200">
                <MapPin className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">Kaart integratie komt hier</p>
                <p className="text-sm text-gray-500">Klik op de kaart om je werkgebied te selecteren</p>
              </div>
            </div>
            
            <Button 
              onClick={handleNext} 
              className="w-full bg-brand-lightGreen hover:bg-brand-darkGreen"
              disabled={!formData.werklocatie}
            >
              Doorgaan naar vakgebieden →
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Wat zijn je vakgebieden?</h2>
              <p className="text-gray-600 mb-6">
                Selecteer maximaal 6 gewenste vakgebieden. Je kunt er later meer toevoegen.
              </p>
              
              <div className="space-y-4">
                {serviceCategories.map((category) => (
                  <Card key={category.name} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Checkbox
                          id={category.name}
                          checked={formData.selectedServices.includes(category.name)}
                          onCheckedChange={() => handleServiceToggle(category.name)}
                        />
                        <Label htmlFor={category.name} className="font-medium">
                          {category.name}
                        </Label>
                      </div>
                      
                      {formData.selectedServices.includes(category.name) && (
                        <div className="ml-6 space-y-2">
                          <p className="text-sm text-gray-600 mb-2">
                            Opdrachten die we graag ontvangen zijn:
                          </p>
                          {category.subServices.map((subService) => (
                            <div key={subService} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${category.name}-${subService}`}
                                checked={(formData.selectedSubServices[category.name] || []).includes(subService)}
                                onCheckedChange={() => handleSubServiceToggle(category.name, subService)}
                              />
                              <Label htmlFor={`${category.name}-${subService}`} className="text-sm">
                                {subService}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Geselecteerd: {formData.selectedServices.length}/6 vakgebieden
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                ← Terug
              </Button>
              <Button 
                onClick={handleNext} 
                className="flex-1 bg-brand-lightGreen hover:bg-brand-darkGreen"
                disabled={formData.selectedServices.length === 0}
              >
                Naar bedrijfsgegevens →
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Bedrijfsgegevens</h2>
              <p className="text-gray-600 mb-6">Vul je bedrijfsgegevens in</p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bedrijfsnaam">Bedrijfsnaam *</Label>
                  <Input
                    id="bedrijfsnaam"
                    value={formData.bedrijfsnaam}
                    onChange={(e) => setFormData({ ...formData, bedrijfsnaam: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="kvkNummer">KvK-nummer *</Label>
                  <Input
                    id="kvkNummer"
                    value={formData.kvkNummer}
                    onChange={(e) => setFormData({ ...formData, kvkNummer: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postcode">Postcode *</Label>
                    <Input
                      id="postcode"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="plaats">Plaats *</Label>
                    <Input
                      id="plaats"
                      value={formData.plaats}
                      onChange={(e) => setFormData({ ...formData, plaats: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="adres">Straatnaam *</Label>
                  <Input
                    id="adres"
                    value={formData.adres}
                    onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="website">Website (optioneel)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.example.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="aantalMedewerkers">Aantal medewerkers</Label>
                  <Select 
                    value={formData.aantalMedewerkers} 
                    onValueChange={(value) => setFormData({ ...formData, aantalMedewerkers: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 medewerkers</SelectItem>
                      <SelectItem value="11-50">11-50 medewerkers</SelectItem>
                      <SelectItem value="50+">50+ medewerkers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                ← Terug
              </Button>
              <Button 
                onClick={handleNext} 
                className="flex-1 bg-brand-lightGreen hover:bg-brand-darkGreen"
                disabled={!formData.bedrijfsnaam || !formData.kvkNummer || !formData.postcode || !formData.plaats || !formData.adres}
              >
                Naar contactgegevens →
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Contactgegevens</h2>
              <p className="text-gray-600 mb-6">Laatste stap: vul je contactgegevens in</p>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="voornaam">Voornaam *</Label>
                    <Input
                      id="voornaam"
                      value={formData.voornaam}
                      onChange={(e) => setFormData({ ...formData, voornaam: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="achternaam">Achternaam *</Label>
                    <Input
                      id="achternaam"
                      value={formData.achternaam}
                      onChange={(e) => setFormData({ ...formData, achternaam: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">E-mailadres (zakelijk) *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefoon">Telefoonnummer *</Label>
                  <Input
                    id="telefoon"
                    type="tel"
                    value={formData.telefoon}
                    onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                    required
                  />
                </div>
                
                <div className="flex items-start space-x-2 mt-6">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: !!checked })}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    Door verder te gaan, ga je akkoord met de{' '}
                    <Link to="/voorwaarden" className="text-brand-lightGreen hover:underline">
                      algemene voorwaarden
                    </Link>{' '}
                    van Refurbish Totaal Nederland
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                ← Terug
              </Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 bg-brand-lightGreen hover:bg-brand-darkGreen"
                disabled={!formData.voornaam || !formData.achternaam || !formData.email || !formData.telefoon || !formData.acceptTerms || isLoading}
              >
                {isLoading ? 'Bezig met aanmelden...' : 'Bevestig aanmelding'}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Vakman Registratie - Refurbish Totaal Nederland</title>
        <meta name="description" content="Registreer je als vakman bij Refurbish Totaal Nederland en ontvang nieuwe klussen" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/marketplace" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-brand-darkGreen" />
                <span className="text-xl font-bold text-brand-darkGreen">Refurbish Totaal Nederland</span>
              </Link>
              <Link to="/marketplace" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar marketplace
              </Link>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step.completed ? 'bg-brand-lightGreen border-brand-lightGreen text-white' :
                    currentStep === step.number ? 'border-brand-lightGreen text-brand-lightGreen' :
                    'border-gray-300 text-gray-300'
                  }`}>
                    {step.completed ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep === step.number ? 'text-brand-lightGreen font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`ml-4 w-8 h-0.5 ${
                      step.completed ? 'bg-brand-lightGreen' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card>
              <CardContent className="p-8">
                {renderStepContent()}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default VakmanRegistrationPage;
