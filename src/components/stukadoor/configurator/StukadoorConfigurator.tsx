
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const StukadoorConfigurator = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Project details
    werk_type: '',
    oppervlakte: 0,
    afwerking: '',
    aantal_kamers: 1,
    huidige_staat: '',
    voorbewerking: '',
    isolatie_gewenst: false,
    
    // Contact details
    voornaam: '',
    achternaam: '',
    emailadres: '',
    telefoon: '',
    straatnaam: '',
    huisnummer: '',
    postcode: '',
    plaats: '',
    bericht: ''
  });

  const calculatePrice = () => {
    const basePrice = formData.oppervlakte * 35; // €35 per m²
    let totalPrice = basePrice;
    
    if (formData.afwerking === 'spuitwerk') totalPrice += basePrice * 0.4;
    if (formData.afwerking === 'decoratief') totalPrice += basePrice * 0.6;
    if (formData.isolatie_gewenst) totalPrice += formData.oppervlakte * 20;
    if (formData.huidige_staat === 'slecht') totalPrice += basePrice * 0.3;
    if (formData.aantal_kamers > 3) totalPrice += (formData.aantal_kamers - 3) * 300;
    
    return Math.round(totalPrice);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const totalPrice = calculatePrice();
      
      const { data, error } = await supabase
        .from('stukadoor_aanvragen')
        .insert({
          werk_type: formData.werk_type,
          oppervlakte: formData.oppervlakte,
          afwerking: formData.afwerking,
          aantal_kamers: formData.aantal_kamers,
          huidige_staat: formData.huidige_staat,
          voorbewerking: formData.voorbewerking,
          isolatie_gewenst: formData.isolatie_gewenst,
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          emailadres: formData.emailadres,
          telefoon: formData.telefoon,
          straatnaam: formData.straatnaam,
          huisnummer: formData.huisnummer,
          postcode: formData.postcode,
          plaats: formData.plaats,
          bericht: formData.bericht,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        });

      if (error) {
        console.error('Error submitting stukadoor request:', error);
        toast.error('Er is een fout opgetreden bij het versturen van uw aanvraag.');
        return;
      }

      console.log('Stukadoor request submitted successfully:', data);
      toast.success('Uw stukadoor aanvraag is succesvol verstuurd!');
      
      // Reset form
      setFormData({
        werk_type: '',
        oppervlakte: 0,
        afwerking: '',
        aantal_kamers: 1,
        huidige_staat: '',
        voorbewerking: '',
        isolatie_gewenst: false,
        voornaam: '',
        achternaam: '',
        emailadres: '',
        telefoon: '',
        straatnaam: '',
        huisnummer: '',
        postcode: '',
        plaats: '',
        bericht: ''
      });
      setStep(1);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Er is een onverwachte fout opgetreden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Stukadoor Configurator</CardTitle>
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Project Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="werk_type">Type Werk</Label>
                  <Select onValueChange={(value) => setFormData({...formData, werk_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer werk type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nieuw_stucwerk">Nieuw stucwerk</SelectItem>
                      <SelectItem value="herstel_stucwerk">Herstel stucwerk</SelectItem>
                      <SelectItem value="wandafwerking">Wandafwerking</SelectItem>
                      <SelectItem value="plafond_afwerking">Plafond afwerking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="oppervlakte">Oppervlakte (m²)</Label>
                  <Input
                    type="number"
                    value={formData.oppervlakte}
                    onChange={(e) => setFormData({...formData, oppervlakte: parseInt(e.target.value) || 0})}
                    placeholder="Oppervlakte in m²"
                  />
                </div>

                <div>
                  <Label htmlFor="afwerking">Type Afwerking</Label>
                  <Select onValueChange={(value) => setFormData({...formData, afwerking: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer afwerking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="glad_stucwerk">Glad stucwerk</SelectItem>
                      <SelectItem value="spuitwerk">Spuitwerk</SelectItem>
                      <SelectItem value="structuur_stucwerk">Structuur stucwerk</SelectItem>
                      <SelectItem value="decoratief">Decoratief stucwerk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="aantal_kamers">Aantal Kamers</Label>
                  <Input
                    type="number"
                    value={formData.aantal_kamers}
                    onChange={(e) => setFormData({...formData, aantal_kamers: parseInt(e.target.value) || 1})}
                    min="1"
                  />
                </div>

                <div>
                  <Label htmlFor="huidige_staat">Huidige Staat</Label>
                  <Select onValueChange={(value) => setFormData({...formData, huidige_staat: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer huidige staat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="goed">Goed</SelectItem>
                      <SelectItem value="matig">Matig</SelectItem>
                      <SelectItem value="slecht">Slecht</SelectItem>
                      <SelectItem value="nieuwbouw">Nieuwbouw</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="voorbewerking">Voorbewerking</Label>
                  <Select onValueChange={(value) => setFormData({...formData, voorbewerking: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer voorbewerking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geen">Geen</SelectItem>
                      <SelectItem value="schuren">Schuren</SelectItem>
                      <SelectItem value="strippen">Strippen</SelectItem>
                      <SelectItem value="repareren">Repareren</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isolatie"
                    checked={formData.isolatie_gewenst}
                    onCheckedChange={(checked) => setFormData({...formData, isolatie_gewenst: checked as boolean})}
                  />
                  <Label htmlFor="isolatie">Isolatie gewenst</Label>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold">Geschatte Prijs: €{calculatePrice().toLocaleString()}</h4>
                <p className="text-sm text-gray-600">Dit is een indicatieve prijs. Definitieve prijs volgt na inspectie.</p>
              </div>

              <Button onClick={nextStep} className="w-full">
                Volgende Stap
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Contactgegevens</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voornaam">Voornaam</Label>
                  <Input
                    value={formData.voornaam}
                    onChange={(e) => setFormData({...formData, voornaam: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="achternaam">Achternaam</Label>
                  <Input
                    value={formData.achternaam}
                    onChange={(e) => setFormData({...formData, achternaam: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="emailadres">E-mailadres</Label>
                  <Input
                    type="email"
                    value={formData.emailadres}
                    onChange={(e) => setFormData({...formData, emailadres: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="telefoon">Telefoon</Label>
                  <Input
                    value={formData.telefoon}
                    onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="straatnaam">Straatnaam</Label>
                  <Input
                    value={formData.straatnaam}
                    onChange={(e) => setFormData({...formData, straatnaam: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="huisnummer">Huisnummer</Label>
                  <Input
                    value={formData.huisnummer}
                    onChange={(e) => setFormData({...formData, huisnummer: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    value={formData.postcode}
                    onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="plaats">Plaats</Label>
                  <Input
                    value={formData.plaats}
                    onChange={(e) => setFormData({...formData, plaats: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bericht">Aanvullende informatie</Label>
                <Textarea
                  value={formData.bericht}
                  onChange={(e) => setFormData({...formData, bericht: e.target.value})}
                  placeholder="Eventuele aanvullende wensen of opmerkingen..."
                  rows={4}
                />
              </div>

              <div className="flex space-x-4">
                <Button onClick={prevStep} variant="outline" className="flex-1">
                  Vorige Stap
                </Button>
                <Button onClick={nextStep} className="flex-1">
                  Volgende Stap
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Overzicht & Verzenden</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Project Samenvatting:</h4>
                <p><strong>Type:</strong> {formData.werk_type}</p>
                <p><strong>Oppervlakte:</strong> {formData.oppervlakte} m²</p>
                <p><strong>Afwerking:</strong> {formData.afwerking}</p>
                <p><strong>Aantal kamers:</strong> {formData.aantal_kamers}</p>
                <p><strong>Geschatte prijs:</strong> €{calculatePrice().toLocaleString()}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Contactgegevens:</h4>
                <p><strong>Naam:</strong> {formData.voornaam} {formData.achternaam}</p>
                <p><strong>Email:</strong> {formData.emailadres}</p>
                <p><strong>Telefoon:</strong> {formData.telefoon}</p>
                <p><strong>Adres:</strong> {formData.straatnaam} {formData.huisnummer}, {formData.postcode} {formData.plaats}</p>
              </div>

              <div className="flex space-x-4">
                <Button onClick={prevStep} variant="outline" className="flex-1">
                  Vorige Stap
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    'Aanvraag Verzenden'
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StukadoorConfigurator;
