
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

    console.log('=== STARTING DAKKAPEL FORM SUBMISSION ===');

    // Validate required fields
    const requiredFields = ['voornaam', 'achternaam', 'straatnaam', 'huisnummer', 'postcode', 'plaats', 'telefoon', 'emailadres'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      toast.error("Vul alle verplichte velden in (gemarkeerd met *)");
      setIsSubmitting(false);
      return;
    }

    try {
      const totalPrice = calculateTotalPrice(configuration);
      
      console.log('Form data:', formData);
      console.log('Total price:', totalPrice);
      console.log('Configuration:', configuration);
      
      // Step 1: Save to database first
      console.log('📝 Step 1: Saving to database...');
      const { data: savedData, error: dbError } = await supabase
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
          aantalramen: configuration.aantalRamen,
          kozijnhoogte: configuration.kozijnHoogte,
          dakhelling: configuration.dakHelling,
          dakhellingtype: configuration.dakHellingType,
          kleurkozijnen: configuration.kleurKozijnen,
          kleurzijkanten: configuration.kleurZijkanten,
          kleurdraaikiepramen: configuration.kleurDraaikiepramen,
          rcwaarde: configuration.rcWaarde,
          woningzijde: configuration.woningZijde,
          opties: configuration.opties,
          totaal_prijs: totalPrice,
          status: 'nieuw'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database save error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }
      
      console.log('✅ Successfully saved to database with ID:', savedData.id);

      // Step 2: Send admin notification email using EmailJS
      console.log('📧 Step 2: Sending admin notification...');
      
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
Totaalprijs: €${totalPrice.toLocaleString('nl-NL')}`;
      
      const selectedOptions = Object.entries(configuration.opties)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(', ');
      
      const contactInfo = `
Naam: ${formData.voornaam} ${formData.achternaam}
Adres: ${formData.straatnaam} ${formData.huisnummer}, ${formData.postcode} ${formData.plaats}
Telefoon: ${formData.telefoon}
Email: ${formData.emailadres}`;
      
      const adminEmailMessage = `
${contactInfo}

DAKKAPEL CONFIGURATIE:
${configDetails}

GEKOZEN OPTIES:
${selectedOptions || 'Geen extra opties geselecteerd'}

BERICHT VAN KLANT:
${formData.bericht || 'Geen aanvullend bericht'}`;
      
      const adminEmailResult = await sendEmail({
        from_name: `${formData.voornaam} ${formData.achternaam}`,
        from_email: formData.emailadres,
        to_name: "Refurbish Totaal Nederland",
        to_email: "info@refurbishtotaalnederland.nl",
        subject: `Dakkapel Calculator Aanvraag: €${totalPrice.toLocaleString('nl-NL')}`,
        message: adminEmailMessage,
        phone: formData.telefoon,
        location: `${formData.plaats}`,
        service: "Dakkapel",
        templateId: "template_ezfzaao"
      });

      console.log('Admin email result:', adminEmailResult);

      if (!adminEmailResult.success) {
        console.error('❌ Admin email failed:', adminEmailResult.error);
        // Don't throw error, continue to customer email
        console.log('⚠️ Continuing despite admin email failure...');
      } else {
        console.log('✅ Admin notification sent successfully');
      }

      // Step 3: Send automatic quote to customer using Supabase edge function
      console.log('🎯 Step 3: Sending customer quote via edge function...');
      
      try {
        console.log('Calling auto-send-quote edge function...');
        const { data: quoteResponse, error: quoteError } = await supabase.functions.invoke('auto-send-quote', {
          body: {
            requestId: savedData.id,
            type: 'dakkapel'
          }
        });

        console.log('Edge function response:', quoteResponse);
        console.log('Edge function error:', quoteError);

        if (quoteError) {
          console.error('❌ Edge function error:', quoteError);
          throw new Error(`Quote sending failed: ${quoteError.message}`);
        }

        if (quoteResponse?.success) {
          console.log('✅ Customer quote sent successfully via edge function!');
          
          // Update database status
          await supabase
            .from('dakkapel_calculator_aanvragen')
            .update({
              status: 'offerte_verzonden',
              offerte_verzonden_op: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', savedData.id);
          
          toast.success(
            "Uw aanvraag is succesvol verzonden! U ontvangt automatisch een offerte per email. We nemen zo spoedig mogelijk contact met u op."
          );
        } else {
          console.error('❌ Quote sending failed:', quoteResponse);
          toast.success("Uw aanvraag is succesvol verzonden en opgeslagen! We nemen zo spoedig mogelijk contact met u op en versturen een offerte.");
        }
      } catch (edgeFunctionError) {
        console.error('❌ Edge function call failed:', edgeFunctionError);
        toast.success("Uw aanvraag is succesvol verzonden en opgeslagen! We nemen zo spoedig mogelijk contact met u op en versturen een offerte.");
      }
      
      // Success - move to next step
      onNext();

    } catch (error) {
      console.error("=== FORM SUBMISSION ERROR ===", error);
      toast.error("Er is een probleem opgetreden bij het verzenden. Probeer het later opnieuw of neem direct contact op.");
    } finally {
      setIsSubmitting(false);
      console.log('=== DAKKAPEL FORM SUBMISSION COMPLETE ===');
    }
  };

  const inputClasses = "w-full border border-gray-300 rounded-md p-3 text-black";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact gegevens</h2>
        <p className="mb-6 text-gray-600">
          Vul uw contactgegevens in om automatisch een vrijblijvende offerte te ontvangen per email.
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
