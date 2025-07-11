
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Hammer } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const StukadoorConfigurator = () => {
  const [formData, setFormData] = useState({
    // Project details
    werkType: '',
    afwerking: '',
    oppervlakte: '',
    
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
    voorwaarden: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const stukadoorTarieven = {
    'nieuw_stucwerk': { min: 15.00, max: 25.00, naam: 'Nieuw stucwerk aanbrengen' },
    'herstel_stucwerk': { min: 20.00, max: 35.00, naam: 'Herstel bestaand stucwerk' },
    'glad_afwerken': { min: 12.00, max: 20.00, naam: 'Wanden glad afwerken' },
    'structuur_afwerken': { min: 18.00, max: 28.00, naam: 'Structuur afwerking' }
  };

  const berekenTotaalprijs = () => {
    const oppervlakte = parseFloat(formData.oppervlakte) || 0;
    
    if (oppervlakte <= 0 || !formData.werkType) {
      return 'Vul eerst alle gegevens in';
    }

    const tariefInfo = stukadoorTarieven[formData.werkType as keyof typeof stukadoorTarieven];
    if (!tariefInfo) {
      return 'Selecteer een werktype';
    }

    const basisPrijs = oppervlakte * tariefInfo.min;
    const maxPrijs = oppervlakte * tariefInfo.max;
    
    // BTW berekening (21% voor stukadoorwerk)
    const btwPercentage = 0.21;
    const minPrijsInclBtw = basisPrijs * (1 + btwPercentage);
    const maxPrijsInclBtw = maxPrijs * (1 + btwPercentage);
    
    return `€${minPrijsInclBtw.toFixed(2)} - €${maxPrijsInclBtw.toFixed(2)} (incl. 21% BTW)`;
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
    if (!formData.voornaam || !formData.achternaam || !formData.email || !formData.telefoon || !formData.werkType || !formData.afwerking || !formData.oppervlakte) {
      toast.error('Vul alle verplichte velden in');
      return;
    }

    setIsSubmitting(true);

    try {
      // Bereken totaalprijs
      const totaalprijs = berekenTotaalprijs();
      const oppervlakteNum = parseFloat(formData.oppervlakte) || 0;
      
      // Sla aanvraag op in database - with correct data types and column names
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
          oppervlakte: oppervlakteNum,
          werk_type: formData.werkType,
          afwerking: formData.afwerking,
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
      const tariefInfo = stukadoorTarieven[formData.werkType as keyof typeof stukadoorTarieven];

      const projectDetails = `
STUKADOORWERK PROJECT DETAILS:
===============================

Werktype: ${tariefInfo?.naam || formData.werkType}
Afwerking: ${formData.afwerking}
Oppervlakte: ${formData.oppervlakte ? `${formData.oppervlakte} m²` : 'Niet opgegeven'}

GESCHATTE PRIJS: ${totaalprijs}
(Gebaseerd op €${tariefInfo.min} - €${tariefInfo.max} per m²)

Klant: ${formData.voornaam} ${formData.achternaam}
Email: ${formData.email}
Telefoon: ${formData.telefoon}
Adres: ${formData.straat} ${formData.huisnummer}, ${formData.postcode} ${formData.plaats}

${formData.gewenste_datum ? `Gewenste datum: ${formData.gewenste_datum}` : ''}
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
              subject: `Stukadoorwerk Offerte - ${tariefInfo?.naam || formData.werkType}`,
              message: `Beste ${formData.voornaam},

Bedankt voor uw aanvraag voor stukadoorwerk. Hierbij ontvangt u uw offerte:

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
              subject: `🏗️ Nieuwe Stukadoorwerk Aanvraag - ${formData.voornaam} ${formData.achternaam}`,
              message: `NIEUWE STUKADOORWERK AANVRAAG ONTVANGEN!

${projectDetails}

Log in op het dashboard om deze aanvraag te bekijken en te bewerken.`,
              reply_to: formData.email
            }
          }
        }),

        // Email naar mazenaddas95@gmail.com
        supabase.functions.invoke('send-quote', {
          body: {
            templateParams: {
              from_name: 'Stukadoor Configurator',
              from_email: 'info@refurbishtotaalnederland.nl',
              to_email: 'mazenaddas95@gmail.com',
              to_name: 'Refurbish Totaal Nederland',
              subject: `🏗️ Nieuwe Stukadoorwerk Aanvraag - ${formData.voornaam} ${formData.achternaam}`,
              message: `NIEUWE STUKADOORWERK AANVRAAG ONTVANGEN!

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
          werkType: '',
          afwerking: '',
          oppervlakte: '',
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stukadoorwerk Configurator</h1>
        <p className="text-gray-600">Configureer uw stukadoorwerk project en ontvang direct een offerte</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hammer className="h-5 w-5" />
                Project Configuratie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Details</h3>
                  
                  <div>
                    <Label className="text-base font-medium mb-3 block">Soort werkzaamheden *</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="nieuw_stucwerk"
                          name="werkType"
                          value="nieuw_stucwerk"
                          checked={formData.werkType === 'nieuw_stucwerk'}
                          onChange={(e) => handleInputChange('werkType', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="nieuw_stucwerk" className="cursor-pointer">Nieuw stucwerk aanbrengen</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="herstel_stucwerk"
                          name="werkType"
                          value="herstel_stucwerk"
                          checked={formData.werkType === 'herstel_stucwerk'}
                          onChange={(e) => handleInputChange('werkType', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="herstel_stucwerk" className="cursor-pointer">Herstel bestaand stucwerk</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="glad_afwerken"
                          name="werkType"
                          value="glad_afwerken"
                          checked={formData.werkType === 'glad_afwerken'}
                          onChange={(e) => handleInputChange('werkType', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="glad_afwerken" className="cursor-pointer">Wanden glad afwerken</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="structuur_afwerken"
                          name="werkType"
                          value="structuur_afwerken"
                          checked={formData.werkType === 'structuur_afwerken'}
                          onChange={(e) => handleInputChange('werkType', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="structuur_afwerken" className="cursor-pointer">Structuur afwerking</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">Gewenste afwerking *</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="glad"
                          name="afwerking"
                          value="glad"
                          checked={formData.afwerking === 'glad'}
                          onChange={(e) => handleInputChange('afwerking', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="glad" className="cursor-pointer">Glad</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="structuur"
                          name="afwerking"
                          value="structuur"
                          checked={formData.afwerking === 'structuur'}
                          onChange={(e) => handleInputChange('afwerking', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="structuur" className="cursor-pointer">Structuur</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="spachtelputz"
                          name="afwerking"
                          value="spachtelputz"
                          checked={formData.afwerking === 'spachtelputz'}
                          onChange={(e) => handleInputChange('afwerking', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="spachtelputz" className="cursor-pointer">Spachtelputz</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="oppervlakte">Oppervlakte (m²) *</Label>
                    <Input
                      id="oppervlakte"
                      type="number"
                      value={formData.oppervlakte}
                      onChange={(e) => handleInputChange('oppervlakte', e.target.value)}
                      placeholder="Bijv. 50"
                      step="0.1"
                      min="0"
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
                      type="text"
                      value={formData.gewenste_datum}
                      onChange={(e) => handleInputChange('gewenste_datum', e.target.value)}
                      placeholder="Bijv. Begin maart 2024"
                    />
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
                  className="w-full bg-blue-600 hover:bg-blue-700"
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
              {formData.werkType && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Geselecteerd werk:</h4>
                  <p className="text-sm text-gray-600">
                    {stukadoorTarieven[formData.werkType as keyof typeof stukadoorTarieven]?.naam}
                  </p>
                  {formData.afwerking && (
                    <p className="text-sm text-gray-600">
                      Afwerking: {formData.afwerking}
                    </p>
                  )}
                  {formData.oppervlakte && (
                    <p className="text-sm text-gray-600">
                      Oppervlakte: {formData.oppervlakte} m²
                    </p>
                  )}
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Geschatte totaalprijs:</h4>
                <p className="text-xl font-bold text-blue-600">
                  {berekenTotaalprijs()}
                </p>
                {formData.werkType && formData.oppervlakte && (
                  <p className="text-xs text-gray-500 mt-1">
                    Inclusief materiaal en arbeid
                  </p>
                )}
              </div>

              <div className="text-sm text-gray-500 space-y-1">
                <p>• Prijzen zijn indicatief</p>
                <p>• Exacte prijs na inspectie</p>
                <p>• Inclusief 21% BTW</p>
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
