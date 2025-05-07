
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MoveLeft, MoveRight } from 'lucide-react';
import { DakkapelConfiguration } from './DakkapelCalculator';
import { toast } from 'sonner';
import { sendEmail } from '@/config/email';

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
      // Alle dakkapel configuratie gegevens toevoegen aan de e-mail
      const dakkapelDetails = {
        dakkapel_type: configuration.type || "Standaard",
        breedte: configuration.breedte ? `${configuration.breedte} meter` : "Niet opgegeven",
        hoogte: configuration.hoogte ? `${configuration.hoogte} meter` : "Niet opgegeven",
        kozijnen: configuration.aantalRamen ? configuration.aantalRamen.toString() : "0",
        materiaal: configuration.materiaal || "Standaard",
        boeideel: "Standaard", // Default value since it's not in the configuration
        overstek: configuration.opties.gootafwerking ? "Ja" : "Nee",
        afvoer: false, // Default value since it's not in the configuration
        dakbedekking: "EPDM", // Default value since it's not in the configuration
        zonwering: configuration.opties.zonwering ? "Ja" : "Nee",
        rolluik: configuration.opties.elektrisch_rolluik ? "Ja" : "Nee",
        minidak: configuration.opties.minirooftop ? "Ja" : "Nee",
        kaderDakkapel: configuration.opties.kader_dakkapel ? "Ja" : "Nee",
        extraIsolatie: configuration.opties.extra_isolatie ? "Ja" : "Nee",
        achterzijde: configuration.woningZijde === 'achter' ? "Ja" : "Nee",
        totaalprijs: typeof configuration.calculatedPrice === 'number' ? `€${configuration.calculatedPrice.toFixed(2)}` : "Niet berekend",
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
        subject: `Nieuwe dakkapel offerte aanvraag - € ${typeof configuration.calculatedPrice === 'number' ? configuration.calculatedPrice.toFixed(2) : "0,00"}`,
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
