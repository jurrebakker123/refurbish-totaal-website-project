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
    bouw_type: 'renovatie',
    stuc_type: 'glad_stucwerk',
    oppervlakte_wanden: '',
    oppervlakte_plafonds: '',
    uitvoertermijn: '',
    reden_aanvraag: '',
    bericht: '',
    isolatie_gewenst: false
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    const wandOppervlakte = parseFloat(formData.oppervlakte_wanden) || 0;
    const plafondOppervlakte = parseFloat(formData.oppervlakte_plafonds) || 0;
    const isolatieGewenst = formData.isolatie_gewenst;
    
    let wandPrijs = 0;
    let plafondPrijs = 0;
    
    switch (formData.stuc_type) {
      case 'glad_stucwerk':
        wandPrijs = 18.50;
        plafondPrijs = 21.00;
        break;
      case 'spachtelputz':
        wandPrijs = 22.50;
        plafondPrijs = 25.00;
        break;
      case 'decoratief_stuc':
        wandPrijs = 35.00;
        plafondPrijs = 38.00;
        break;
      default:
        wandPrijs = 18.50;
        plafondPrijs = 21.00;
    }
    
    const isolatieToeslag = isolatieGewenst ? 8.50 : 0;
    
    const wandKosten = wandOppervlakte * (wandPrijs + isolatieToeslag);
    const plafondKosten = plafondOppervlakte * (plafondPrijs + isolatieToeslag);
    
    const totaalExclBtw = wandKosten + plafondKosten;
    
    const btwPercentage = formData.bouw_type === 'nieuwbouw' ? 1.21 : 1.09;
    
    return Math.round(totaalExclBtw * btwPercentage);
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
      console.log('🏗️ Starting stukadoor form submission...');
      const totalPrice = calculatePrice();
      
      console.log('💾 Saving to stukadoor_aanvragen database...');
      
      const insertData = {
        voornaam: formData.voornaam,
        achternaam: formData.achternaam,
        emailadres: formData.emailadres,
        telefoon: formData.telefoon,
        straatnaam: formData.straatnaam,
        huisnummer: formData.huisnummer,
        postcode: formData.postcode,
        plaats: formData.plaats,
        werk_type: 'nieuw_stucwerk',
        afwerking: formData.stuc_type,
        oppervlakte: (parseFloat(formData.oppervlakte_wanden) || 0) + (parseFloat(formData.oppervlakte_plafonds) || 0),
        aantal_kamers: null,
        huidige_staat: null,
        voorbewerking: null,
        isolatie_gewenst: formData.isolatie_gewenst,
        bericht: formData.bericht || null,
        totaal_prijs: totalPrice,
        status: 'nieuw',
        notities: null,
        offerte_verzonden_op: null,
        op_locatie_op: null,
        in_aanbouw_op: null,
        afgehandeld_op: null
      };

      console.log('📝 Data to insert:', insertData);

      const { data, error } = await supabase
        .from('stukadoor_aanvragen')
        .insert(insertData)
        .select();

      if (error) {
        console.error('❌ Database error:', error);
        throw error;
      }

      console.log('✅ Database save successful! Data saved to stukadoor_aanvragen table:', data);

      // Send emails via edge function
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

      console.log('📧 Sending emails via edge function...');
      try {
        const { error: emailError } = await supabase.functions.invoke('handle-stukadoor-request', {
          body: { 
            customerData, 
            formData: {
              ...formData,
              oppervlakte_wanden: formData.oppervlakte_wanden,
              oppervlakte_plafonds: formData.oppervlakte_plafonds
            }, 
            totalPrice, 
            breakdown: []
          }
        });

        if (emailError) {
          console.error('❌ Email error:', emailError);
          console.log('⚠️ Email failed but continuing as database save was successful');
        } else {
          console.log('✅ Emails sent successfully!');
        }
      } catch (emailError) {
        console.error('❌ Email send failed:', emailError);
        console.log('⚠️ Continuing as database save was successful');
      }

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
        bouw_type: 'renovatie',
        stuc_type: 'glad_stucwerk',
        oppervlakte_wanden: '',
        oppervlakte_plafonds: '',
        uitvoertermijn: '',
        reden_aanvraag: '',
        bericht: '',
        isolatie_gewenst: false
      });
      setUploadedFile(null);

    } catch (error) {
      console.error('❌ Form submission error:', error);
      toast.error('Er ging iets mis bij het verzenden van uw aanvraag. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const btw = formData.bouw_type === 'nieuwbouw' ? 21 : 9;
  const hasAnyInput = parseFloat(formData.oppervlakte_wanden) > 0 || parseFloat(formData.oppervlakte_plafonds) > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Stukadoorswerk Configurator</CardTitle>
          <p className="text-center text-gray-600">
            Configureer uw stukadoorsproject en ontvang direct een prijsindicatie
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
                  <RadioGroupItem value="renovatie" id="renovatie" />
                  <Label htmlFor="renovatie">Renovatie (9% BTW)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nieuwbouw" id="nieuwbouw" />
                  <Label htmlFor="nieuwbouw">Nieuwbouw (21% BTW)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Surface Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="oppervlakte_wanden">Wand oppervlakte (m²)</Label>
                <Input
                  id="oppervlakte_wanden"
                  type="number"
                  value={formData.oppervlakte_wanden}
                  onChange={(e) => setFormData({...formData, oppervlakte_wanden: e.target.value})}
                  placeholder="Bijvoorbeeld: 50"
                />
              </div>
              <div>
                <Label htmlFor="oppervlakte_plafonds">Plafond oppervlakte (m²)</Label>
                <Input
                  id="oppervlakte_plafonds"
                  type="number"
                  value={formData.oppervlakte_plafonds}
                  onChange={(e) => setFormData({...formData, oppervlakte_plafonds: e.target.value})}
                  placeholder="Bijvoorbeeld: 25"
                />
              </div>
            </div>

            {/* Isolation Option */}
            <div>
              <Label className="text-base font-medium">Extra opties</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="isolatie_gewenst"
                  checked={formData.isolatie_gewenst}
                  onCheckedChange={(checked) => setFormData({...formData, isolatie_gewenst: checked as boolean})}
                />
                <Label htmlFor="isolatie_gewenst">Isolatie gewenst</Label>
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
                placeholder="Bijvoorbeeld: verhuizing, onderhoud, renovatie"
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
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-800">Geschatte Prijs (Indicatief)</h3>
                    <p className="text-3xl font-bold text-blue-600">€{calculatePrice().toLocaleString()}</p>
                    <p className="text-sm text-blue-700 mb-2">
                      Inclusief materiaal en arbeid
                    </p>
                    <p className="text-xs text-blue-600 mb-2">
                      {formData.bouw_type === 'nieuwbouw' ? 'Nieuwbouw' : 'Renovatie'} - {btw}% BTW
                    </p>
                    <p className="text-xs text-blue-600 mb-2">
                      {formData.stuc_type.replace('_', ' ')} - {formData.isolatie_gewenst ? 'Met isolatie' : 'Zonder isolatie'}
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
