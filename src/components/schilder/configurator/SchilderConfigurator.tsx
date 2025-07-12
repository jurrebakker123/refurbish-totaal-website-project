
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
    project_type: '',
    oppervlakte: '',
    aantal_kamers: '',
    verf_type: '',
    voorbewerking_nodig: false,
    plafond_meeverven: false,
    kozijnen_meeverven: false,
    huidige_kleur: '',
    gewenste_kleur: '',
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
        !formData.project_type || !formData.oppervlakte || !formData.verf_type) {
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
        project_type: formData.project_type,
        oppervlakte: parseInt(formData.oppervlakte) || 0,
        aantal_kamers: formData.aantal_kamers ? parseInt(formData.aantal_kamers) : null,
        verf_type: formData.verf_type,
        voorbewerking_nodig: formData.voorbewerking_nodig,
        plafond_meeverven: formData.plafond_meeverven,
        kozijnen_meeverven: formData.kozijnen_meeverven,
        huidige_kleur: formData.huidige_kleur || null,
        gewenste_kleur: formData.gewenste_kleur || null,  
        bericht: formData.bericht || null,
        status: 'nieuw'
      };

      console.log('Submitting schilder data:', submissionData);

      const { data, error } = await supabase
        .from('schilder_aanvragen')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Schilder aanvraag successfully inserted:', data);
      
      toast.success('Uw schilderwerk aanvraag is succesvol verzonden!');
      
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
        project_type: '',
        oppervlakte: '',
        aantal_kamers: '',
        verf_type: '',
        voorbewerking_nodig: false,
        plafond_meeverven: false,
        kozijnen_meeverven: false,
        huidige_kleur: '',
        gewenste_kleur: '',
        bericht: ''
      });

    } catch (error) {
      console.error('Error submitting schilder form:', error);
      toast.error('Er is een fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Schilderwerk Configurator</CardTitle>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project_type">Type Project *</Label>
                <Select value={formData.project_type} onValueChange={(value) => handleInputChange('project_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer projecttype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binnenschilderwerk">Binnenschilderwerk</SelectItem>
                    <SelectItem value="buitenschilderwerk">Buitenschilderwerk</SelectItem>
                    <SelectItem value="binnen_en_buiten">Binnen- en buitenschilderwerk</SelectItem>
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
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aantal_kamers">Aantal kamers</Label>
                <Input
                  id="aantal_kamers"
                  type="number"
                  value={formData.aantal_kamers}
                  onChange={(e) => handleInputChange('aantal_kamers', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="verf_type">Type verf *</Label>
                <Select value={formData.verf_type} onValueChange={(value) => handleInputChange('verf_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer verftype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latex">Latex</SelectItem>
                    <SelectItem value="alkyd">Alkyd</SelectItem>
                    <SelectItem value="primer">Primer</SelectItem>
                    <SelectItem value="grondverf">Grondverf</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Opties */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="voorbewerking_nodig"
                  checked={formData.voorbewerking_nodig}
                  onCheckedChange={(checked) => handleInputChange('voorbewerking_nodig', checked)}
                />
                <Label htmlFor="voorbewerking_nodig">Voorbewerking nodig</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="plafond_meeverven"
                  checked={formData.plafond_meeverven}
                  onCheckedChange={(checked) => handleInputChange('plafond_meeverven', checked)}
                />
                <Label htmlFor="plafond_meeverven">Plafond meeverven</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kozijnen_meeverven"
                  checked={formData.kozijnen_meeverven}
                  onCheckedChange={(checked) => handleInputChange('kozijnen_meeverven', checked)}
                />
                <Label htmlFor="kozijnen_meeverven">Kozijnen meeverven</Label>
              </div>
            </div>

            {/* Kleuren */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="huidige_kleur">Huidige kleur</Label>
                <Input
                  id="huidige_kleur"
                  value={formData.huidige_kleur}
                  onChange={(e) => handleInputChange('huidige_kleur', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gewenste_kleur">Gewenste kleur</Label>
                <Input
                  id="gewenste_kleur"
                  value={formData.gewenste_kleur}
                  onChange={(e) => handleInputChange('gewenste_kleur', e.target.value)}
                />
              </div>
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

export default SchilderConfigurator;
