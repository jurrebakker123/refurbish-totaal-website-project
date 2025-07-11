
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Paintbrush } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const SchilderConfigurator = () => {
  const [formData, setFormData] = useState({
    // Project details
    werktype: '',
    oppervlakte: '',
    binnen_buiten: 'binnen',
    nieuwbouw_renovatie: 'renovatie',
    
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

  const schilderTarieven = {
    binnen: {
      'muren_plafonds': { min: 8.50, max: 15.00, naam: 'Muren en plafonds' },
      'deuren_kozijnen': { min: 12.00, max: 25.00, naam: 'Deuren en kozijnen' },
      'radiatoren': { min: 15.00, max: 30.00, naam: 'Radiatoren' },
      'trap_leuning': { min: 20.00, max: 35.00, naam: 'Trap en leuning' },
      'behang_aanbrengen': { min: 10.00, max: 18.00, naam: 'Behang aanbrengen' }
    },
    buiten: {
      'contact_voor_prijs': { naam: 'Buitenschilderwerk - Prijs op maat' }
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

    const tariefInfo = schilderTarieven.binnen[formData.werktype as keyof typeof schilderTarieven.binnen];
    if (!tariefInfo || !('min' in tariefInfo)) {
      return 'Selecteer een werktype';
    }

    const basisPrijs = oppervlakte * tariefInfo.min;
    const maxPrijs = oppervlakte * tariefInfo.max;
    
    // BTW berekening
    const btwPercentage = formData.nieuwbouw_renovatie === 'nieuwbouw' ? 0.21 : 0.09;
    const minPrijsInclBtw = basisPrijs * (1 + btwPercentage);
    const maxPrijsInclBtw = maxPrijs * (1 + btwPercentage);
    
    return `€${minPrijsInclBtw.toFixed(2)} - €${maxPrijsInclBtw.toFixed(2)} (incl. ${Math.round(btwPercentage * 100)}% BTW)`;
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
      
      // Sla aanvraag op in database - with correct data types
      const { data: savedData, error: dbError } = await supabase
        .from('schilder_aanvragen')
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
          project_type: formData.nieuwbouw_renovatie,
          verf_type: 'latex',
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

      console.log('Schilder aanvraag opgeslagen:', savedData);

      // Bereid projectdetails voor
      const tariefInfo = formData.binnen_buiten === 'binnen' && formData.werktype 
        ? schilderTarieven.binnen[formData.werktype as keyof typeof schilderTarieven.binnen]
        : null;

      const projectDetails = `
SCHILDERWERK PROJECT DETAILS:
=============================

Werktype: ${tariefInfo?.naam || formData.werktype}
Locatie: ${formData.binnen_buiten === 'binnen' ? 'Binnen schilderwerk' : 'Buiten schilderwerk'}
Oppervlakte: ${formData.oppervlakte ? `${formData.oppervlakte} m²` : 'Niet opgegeven'}
Project type: ${formData.nieuwbouw_renovatie === 'nieuwbouw' ? 'Nieuwbouw (21% BTW)' : 'Renovatie (9% BTW)'}

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
              subject: `Schilderwerk Offerte - ${tariefInfo?.naam || formData.werktype}`,
              message: `Beste ${formData.voornaam},

Bedankt voor uw aanvraag voor schilderwerk. Hierbij ontvangt u uw offerte:

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
              from_name: 'Schilder Configurator',
              from_email: 'info@refurbishtotaalnederland.nl',
              to_email: 'info@refurbishtotaalnederland.nl',
              to_name: 'Refurbish Totaal Nederland',
              subject: `🎨 Nieuwe Schilderwerk Aanvraag - ${formData.voornaam} ${formData.achternaam}`,
              message: `NIEUWE SCHILDERWERK AANVRAAG ONTVANGEN!

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
              from_name: 'Schilder Configurator',
              from_email: 'info@refurbishtotaalnederland.nl',
              to_email: 'mazenaddas95@gmail.com',
              to_name: 'Refurbish Totaal Nederland',
              subject: `🎨 Nieuwe Schilderwerk Aanvraag - ${formData.voornaam} ${formData.achternaam}`,
              message: `NIEUWE SCHILDERWERK AANVRAAG ONTVANGEN!

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
          nieuwbouw_renovatie: 'renovatie',
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
      console.error('Schilder configurator error:', error);
      toast.error('Er ging iets mis bij het versturen van uw aanvraag. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schilderwerk Configurator</h1>
        <p className="text-gray-600">Configureer uw schilderwerk project en ontvang direct een offerte</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5" />
                Project Configuratie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Details</h3>
                  
                  <div>
                    <Label className="text-base font-medium mb-3 block">Type schilderwerk *</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="binnen"
                          name="binnen_buiten"
                          value="binnen"
                          checked={formData.binnen_buiten === 'binnen'}
                          onChange={(e) => handleInputChange('binnen_buiten', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="binnen" className="cursor-pointer">Binnen schilderwerk</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="buiten"
                          name="binnen_buiten"
                          value="buiten"
                          checked={formData.binnen_buiten === 'buiten'}
                          onChange={(e) => handleInputChange('binnen_buiten', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="buiten" className="cursor-pointer">Buiten schilderwerk</Label>
                      </div>
                    </div>
                  </div>

                  {formData.binnen_buiten === 'binnen' && (
                    <div>
                      <Label className="text-base font-medium mb-3 block">Soort werkzaamheden *</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="muren_plafonds"
                            name="werktype"
                            value="muren_plafonds"
                            checked={formData.werktype === 'muren_plafonds'}
                            onChange={(e) => handleInputChange('werktype', e.target.value)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="muren_plafonds" className="cursor-pointer">Muren en plafonds</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="deuren_kozijnen"
                            name="werktype"
                            value="deuren_kozijnen"
                            checked={formData.werktype === 'deuren_kozijnen'}
                            onChange={(e) => handleInputChange('werktype', e.target.value)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="deuren_kozijnen" className="cursor-pointer">Deuren en kozijnen</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="radiatoren"
                            name="werktype"
                            value="radiatoren"
                            checked={formData.werktype === 'radiatoren'}
                            onChange={(e) => handleInputChange('werktype', e.target.value)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="radiatoren" className="cursor-pointer">Radiatoren</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="trap_leuning"
                            name="werktype"
                            value="trap_leuning"
                            checked={formData.werktype === 'trap_leuning'}
                            onChange={(e) => handleInputChange('werktype', e.target.value)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="trap_leuning" className="cursor-pointer">Trap en leuning</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="behang_aanbrengen"
                            name="werktype"
                            value="behang_aanbrengen"
                            checked={formData.werktype === 'behang_aanbrengen'}
                            onChange={(e) => handleInputChange('werktype', e.target.value)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="behang_aanbrengen" className="cursor-pointer">Behang aanbrengen</Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.binnen_buiten === 'binnen' && (
                    <div>
                      <Label className="text-base font-medium mb-3 block">Project type *</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="renovatie"
                            name="nieuwbouw_renovatie"
                            value="renovatie"
                            checked={formData.nieuwbouw_renovatie === 'renovatie'}
                            onChange={(e) => handleInputChange('nieuwbouw_renovatie', e.target.value)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="renovatie" className="cursor-pointer">Renovatie (9% BTW)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="nieuwbouw"
                            name="nieuwbouw_renovatie"
                            value="nieuwbouw"
                            checked={formData.nieuwbouw_renovatie === 'nieuwbouw'}
                            onChange={(e) => handleInputChange('nieuwbouw_renovatie', e.target.value)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="nieuwbouw" className="cursor-pointer">Nieuwbouw (21% BTW)</Label>
                        </div>
                      </div>
                    </div>
                  )}

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
                      placeholder="Bijv. Begin januari 2024"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">Indicatief budget</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="budget1"
                          name="budget"
                          value="< €1.000"
                          checked={formData.budget === '< €1.000'}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="budget1" className="cursor-pointer">Minder dan €1.000</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="budget2"
                          name="budget"
                          value="€1.000 - €2.500"
                          checked={formData.budget === '€1.000 - €2.500'}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="budget2" className="cursor-pointer">€1.000 - €2.500</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="budget3"
                          name="budget"
                          value="€2.500 - €5.000"
                          checked={formData.budget === '€2.500 - €5.000'}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="budget3" className="cursor-pointer">€2.500 - €5.000</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="budget4"
                          name="budget"
                          value="€5.000 - €7.500"
                          checked={formData.budget === '€5.000 - €7.500'}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="budget4" className="cursor-pointer">€5.000 - €7.500</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="budget5"
                          name="budget"
                          value="> €7.500"
                          checked={formData.budget === '> €7.500'}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="budget5" className="cursor-pointer">Meer dan €7.500</Label>
                      </div>
                    </div>
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
              {formData.binnen_buiten && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Geselecteerd werk:</h4>
                  <p className="text-sm text-gray-600">
                    {formData.binnen_buiten === 'binnen' ? 'Binnen schilderwerk' : 'Buiten schilderwerk'}
                  </p>
                  {formData.werktype && formData.binnen_buiten === 'binnen' && (
                    <p className="text-sm text-gray-600">
                      {schilderTarieven.binnen[formData.werktype as keyof typeof schilderTarieven.binnen]?.naam}
                    </p>
                  )}
                  {formData.oppervlakte && (
                    <p className="text-sm text-gray-600">
                      Oppervlakte: {formData.oppervlakte} m²
                    </p>
                  )}
                  {formData.binnen_buiten === 'binnen' && (
                    <p className="text-sm text-gray-600">
                      Type: {formData.nieuwbouw_renovatie === 'nieuwbouw' ? 'Nieuwbouw (21% BTW)' : 'Renovatie (9% BTW)'}
                    </p>
                  )}
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Geschatte totaalprijs:</h4>
                <p className="text-xl font-bold text-blue-600">
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
                <p>• BTW-tarief afhankelijk van project</p>
                <p>• Geen verrassingen achteraf</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchilderConfigurator;
