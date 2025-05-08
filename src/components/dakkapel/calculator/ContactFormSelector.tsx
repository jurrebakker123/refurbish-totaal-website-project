
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MoveLeft, MoveRight } from 'lucide-react';
import { DakkapelConfiguration } from './DakkapelCalculator';
import { toast } from 'sonner';
import { sendEmail } from '@/config/email';
import { calculateTotalPrice } from '@/utils/calculatorUtils';

interface ContactFormSelectorProps {
  configuration: DakkapelConfiguration;
  onPrevious: () => void;
  onNext: () => void;
}

export function ContactFormSelector({ configuration, onPrevious, onNext }: ContactFormSelectorProps) {
  const [formData, setFormData] = React.useState({
    voornaam: '',
    achternaam: '',
    straatnaam: '',
    huisnummer: '',
    postcode: '',
    plaats: '',
    telefoon: '',
    emailadres: '',
    bericht: ''
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields (all fields except bericht)
    const requiredFields = ['voornaam', 'achternaam', 'straatnaam', 'huisnummer', 'postcode', 'plaats', 'telefoon', 'emailadres'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast.error("Vul alle verplichte velden in (gemarkeerd met *)");
      setIsSubmitting(false);
      return;
    }

    try {
      // Calculate total price
      const totalPrice = calculateTotalPrice(configuration);
      
      // Alle dakkapel configuratie gegevens toevoegen aan de e-mail
      const dakkapelDetails = {
        dakkapel_type: configuration.type || "Standaard",
        breedte: configuration.breedte ? `${configuration.breedte} cm` : "Niet opgegeven",
        hoogte: configuration.hoogte ? `${configuration.hoogte} cm` : "Niet opgegeven",
        aantal_ramen: configuration.aantalRamen.toString(),
        materiaal: configuration.materiaal || "Standaard",
        kleur_kozijnen: configuration.kleurKozijnen || "Wit",
        kleur_zijkanten: configuration.kleurZijkanten || "Wit", 
        kleur_draaikiepramen: configuration.kleurDraaikiepramen || "Wit",
        kozijn_hoogte: configuration.kozijnHoogte || "Standaard",
        woning_zijde: configuration.woningZijde || "Achter", 
        rc_waarde: configuration.rcWaarde || "Standaard",
        dak_helling: `${configuration.dakHelling}° (${configuration.dakHellingType})`,
        
        // Opties
        ventilatie: configuration.opties.ventilatie ? "Ja" : "Nee",
        zonwering: configuration.opties.zonwering ? "Ja" : "Nee",
        gootafwerking: configuration.opties.gootafwerking ? "Ja" : "Nee",
        extra_isolatie: configuration.opties.extra_isolatie ? "Ja" : "Nee",
        extra_draaikiepraam: configuration.opties.extra_draaikiepraam ? "Ja" : "Nee",
        horren: configuration.opties.horren ? "Ja" : "Nee",
        elektrisch_rolluik: configuration.opties.elektrisch_rolluik ? "Ja" : "Nee",
        verwijderen_bestaande: configuration.opties.verwijderen_bestaande ? "Ja" : "Nee",
        afvoeren_bouwafval: configuration.opties.afvoeren_bouwafval ? "Ja" : "Nee",
        kader_dakkapel: configuration.opties.kader_dakkapel ? "Ja" : "Nee",
        voorbereiden_rolluiken: configuration.opties.voorbereiden_rolluiken ? "Ja" : "Nee",
        minirooftop: configuration.opties.minirooftop ? "Ja" : "Nee",
        dak_versteviging: configuration.opties.dak_versteviging ? "Ja" : "Nee",
        ventilatieroosters: configuration.opties.ventilatieroosters ? "Ja" : "Nee",
        sporenkap: configuration.opties.sporenkap ? "Ja" : "Nee",
        
        totaalprijs: `€${totalPrice.toFixed(2)}`
      };

      // Klantgegevens voorbereiden
      const klantgegevens = {
        naam: `${formData.voornaam} ${formData.achternaam}`,
        email: formData.emailadres,
        telefoon: formData.telefoon,
        adres: `${formData.straatnaam} ${formData.huisnummer}`,
        postcode: formData.postcode,
        plaats: formData.plaats,
        bericht: formData.bericht || "Geen bericht toegevoegd",
      };

      // Combineer alle gegevens voor de e-mail
      const emailParams = {
        ...klantgegevens,
        ...dakkapelDetails,
        
        // Standaard parameters
        from_name: klantgegevens.naam,
        from_email: klantgegevens.email,
        to_name: "Refurbish Totaal Nederland",
        subject: `Nieuwe dakkapel offerte aanvraag - € ${totalPrice.toFixed(2)}`,
        service: "Dakkapel",
        
        // Toon alle veldwaarden in e-mail
        voornaam: formData.voornaam,
        achternaam: formData.achternaam,
        straatnaam: formData.straatnaam,
        huisnummer: formData.huisnummer,
        postcode: formData.postcode,
        plaats: formData.plaats,
        
        // Template ID voor dakkapel offerte
        templateId: "template_ezfzaao"
      };

      const result = await sendEmail(emailParams);

      if (result.success) {
        toast.success("Uw aanvraag is succesvol verzonden! We nemen zo spoedig mogelijk contact met u op.");
        onNext();
      } else {
        throw new Error("Er ging iets mis bij het versturen van de aanvraag");
      }
    } catch (error) {
      console.error("Fout bij verzenden offerte:", error);
      toast.error("Er is iets misgegaan. Probeer het later opnieuw of neem direct contact met ons op.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full border border-gray-300 rounded-md p-3 text-black";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact gegevens</h2>
        <p className="mb-6 text-gray-600">
          Vul uw contactgegevens in om een vrijblijvende offerte te ontvangen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="voornaam" className="block font-medium text-gray-800">
              Voornaam <span className="text-red-500">*</span>
            </label>
            <Input
              id="voornaam"
              name="voornaam"
              value={formData.voornaam}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="achternaam" className="block font-medium text-gray-800">
              Achternaam <span className="text-red-500">*</span>
            </label>
            <Input
              id="achternaam"
              name="achternaam"
              value={formData.achternaam}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="straatnaam" className="block font-medium text-gray-800">
            Straatnaam <span className="text-red-500">*</span>
          </label>
          <Input
            id="straatnaam"
            name="straatnaam"
            value={formData.straatnaam}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="huisnummer" className="block font-medium text-gray-800">
              Huisnummer <span className="text-red-500">*</span>
            </label>
            <Input
              id="huisnummer"
              name="huisnummer"
              value={formData.huisnummer}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="postcode" className="block font-medium text-gray-800">
              Postcode <span className="text-red-500">*</span>
            </label>
            <Input
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="plaats" className="block font-medium text-gray-800">
            Plaats <span className="text-red-500">*</span>
          </label>
          <Input
            id="plaats"
            name="plaats"
            value={formData.plaats}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="telefoon" className="block font-medium text-gray-800">
            Telefoon <span className="text-red-500">*</span>
          </label>
          <Input
            id="telefoon"
            name="telefoon"
            value={formData.telefoon}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="emailadres" className="block font-medium text-gray-800">
            E-mailadres <span className="text-red-500">*</span>
          </label>
          <Input
            id="emailadres"
            name="emailadres"
            type="email"
            value={formData.emailadres}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bericht" className="block font-medium text-gray-800">
            Bericht
          </label>
          <Textarea
            id="bericht"
            name="bericht"
            value={formData.bericht}
            onChange={handleChange}
            className={inputClasses}
            rows={4}
          />
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrevious}
          >
            <MoveLeft className="mr-2 h-4 w-4" /> Vorige
          </Button>
          
          <Button 
            type="submit" 
            className="bg-brand-lightGreen hover:bg-opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verzenden...' : 'Offerte Aanvragen'} <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
