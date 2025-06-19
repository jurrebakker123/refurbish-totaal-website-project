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
      console.log('=== DAKKAPEL FORM SUBMISSION STARTED ===');
      console.log('Form data:', data);
      console.log('Configuration:', configuration);
      
      // Prepare complete request data
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
        status: 'nieuw',
        event_type: 'ConfiguratorComplete',
        timestamp: new Date().toISOString()
      };

      // Save to database first
      console.log('💾 Saving to database...');
      const { data: savedData, error: dbError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .insert(requestData)
        .select()
        .single();

      if (dbError) {
        console.error('❌ Database error:', dbError);
        throw dbError;
      }

      console.log('✅ Saved to database with ID:', savedData.id);

      // CALL WEBHOOK VIA SUPABASE FUNCTIONS
      console.log('🚀 CALLING WEBHOOK VIA SUPABASE FUNCTIONS');
      
      try {
        const webhookPayload = {
          event: 'ConfiguratorComplete',
          requestId: savedData.id,
          customerData: {
            name: `${data.voornaam} ${data.achternaam}`,
            email: data.emailadres,
            phone: data.telefoon,
            address: `${data.straatnaam} ${data.huisnummer}, ${data.postcode} ${data.plaats}`
          },
          configurationData: configuration,
          timestamp: new Date().toISOString(),
          immediate: true
        };

        console.log('📡 Calling webhook via supabase.functions.invoke:', webhookPayload);

        const { data: webhookResult, error: webhookError } = await supabase.functions.invoke('dakkapel-webhook-handler', {
          body: webhookPayload
        });

        console.log('📡 Webhook response:', webhookResult);
        console.log('📡 Webhook error:', webhookError);

        if (webhookError) {
          console.error('⚠️ Webhook error:', webhookError);
          toast.error("Er ging iets mis bij het verzenden van de offerte email. We hebben uw aanvraag wel ontvangen.", {
            duration: 6000,
          });
        } else if (webhookResult?.success) {
          console.log('✅ WEBHOOK SUCCESS - Email sent!');
          toast.success("Aanvraag verzonden! U ontvangt direct een offerte per email.", {
            duration: 8000,
          });
        } else {
          console.log('⚠️ Webhook completed but with warnings:', webhookResult);
          toast.success("Aanvraag verzonden! We verwerken uw offerte zo snel mogelijk.", {
            duration: 5000,
          });
        }
      } catch (webhookError) {
        console.error('❌ Webhook call failed:', webhookError);
        toast.success("Aanvraag verzonden! We verwerken uw offerte zo snel mogelijk.", {
          duration: 5000,
        });
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
