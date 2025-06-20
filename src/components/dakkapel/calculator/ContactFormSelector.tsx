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

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log('🚀 === STARTING AUTOMATIC DAKKAPEL SUBMISSION ===');
      console.log('Form data:', data);
      console.log('Configuration:', configuration);
      
      // Save to database first - using correct table name
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

      console.log('💾 Saving to dakkapel_calculator_aanvragen...');
      
      // Try saving to the correct table
      const { data: savedData, error: dbError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .insert(requestData)
        .select()
        .single();

      if (dbError) {
        console.error('❌ Database save failed:', dbError);
        console.log('🔄 Trying dakkapel_configuraties table instead...');
        
        // Try alternative table name
        const altRequestData = {
          naam: `${data.voornaam} ${data.achternaam}`,
          email: data.emailadres,
          telefoon: data.telefoon,
          adres: `${data.straatnaam} ${data.huisnummer}`,
          postcode: data.postcode,
          plaats: data.plaats,
          opmerkingen: data.bericht || '',
          model: configuration.type,
          breedte: configuration.breedte,
          materiaal: configuration.materiaal,
          dakhelling: configuration.dakHelling,
          kleur_kozijn: configuration.kleurKozijnen,
          kleur_zijkanten: configuration.kleurZijkanten,
          kleur_draaikiepramen: configuration.kleurDraaikiepramen,
          ventilationgrids: configuration.opties?.ventilatie || false,
          sunshade: configuration.opties?.zonwering || false,
          insectscreens: configuration.opties?.horren || false,
          airco: configuration.opties?.airco || false,
          status: 'nieuw'
        };

        const { data: altSavedData, error: altDbError } = await supabase
          .from('dakkapel_configuraties')
          .insert(altRequestData)
          .select()
          .single();

        if (altDbError) {
          console.error('❌ Alternative database save also failed:', altDbError);
          throw new Error(`Database error: ${altDbError.message}`);
        }

        console.log('✅ Saved to dakkapel_configuraties with ID:', altSavedData.id);
        
        // Call webhook with the saved data
        await callWebhookFunction(altSavedData.id, 'dakkapel_configuraties');
      } else {
        console.log('✅ Saved to dakkapel_calculator_aanvragen with ID:', savedData.id);
        
        // Call webhook with the saved data
        await callWebhookFunction(savedData.id, 'dakkapel_calculator_aanvragen');
      }

      // Success
      console.log('🎉 ALL STEPS COMPLETED SUCCESSFULLY');
      setSubmitSuccess(true);
      onNext();
      
    } catch (error: any) {
      console.error("❌ SUBMISSION ERROR:", error);
      console.error("Error details:", error.message);
      
      toast.error("❌ Er ging iets mis bij het verzenden. Probeer het later opnieuw.", {
        description: "Neem contact op als het probleem aanhoudt.",
        duration: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const callWebhookFunction = async (requestId: string, tableName: string) => {
    try {
      console.log('📧 CALLING WEBHOOK FUNCTION FOR AUTOMATIC EMAIL...');
      
      const webhookPayload = {
        event: 'ConfiguratorComplete',
        requestId: requestId,
        tableName: tableName,
        automatic: true,
        timestamp: new Date().toISOString()
      };

      console.log('Webhook payload:', webhookPayload);

      // Use supabase.functions.invoke for proper authentication
      const { data: result, error: webhookError } = await supabase.functions.invoke('dakkapel-webhook-handler', {
        body: webhookPayload
      });

      if (webhookError) {
        console.error('⚠️ Webhook call failed:', webhookError);
        toast.success("✅ Aanvraag opgeslagen! We verwerken uw offerte.", {
          description: "U ontvangt binnenkort een email met uw offerte.",
          duration: 6000,
        });
        return;
      }

      console.log('📬 Webhook response:', result);

      if (result?.success) {
        console.log('🎉 EMAIL SENT AUTOMATICALLY!');
        toast.success("🎉 Perfect! Uw dakkapel aanvraag is verzonden en u ontvangt automatisch een offerte per email!", {
          description: `Offerte voor €${result.price?.toLocaleString('nl-NL') || 'onbekend'} is verzonden.`,
          duration: 10000,
        });
      } else {
        console.log('⚠️ Webhook had issues:', result?.error);
        toast.success("✅ Aanvraag opgeslagen! We verwerken uw offerte.", {
          description: "U ontvangt binnenkort een email met uw offerte.",
          duration: 6000,
        });
      }
    } catch (webhookError: any) {
      console.error('⚠️ Webhook call failed:', webhookError);
      toast.success("✅ Aanvraag opgeslagen! We verwerken uw offerte.", {
        description: "U ontvangt binnenkort een email met uw offerte.",
        duration: 6000,
      });
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-800">🎉 Aanvraag succesvol verzonden!</h2>
          <p className="text-lg text-green-700 mb-4">
            Bedankt voor uw aanvraag! U ontvangt automatisch een offerte per email.
          </p>
          <p className="text-green-600">
            💡 Tip: Controleer ook uw spam/junk folder voor de offerte email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">
          📝 Contactgegevens
        </h2>
        <p className="text-gray-600">
          Vul uw gegevens in om <strong>automatisch</strong> een offerte te ontvangen voor uw dakkapel.
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
            <span>
              {isSubmitting ? '🔄 Automatisch verzenden...' : '🚀 Automatisch offerte aanvragen'}
            </span>
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};
