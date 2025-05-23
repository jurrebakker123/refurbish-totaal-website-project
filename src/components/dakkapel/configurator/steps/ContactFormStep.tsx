
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
      // Save to Supabase database - fix column names and property names
      const { error } = await supabase
        .from('dakkapel_configuraties')
        .insert({
          naam: data.name, // Fixed: use correct column name
          email: data.email,
          telefoon: data.phone,
          adres: data.address,
          postcode: data.postalCode,
          plaats: data.city,
          opmerkingen: data.comments,
          model: configuration.model,
          breedte: configuration.width,
          materiaal: configuration.material,
          kleur_kozijn: configuration.frameColor || configuration.kleur_kozijn || '', // Handle missing property
          kleur_zijkanten: configuration.sideColor || configuration.kleur_zijkanten || '', // Handle missing property
          kleur_draaikiepramen: configuration.windowColor || configuration.kleur_draaikiepramen || '', // Handle missing property
          dakhelling: configuration.roofAngle,
          dakhelling_type: configuration.roofAngleType || configuration.dakhelling_type || '', // Handle missing property
          levertijd: configuration.deliveryTime,
          ventilationgrids: configuration.extras?.ventilationGrids || false,
          sunshade: configuration.extras?.sunShade || false,
          insectscreens: configuration.extras?.insectScreens || false,
          airconditioning: configuration.extras?.airConditioning || false,
          totaal_prijs: currentPrice,
          status: 'nieuw'
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Submit the entire configuration if the function exists (for email)
      if (submitConfigurator) {
        await submitConfigurator();
      }
      
      setSubmitSuccess(true);
      toast.success("Offerte aanvraag succesvol verzonden en opgeslagen!");
    } catch (error) {
      console.error("Failed to submit configurator:", error);
      toast.error("Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het later nog eens.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-brand-darkGreen">Aanvraag verzonden!</h2>
        <p className="mb-6 text-lg">Bedankt voor uw aanvraag. We nemen zo snel mogelijk contact met u op.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Laat uw gegevens achter</h2>
      <p className="mb-6 text-lg">Vul uw contactgegevens in, zodat we u een passende offerte kunnen sturen.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Naam</label>
          <input
            type="text"
            id="name"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen ${errors.name ? 'border-red-500' : ''}`}
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mailadres</label>
          <input
            type="email"
            id="email"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen ${errors.email ? 'border-red-500' : ''}`}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefoonnummer</label>
          <input
            type="tel"
            id="phone"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen ${errors.phone ? 'border-red-500' : ''}`}
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres</label>
          <input
            type="text"
            id="address"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen ${errors.address ? 'border-red-500' : ''}`}
            {...register("address")}
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
        </div>

        <div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postcode</label>
              <input
                type="text"
                id="postalCode"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen ${errors.postalCode ? 'border-red-500' : ''}`}
                {...register("postalCode")}
              />
              {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode.message}</p>}
            </div>

            <div className="w-1/2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Plaats</label>
              <input
                type="text"
                id="city"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen ${errors.city ? 'border-red-500' : ''}`}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-lightGreen focus:ring-brand-lightGreen"
            {...register("comments")}
          />
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300"
          >
            <span>{isSubmitting ? 'Verzenden...' : 'Vraag offerte aan'}</span>
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};
