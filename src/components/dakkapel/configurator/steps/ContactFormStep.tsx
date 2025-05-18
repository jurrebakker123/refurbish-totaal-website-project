
import React from 'react';
import { StepProps } from '../DakkapelConfigurator';
import { ArrowLeft, Send } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Naam is verplicht' }),
  email: z.string().email({ message: 'Voer een geldig e-mailadres in' }),
  phone: z.string().min(10, { message: 'Voer een geldig telefoonnummer in' }),
  address: z.string().min(5, { message: 'Adres is verplicht' }),
  postalCode: z.string().min(6, { message: 'Voer een geldige postcode in' }),
  city: z.string().min(2, { message: 'Woonplaats is verplicht' }),
  comments: z.string().optional()
});

export const ContactFormStep: React.FC<StepProps> = ({ 
  configuration, 
  updateConfiguration, 
  nextStep, 
  prevStep,
  currentPrice
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      comments: ''
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Update the configuration with the contact details
    updateConfiguration({ contact: values });
    
    // This would normally submit the form to a backend API
    console.log('Form submitted with values:', values);
    console.log('Complete configuration:', { ...configuration, contact: values });
    
    // Show success message
    toast.success('Bedankt! Uw offerte is verzonden.');
    
    // Call nextStep to complete the process
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Stap 8 - Uw gegevens</h2>
      <p className="mb-6 text-lg">Bijna klaar! Vul uw gegevens in voor een persoonlijke offerte.</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam *</FormLabel>
                  <FormControl>
                    <Input placeholder="Uw volledige naam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mailadres *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="uw@emailadres.nl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefoonnummer *</FormLabel>
                  <FormControl>
                    <Input placeholder="06-12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres *</FormLabel>
                  <FormControl>
                    <Input placeholder="Straatnaam en huisnummer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode *</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 AB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Woonplaats *</FormLabel>
                  <FormControl>
                    <Input placeholder="Uw woonplaats" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra wensen of opmerkingen</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Heeft u extra wensen of opmerkingen? Laat het ons weten."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optioneel - Laat ons weten als u nog specifieke vragen of verzoeken heeft.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-6">
              Door op 'Offerte aanvragen' te klikken gaat u akkoord met onze algemene voorwaarden en privacy policy.
              Wij gebruiken uw gegevens alleen om contact met u op te nemen over uw offerte.
            </p>
            
            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={prevStep}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300"
              >
                <ArrowLeft size={18} />
                <span>Vorige stap</span>
              </button>
              
              <button
                type="submit"
                className="bg-brand-lightGreen hover:bg-brand-darkGreen text-white px-6 py-3 rounded-md flex items-center space-x-2 font-medium transition-colors duration-300"
              >
                <span>Offerte aanvragen</span>
                <Send size={18} />
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
