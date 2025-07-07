
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
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
    werk_type: '',
    oppervlakte: [30],
    afwerking: '',
    aantal_kamers: 1,
    huidige_staat: '',
    voorbewerking: '',
    isolatie_gewenst: false,
    uitvoertermijn: '',
    reden_aanvraag: '',
    bericht: '',
    whatsapp_optin: false
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const werkTypes = [
    'Glad stucwork',
    'Spachtelputz',
    'Decoratief stucwerk',
    'Herstelwerkzaamheden',
    'Complete renovatie'
  ];

  const afwerkingTypes = [
    'Standaard glad',
    'Extra fijn glad',
    'Structuur afwerking',
    'Schilderklaar',
    'Primer inclusief'
  ];

  const calculatePrice = () => {
    // Base price per m² (will be configurable in admin later)
    const basePricePerM2 = 35;
    const basePrice = formData.oppervlakte[0] * basePricePerM2;
    
    const afwerkingMultiplier = formData.afwerking === 'Extra fijn glad' ? 1.2 : 
                               formData.afwerking === 'Decoratief stucwerk' ? 1.5 : 1;
    const isolatieExtra = formData.isolatie_gewenst ? 15 * formData.oppervlakte[0] : 0;
    
    const subtotal = (basePrice * afwerkingMultiplier) + isolatieExtra;
    
    // Add 15% margin as requested
    const withMargin = subtotal * 1.15;
    
    return Math.round(withMargin);
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
          werk_type: formData.werk_type,
          oppervlakte: formData.oppervlakte[0],
          afwerking: formData.afwerking,
          aantal_kamers: formData.aantal_kamers,
          huidige_staat: formData.huidige_staat,
          voorbewerking: formData.voorbewerking,
          isolatie_gewenst: formData.isolatie_gewenst,
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
        werk_type: '',
        oppervlakte: [30],
        afwerking: '',
        aantal_kamers: 1,
        huidige_staat: '',
        voorbewerking: '',
        isolatie_gewenst: false,
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

  // Determine if this is renovation or new construction based on work type
  const isRenovation = formData.werk_type !== 'Complete renovatie';
  const btw = isRenovation ? 9 : 21;

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

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Type stucwerk</Label>
                <Select onValueChange={(value) => setFormData({...formData, werk_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer type stucwerk" />
                  </SelectTrigger>
                  <SelectContent>
                    {werkTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Afwerking</Label>
                <Select onValueChange={(value) => setFormData({...formData, afwerking: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer afwerking" />
                  </SelectTrigger>
                  <SelectContent>
                    {afwerkingTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Surface Area */}
            <div>
              <Label>Oppervlakte: {formData.oppervlakte[0]} m²</Label>
              <Slider
                value={formData.oppervlakte}
                onValueChange={(value) => setFormData({...formData, oppervlakte: value})}
                min={10}
                max={200}
                step={5}
                className="mt-2"
              />
            </div>

            {/* New Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="uitvoertermijn">Gewenste uitvoertermijn</Label>
                <Input
                  id="uitvoertermijn"
                  value={formData.uitvoertermijn}
                  onChange={(e) => setFormData({...formData, uitvoertermijn: e.target.value})}
                  placeholder="bijv. binnen 3 weken, flexibel"
                />
              </div>
              <div>
                <Label htmlFor="reden_aanvraag">Reden aanvraag</Label>
                <Input
                  id="reden_aanvraag"
                  value={formData.reden_aanvraag}
                  onChange={(e) => setFormData({...formData, reden_aanvraag: e.target.value})}
                  placeholder="bijv. schade herstel, vernieuwing"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="huidige_staat">Huidige staat</Label>
                <Input
                  id="huidige_staat"
                  value={formData.huidige_staat}
                  onChange={(e) => setFormData({...formData, huidige_staat: e.target.value})}
                  placeholder="bijv. goed, slecht, beschadigd"
                />
              </div>
              <div>
                <Label htmlFor="voorbewerking">Voorbewerking nodig</Label>
                <Input
                  id="voorbewerking"
                  value={formData.voorbewerking}
                  onChange={(e) => setFormData({...formData, voorbewerking: e.target.value})}
                  placeholder="bijv. schuren, oude laag verwijderen"
                />
              </div>
            </div>

            {/* Additional Options */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isolatie"
                checked={formData.isolatie_gewenst}
                onCheckedChange={(checked) => setFormData({...formData, isolatie_gewenst: checked as boolean})}
              />
              <Label htmlFor="isolatie">Isolatie gewenst (+€15/m²)</Label>
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
              <Label htmlFor="bericht">Aanvullende opmerkingen</Label>
              <Textarea
                id="bericht"
                value={formData.bericht}
                onChange={(e) => setFormData({...formData, bericht: e.target.value})}
                placeholder="Beschrijf je project..."
              />
            </div>

            {/* WhatsApp Opt-in */}
            <WhatsAppOptInCheckbox
              checked={formData.whatsapp_optin}
              onCheckedChange={(checked) => setFormData({...formData, whatsapp_optin: checked})}
            />

            {/* Price Display */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-green-800">Geschatte Prijs (Indicatief)</h3>
                  <p className="text-3xl font-bold text-green-600">€{calculatePrice().toLocaleString()}</p>
                  <p className="text-sm text-green-700">
                    Inclusief materiaal, arbeid en 15% marge
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    {isRenovation ? 'Renovatie' : 'Nieuwbouw'} - {btw}% BTW
                  </p>
                </div>
              </CardContent>
            </Card>

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
