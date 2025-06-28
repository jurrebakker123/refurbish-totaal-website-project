
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import WhatsAppOptInCheckbox from '@/components/common/WhatsAppOptInCheckbox';

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
    oppervlakte: [40],
    verf_type: '',
    aantal_kamers: 1,
    huidige_kleur: '',
    gewenste_kleur: '',
    voorbewerking_nodig: false,
    plafond_meeverven: false,
    kozijnen_meeverven: false,
    bericht: '',
    whatsapp_optin: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    'Binnenschilderwerk',
    'Buitenschilderwerk',
    'Binnen + buiten',
    'Alleen kozijnen',
    'Complete renovatie'
  ];

  const verfTypes = [
    'Latex muurverf',
    'Alkydverf',
    'Krijtverf',  
    'Primer + 2 deklagen',
    'Overschilderbaar behang'
  ];

  const calculatePrice = () => {
    const basePrice = formData.oppervlakte[0] * (formData.project_type === 'Buitenschilderwerk' ? 35 : 25);
    const voorbewerking = formData.voorbewerking_nodig ? formData.oppervlakte[0] * 8 : 0;
    const plafond = formData.plafond_meeverven ? formData.oppervlakte[0] * 12 : 0;
    const kozijnen = formData.kozijnen_meeverven ? 250 * formData.aantal_kamers : 0;
    
    return Math.round(basePrice + voorbewerking + plafond + kozijnen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.whatsapp_optin) {
      toast.error('WhatsApp toestemming is verplicht voor deze service');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const totalPrice = calculatePrice();
      
      // Save to database
      const { data: savedData, error } = await supabase
        .from('schilder_aanvragen')
        .insert({
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          emailadres: formData.emailadres,
          telefoon: formData.telefoon,
          straatnaam: formData.straatnaam,
          huisnummer: formData.huisnummer,
          postcode: formData.postcode,
          plaats: formData.plaats,
          project_type: formData.project_type,
          oppervlakte: formData.oppervlakte[0],
          verf_type: formData.verf_type,
          aantal_kamers: formData.aantal_kamers,
          huidige_kleur: formData.huidige_kleur,
          gewenste_kleur: formData.gewenste_kleur,
          voorbewerking_nodig: formData.voorbewerking_nodig,
          plafond_meeverven: formData.plafond_meeverven,
          kozijnen_meeverven: formData.kozijnen_meeverven,
          bericht: formData.bericht,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger WhatsApp lead nurturing
      if (formData.whatsapp_optin && savedData) {
        const phoneNumber = formData.telefoon.replace(/[\s\-\+\(\)]/g, '');
        const formattedPhone = phoneNumber.startsWith('06') ? '31' + phoneNumber.substring(1) : 
                              phoneNumber.startsWith('6') ? '31' + phoneNumber : phoneNumber;

        await supabase.functions.invoke('whatsapp-lead-nurturing', {
          body: {
            leadId: savedData.id,
            phoneNumber: formattedPhone,
            customerName: `${formData.voornaam} ${formData.achternaam}`,
            step: 'initial'
          }
        });
      }

      toast.success('Aanvraag succesvol verzonden! Je ontvangt binnen 1 minuut een WhatsApp bericht.');
      
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
        oppervlakte: [40],
        verf_type: '',
        aantal_kamers: 1,
        huidige_kleur: '',
        gewenste_kleur: '',
        voorbewerking_nodig: false,
        plafond_meeverven: false,
        kozijnen_meeverven: false,
        bericht: '',
        whatsapp_optin: false
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Er ging iets mis bij het verzenden van je aanvraag');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Label htmlFor="voornaam">Voornaam</Label>
                <Input
                  id="voornaam"
                  value={formData.voornaam}
                  onChange={(e) => setFormData({...formData, voornaam: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="achternaam">Achternaam</Label>
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
                <Label htmlFor="emailadres">E-mailadres</Label>
                <Input
                  id="emailadres"
                  type="email"
                  value={formData.emailadres}
                  onChange={(e) => setFormData({...formData, emailadres: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefoon">Telefoonnummer</Label>
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
                <Label htmlFor="straatnaam">Straatnaam</Label>
                <Input
                  id="straatnaam"
                  value={formData.straatnaam}
                  onChange={(e) => setFormData({...formData, straatnaam: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="huisnummer">Huisnummer</Label>
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
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="plaats">Plaats</Label>
                <Input
                  id="plaats"
                  value={formData.plaats}
                  onChange={(e) => setFormData({...formData, plaats: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Type schilderwerk</Label>
                <Select onValueChange={(value) => setFormData({...formData, project_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer type schilderwerk" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Type verf</Label>
                <Select onValueChange={(value) => setFormData({...formData, verf_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer verf type" />
                  </SelectTrigger>
                  <SelectContent>
                    {verfTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Surface Area */}
            <div>
              <Label>Oppervlakte: {formData.oppervlakte[0]} m²</Label>
              <Slider
                value={formData.oppervlakte}
                onValueChange={(value) => setFormData({...formData, oppervlakte: value})}
                min={10}
                max={300}
                step={5}
                className="mt-2"
              />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="huidige_kleur">Huidige kleur</Label>
                <Input
                  id="huidige_kleur"
                  value={formData.huidige_kleur}
                  onChange={(e) => setFormData({...formData, huidige_kleur: e.target.value})}
                  placeholder="bijv. wit, crème, geel"
                />
              </div>
              <div>
                <Label htmlFor="gewenste_kleur">Gewenste kleur</Label>
                <Input
                  id="gewenste_kleur"
                  value={formData.gewenste_kleur}
                  onChange={(e) => setFormData({...formData, gewenste_kleur: e.target.value})}
                  placeholder="bijv. wit, grijs, blauw"
                />
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="voorbewerking"
                  checked={formData.voorbewerking_nodig}
                  onCheckedChange={(checked) => setFormData({...formData, voorbewerking_nodig: checked as boolean})}
                />
                <Label htmlFor="voorbewerking">Voorbewerking nodig (schuren, plamuren) (+€8/m²)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="plafond"
                  checked={formData.plafond_meeverven}
                  onCheckedChange={(checked) => setFormData({...formData, plafond_meeverven: checked as boolean})}
                />
                <Label htmlFor="plafond">Plafond meeverven (+€12/m²)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kozijnen"
                  checked={formData.kozijnen_meeverven}
                  onCheckedChange={(checked) => setFormData({...formData, kozijnen_meeverven: checked as boolean})}
                />
                <Label htmlFor="kozijnen">Kozijnen meeverven (+€250/kamer)</Label>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="bericht">Aanvullende opmerkingen</Label>
              <Textarea
                id="bericht"
                value={formData.bericht}
                onChange={(e) => setFormData({...formData, bericht: e.target.value})}
                placeholder="Beschrijf je schilderproject..."
              />
            </div>

            {/* WhatsApp Opt-in */}
            <WhatsAppOptInCheckbox
              checked={formData.whatsapp_optin}
              onCheckedChange={(checked) => setFormData({...formData, whatsapp_optin: checked})}
            />

            {/* Price Display */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-blue-800">Geschatte Prijs</h3>
                  <p className="text-3xl font-bold text-blue-600">€{calculatePrice().toLocaleString()}</p>
                  <p className="text-sm text-blue-700">Inclusief materiaal en arbeid</p>
                </div>
              </CardContent>
            </Card>

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
