
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
    afwerking_type: 'sausklaar_stucwerk',
    oppervlakte_wanden: '',
    oppervlakte_plafonds: '',
    aantal_kamers: '',
    plafond_meestucken: false,
    bericht: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    if (formData.werk_type === 'buiten_stucwerk') {
      return null; // Geen prijs voor buitenstucwerk
    }

    const wandenOppervlakte = parseFloat(formData.oppervlakte_wanden) || 0;
    const plafondOppervlakte = parseFloat(formData.oppervlakte_plafonds) || 0;
    
    let wandenPrijs = 0;
    let plafondPrijs = 0;

    // EXACTE PRIJZEN VOOR WANDEN
    switch (formData.afwerking_type) {
      case 'sausklaar_stucwerk':
        wandenPrijs = wandenOppervlakte * 17.25;
        break;
      case 'sierpleister':
        wandenPrijs = wandenOppervlakte * 20.70;
        break;
      case 'beton_cire':
        wandenPrijs = wandenOppervlakte * 103.50;
        break;
      default:
        wandenPrijs = wandenOppervlakte * 17.25;
    }

    // EXACTE PRIJZEN VOOR PLAFONDS (alleen als plafond wordt meegestuckt)
    if (formData.plafond_meestucken) {
      switch (formData.afwerking_type) {
        case 'sausklaar_stucwerk':
          plafondPrijs = plafondOppervlakte * 18.40;
          break;
        case 'sierpleister':
          plafondPrijs = plafondOppervlakte * 23.00;
          break;
        case 'beton_cire':
          plafondPrijs = plafondOppervlakte * 138.00;
          break;
        default:
          plafondPrijs = plafondOppervlakte * 18.40;
      }
    }
    
    const totaalPrijs = wandenPrijs + plafondPrijs;
    // Gebruik parseFloat en toFixed(2) voor exacte prijzen
    return parseFloat(totaalPrijs.toFixed(2));
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
      // Validatie verplichte velden
      if (!formData.voornaam || !formData.achternaam || !formData.emailadres || !formData.telefoon || 
          !formData.straatnaam || !formData.huisnummer || !formData.postcode || !formData.plaats) {
        toast.error('Vul alle verplichte velden in');
        setIsSubmitting(false);
        return;
      }

      // Voor binnenstucwerk is oppervlakte wanden verplicht
      if (formData.werk_type === 'binnen_stucwerk' && !formData.oppervlakte_wanden) {
        toast.error('Vul de oppervlakte van de wanden in');
        setIsSubmitting(false);
        return;
      }

      // Als plafond wordt meegestucukt, is plafondoppervlakte verplicht
      if (formData.plafond_meestucken && !formData.oppervlakte_plafonds) {
        toast.error('Vul de oppervlakte van de plafonds in');
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
          afwerking: formData.afwerking_type,
          oppervlakte: parseInt(formData.oppervlakte_wanden) || 0,
          aantal_kamers: parseInt(formData.aantal_kamers) || 0,
          isolatie_gewenst: false,
          huidige_staat: '',
          voorbewerking: '',
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

      console.log('Data saved to database:', savedData);

      // Verstuur email naar eerste admin adres (info@refurbishtotaalnederland.nl)
      const emailResult1 = await sendEmail({
        templateId: 'template_ix4mdjh',
        from_name: `${formData.voornaam} ${formData.achternaam}`,
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
          Afwerking: ${formData.afwerking_type.replace('_', ' ')}
          Oppervlakte wanden: ${formData.oppervlakte_wanden}m²
          ${formData.plafond_meestucken ? `Oppervlakte plafonds: ${formData.oppervlakte_plafonds}m²` : ''}
          Aantal kamers: ${formData.aantal_kamers}
          
          ${totalPrice ? `Geschatte prijs: €${totalPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Prijs: Op maat (buitenstucwerk)'}
          
          ${formData.bericht ? `Bericht: ${formData.bericht}` : ''}
        `,
        reply_to: formData.emailadres,
        phone: formData.telefoon,
        service: 'Stukadoor',
        location: `${formData.plaats}`
      });

      console.log('Admin email 1 result:', emailResult1);

      // Verstuur email naar tweede admin adres (mazenaddas95@gmail.com)
      const emailResult2 = await sendEmail({
        templateId: 'template_ix4mdjh',
        from_name: 'Refurbish Totaal Nederland System',
        from_email: 'info@refurbishtotaalnederland.nl',  
        to_name: 'Admin',
        to_email: 'mazenaddas95@gmail.com',
        subject: 'Nieuwe Stukadoor Aanvraag - Melding',
        message: `
          Er is een nieuwe stukadoor aanvraag binnengekomen:
          
          Van: ${formData.voornaam} ${formData.achternaam}
          Email: ${formData.emailadres}
          Telefoon: ${formData.telefoon}
          
          ${totalPrice ? `Geschatte prijs: €${totalPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Prijs: Op maat'}
          
          Bekijk de volledige details in het dashboard.
        `,
        reply_to: 'info@refurbishtotaalnederland.nl'
      });

      console.log('Admin email 2 result:', emailResult2);

      // Verstuur bevestigingsmail naar klant
      const confirmationResult = await sendEmail({
        templateId: 'template_ix4mdjh',
        from_name: 'Refurbish Totaal Nederland',
        from_email: 'info@refurbishtotaalnederland.nl',
        to_name: `${formData.voornaam} ${formData.achternaam}`,
        to_email: formData.emailadres,
        subject: 'Bevestiging Stukadoor Aanvraag - Offerte',
        message: `
          Beste ${formData.voornaam},
          
          Bedankt voor uw aanvraag voor stukadoorswerk. Wij hebben uw aanvraag in goede orde ontvangen.
          
          Uw projectdetails:
          - Project: ${formData.werk_type.replace('_', ' ')}
          - Afwerking: ${formData.afwerking_type.replace('_', ' ')}
          - Oppervlakte wanden: ${formData.oppervlakte_wanden}m²
          ${formData.plafond_meestucken ? `- Oppervlakte plafonds: ${formData.oppervlakte_plafonds}m²` : ''}
          ${totalPrice ? `- Geschatte indicatieve prijs: €${totalPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '- Prijs: Wij nemen contact met u op voor een prijs op maat'}
          
          Deze prijzen zijn indicatief en kunnen verschillen na een persoonlijke inspectie.
          
          Wij nemen binnen 24 uur contact met u op voor een afspraak.
          
          Met vriendelijke groet,
          Refurbish Totaal Nederland
          
          Tel: 06-12345678
          Email: info@refurbishtotaalnederland.nl
        `,
        reply_to: 'info@refurbishtotaalnederland.nl'
      });

      console.log('Customer confirmation result:', confirmationResult);

      toast.success('Aanvraag succesvol verzonden! Je ontvangt een bevestigingsmail met de offerte.');
      
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
        afwerking_type: 'sausklaar_stucwerk',
        oppervlakte_wanden: '',
        oppervlakte_plafonds: '',
        aantal_kamers: '',
        plafond_meestucken: false,
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

  const hasInput = formData.werk_type === 'binnen_stucwerk' && parseFloat(formData.oppervlakte_wanden) > 0;
  const calculatedPrice = calculatePrice();

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
              <Label className="text-base font-medium">Type stucwerk *</Label>
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

            {/* Afwerking Type - alleen voor binnen stucwerk */}
            {formData.werk_type === 'binnen_stucwerk' && (
              <div>
                <Label className="text-base font-medium">Type afwerking *</Label>
                <RadioGroup
                  value={formData.afwerking_type}
                  onValueChange={(value) => setFormData({...formData, afwerking_type: value})}
                  className="flex flex-col space-y-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sausklaar_stucwerk" id="sausklaar_stucwerk" />
                    <Label htmlFor="sausklaar_stucwerk">Sausklaar stucwerk</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sierpleister" id="sierpleister" />
                    <Label htmlFor="sierpleister">Sierpleister (Spachtelputz)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beton_cire" id="beton_cire" />
                    <Label htmlFor="beton_cire">Beton Ciré</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="oppervlakte_wanden">
                  Oppervlakte wanden (m²) {formData.werk_type === 'binnen_stucwerk' ? '*' : ''}
                </Label>
                <Input
                  id="oppervlakte_wanden"
                  type="number"
                  step="0.01"
                  value={formData.oppervlakte_wanden}
                  onChange={(e) => setFormData({...formData, oppervlakte_wanden: e.target.value})}
                  placeholder="Bijvoorbeeld: 80"
                  required={formData.werk_type === 'binnen_stucwerk'}
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

            {/* Plafond opties - alleen voor binnen stucwerk */}
            {formData.werk_type === 'binnen_stucwerk' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="plafond_meestucken"
                    checked={formData.plafond_meestucken}
                    onCheckedChange={(checked) => setFormData({...formData, plafond_meestucken: !!checked})}
                  />
                  <Label htmlFor="plafond_meestucken">
                    Plafond(s) ook laten stucken
                  </Label>
                </div>

                {formData.plafond_meestucken && (
                  <div>
                    <Label htmlFor="oppervlakte_plafonds">Oppervlakte plafonds (m²) *</Label>
                    <Input
                      id="oppervlakte_plafonds"
                      type="number"
                      step="0.01"
                      value={formData.oppervlakte_plafonds}
                      onChange={(e) => setFormData({...formData, oppervlakte_plafonds: e.target.value})}
                      placeholder="Bijvoorbeeld: 30"
                      required={formData.plafond_meestucken}
                    />
                  </div>
                )}
              </div>
            )}

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
            {(hasInput || formData.werk_type === 'buiten_stucwerk') && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-800">
                      {formData.werk_type === 'buiten_stucwerk' ? 'Prijs op maat' : 'Geschatte Prijs (Indicatief)'}
                    </h3>
                    {formData.werk_type === 'buiten_stucwerk' ? (
                      <p className="text-lg font-bold text-green-600 mt-2">
                        Wij nemen contact met u op voor een prijs op maat
                      </p>
                    ) : calculatedPrice ? (
                      <>
                        <p className="text-3xl font-bold text-green-600">€{calculatedPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-sm text-green-700">
                          Inclusief materiaal en arbeid
                        </p>
                      </>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
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
