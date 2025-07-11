
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const StukadoorConfigurator = () => {
  const [formData, setFormData] = useState({
    // Project details
    werktype: '',
    oppervlakte: '',
    binnen_buiten: 'binnen',
    kamers: '',
    locatie: '',
    
    // Contact details
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    straat: '',
    huisnummer: '',
    postcode: '',
    plaats: '',
    
    // Additional info
    bericht: '',
    gewenste_datum: '',
    budget: '',
    voorwaarden: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const stukadoorTarieven = {
    binnen: {
      'glad_stucwerk': { min: 17.25, max: 25.50, naam: 'Glad stucwerk' },
      'spachtelputz': { min: 35.00, max: 65.00, naam: 'Spachtelputz' },
      'decoratief_stucwerk': { min: 45.00, max: 103.50, naam: 'Decoratief stucwerk' },
      'reparatie_stucwerk': { min: 25.00, max: 45.00, naam: 'Reparatie stucwerk' }
    },
    buiten: {
      'contact_voor_prijs': { naam: 'Buitenstucwerk - Prijs op maat' }
    }
  };

  const berekenTotaalprijs = () => {
    const oppervlakte = parseFloat(formData.oppervlakte) || 0;
    
    if (formData.binnen_buiten === 'buiten') {
      return 'Prijs op maat - Neem contact op';
    }
    
    if (oppervlakte <= 0 || !formData.werktype) {
      return 'Vul eerst alle gegevens in';
    }

    const tariefInfo = stukadoorTarieven.binnen[formData.werktype as keyof typeof stukadoorTarieven.binnen];
    if (!tariefInfo || !('min' in tariefInfo)) {
      return 'Selecteer een werktype';
    }

    const minPrijs = oppervlakte * tariefInfo.min;
    const maxPrijs = oppervlakte * tariefInfo.max;
    
    return `€${minPrijs.toFixed(2)} - €${maxPrijs.toFixed(2)}`;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.voorwaarden) {
      toast.error('Accepteer de algemene voorwaarden om door te gaan');
      return;
    }

    // Validatie voor verplichte velden
    if (!formData.voornaam || !formData.achternaam || !formData.email || !formData.telefoon || !formData.werktype || !formData.oppervlakte) {
      toast.error('Vul alle verplichte velden in');
      return;
    }

    setIsSubmitting(true);

    try {
      // Bereken totaalprijs
      const totaalprijs = berekenTotaalprijs();
      const oppervlakteNum = parseFloat(formData.oppervlakte) || 0;
      
      // Sla aanvraag op in database - use correct column names and types
      const { data: savedData, error: dbError } = await supabase
        .from('stukadoor_aanvragen')
        .insert({
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          emailadres: formData.email,
          telefoon: formData.telefoon,
          straatnaam: formData.straat,
          huisnummer: formData.huisnummer,
          postcode: formData.postcode,
          plaats: formData.plaats,
          werk_type: formData.werktype,
          oppervlakte: oppervlakteNum, // Convert to number
          aantal_kamers: formData.kamers ? parseInt(formData.kamers) : null,
          afwerking: formData.binnen_buiten,
          totaal_prijs: totaalprijs.includes('€') ? totaalprijs : null,
          bericht: formData.bericht || null,
          status: 'nieuw'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Fout bij opslaan van gegevens');
      }

      console.log('Stukadoor aanvraag opgeslagen:', savedData);

      // Bereid projectdetails voor
      const tariefInfo = formData.binnen_buiten === 'binnen' && formData.werktype 
        ? stukadoorTarieven.binnen[formData.werktype as keyof typeof stukadoorTarieven.binnen]
        : null;

      const projectDetails = `
STUKADOOR PROJECT DETAILS:
==========================

Werktype: ${tariefInfo?.naam || formData.werktype}
Locatie: ${formData.binnen_buiten === 'binnen' ? 'Binnen' : 'Buiten'}
Oppervlakte: ${formData.oppervlakte ? `${formData.oppervlakte} m²` : 'Niet opgegeven'}
${formData.kamers ? `Aantal kamers: ${formData.kamers}` : ''}
${formData.locatie ? `Locatie beschrijving: ${formData.locatie}` : ''}

GESCHATTE PRIJS: ${totaalprijs}
${formData.binnen_buiten === 'binnen' && tariefInfo && 'min' in tariefInfo ? 
  `(Gebaseerd op €${tariefInfo.min} - €${tariefInfo.max} per m²)` : ''}

Klant: ${formData.voornaam} ${formData.achternaam}
Email: ${formData.email}
Telefoon: ${formData.telefoon}
Adres: ${formData.straat} ${formData.huisnummer}, ${formData.postcode} ${formData.plaats}

${formData.gewenste_datum ? `Gewenste datum: ${formData.gewenste_datum}` : ''}
${formData.budget ? `Budget: ${formData.budget}` : ''}
${formData.bericht ? `\nBericht van klant:\n${formData.bericht}` : ''}
      `.trim();

      // Verstuur emails via Resend edge function
      const emailPromises = [
        // Email naar klant
        supabase.functions.invoke('send-quote', {
          body: {
            templateParams: {
              from_name: 'Refurbish Totaal Nederland',
              from_email: 'info@refurbishtotaalnederland.nl',
              to_email: formData.email,
              to_name: `${formData.voornaam} ${formData.achternaam}`,
              subject: `Stucwerk Offerte - ${tariefInfo?.naam || formData.werktype}`,
              message: `Beste ${formData.voornaam},

Bedankt voor uw aanvraag voor stukadoor werkzaamheden. Hierbij ontvangt u uw offerte:

${projectDetails}

Wij nemen zo spoedig mogelijk contact met u op om de details te bespreken en een exacte afspraak in te plannen.

Met vriendelijke groet,
Refurbish Totaal Nederland
Telefoon: 085 4444 255
Email: info@refurbishtotaalnederland.nl`,
              reply_to: 'info@refurbishtotaalnederland.nl'
            }
          }
        }),

        // Email naar info@refurbishtotaalnederland.nl
        supabase.functions.invoke('send-quote', {
          body: {
            templateParams: {
              from_name: 'Stukadoor Configurator',
              from_email: 'info@refurbishtotaalnederland.nl',
              to_email: 'info@refurbishtotaalnederland.nl',
              to_name: 'Refurbish Totaal Nederland',
              subject: `🔔 Nieuwe Stukadoor Aanvraag - ${formData.voornaam} ${formData.achternaam}`,
              message: `NIEUWE STUKADOOR AANVRAAG ONTVANGEN!

${projectDetails}

Log in op het dashboard om deze aanvraag te bekijken en te bewerken.`,
              reply_to: formData.email
            }
          }
        }),

        // Email naar mazenaddas95@gmail.com - volledige details
        supabase.functions.invoke('send-quote', {
          body: {
            templateParams: {
              from_name: 'Stukadoor Configurator',
              from_email: 'info@refurbishtotaalnederland.nl',
              to_email: 'mazenaddas95@gmail.com',
              to_name: 'Refurbish Totaal Nederland',
              subject: `🔔 Nieuwe Stukadoor Aanvraag - ${formData.voornaam} ${formData.achternaam}`,
              message: `NIEUWE STUKADOOR AANVRAAG ONTVANGEN!

${projectDetails}

Log in op het dashboard om deze aanvraag te bekijken en te bewerken.`,
              reply_to: formData.email
            }
          }
        })
      ];

      // Verstuur alle emails
      const emailResults = await Promise.allSettled(emailPromises);
      
      let emailSuccessCount = 0;
      emailResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          emailSuccessCount++;
          console.log(`Email ${index + 1} verstuurd`);
        } else {
          console.error(`Email ${index + 1} mislukt:`, result.reason);
        }
      });

      if (emailSuccessCount > 0) {
        toast.success(`Aanvraag succesvol verstuurd! U ontvangt een bevestiging per email.`);
        
        // Reset form
        setFormData({
          werktype: '',
          oppervlakte: '',
          binnen_buiten: 'binnen',
          kamers: '',
          locatie: '',
          voornaam: '',
          achternaam: '',
          email: '',
          telefoon: '',
          straat: '',
          huisnummer: '',
          postcode: '',
          plaats: '',
          bericht: '',
          gewenste_datum: '',
          budget: '',
          voorwaarden: false
        });
      } else {
        throw new Error('Geen emails konden worden verstuurd');
      }

    } catch (error: any) {
      console.error('Stukadoor configurator error:', error);
      toast.error('Er ging iets mis bij het versturen van uw aanvraag. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stukadoor Configurator</h1>
        <p className="text-gray-600">Configureer uw stukadoor project en ontvang direct een offerte</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Project Configuratie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Details</h3>
                  
                  <div>
                    <Label htmlFor="werktype">Type stukadoorwerk *</Label>
                    <Select value={formData.werktype} onValueChange={(value) => handleInputChange('werktype', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer werktype" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="glad_stucwerk">Glad stucwerk</SelectItem>
                        <SelectItem value="spachtelputz">Spachtelputz</SelectItem>
                        <SelectItem value="decoratief_stucwerk">Decoratief stucwerk</SelectItem>
                        <SelectItem value="reparatie_stucwerk">Reparatie stucwerk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="binnen_buiten">Locatie *</Label>
                    <Select value={formData.binnen_buiten} onValueChange={(value) => handleInputChange('binnen_buiten', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="binnen">Binnen</SelectItem>
                        <SelectItem value="buiten">Buiten</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="oppervlakte">Oppervlakte (m²) *</Label>
                    <Input
                      id="oppervlakte"
                      type="number"
                      value={formData.oppervlakte}
                      onChange={(e) => handleInputChange('oppervlakte', e.target.value)}
                      placeholder="Bijv. 25"
                      step="0.1"
                      min="0"
                    />
                  </div>

                  {formData.binnen_buiten === 'binnen' && (
                    <div>
                      <Label htmlFor="kamers">Aantal kamers</Label>
                      <Input
                        id="kamers"
                        type="number"
                        value={formData.kamers}
                        onChange={(e) => handleInputChange('kamers', e.target.value)}
                        placeholder="Bijv. 3"
                        min="1"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="locatie">Locatie beschrijving</Label>
                    <Textarea
                      id="locatie"
                      value={formData.locatie}
                      onChange={(e) => handleInputChange('locatie', e.target.value)}
                      placeholder="Beschrijf de locatie of specifieke wensen..."
                    />
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contactgegevens</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="voornaam">Voornaam *</Label>
                      <Input
                        id="voornaam"
                        value={formData.voornaam}
                        onChange={(e) => handleInputChange('voornaam', e.target.value)}
                        placeholder="Uw voornaam"
                      />
                    </div>
                    <div>
                      <Label htmlFor="achternaam">Achternaam *</Label>
                      <Input
                        id="achternaam"
                        value={formData.achternaam}
                        onChange={(e) => handleInputChange('achternaam', e.target.value)}
                        placeholder="Uw achternaam"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">E-mailadres *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="uw@email.nl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefoon">Telefoonnummer *</Label>
                    <Input
                      id="telefoon"
                      value={formData.telefoon}
                      onChange={(e) => handleInputChange('telefoon', e.target.value)}
                      placeholder="06 12345678"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="straat">Straatnaam</Label>
                      <Input
                        id="straat"
                        value={formData.straat}
                        onChange={(e) => handleInputChange('straat', e.target.value)}
                        placeholder="Straatnaam"
                      />
                    </div>
                    <div>
                      <Label htmlFor="huisnummer">Huisnummer</Label>
                      <Input
                        id="huisnummer"
                        value={formData.huisnummer}
                        onChange={(e) => handleInputChange('huisnummer', e.target.value)}
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        placeholder="1234AB"
                      />
                    </div>
                    <div>
                      <Label htmlFor="plaats">Plaats</Label>
                      <Input
                        id="plaats"
                        value={formData.plaats}
                        onChange={(e) => handleInputChange('plaats', e.target.value)}
                        placeholder="Amsterdam"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Aanvullende Informatie</h3>
                  
                  <div>
                    <Label htmlFor="gewenste_datum">Gewenste startdatum</Label>
                    <Input
                      id="gewenste_datum"
                      type="date"
                      value={formData.gewenste_datum}
                      onChange={(e) => handleInputChange('gewenste_datum', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="budget">Indicatief budget</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="< €1.000">Minder dan €1.000</SelectItem>
                        <SelectItem value="€1.000 - €2.500">€1.000 - €2.500</SelectItem>
                        <SelectItem value="€2.500 - €5.000">€2.500 - €5.000</SelectItem>
                        <SelectItem value="€5.000 - €7.500">€5.000 - €7.500</SelectItem>
                        <SelectItem value="> €7.500">Meer dan €7.500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bericht">Aanvullende opmerkingen</Label>
                    <Textarea
                      id="bericht"
                      value={formData.bericht}
                      onChange={(e) => handleInputChange('bericht', e.target.value)}
                      placeholder="Eventuele aanvullende informatie of specifieke wensen..."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="voorwaarden"
                      checked={formData.voorwaarden}
                      onCheckedChange={(checked) => handleInputChange('voorwaarden', checked)}
                    />
                    <Label htmlFor="voorwaarden" className="text-sm">
                      Ik ga akkoord met de algemene voorwaarden *
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Versturen...' : 'Verstuur Aanvraag'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Price summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Prijsoverzicht</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.werktype && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Geselecteerd werk:</h4>
                  <p className="text-sm text-gray-600">
                    {formData.binnen_buiten === 'binnen' 
                      ? stukadoorTarieven.binnen[formData.werktype as keyof typeof stukadoorTarieven.binnen]?.naam 
                      : stukadoorTarieven.buiten.contact_voor_prijs.naam}
                  </p>
                  {formData.oppervlakte && (
                    <p className="text-sm text-gray-600">
                      Oppervlakte: {formData.oppervlakte} m²
                    </p>
                  )}
                  {formData.binnen_buiten === 'binnen' && (
                    <p className="text-sm text-gray-600">
                      Locatie: Binnen
                    </p>
                  )}
                </div>
              )}

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-2">Geschatte totaalprijs:</h4>
                <p className="text-xl font-bold text-green-600">
                  {berekenTotaalprijs()}
                </p>
                {formData.binnen_buiten === 'binnen' && formData.werktype && formData.oppervlakte && (
                  <p className="text-xs text-gray-500 mt-1">
                    Inclusief materiaal en arbeid
                  </p>
                )}
              </div>

              <div className="text-sm text-gray-500 space-y-1">
                <p>• Prijzen zijn indicatief</p>
                <p>• Exacte prijs na inspectie</p>
                <p>• Inclusief BTW</p>
                <p>• Geen verrassingen achteraf</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StukadoorConfigurator;
