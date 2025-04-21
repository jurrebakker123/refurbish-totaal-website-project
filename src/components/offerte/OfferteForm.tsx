import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { OfferteFormData, offerteFormSchema } from "./schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import emailjs from '@emailjs/browser';

export function OfferteForm() {
  const form = useForm<OfferteFormData>({
    resolver: zodResolver(offerteFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      preferredDate: '',
      service: '',
      message: '',
      terms: false
    },
  });

  const handleSubmit = async (data: OfferteFormData) => {
    if (!data.terms) {
      toast.error("U dient akkoord te gaan met onze voorwaarden.");
      return;
    }
    
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // You'll need to replace this with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // You'll need to replace this with your EmailJS template ID
        {
          from_name: data.name,
          to_name: "Refurbish Totaal Nederland",
          from_email: data.email,
          phone: data.phone,
          location: data.location,
          preferred_date: data.preferredDate,
          service: data.service,
          message: data.message,
        },
        'YOUR_PUBLIC_KEY' // You'll need to replace this with your EmailJS public key
      );

      toast.success("Bedankt voor uw aanvraag! We nemen zo spoedig mogelijk contact met u op.");
      form.reset();
    } catch (error) {
      toast.error("Er is iets misgegaan bij het verzenden van uw aanvraag. Probeer het later opnieuw.");
      console.error("Email error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naam</FormLabel>
                <FormControl>
                  <Input placeholder="Uw naam" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mailadres</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="uw@email.nl" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefoonnummer</FormLabel>
              <FormControl>
                <Input placeholder="+31 6 30136079" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dienst</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een dienst" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bericht</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Vertel ons over uw project..." 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <FormLabel className="font-normal">
                Ik ga akkoord met de <a href="/voorwaarden" className="text-brand-lightGreen hover:underline">algemene voorwaarden</a>
              </FormLabel>
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="w-full bg-brand-lightGreen text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}
        </button>
      </form>
    </Form>
  );
}
