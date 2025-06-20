
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
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      console.log('🚀 === STARTING AUTOMATIC DAKKAPEL SUBMISSION ===');
      console.log('Form data:', data);
      console.log('Configuration:', configuration);
      
      // Validation - only send if email is filled and has valid configuration
      if (!data.emailadres || !configuration.type || !configuration.breedte) {
        toast.error('Incomplete data - cannot send automatic quote');
        return;
      }
      
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
      
      // Save to database first
      const { data: savedData, error: dbError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .insert(requestData)
        .select()
        .single();

      if (dbError) {
        console.error('❌ Database save failed:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('✅ Saved to database with ID:', savedData.id);

      // Now trigger automatic quote sending using the existing auto-send-quote function
      console.log('📧 TRIGGERING AUTOMATIC QUOTE SENDING...');
      
      const { data: quoteResult, error: quoteError } = await supabase.functions.invoke('auto-send-quote', {
        body: {
          requestId: savedData.id,
          type: 'dakkapel'
        }
      });

      if (quoteError) {
        console.error('❌ Auto quote error:', quoteError);
        // Still show success for database save, but mention email issue
        toast.success("✅ Aanvraag opgeslagen! We verwerken uw offerte handmatig.", {
          description: "U ontvangt binnenkort een email met uw offerte.",
          duration: 6000,
        });
      } else if (quoteResult?.success) {
        console.log('🎉 AUTOMATIC QUOTE SENT SUCCESSFULLY!');
        
        // Update database to mark as sent
        await supabase
          .from('dakkapel_calculator_aanvragen')
          .update({
            status: 'offerte_verzonden',
            offerte_verzonden_op: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', savedData.id);

        toast.success("🎉 Perfect! Uw dakkapel offerte is automatisch verzonden!", {
          description: `Offerte voor €${quoteResult.price?.toLocaleString('nl-NL') || 'onbekend'} is naar uw email verzonden.`,
          duration: 10000,
        });
      } else {
        console.log('⚠️ Quote sending had issues:', quoteResult?.error);
        toast.success("✅ Aanvraag opgeslagen! We verwerken uw offerte.", {
          description: "U ontvangt binnenkort een email met uw offerte.",
          duration: 6000,
        });
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
