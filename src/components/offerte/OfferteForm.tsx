
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { OfferteFormData, offerteFormSchema } from "./schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sendEmail } from "@/config/email";
import React from 'react';
import { SERVICES } from "./constants";

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

  const [tekeningFile, setTekeningFile] = React.useState<File | null>(null);
  const [tekeningBase64, setTekeningBase64] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleTekeningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setTekeningFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTekeningBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setTekeningBase64(null);
    }
  };

  const handleSubmit = async (data: OfferteFormData) => {
    if (!data.terms) {
      toast.error("U dient akkoord te gaan met onze voorwaarden.", {
        duration: 5000,
        position: 'top-center',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Offerte Form Submission:', { 
        ...data, 
        tekeningIncluded: !!tekeningBase64,
        tekeningFileName: tekeningFile?.name || "Geen bestand"
      });

      // Controleer de grootte van het bestand (max 5MB)
      if (tekeningFile && tekeningFile.size > 5 * 1024 * 1024) {
        toast.error("Het bestand is te groot. Maximum grootte is 5MB.", {
          duration: 5000,
          position: 'top-center',
        });
        setIsSubmitting(false);
        return;
      }

      const result = await sendEmail({
        from_name: data.name,
        from_email: data.email,
        to_name: "Refurbish Totaal Nederland",
        to_email: "info@refurbishtotaalnederland.nl",
        subject: `Nieuwe offerte aanvraag: ${data.service}`,
        message: data.message || "Geen bericht",
        phone: data.phone,
        location: data.location,
        service: data.service,
        preferred_date: data.preferredDate || "Niet opgegeven",
        tekening: tekeningBase64 || "",
        tekening_naam: tekeningFile?.name || "Geen bestand geüpload"
      });

      if (result.success) {
        toast.success("Bedankt voor uw aanvraag! We nemen zo spoedig mogelijk contact met u op.", {
          duration: 5000,
          position: 'top-center',
        });
        
        form.reset();
        setTekeningFile(null);
        setTekeningBase64(null);
        if (document.getElementById('tekening-upload')) {
          (document.getElementById('tekening-upload') as HTMLInputElement).value = '';
        }
      } else {
        throw new Error("EmailJS verzending mislukt");
      }
    } catch (error) {
      console.error('Offerte Form Email Error:', error);
      toast.error("Er is iets misgegaan bij het verzenden van uw aanvraag. Probeer het later opnieuw of neem direct contact met ons op.", {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Woonplaats</FormLabel>
              <FormControl>
                <Input placeholder="Uw woonplaats" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gewenste datum (optioneel)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
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

        <div>
          <label htmlFor="tekening-upload" className="block text-sm font-medium text-gray-700 mb-1">
            Upload tekeningen (optioneel, pdf/jpg/png, max 5MB)
          </label>
          <input
            id="tekening-upload"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleTekeningChange}
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-sm bg-white focus:ring-2 focus:ring-brand-lightGreen focus:border-brand-lightGreen"
          />
          {tekeningFile && (
            <div className="mt-1 text-xs text-gray-600 italic">
              Geselecteerd: {tekeningFile.name} ({(tekeningFile.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
          )}
        </div>

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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}
        </button>
      </form>
    </Form>
  );
}
