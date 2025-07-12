
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
    oppervlakte: '',
    aantal_kamers: '',
    afwerking: '',
    huidige_staat: '',
    voorbewerking: '',
    isolatie_gewenst: false,
    bericht: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.voornaam || !formData.achternaam || !formData.emailadres || !formData.telefoon || 
        !formData.straatnaam || !formData.huisnummer || !formData.postcode || !formData.plaats ||
        !formData.werk_type || !formData.oppervlakte || !formData.afwerking) {
      toast.error('Vul alle verplichte velden in');
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        voornaam: formData.voornaam,
        achternaam: formData.achternaam,
        emailadres: formData.emailadres,
        telefoon: formData.telefoon,
        straatnaam: formData.straatnaam,
        huisnummer: formData.huisnummer,
        postcode: formData.postcode,
        plaats: formData.plaats,
        werk_type: formData.werk_type,
        oppervlakte: parseInt(formData.oppervlakte) || 0,
        aantal_kamers: formData.aantal_kamers ? parseInt(formData.aantal_kamers) : null,
        afwerking: formData.afwerking,
        huidige_staat: formData.huidige_staat || null,
        voorbewerking: formData.voorbewerking || null,
        isolatie_gewenst: formData.isolatie_gewenst,
        bericht: formData.bericht || null,
        status: 'nieuw'
      };

      console.log('Submitting stukadoor data:', submissionData);

      const { data, error } = await supabase
        .from('stukadoor_aanvragen')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Stukadoor aanvraag successfully inserted:', data);
      
      toast.success('Uw stukadoor aanvraag is succesvol verzonden!');
      
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
        oppervlakte: '',
        aantal_kamers: '',
        afwerking: '',
        huidige_staat: '',
        voorbewerking: '',
        isolatie_gewenst: false,
        bericht: ''
      });

    } catch (error) {
      console.error('Error submitting stukadoor form:', error);
      toast.error('Er is een fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Stukadoor Configurator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contactgegevens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="voornaam">Voornaam *</Label>
                <Input
                  id="voornaam"
                  value={formData.voornaam}
                  onChange={(e) => handleInputChange('voornaam', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="achternaam">Achternaam *</Label>
                <Input
                  id="achternaam"
                  value={formData.achternaam}
                  onChange={(e) => handleInputChange('achternaam', e.target.value)}
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
                  onChange={(e) => handleInputChange('emailadres', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefoon">Telefoonnummer *</Label>
                <Input
                  id="telefoon"
                  value={formData.telefoon}
                  onChange={(e) => handleInputChange('telefoon', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Adresgegevens */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="straatnaam">Straatnaam *</Label>
                <Input
                  id="straatnaam"
                  value={formData.straatnaam}
                  onChange={(e) => handleInputChange('straatnaam', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="huisnummer">Huisnummer *</Label>
                <Input
                  id="huisnummer"
                  value={formData.huisnummer}
                  onChange={(e) => handleInputChange('huisnummer', e.target.value)}
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
                  onChange={(e) => handleInputChange('postcode', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="plaats">Plaats *</Label>
                <Input
                  id="plaats"
                  value={formData.plaats}
                  onChange={(e) => handleInputChange('plaats', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Projectdetails */}
            <div>
              <Label htmlFor="werk_type">Soort Werk *</Label>
              <Select value={formData.werk_type} onValueChange={(value) => handleInputChange('werk_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer soort werk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="glad_stucwerk">Glad stucwerk</SelectItem>
                  <SelectItem value="spachtelputz">Spachtelputz</SelectItem>
                  <SelectItem value="decoratief_stucwerk">Decoratief stucwerk</SelectItem>
                  <SelectItem value="reparatie_stucwerk">Reparatie stucwerk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="oppervlakte">Oppervlakte (m²) *</Label>
                <Input
                  id="oppervlakte"
                  type="number"
                  value={formData.oppervlakte}
                  onChange={(e) => handleInputChange('oppervlakte', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="aantal_kamers">Aantal kamers</Label>
                <Input
                  id="aantal_kamers"
                  type="number"
                  value={formData.aantal_kamers}
                  onChange={(e) => handleInputChange('aantal_kamers', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="afwerking">Gewenste Afwerking *</Label>
              <Select value={formData.afwerking} onValueChange={(value) => handleInputChange('afwerking', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer afwerking" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="glad">Glad</SelectItem>
                  <SelectItem value="gestructureerd">Gestructureerd</SelectItem>
                  <SelectItem value="gespoten">Gespoten</SelectItem>
                  <SelectItem value="gerold">Gerold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="huidige_staat">Huidige staat</Label>
                <Select value={formData.huidige_staat} onValueChange={(value) => handleInputChange('huidige_staat', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer huidige staat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="goed">Goed</SelectItem>
                    <SelectItem value="redelijk">Redelijk</SelectItem>
                    <SelectItem value="slecht">Slecht</SelectItem>
                    <SelectItem value="zeer_slecht">Zeer slecht</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="voorbewerking">Voorbewerking</Label>
                <Select value={formData.voorbewerking} onValueChange={(value) => handleInputChange('voorbewerking', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer voorbewerking" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="schuren">Schuren</SelectItem>
                    <SelectItem value="afbijten">Afbijten</SelectItem>
                    <SelectItem value="primer">Primer aanbrengen</SelectItem>
                    <SelectItem value="repareren">Repareren</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Opties */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isolatie_gewenst"
                checked={formData.isolatie_gewenst}
                onCheckedChange={(checked) => handleInputChange('isolatie_gewenst', checked)}
              />
              <Label htmlFor="isolatie_gewenst">Isolatie gewenst</Label>
            </div>

            {/* Bericht */}
            <div>
              <Label htmlFor="bericht">Extra opmerkingen</Label>
              <Textarea
                id="bericht"
                value={formData.bericht}
                onChange={(e) => handleInputChange('bericht', e.target.value)}
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Bezig met verzenden...' : 'Aanvraag Versturen'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StukadoorConfigurator;
