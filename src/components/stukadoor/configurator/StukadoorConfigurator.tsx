
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
    stuc_type: 'glad_stucwerk',
    oppervlakte_wanden: '',
    oppervlakte_plafonds: '',
    isolatie_gewenst: false,
    uitvoertermijn: '',
    reden_aanvraag: '',
    bericht: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePrice = () => {
    const wandOppervlakte = parseFloat(formData.oppervlakte_wanden) || 0;
    const plafondOppervlakte = parseFloat(formData.oppervlakte_plafonds) || 0;
    const totaalOppervlakte = wandOppervlakte + plafondOppervlakte;
    
    if (totaalOppervlakte === 0) return 0;
    
    let prijs_per_m2 = 0;
    
    // Prijzen per m² op basis van stucwerk type
    switch (formData.stuc_type) {
      case 'glad_stucwerk':
        prijs_per_m2 = 22.50;
        break;
      case 'spachtelputz':
        prijs_per_m2 = 28.00;
        break;
      case 'decoratief_stucwerk':
        prijs_per_m2 = 35.00;
        break;
      default:
        prijs_per_m2 = 22.50;
    }
    
    let totaal = totaalOppervlakte * prijs_per_m2;
    
    // Extra kosten voor isolatie
    if (formData.isolatie_gewenst) {
      totaal += totaalOppervlakte * 15; // €15 per m² extra voor isolatie
    }
    
    return Math.round(totaal);
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
      console.log('🔨 Starting stukadoor form submission...');
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

      console.log('💾 Saving to stukadoor_aanvragen database...');
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
          werk_type: 'nieuw_stucwerk',
          afwerking: formData.stuc_type,
          oppervlakte: (parseFloat(formData.oppervlakte_wanden) || 0) + (parseFloat(formData.oppervlakte_plafonds) || 0),
          isolatie_gewenst: formData.isolatie_gewenst,
          bericht: formData.bericht,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        });

      if (error) {
        console.error('❌ Database error:', error);
        throw error;
      }

      console.log('✅ Database save successful! Data saved to stukadoor_aanvragen table');

      console.log('📧 Sending emails via edge function...');
      const { error: emailError } = await supabase.functions.invoke('handle-stukadoor-request', {
        body: { 
          customerData, 
          formData, 
          totalPrice, 
          breakdown: []
        }
      });

      if (emailError) {
        console.error('❌ Email error:', emailError);
        throw emailError;
      }
      
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
        stuc_type: 'glad_stucwerk',
        oppervlakte_wanden: '',
        oppervlakte_plafonds: '',
        isolatie_gewenst: false,
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

            {/* Stuc Type Selection */}
            <div>
              <Label className="text-base font-medium">Type stucwerk *</Label>
              <RadioGroup
                value={formData.stuc_type}
                onValueChange={(value) => setFormData({...formData, stuc_type: value})}
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

            {/* Project Details */}
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

            {/* Isolatie Option */}
            <div>
              <Label className="text-base font-medium">Extra optie</Label>
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
                placeholder="Bijvoorbeeld: binnen 4 weken, flexibel"
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
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-800">Geschatte Prijs (Indicatief)</h3>
                    <p className="text-3xl font-bold text-green-600">€{calculatePrice().toLocaleString()}</p>
                    <p className="text-sm text-green-700 mb-2">
                      Inclusief materiaal en arbeid
                    </p>
                    <p className="text-xs text-green-600 mb-2">
                      Type: {formData.stuc_type.replace('_', ' ')}
                    </p>
                    {formData.isolatie_gewenst && (
                      <p className="text-xs text-green-600 mb-2">
                        Inclusief isolatie
                      </p>
                    )}
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
