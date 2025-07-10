
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { sendEmail } from '@/config/email';

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
    werk_type: 'binnen_stucwerk',
    afwerking: 'glad_stucwerk',
    oppervlakte: '',
    aantal_kamers: '',
    isolatie_gewenst: false,
    huidige_staat: '',
    voorbewerking: '',
    bericht: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    const oppervlakte = parseFloat(formData.oppervlakte) || 0;
    const aantalKamers = parseInt(formData.aantal_kamers) || 0;
    const isolatieGewenst = formData.isolatie_gewenst;
    
    // Basisprijs per m² op basis van afwerking
    let basisPrijs = 0;
    switch (formData.afwerking) {
      case 'glad_stucwerk':
        basisPrijs = isolatieGewenst ? 45 : 35;
        break;
      case 'spachtelputz':
        basisPrijs = isolatieGewenst ? 55 : 45;
        break;
      case 'decoratief_stucwerk':
        basisPrijs = isolatieGewenst ? 75 : 65;
        break;
      default:
        basisPrijs = 35;
    }
    
    // Extra kosten voor aantal kamers (voorbereidingswerk)
    const kamerToeslag = aantalKamers * 150;
    
    const totaalPrijs = (oppervlakte * basisPrijs) + kamerToeslag;
    
    return Math.round(totaalPrijs);
  };

  const getPriceBreakdown = () => {
    const oppervlakte = parseFloat(formData.oppervlakte) || 0;
    const aantalKamers = parseInt(formData.aantal_kamers) || 0;
    
    const breakdown = [];
    
    if (oppervlakte > 0) {
      breakdown.push(`Oppervlakte: ${oppervlakte}m²`);
    }
    if (aantalKamers > 0) {
      breakdown.push(`Aantal kamers: ${aantalKamers}`);
    }
    breakdown.push(`Afwerking: ${formData.afwerking.replace('_', ' ')}`);
    if (formData.isolatie_gewenst) {
      breakdown.push('Met isolatie');
    }
    
    return breakdown;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
    setIsSubmitting(true);

    try {
      // Validatie
      if (!formData.voornaam || !formData.achternaam || !formData.emailadres || !formData.telefoon || 
          !formData.straatnaam || !formData.huisnummer || !formData.postcode || !formData.plaats || 
          !formData.oppervlakte) {
        toast.error('Vul alle verplichte velden in');
        setIsSubmitting(false);
        return;
      }

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
          afwerking: formData.afwerking,
          oppervlakte: parseInt(formData.oppervlakte) || 0,
          aantal_kamers: parseInt(formData.aantal_kamers) || 0,
          isolatie_gewenst: formData.isolatie_gewenst,
          huidige_staat: formData.huidige_staat,
          voorbewerking: formData.voorbewerking,
          bericht: formData.bericht,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      // Send notification email to main admin address
      await sendEmail({
        templateId: 'template_ix4mdjh',
        from_name: formData.voornaam + ' ' + formData.achternaam,
        from_email: formData.emailadres,
        to_name: 'Refurbish Totaal Nederland',
        to_email: 'info@refurbishtotaalnederland.nl',
        subject: 'Nieuwe Stukadoor Aanvraag',
        message: `
          Nieuwe stukadoor aanvraag ontvangen:
          
          Klant: ${formData.voornaam} ${formData.achternaam}
          Email: ${formData.emailadres}
          Telefoon: ${formData.telefoon}
          Adres: ${formData.straatnaam} ${formData.huisnummer}, ${formData.postcode} ${formData.plaats}
          
          Project: ${formData.werk_type.replace('_', ' ')}
          Afwerking: ${formData.afwerking.replace('_', ' ')}
          Oppervlakte: ${formData.oppervlakte}m²
          Aantal kamers: ${formData.aantal_kamers}
          Isolatie gewenst: ${formData.isolatie_gewenst ? 'Ja' : 'Nee'}
          
          Geschatte prijs: €${totalPrice.toLocaleString()}
          
          Huidige staat: ${formData.huidige_staat}
          Voorbewerking: ${formData.voorbewerking}
          
          ${formData.bericht ? `Bericht: ${formData.bericht}` : ''}
        `,
        reply_to: formData.emailadres,
        phone: formData.telefoon,
        service: 'Stukadoor',
        location: `${formData.plaats}`
      });

      // Send notification to second email address
      await sendEmail({
        templateId: 'template_ix4mdjh',
        from_name: 'System',
        from_email: 'info@refurbishtotaalnederland.nl',  
        to_name: 'Admin',
        to_email: 'mazenaddas95@gmail.com',
        subject: 'Nieuwe Stukadoor Aanvraag',
        message: `Nieuwe stukadoor aanvraag van ${formData.voornaam} ${formData.achternaam} (${formData.emailadres})`,
        reply_to: 'info@refurbishtotaalnederland.nl'
      });

      // Send confirmation email to customer
      await sendEmail({
        templateId: 'template_ix4mdjh',
        from_name: 'Refurbish Totaal Nederland',
        from_email: 'info@refurbishtotaalnederland.nl',
        to_name: `${formData.voornaam} ${formData.achternaam}`,
        to_email: formData.emailadres,
        subject: 'Bevestiging Stukadoor Aanvraag',
        message: `
          Beste ${formData.voornaam},
          
          Bedankt voor uw aanvraag voor stukadoorswerk. Wij hebben uw aanvraag in goede orde ontvangen.
          
          Uw projectdetails:
          - Project: ${formData.werk_type.replace('_', ' ')}
          - Afwerking: ${formData.afwerking.replace('_', ' ')}
          - Oppervlakte: ${formData.oppervlakte}m²
          - Geschatte prijs: €${totalPrice.toLocaleString()}
          
          Wij nemen binnen 24 uur contact met u op voor een afspraak.
          
          Met vriendelijke groet,
          Refurbish Totaal Nederland
          
          Tel: 06-12345678
          Email: info@refurbishtotaalnederland.nl
        `,
        reply_to: 'info@refurbishtotaalnederland.nl'
      });

      toast.success('Aanvraag succesvol verzonden! Je ontvangt een bevestigingsmail.');
      
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
        werk_type: 'binnen_stucwerk',
        afwerking: 'glad_stucwerk',
        oppervlakte: '',
        aantal_kamers: '',
        isolatie_gewenst: false,
        huidige_staat: '',
        voorbewerking: '',
        bericht: ''
      });
      setUploadedFile(null);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Er ging iets mis bij het verzenden van je aanvraag. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasAnyInput = parseFloat(formData.oppervlakte) > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Stukadoor Configurator</CardTitle>
          <p className="text-center text-gray-600">
            Configureer je stucproject en ontvang direct een prijsindicatie
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Work Type Selection */}
            <div>
              <Label className="text-base font-medium">Type stucwerk</Label>
              <RadioGroup
                value={formData.werk_type}
                onValueChange={(value) => setFormData({...formData, werk_type: value})}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="binnen_stucwerk" id="binnen_stucwerk" />
                  <Label htmlFor="binnen_stucwerk">Binnen stucwerk</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buiten_stucwerk" id="buiten_stucwerk" />
                  <Label htmlFor="buiten_stucwerk">Buiten stucwerk</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="herstel_stucwerk" id="herstel_stucwerk" />
                  <Label htmlFor="herstel_stucwerk">Herstel stucwerk</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Finish Type Selection */}
            <div>
              <Label className="text-base font-medium">Gewenste afwerking</Label>
              <RadioGroup
                value={formData.afwerking}
                onValueChange={(value) => setFormData({...formData, afwerking: value})}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="glad_stucwerk" id="glad_stucwerk" />
                  <Label htmlFor="glad_stucwerk">Glad stucwerk</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spachtelputz" id="spachtelputz" />
                  <Label htmlFor="spachtelputz">Spachtelputz</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="decoratief_stucwerk" id="decoratief_stucwerk" />
                  <Label htmlFor="decoratief_stucwerk">Decoratief stucwerk</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Isolation Option */}
            <div>
              <Label className="text-base font-medium">Isolatie</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="isolatie_gewenst"
                  checked={formData.isolatie_gewenst}
                  onCheckedChange={(checked) => setFormData({...formData, isolatie_gewenst: checked as boolean})}
                />
                <Label htmlFor="isolatie_gewenst">Isolatie gewenst (hogere prijs)</Label>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="oppervlakte">Oppervlakte (m²) *</Label>
                <Input
                  id="oppervlakte"
                  type="number"
                  value={formData.oppervlakte}
                  onChange={(e) => setFormData({...formData, oppervlakte: e.target.value})}
                  placeholder="Bijvoorbeeld: 100"
                  required
                />
              </div>
              <div>
                <Label htmlFor="aantal_kamers">Aantal kamers</Label>
                <Input
                  id="aantal_kamers"
                  type="number"
                  value={formData.aantal_kamers}
                  onChange={(e) => setFormData({...formData, aantal_kamers: e.target.value})}
                  placeholder="Bijvoorbeeld: 4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="huidige_staat">Huidige staat van de wanden</Label>
                <Input
                  id="huidige_staat"
                  value={formData.huidige_staat}
                  onChange={(e) => setFormData({...formData, huidige_staat: e.target.value})}
                  placeholder="Bijvoorbeeld: goed, matig, slecht"
                />
              </div>
              <div>
                <Label htmlFor="voorbewerking">Benodigde voorbewerking</Label>
                <Input
                  id="voorbewerking"
                  value={formData.voorbewerking}
                  onChange={(e) => setFormData({...formData, voorbewerking: e.target.value})}
                  placeholder="Bijvoorbeeld: schuren, primer aanbrengen"
                />
              </div>
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

            {/* Price Display */}
            {hasAnyInput && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-800">Geschatte Prijs (Indicatief)</h3>
                    <p className="text-3xl font-bold text-green-600">€{calculatePrice().toLocaleString()}</p>
                    <p className="text-sm text-green-700 mb-2">
                      Inclusief materiaal en arbeid
                    </p>
                    <div className="text-xs text-green-500 text-left">
                      <p className="font-semibold mb-1">Prijsopbouw:</p>
                      {getPriceBreakdown().map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information - MOVED TO END */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Contactgegevens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voornaam">Voornaam *</Label>
                  <Input
                    id="voornaam"
                    value={formData.voornaam}
                    onChange={(e) => setFormData({...formData, voornaam: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="achternaam">Achternaam *</Label>
                  <Input
                    id="achternaam"
                    value={formData.achternaam}
                    onChange={(e) => setFormData({...formData, achternaam: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="emailadres">E-mailadres *</Label>
                  <Input
                    id="emailadres"
                    type="email"
                    value={formData.emailadres}
                    onChange={(e) => setFormData({...formData, emailadres: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefoon">Telefoonnummer *</Label>
                  <Input
                    id="telefoon"
                    value={formData.telefoon}
                    onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="md:col-span-2">
                  <Label htmlFor="straatnaam">Straatnaam *</Label>
                  <Input
                    id="straatnaam"
                    value={formData.straatnaam}
                    onChange={(e) => setFormData({...formData, straatnaam: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="huisnummer">Huisnummer *</Label>
                  <Input
                    id="huisnummer"
                    value={formData.huisnummer}
                    onChange={(e) => setFormData({...formData, huisnummer: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="postcode">Postcode *</Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="plaats">Plaats *</Label>
                  <Input
                    id="plaats"
                    value={formData.plaats}
                    onChange={(e) => setFormData({...formData, plaats: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

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
