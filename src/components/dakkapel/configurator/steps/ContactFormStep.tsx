
import React, { useState } from 'react';
import { StepProps } from '../DakkapelConfigurator';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const contactFormSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  phone: z.string().min(10, "Voer een geldig telefoonnummer in"),
  address: z.string().min(5, "Adres is verplicht"),
  postalCode: z.string().min(6, "Postcode is verplicht"),
  city: z.string().min(2, "Plaats is verplicht"),
  comments: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactFormStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  submitConfigurator, 
  currentPrice 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: configuration.contact?.name || '',
      email: configuration.contact?.email || '',
      phone: configuration.contact?.phone || '',
      address: configuration.contact?.address || '',
      postalCode: configuration.contact?.postalCode || '',
      city: configuration.contact?.city || '',
      comments: configuration.contact?.comments || '',
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Update the configuration with the contact details
    updateConfiguration({ 
      contact: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        postalCode: data.postalCode,
        city: data.city,
        comments: data.comments || '',
      } 
    });
    
    try {
      console.log('🚀 === STARTING DAKKAPEL CONFIGURATOR SUBMISSION ===');
      console.log('Contact data:', data);
      console.log('Configuration:', configuration);
      console.log('Current price:', currentPrice);
      
      // Save to the correct dakkapel_calculator_aanvragen table (not dakkapel_configuraties)
      const requestData = {
        voornaam: data.name.split(' ')[0] || data.name,
        achternaam: data.name.split(' ').slice(1).join(' ') || '',
        emailadres: data.email,
        telefoon: data.phone,
        straatnaam: data.address,
        huisnummer: '1', // Default since we don't collect separately
        postcode: data.postalCode,
        plaats: data.city,
        bericht: data.comments || '',
        type: configuration.model || 'Dakkapel plat dak',
        breedte: parseInt(configuration.width?.split('-')[0]) || 240,
        hoogte: 200, // Default height
        materiaal: configuration.material || 'Keralit',
        aantalramen: 2, // Default
        dakhelling: parseInt(configuration.roofAngle?.split('-')[0]) || 45,
        dakhellingtype: `${configuration.roofAngle || '45-60'}°`,
        kleurkozijnen: configuration.colors?.frames || 'wit',
        kleurzijkanten: configuration.colors?.sides || 'wit',
        kleurdraaikiepramen: configuration.colors?.movingParts || 'wit',
        kozijnhoogte: 'Standaard',
        woningzijde: 'Voor',
        rcwaarde: 'Standaard',
        opties: configuration.extras ? Object.keys(configuration.extras).filter(key => configuration.extras?.[key]).join(', ') : 'Geen extra opties',
        status: 'nieuw'
      };

      console.log('💾 Saving to dakkapel_calculator_aanvragen...');
      console.log('Request data:', requestData);
      
      const { data: savedData, error: dbError } = await supabase
        .from('dakkapel_calculator_aanvragen')
        .insert(requestData)
        .select()
        .single();

      if (dbError) {
        console.error('❌ Database save failed:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('✅ Saved successfully with ID:', savedData.id);
      console.log('🎉 CONFIGURATOR SUBMISSION COMPLETED SUCCESSFULLY - DATABASE TRIGGER WILL HANDLE EMAIL');
      
      setSubmitSuccess(true);
      
      toast.success("🎉 Perfect! Uw configuratie is opgeslagen!", {
        description: "De offerte wordt automatisch naar uw email verzonden via onze database trigger.",
        duration: 8000,
      });
      
    } catch (error: any) {
      console.error("❌ CONFIGURATOR SUBMISSION ERROR:", error);
      
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
          <h2 className="text-2xl font-bold mb-4 text-green-800">🎉 Configuratie succesvol verzonden!</h2>
          <p className="text-lg text-green-700 mb-4">
            Bedankt voor uw dakkapel configuratie! De offerte wordt automatisch naar uw email verzonden.
          </p>
          <p className="text-green-600">
            💡 Tip: Controleer ook uw spam/junk folder voor de offerte email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">📝 Laat uw gegevens achter</h2>
      <p className="mb-6 text-lg">Vul uw contactgegevens in, zodat we u een passende offerte kunnen sturen.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Naam *</label>
          <input
            type="text"
            id="name"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen px-3 py-2 border ${errors.name ? 'border-red-500' : ''}`}
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mailadres *</label>
          <input
            type="email"
            id="email"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen px-3 py-2 border ${errors.email ? 'border-red-500' : ''}`}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefoonnummer *</label>
          <input
            type="tel"
            id="phone"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen px-3 py-2 border ${errors.phone ? 'border-red-500' : ''}`}
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres *</label>
          <input
            type="text"
            id="address"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen px-3 py-2 border ${errors.address ? 'border-red-500' : ''}`}
            {...register("address")}
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
        </div>

        <div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postcode *</label>
              <input
                type="text"
                id="postalCode"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen px-3 py-2 border ${errors.postalCode ? 'border-red-500' : ''}`}
                {...register("postalCode")}
              />
              {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode.message}</p>}
            </div>

            <div className="w-1/2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Plaats *</label>
              <input
                type="text"
                id="city"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen px-3 py-2 border ${errors.city ? 'border-red-500' : ''}`}
                {...register("city")}
              />
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Opmerkingen (optioneel)</label>
          <textarea
            id="comments"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen px-3 py-2 border"
            {...register("comments")}
            placeholder="Heeft u nog specifieke wensen of vragen?"
          />
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300 disabled:opacity-50"
          >
            <span>{isSubmitting ? '🔄 Verzenden...' : '🚀 Vraag offerte aan'}</span>
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};
