import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { DakkapelConfiguration } from './DakkapelCalculator';

const contactFormSchema = z.object({
  voornaam: z.string().min(2, "Voornaam is verplicht"),
  achternaam: z.string().min(2, "Achternaam is verplicht"),
  emailadres: z.string().email("Voer een geldig e-mailadres in"),
  telefoon: z.string().min(10, "Voer een geldig telefoonnummer in"),
  straatnaam: z.string().min(2, "Straatnaam is verplicht"),
  huisnummer: z.string().min(1, "Huisnummer is verplicht"),
  postcode: z.string().min(6, "Postcode is verplicht"),
  plaats: z.string().min(2, "Plaats is verplicht"),
  bericht: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormSelectorProps {
  configuration: DakkapelConfiguration;
  onPrevious: () => void;
  onNext: () => void;
}

export const ContactFormSelector: React.FC<ContactFormSelectorProps> = ({
  configuration,
  onPrevious,
  onNext,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const sendEmailDirectly = async (requestData: any) => {
    console.log('=== SENDING EMAIL DIRECTLY ===');
    
    try {
      // Calculate total price
      let totalPrice = 15000; // Base price
      
      if (requestData.breedte > 300) totalPrice += 2000;
      if (requestData.hoogte > 175) totalPrice += 1500;
      if (requestData.materiaal === 'hout') totalPrice += 3000;
      if (requestData.materiaal === 'aluminium') totalPrice += 4000;
      if (requestData.aantalramen > 2) totalPrice += (requestData.aantalramen - 2) * 800;
      
      if (requestData.opties) {
        if (requestData.opties.ventilatie) totalPrice += 500;
        if (requestData.opties.zonwering) totalPrice += 1200;
        if (requestData.opties.extra_isolatie) totalPrice += 800;
        if (requestData.opties.horren) totalPrice += 400;
      }

      console.log('Calculated price:', totalPrice);
      
      const customerName = `${requestData.voornaam} ${requestData.achternaam}`;
      const customerAddress = `${requestData.straatnaam} ${requestData.huisnummer}, ${requestData.postcode} ${requestData.plaats}`;

      // Use the emailjs configuration to send email directly
      const emailParams = {
        from_name: customerName,
        from_email: requestData.emailadres,
        to_name: "Refurbish Totaal Nederland",
        to_email: "info@refurbishtotaalnederland.nl",
        subject: `Dakkapel Offerte - €${totalPrice.toLocaleString('nl-NL')} - ${customerName}`,
        message: `
NIEUWE DAKKAPEL AANVRAAG

Klantgegevens:
- Naam: ${customerName}
- Email: ${requestData.emailadres}
- Telefoon: ${requestData.telefoon}
- Adres: ${customerAddress}

Dakkapel Configuratie:
- Type: ${requestData.type}
- Afmetingen: ${requestData.breedte}cm x ${requestData.hoogte}cm
- Materiaal: ${requestData.materiaal}
- Aantal ramen: ${requestData.aantalramen}
- Kozijn hoogte: ${requestData.kozijnhoogte}
- Dakhelling: ${requestData.dakhelling}°
- Kleur kozijnen: ${requestData.kleurkozijnen}
- Kleur zijkanten: ${requestData.kleurzijkanten}
- RC-waarde: ${requestData.rcwaarde}
- Woning zijde: ${requestData.woningzijde}

BEREKENDE PRIJS: €${totalPrice.toLocaleString('nl-NL')}

${requestData.bericht ? `Bericht: ${requestData.bericht}` : ''}
        `,
        phone: requestData.telefoon,
        dakkapel_type: requestData.type,
        dakkapel_breedte: requestData.breedte,
        dakkapel_hoogte: requestData.hoogte,
        dakkapel_materiaal: requestData.materiaal,
        dakkapel_prijs: totalPrice,
        customer_address: customerAddress
      };

      console.log('Sending email with params:', emailParams);

      // Import and use emailjs directly
      const { sendEmail } = await import('@/config/email');
      const emailResult = await sendEmail(emailParams);
      
      console.log('Email sending result:', emailResult);
      
      if (emailResult.success) {
        console.log('✅ EMAIL SENT SUCCESSFULLY!');
        return true;
      } else {
        console.error('❌ EMAIL FAILED:', emailResult.error);
        return false;
      }
      
    } catch (error) {
      console.error('❌ EMAIL ERROR:', error);
      return false;
    }
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log('=== DAKKAPEL SUBMISSION START ===');
      console.log('Form data:', data);
      console.log('Configuration:', configuration);
      
      // Prepare request data
      const requestData = {
        voornaam: data.voornaam,
        achternaam: data.achternaam,
        emailadres: data.emailadres,
        telefoon: data.telefoon,
        straatnaam: data.straatnaam,
        huisnummer: data.huisnummer,
        postcode: data.postcode,
        plaats: data.plaats,
        bericht: data.bericht || '',
        type: configuration.type,
        breedte: configuration.breedte,
        hoogte: configuration.hoogte,
        materiaal: configuration.materiaal,
        aantalramen: configuration.aantalRamen,
        dakhelling: configuration.dakHelling,
        dakhellingtype: configuration.dakHellingType,
        kleurkozijnen: configuration.kleurKozijnen,
        kleurzijkanten: configuration.kleurZijkanten,
        kleurdraaikiepramen: configuration.kleurDraaikiepramen,
        kozijnhoogte: configuration.kozijnHoogte,
        woningzijde: configuration.woningZijde,
        rcwaarde: configuration.rcWaarde,
        opties: configuration.opties,
        status: 'nieuw'
      };

      // Save to database
      console.log('Saving to database...');
      const { data: savedData, error: dbError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .insert(requestData)
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      console.log('✅ Saved to database:', savedData);

      // Send email immediately using emailjs
      console.log('Sending email immediately...');
      const emailSent = await sendEmailDirectly(requestData);
      
      if (emailSent) {
        toast.success("Aanvraag verzonden! U ontvangt direct een offerte per email.", {
          duration: 8000,
        });
        console.log('✅ EMAIL SENT TO CUSTOMER!');
      } else {
        toast.success("Aanvraag verzonden! We nemen zo spoedig mogelijk contact met u op.", {
          duration: 5000,
        });
        console.log('⚠️ Email failed but request saved');
      }

      setSubmitSuccess(true);
      onNext();
      
    } catch (error) {
      console.error("❌ SUBMISSION ERROR:", error);
      toast.error("Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het later nog eens.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Aanvraag succesvol verzonden!</h2>
          <p className="text-lg text-green-700 mb-4">
            Bedankt voor uw aanvraag. U ontvangt direct een offerte per email.
          </p>
          <p className="text-green-600">
            Controleer ook uw spam/junk folder voor de offerte email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">
          Contactgegevens
        </h2>
        <p className="text-gray-600">
          Vul uw gegevens in om een offerte te ontvangen voor uw dakkapel.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="voornaam" className="block text-sm font-medium text-gray-700 mb-1">
              Voornaam *
            </label>
            <input
              type="text"
              id="voornaam"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen ${
                errors.voornaam ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('voornaam')}
            />
            {errors.voornaam && (
              <p className="mt-1 text-sm text-red-500">{errors.voornaam.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="achternaam" className="block text-sm font-medium text-gray-700 mb-1">
              Achternaam *
            </label>
            <input
              type="text"
              id="achternaam"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen ${
                errors.achternaam ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('achternaam')}
            />
            {errors.achternaam && (
              <p className="mt-1 text-sm text-red-500">{errors.achternaam.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="emailadres" className="block text-sm font-medium text-gray-700 mb-1">
            E-mailadres *
          </label>
          <input
            type="email"
            id="emailadres"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen ${
              errors.emailadres ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('emailadres')}
          />
          {errors.emailadres && (
            <p className="mt-1 text-sm text-red-500">{errors.emailadres.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefoon" className="block text-sm font-medium text-gray-700 mb-1">
            Telefoonnummer *
          </label>
          <input
            type="tel"
            id="telefoon"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen ${
              errors.telefoon ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('telefoon')}
          />
          {errors.telefoon && (
            <p className="mt-1 text-sm text-red-500">{errors.telefoon.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="straatnaam" className="block text-sm font-medium text-gray-700 mb-1">
              Straatnaam *
            </label>
            <input
              type="text"
              id="straatnaam"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen ${
                errors.straatnaam ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('straatnaam')}
            />
            {errors.straatnaam && (
              <p className="mt-1 text-sm text-red-500">{errors.straatnaam.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="huisnummer" className="block text-sm font-medium text-gray-700 mb-1">
              Huisnummer *
            </label>
            <input
              type="text"
              id="huisnummer"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen ${
                errors.huisnummer ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('huisnummer')}
            />
            {errors.huisnummer && (
              <p className="mt-1 text-sm text-red-500">{errors.huisnummer.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
              Postcode *
            </label>
            <input
              type="text"
              id="postcode"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen ${
                errors.postcode ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('postcode')}
            />
            {errors.postcode && (
              <p className="mt-1 text-sm text-red-500">{errors.postcode.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="plaats" className="block text-sm font-medium text-gray-700 mb-1">
            Plaats *
          </label>
          <input
            type="text"
            id="plaats"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen ${
              errors.plaats ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('plaats')}
          />
          {errors.plaats && (
            <p className="mt-1 text-sm text-red-500">{errors.plaats.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bericht" className="block text-sm font-medium text-gray-700 mb-1">
            Bericht (optioneel)
          </label>
          <textarea
            id="bericht"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-lightGreen"
            placeholder="Heeft u nog specifieke wensen of vragen?"
            {...register('bericht')}
          />
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300"
          >
            <ArrowLeft size={18} />
            <span>Vorige</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Bezig...' : 'Offerte aanvragen'}</span>
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};
