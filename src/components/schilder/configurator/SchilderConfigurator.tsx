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

const SchilderConfigurator = () => {
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    emailadres: '',
    telefoon: '',
    straatnaam: '',
    huisnummer: '',
    postcode: '',
    plaats: '',
    project_type: 'binnen',
    bouw_type: 'renovatie',
    oppervlakte: '',
    plafond_oppervlakte: '',
    aantal_deuren: '',
    aantal_ramen: '',
    meerdere_kleuren: false,
    uitvoertermijn: '',
    reden_aanvraag: '',
    bericht: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    const wandOppervlakte = parseFloat(formData.oppervlakte) || 0;
    const plafondOppervlakte = parseFloat(formData.plafond_oppervlakte) || 0;
    const aantalDeuren = parseInt(formData.aantal_deuren) || 0;
    const aantalRamen = parseInt(formData.aantal_ramen) || 0;
    const meerderKleuren = formData.meerdere_kleuren;
    
    const wandPrijs = meerderKleuren ? 19.55 : 17.25;
    const plafondPrijs = meerderKleuren ? 21.85 : 19.55;
    const deurPrijs = meerderKleuren ? 345.00 : 287.50;
    const raamPrijs = meerderKleuren ? 230.00 : 172.50;
    
    const wandKosten = wandOppervlakte * wandPrijs;
    const plafondKosten = plafondOppervlakte * plafondPrijs;
    const deurKosten = aantalDeuren * deurPrijs;
    const raamKosten = aantalRamen * raamPrijs;
    
    const totaalExclBtw = wandKosten + plafondKosten + deurKosten + raamKosten;
    
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
      console.log('🎨 Starting schilder form submission process...');
      const totalPrice = calculatePrice();
      
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

      const insertData = {
        voornaam: formData.voornaam,
        achternaam: formData.achternaam,
        emailadres: formData.emailadres,
        telefoon: formData.telefoon,
        straatnaam: formData.straatnaam,
        huisnummer: formData.huisnummer,
        postcode: formData.postcode,
        plaats: formData.plaats,
        project_type: `${formData.project_type} - ${formData.bouw_type}`,
        verf_type: formData.meerdere_kleuren ? 'Meerdere kleuren' : 'Één kleur',
        oppervlakte: parseInt(formData.oppervlakte) || 0,
        bericht: formData.bericht || '',
        totaal_prijs: totalPrice,
        status: 'nieuw',
        plafond_meeverven: parseFloat(formData.plafond_oppervlakte) > 0,
        kozijnen_meeverven: (parseInt(formData.aantal_deuren) || 0) + (parseInt(formData.aantal_ramen) || 0) > 0,
        voorbewerking_nodig: false
      };

      console.log('💾 Saving to schilder_aanvragen database...');
      console.log('📊 Data to be saved:', insertData);

      const { data: savedData, error } = await supabase
        .from('schilder_aanvragen')
        .insert(insertData)
        .select();

      if (error) {
        console.error('❌ Database save error:', error);
        throw error;
      }

      console.log('✅ Database save successful!');
      console.log('📋 Saved record:', savedData);

      console.log('📧 Sending notification emails via edge function...');
      const { data: emailData, error: emailError } = await supabase.functions.invoke('handle-schilder-request', {
        body: { 
          customerData, 
          formData, 
          totalPrice, 
          breakdown: []
        }
      });

      if (emailError) {
        console.error('❌ Email sending error:', emailError);
        console.warn('⚠️ Data was saved but emails might not have been sent');
      } else {
        console.log('✅ Emails sent successfully!');
        console.log('📧 Email response:', emailData);
      }

      toast.success('Bedankt voor uw aanvraag! U ontvangt zo een bevestiging per email en wij nemen binnen 24 uur contact met u op.', {
        duration: 5000
      });
      
      setFormData({
        voornaam: '',
        achternaam: '',
        emailadres: '',
        telefoon: '',
        straatnaam: '',
        huisnummer: '',
        postcode: '',
        plaats: '',
        project_type: 'binnen',
        bouw_type: 'renovatie',
        oppervlakte: '',
        plafond_oppervlakte: '',
        aantal_deuren: '',
        aantal_ramen: '',
        meerdere_kleuren: false,
        uitvoertermijn: '',
        reden_aanvraag: '',
        bericht: ''
      });
      setUploadedFile(null);

    } catch (error) {
      console.error('❌ Complete form submission error:', error);
      toast.error('Er ging iets mis bij het verzenden van uw aanvraag. Probeer het opnieuw of neem contact met ons op.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const btw = formData.bouw_type === 'nieuwbouw' ? 21 : 9;
  const hasAnyInput = parseFloat(formData.oppervlakte) > 0 || parseFloat(formData.plafond_oppervlakte) > 0 || parseInt(formData.aantal_deuren) > 0 || parseInt(formData.aantal_ramen) > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Schilderwerk Configurator</CardTitle>
          <p className="text-center text-gray-600">
            Configureer je schilderproject en ontvang direct een prijsindicatie
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

            {/* Project Type Selection */}
            <div>
              <Label className="text-base font-medium">Binnen of buiten schilderwerk? *</Label>
              <RadioGroup
                value={formData.project_type}
                onValueChange={(value) => setFormData({...formData, project_type: value})}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="binnen" id="binnen" />
                  <Label htmlFor="binnen">Binnen schilderwerk</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buiten" id="buiten" />
                  <Label htmlFor="buiten">Buiten schilderwerk</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-medium">Kleuroptie</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="meerdere_kleuren"
                  checked={formData.meerdere_kleuren}
                  onCheckedChange={(checked) => setFormData({...formData, meerdere_kleuren: checked as boolean})}
                />
                <Label htmlFor="meerdere_kleuren">Meerdere kleuren gebruiken</Label>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="oppervlakte">Wand oppervlakte (m²)</Label>
                <Input
                  id="oppervlakte"
                  type="number"
                  value={formData.oppervlakte}
                  onChange={(e) => setFormData({...formData, oppervlakte: e.target.value})}
                  placeholder="Bijvoorbeeld: 50"
                />
              </div>
              <div>
                <Label htmlFor="plafond_oppervlakte">Plafond oppervlakte (m²)</Label>
                <Input
                  id="plafond_oppervlakte"
                  type="number"
                  value={formData.plafond_oppervlakte}
                  onChange={(e) => setFormData({...formData, plafond_oppervlakte: e.target.value})}
                  placeholder="Bijvoorbeeld: 25"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aantal_deuren">Aantal deuren (incl. kozijn)</Label>
                <Input
                  id="aantal_deuren"
                  type="number"
                  value={formData.aantal_deuren}
                  onChange={(e) => setFormData({...formData, aantal_deuren: e.target.value})}
                  placeholder="Bijvoorbeeld: 3"
                />
              </div>
              <div>
                <Label htmlFor="aantal_ramen">Aantal ramen (incl. kozijn)</Label>
                <Input
                  id="aantal_ramen"
                  type="number"
                  value={formData.aantal_ramen}
                  onChange={(e) => setFormData({...formData, aantal_ramen: e.target.value})}
                  placeholder="Bijvoorbeeld: 5"
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
                      {formData.meerdere_kleuren ? 'Meerdere kleuren' : 'Één kleur'}
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

export default SchilderConfigurator;
