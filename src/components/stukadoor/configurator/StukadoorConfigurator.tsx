import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import WhatsAppOptInCheckbox from '@/components/common/WhatsAppOptInCheckbox';

const StukadoorConfigurator = () => {
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    emailadres: '',
    telefoon: '',
    straatnaam: '',
    huisnummer: '',
    postcode: '',
    plaats: '',
    werk_type: 'binnen',
    bouw_type: 'renovatie',
    oppervlakte: '',
    uitvoertermijn: '',
    reden_aanvraag: '',
    bericht: '',
    whatsapp_optin: false
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    const oppervlakteNum = parseFloat(formData.oppervlakte) || 0;
    
    // Basis prijs voor sausklaar stucwerk per m² (wand)
    const basePricePerM2 = 17.25;
    const basePrice = oppervlakteNum * basePricePerM2;
    
    // BTW percentage bepalen
    const btwPercentage = formData.bouw_type === 'nieuwbouw' ? 1.21 : 1.09;
    
    return Math.round(basePrice * btwPercentage);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Bestand is te groot. Maximaal 10MB toegestaan.');
        return;
      }
      setUploadedFile(file);
      toast.success('Bestand succesvol geüpload');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.whatsapp_optin) {
      toast.error('WhatsApp toestemming is verplicht voor deze service');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const totalPrice = calculatePrice();
      
      // Save to database
      const { data: savedData, error } = await supabase
        .from('stukadoor_aanvragen')
        .insert({
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          emailadres: formData.emailadres,
          telefoon: formData.telefoon,
          straatnaam: formData.straatnaam,
          huisnummer: formData.huisnummer,
          postcode: formData.postcode,
          plaats: formData.plaats,
          werk_type: `${formData.werk_type} - ${formData.bouw_type}`,
          afwerking: 'Te bepalen',
          oppervlakte: parseInt(formData.oppervlakte) || 0,
          uitvoertermijn: formData.uitvoertermijn,
          reden_aanvraag: formData.reden_aanvraag,
          bericht: formData.bericht,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger WhatsApp lead nurturing
      if (formData.whatsapp_optin && savedData) {
        const phoneNumber = formData.telefoon.replace(/[\s\-\+\(\)]/g, '');
        const formattedPhone = phoneNumber.startsWith('06') ? '31' + phoneNumber.substring(1) : 
                              phoneNumber.startsWith('6') ? '31' + phoneNumber : phoneNumber;

        await supabase.functions.invoke('whatsapp-lead-nurturing', {
          body: {
            leadId: savedData.id,
            phoneNumber: formattedPhone,
            customerName: `${formData.voornaam} ${formData.achternaam}`,
            step: 'initial'
          }
        });
      }

      toast.success('Aanvraag succesvol verzonden! Je ontvangt binnen 1 minuut een WhatsApp bericht.');
      
      // Reset form
      setFormData({
        voornaam: '',
        achternaam: '',
        emailadres: '',
        telefoon: '',
        straatnaam: '',
        huisnummer: '',
        postcode: '',
        plaats: '',
        werk_type: 'binnen',
        bouw_type: 'renovatie',
        oppervlakte: '',
        uitvoertermijn: '',
        reden_aanvraag: '',
        bericht: '',
        whatsapp_optin: false
      });
      setUploadedFile(null);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Er ging iets mis bij het verzenden van je aanvraag');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bepaal BTW percentage
  const btw = formData.bouw_type === 'nieuwbouw' ? 21 : 9;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Stucwerk Configurator</CardTitle>
          <p className="text-center text-gray-600">
            Configureer je stucwerk project en ontvang direct een prijsindicatie
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="voornaam">Voornaam</Label>
                <Input
                  id="voornaam"
                  value={formData.voornaam}
                  onChange={(e) => setFormData({...formData, voornaam: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="achternaam">Achternaam</Label>
                <Input
                  id="achternaam"
                  value={formData.achternaam}
                  onChange={(e) => setFormData({...formData, achternaam: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emailadres">E-mailadres</Label>
                <Input
                  id="emailadres"
                  type="email"
                  value={formData.emailadres}
                  onChange={(e) => setFormData({...formData, emailadres: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefoon">Telefoonnummer</Label>
                <Input
                  id="telefoon"
                  value={formData.telefoon}
                  onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="straatnaam">Straatnaam</Label>
                <Input
                  id="straatnaam"
                  value={formData.straatnaam}
                  onChange={(e) => setFormData({...formData, straatnaam: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="huisnummer">Huisnummer</Label>
                <Input
                  id="huisnummer"
                  value={formData.huisnummer}
                  onChange={(e) => setFormData({...formData, huisnummer: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="plaats">Plaats</Label>
                <Input
                  id="plaats"
                  value={formData.plaats}
                  onChange={(e) => setFormData({...formData, plaats: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Build Type Selection */}
            <div>
              <Label className="text-base font-medium">Nieuwbouw of renovatie?</Label>
              <RadioGroup
                value={formData.bouw_type}
                onValueChange={(value) => setFormData({...formData, bouw_type: value})}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="renovatie" id="renovatie-stuc" />
                  <Label htmlFor="renovatie-stuc">Renovatie (9% BTW)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nieuwbouw" id="nieuwbouw-stuc" />
                  <Label htmlFor="nieuwbouw-stuc">Nieuwbouw (21% BTW)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Work Type Selection */}
            <div>
              <Label className="text-base font-medium">Binnen of buiten stukadoorswerk?</Label>
              <RadioGroup
                value={formData.werk_type}
                onValueChange={(value) => setFormData({...formData, werk_type: value})}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="binnen" id="binnen-stuc" />
                  <Label htmlFor="binnen-stuc">Binnen stukadoorswerk</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buiten" id="buiten-stuc" />
                  <Label htmlFor="buiten-stuc">Buiten stukadoorswerk</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Project Details */}
            <div>
              <Label htmlFor="oppervlakte">Oppervlakte (m²)</Label>
              <Input
                id="oppervlakte"
                type="number"
                value={formData.oppervlakte}
                onChange={(e) => setFormData({...formData, oppervlakte: e.target.value})}
                placeholder="Bijvoorbeeld: 30"
                required
              />
            </div>

            <div>
              <Label htmlFor="uitvoertermijn">Wat is de gewenste uitvoertermijn?</Label>
              <Input
                id="uitvoertermijn"
                value={formData.uitvoertermijn}
                onChange={(e) => setFormData({...formData, uitvoertermijn: e.target.value})}
                placeholder="Bijvoorbeeld: binnen 3 weken, flexibel"
                required
              />
            </div>

            <div>
              <Label htmlFor="reden_aanvraag">Wat is de reden van uw aanvraag?</Label>
              <Input
                id="reden_aanvraag"
                value={formData.reden_aanvraag}
                onChange={(e) => setFormData({...formData, reden_aanvraag: e.target.value})}
                placeholder="Bijvoorbeeld: schade herstel, vernieuwing, renovatie"
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <Label htmlFor="file-upload">Bijlage uploaden (optioneel)</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="mt-2"
              />
              {uploadedFile && (
                <p className="text-sm text-green-600 mt-1">
                  Bestand geüpload: {uploadedFile.name}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Ondersteunde formaten: PDF, JPG, PNG, DOC, DOCX (max 10MB)
              </p>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="bericht">Aanvullende opmerkingen (optioneel)</Label>
              <Textarea
                id="bericht"
                value={formData.bericht}
                onChange={(e) => setFormData({...formData, bericht: e.target.value})}
                placeholder="Eventuele extra informatie over uw project..."
              />
            </div>

            {/* WhatsApp Opt-in */}
            <WhatsAppOptInCheckbox
              checked={formData.whatsapp_optin}
              onCheckedChange={(checked) => setFormData({...formData, whatsapp_optin: checked})}
            />

            {/* Price Display */}
            {formData.oppervlakte && parseFloat(formData.oppervlakte) > 0 && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-800">Geschatte Prijs (Indicatief)</h3>
                    <p className="text-3xl font-bold text-green-600">€{calculatePrice().toLocaleString()}</p>
                    <p className="text-sm text-green-700">
                      Inclusief materiaal en arbeid
                    </p>
                    <p className="text-xs text-green-600 mt-2">
                      {formData.bouw_type === 'nieuwbouw' ? 'Nieuwbouw' : 'Renovatie'} - {btw}% BTW
                    </p>
                    <p className="text-xs text-green-500 mt-1">
                      Basis: sausklaar stucwerk wand (€17,25/m² excl. BTW)
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Bezig met verzenden...' : 'Aanvraag Versturen'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StukadoorConfigurator;
