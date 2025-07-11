
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    werk_type: 'binnen',
    bouw_type: 'renovatie',
    stuc_type: 'sausklaar',
    oppervlakte_wanden: '',
    oppervlakte_plafonds: '',
    uitvoertermijn: '',
    reden_aanvraag: '',
    bericht: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    const wandOppervlakte = parseFloat(formData.oppervlakte_wanden) || 0;
    const plafondOppervlakte = parseFloat(formData.oppervlakte_plafonds) || 0;
    
    // CORRECTE PRIJZEN PER STUC TYPE (excl. BTW)
    let wandPrijs = 0;
    let plafondPrijs = 0;
    
    switch (formData.stuc_type) {
      case 'sausklaar':
        wandPrijs = 17.25;
        plafondPrijs = 18.40;
        break;
      case 'sierpleister':
        wandPrijs = 20.70;
        plafondPrijs = 23.00;
        break;
      case 'beton_cire':
        wandPrijs = 103.50;
        plafondPrijs = 138.00;
        break;
    }
    
    // Bereken totaal excl. BTW
    const wandKosten = wandOppervlakte * wandPrijs;
    const plafondKosten = plafondOppervlakte * plafondPrijs;
    const totaalExclBtw = wandKosten + plafondKosten;
    
    // BTW percentage bepalen (9% voor renovatie, 21% voor nieuwbouw)
    const btwPercentage = formData.bouw_type === 'nieuwbouw' ? 1.21 : 1.09;
    
    return Math.round(totaalExclBtw * btwPercentage);
  };

  const getPriceBreakdown = () => {
    const wandOppervlakte = parseFloat(formData.oppervlakte_wanden) || 0;
    const plafondOppervlakte = parseFloat(formData.oppervlakte_plafonds) || 0;
    
    // CORRECTE PRIJZEN PER STUC TYPE (excl. BTW)
    let wandPrijs = 0;
    let plafondPrijs = 0;
    let stucTypeNaam = '';
    
    switch (formData.stuc_type) {
      case 'sausklaar':
        wandPrijs = 17.25;
        plafondPrijs = 18.40;
        stucTypeNaam = 'Sausklaar stucwerk';
        break;
      case 'sierpleister':
        wandPrijs = 20.70;
        plafondPrijs = 23.00;
        stucTypeNaam = 'Sierpleister (spachtel)';
        break;
      case 'beton_cire':
        wandPrijs = 103.50;
        plafondPrijs = 138.00;
        stucTypeNaam = 'Beton ciré';
        break;
    }
    
    const breakdown = [];
    
    if (wandOppervlakte > 0) {
      breakdown.push(`${stucTypeNaam} - Wanden: ${wandOppervlakte}m² × €${wandPrijs} = €${(wandOppervlakte * wandPrijs).toFixed(2)}`);
    }
    if (plafondOppervlakte > 0) {
      breakdown.push(`${stucTypeNaam} - Plafonds: ${plafondOppervlakte}m² × €${plafondPrijs} = €${(plafondOppervlakte * plafondPrijs).toFixed(2)}`);
    }
    
    return breakdown;
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

  const sendConfirmationEmail = async (customerData: any, totalPrice: number) => {
    const breakdown = getPriceBreakdown();
    const btw = formData.bouw_type === 'nieuwbouw' ? 21 : 9;
    const stucTypeNames = {
      'sausklaar': 'Sausklaar stucwerk',
      'sierpleister': 'Sierpleister (spachtel)',
      'beton_cire': 'Beton ciré'
    };
    
    const customerMessage = `
Beste ${customerData.voornaam} ${customerData.achternaam},

Bedankt voor uw aanvraag voor stukadoorswerk. Hieronder vindt u een overzicht van uw aanvraag:

CONTACTGEGEVENS:
- Naam: ${customerData.voornaam} ${customerData.achternaam}
- E-mail: ${customerData.emailadres}
- Telefoon: ${customerData.telefoon}
- Adres: ${customerData.straatnaam} ${customerData.huisnummer}, ${customerData.postcode} ${customerData.plaats}

PROJECTDETAILS:
- Type: ${formData.werk_type === 'binnen' ? 'Binnen stukadoorswerk' : 'Buiten stukadoorswerk'}
- Bouwtype: ${formData.bouw_type === 'nieuwbouw' ? 'Nieuwbouw' : 'Renovatie'} (${btw}% BTW)
- Stucwerk type: ${stucTypeNames[formData.stuc_type as keyof typeof stucTypeNames]}
- Wand oppervlakte: ${formData.oppervlakte_wanden}m²
- Plafond oppervlakte: ${formData.oppervlakte_plafonds}m²
- Uitvoertermijn: ${formData.uitvoertermijn}
- Reden aanvraag: ${formData.reden_aanvraag}

PRIJSOPBOUW:
${breakdown.join('\n')}

GESCHATTE TOTAALPRIJS: €${totalPrice.toLocaleString()}
(Inclusief materiaal, arbeid en ${btw}% BTW)

${formData.bericht ? `AANVULLENDE OPMERKINGEN:\n${formData.bericht}` : ''}

Wij nemen zo spoedig mogelijk contact met u op voor een vrijblijvende offerte.

Met vriendelijke groet,
Refurbish Totaal Nederland
`;

    await sendEmail({
      from_name: 'Refurbish Totaal Nederland',
      from_email: 'info@refurbishtotaalnederland.nl',
      to_name: `${customerData.voornaam} ${customerData.achternaam}`,
      to_email: customerData.emailadres,
      subject: 'Bevestiging stukadoorswerk aanvraag',
      message: customerMessage,
      phone: customerData.telefoon,
      location: `${customerData.plaats}`,
      service: 'Stukadoorswerk'
    });
  };

  const sendAdminNotification = async (customerData: any, totalPrice: number) => {
    const breakdown = getPriceBreakdown();
    const btw = formData.bouw_type === 'nieuwbouw' ? 21 : 9;
    const stucTypeNames = {
      'sausklaar': 'Sausklaar stucwerk',
      'sierpleister': 'Sierpleister (spachtel)',
      'beton_cire': 'Beton ciré'
    };
    
    const adminMessage = `
NIEUWE STUKADOORSWERK AANVRAAG

KLANTGEGEVENS:
- ${customerData.voornaam} ${customerData.achternaam}
- ${customerData.emailadres}
- ${customerData.telefoon}
- ${customerData.straatnaam} ${customerData.huisnummer}
- ${customerData.postcode} ${customerData.plaats}

PROJECT:
- Type: ${formData.werk_type === 'binnen' ? 'Binnen stukadoorswerk' : 'Buiten stukadoorswerk'}
- Bouwtype: ${formData.bouw_type === 'nieuwbouw' ? 'Nieuwbouw' : 'Renovatie'} (${btw}% BTW)
- Stucwerk type: ${stucTypeNames[formData.stuc_type as keyof typeof stucTypeNames]}
- Wand oppervlakte: ${formData.oppervlakte_wanden}m²
- Plafond oppervlakte: ${formData.oppervlakte_plafonds}m²
- Uitvoertermijn: ${formData.uitvoertermijn}
- Reden: ${formData.reden_aanvraag}

PRIJSBEREKENING:
${breakdown.join('\n')}
TOTAAL: €${totalPrice.toLocaleString()}

${formData.bericht ? `OPMERKINGEN: ${formData.bericht}` : ''}
`;

    // Send to both admin emails
    const adminEmails = ['info@refurbishtotaalnederland.nl', 'mazenaddas95@gmail.com'];
    
    for (const email of adminEmails) {
      await sendEmail({
        from_name: customerData.voornaam + ' ' + customerData.achternaam,
        from_email: customerData.emailadres,
        to_name: 'Admin',
        to_email: email,
        subject: `Nieuwe stukadoorswerk aanvraag van ${customerData.voornaam} ${customerData.achternaam}`,
        message: adminMessage,
        phone: customerData.telefoon,
        location: customerData.plaats,
        service: 'Stukadoorswerk'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('🏗️ Starting stukadoor form submission...');
      const totalPrice = calculatePrice();
      const totalOppervlakte = (parseFloat(formData.oppervlakte_wanden) || 0) + (parseFloat(formData.oppervlakte_plafonds) || 0);
      
      const customerData = {
        voornaam: formData.voornaam,
        achternaam: formData.achternaam,
        emailadres: formData.emailadres,
        telefoon: formData.telefoon,
        straatnaam: formData.straatnaam,
        huisnummer: formData.huisnummer,
        postcode: formData.postcode,
        plaats: formData.plaats
      };
      
      console.log('💾 Saving to database...');
      // Save to database
      const { error } = await supabase
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
          afwerking: formData.stuc_type === 'sausklaar' ? 'Sausklaar stucwerk' : 
                    formData.stuc_type === 'sierpleister' ? 'Sierpleister (spachtel)' : 'Beton ciré',
          oppervlakte: Math.round(totalOppervlakte),
          bericht: formData.bericht,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        });

      if (error) {
        console.error('❌ Database error:', error);
        throw error;
      }

      console.log('✅ Database save successful!');

      console.log('📧 Sending emails...');
      // Send confirmation email to customer
      await sendConfirmationEmail(customerData, totalPrice);
      
      // Send notification to admins
      await sendAdminNotification(customerData, totalPrice);
      
      console.log('✅ Emails sent successfully!');

      toast.success('Bedankt voor uw aanvraag, wij nemen zo snel mogelijk contact met u op!', {
        duration: 5000
      });
      
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
        stuc_type: 'sausklaar',
        oppervlakte_wanden: '',
        oppervlakte_plafonds: '',
        uitvoertermijn: '',
        reden_aanvraag: '',
        bericht: ''
      });
      setUploadedFile(null);

    } catch (error) {
      console.error('❌ Form submission error:', error);
      toast.error('Er ging iets mis bij het verzenden van uw aanvraag. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bepaal BTW percentage
  const btw = formData.bouw_type === 'nieuwbouw' ? 21 : 9;
  const hasAnyInput = parseFloat(formData.oppervlakte_wanden) > 0 || parseFloat(formData.oppervlakte_plafonds) > 0;

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Build Type Selection */}
            <div>
              <Label className="text-base font-medium">Nieuwbouw of renovatie? *</Label>
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
              <Label className="text-base font-medium">Binnen of buiten stukadoorswerk? *</Label>
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

            {/* Stuc Type Selection */}
            <div>
              <Label htmlFor="stuc_type" className="text-base font-medium">Type stucwerk *</Label>
              <Select value={formData.stuc_type} onValueChange={(value) => setFormData({...formData, stuc_type: value})}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecteer type stucwerk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sausklaar">Sausklaar stucwerk</SelectItem>
                  <SelectItem value="sierpleister">Sierpleister (spachtel)</SelectItem>
                  <SelectItem value="beton_cire">Beton ciré</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="oppervlakte_wanden">Wand oppervlakte (m²)</Label>
                <Input
                  id="oppervlakte_wanden"
                  type="number"
                  value={formData.oppervlakte_wanden}
                  onChange={(e) => setFormData({...formData, oppervlakte_wanden: e.target.value})}
                  placeholder="Bijvoorbeeld: 30"
                />
              </div>
              <div>
                <Label htmlFor="oppervlakte_plafonds">Plafond oppervlakte (m²)</Label>
                <Input
                  id="oppervlakte_plafonds"
                  type="number"
                  value={formData.oppervlakte_plafonds}
                  onChange={(e) => setFormData({...formData, oppervlakte_plafonds: e.target.value})}
                  placeholder="Bijvoorbeeld: 20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="uitvoertermijn">Wat is de gewenste uitvoertermijn? *</Label>
              <Input
                id="uitvoertermijn"
                value={formData.uitvoertermijn}
                onChange={(e) => setFormData({...formData, uitvoertermijn: e.target.value})}
                placeholder="Bijvoorbeeld: binnen 3 weken, flexibel"
                required
              />
            </div>

            <div>
              <Label htmlFor="reden_aanvraag">Wat is de reden van uw aanvraag? *</Label>
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
                    <p className="text-xs text-green-600 mb-2">
                      {formData.bouw_type === 'nieuwbouw' ? 'Nieuwbouw' : 'Renovatie'} - {btw}% BTW
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
