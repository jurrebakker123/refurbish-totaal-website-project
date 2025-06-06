
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MoveLeft, MoveRight } from 'lucide-react';
import { DakkapelConfiguration } from './DakkapelCalculator';
import { toast } from 'sonner';
import { sendEmail } from '@/config/email';
import { calculateTotalPrice } from '@/utils/calculatorUtils';
import { supabase } from '@/integrations/supabase/client';

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
      
      // Save to Supabase database first - fix column names to match schema
      const { error: dbError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .insert({
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          straatnaam: formData.straatnaam,
          huisnummer: formData.huisnummer,
          postcode: formData.postcode,
          plaats: formData.plaats,
          telefoon: formData.telefoon,
          emailadres: formData.emailadres,
          bericht: formData.bericht,
          type: configuration.type,
          breedte: configuration.breedte,
          hoogte: configuration.hoogte,
          materiaal: configuration.materiaal,
          aantalramen: configuration.aantalRamen, // Fixed: use lowercase column name
          kozijnhoogte: configuration.kozijnHoogte, // Fixed: use lowercase column name
          dakhelling: configuration.dakHelling, // Fixed: use lowercase column name
          dakhellingtype: configuration.dakHellingType, // Fixed: use lowercase column name
          kleurkozijnen: configuration.kleurKozijnen, // Fixed: use lowercase column name
          kleurzijkanten: configuration.kleurZijkanten, // Fixed: use lowercase column name
          kleurdraaikiepramen: configuration.kleurDraaikiepramen, // Fixed: use lowercase column name
          rcwaarde: configuration.rcWaarde, // Fixed: use lowercase column name
          woningzijde: configuration.woningZijde, // Fixed: use lowercase column name
          opties: configuration.opties,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      // Format configuration details for email
      const configDetails = `
        Type: ${configuration.type}
        Breedte: ${configuration.breedte} cm
        Hoogte: ${configuration.hoogte} cm
        Materiaal: ${configuration.materiaal}
        Aantal ramen: ${configuration.aantalRamen}
        Kozijn hoogte: ${configuration.kozijnHoogte}
        Dakhelling: ${configuration.dakHelling}° (${configuration.dakHellingType})
        Kozijnkleur: ${configuration.kleurKozijnen}
        Zijkanten kleur: ${configuration.kleurZijkanten}
        Draaikiepramen kleur: ${configuration.kleurDraaikiepramen}
        RC-waarde: ${configuration.rcWaarde}
        Woning zijde: ${configuration.woningZijde}
        Totaalprijs: €${totalPrice.toLocaleString('nl-NL')}
      `;
      
      // Format options for email
      const selectedOptions = Object.entries(configuration.opties)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(', ');
      
      // Format contact info for the message
      const contactInfo = `
        Naam: ${formData.voornaam} ${formData.achternaam}
        Adres: ${formData.straatnaam} ${formData.huisnummer}, ${formData.postcode} ${formData.plaats}
        Telefoon: ${formData.telefoon}
        Email: ${formData.emailadres}
      `;
      
      const emailMessage = `
${contactInfo}

DAKKAPEL CONFIGURATIE:
${configDetails}

GEKOZEN OPTIES:
${selectedOptions || 'Geen extra opties geselecteerd'}

BERICHT VAN KLANT:
${formData.bericht || 'Geen aanvullend bericht'}
      `;
      
      // Send email
      const result = await sendEmail({
        from_name: `${formData.voornaam} ${formData.achternaam}`,
        from_email: formData.emailadres,
        to_name: "Refurbish Totaal Nederland",
        to_email: "info@refurbishtotaalnederland.nl",
        subject: `Dakkapel Calculator Aanvraag: €${totalPrice.toLocaleString('nl-NL')}`,
        message: emailMessage,
        phone: formData.telefoon,
        location: `${formData.plaats}`,
        service: "Dakkapel",
        templateId: "template_ezfzaao"
      });

      if (result.success) {
        toast.success("Uw aanvraag is succesvol verzonden en opgeslagen! We nemen zo spoedig mogelijk contact met u op.");
        onNext();
      } else {
        throw new Error("Er ging iets mis bij het verzenden van de email");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Er is een probleem opgetreden bij het verzenden. De gegevens zijn wel opgeslagen. Probeer het later opnieuw of neem direct contact op.");
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
