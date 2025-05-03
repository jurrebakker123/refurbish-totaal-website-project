
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { OfferteFormData, offerteFormSchema } from "./schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { sendEmail } from "@/config/email";
import React, { useState } from 'react';
import { SERVICES } from "./constants";

export function OfferteForm() {
  const form = useForm<OfferteFormData>({
    resolver: zodResolver(offerteFormSchema),
    defaultValues: {
      naam: '',
      email: '',
      telefoon: '',
      woonplaats: '',
      datum: '',
      diensten: [],
      bericht: '',
      terms: false
    },
  });

  const [tekeningFile, setTekeningFile] = useState<File | null>(null);
  const [tekeningBase64, setTekeningBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTekeningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setTekeningFile(file || null);
    
    if (file) {
      // Controleer de grootte van het bestand (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Het bestand is te groot. Maximum grootte is 5MB.", {
          duration: 5000,
          position: 'top-center',
        });
        
        // Reset file input
        if (document.getElementById('bijlage-upload')) {
          (document.getElementById('bijlage-upload') as HTMLInputElement).value = '';
        }
        setTekeningFile(null);
        setTekeningBase64(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Extract only the base64 data part
        const base64Data = result.split(',')[1]; 
        setTekeningBase64(base64Data);
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

      // Formatteer geselecteerde diensten als string
      const selectedServices = data.diensten.join(", ");

      const result = await sendEmail({
        from_name: data.naam,
        from_email: data.email,
        to_name: "Refurbish Totaal Nederland",
        to_email: "info@refurbishtotaalnederland.nl",
        subject: `Nieuwe offerte aanvraag: ${selectedServices}`,
        message: data.bericht || "Geen bericht",
        phone: data.telefoon,
        location: data.woonplaats,
        service: selectedServices,
        preferred_date: data.datum || "Niet opgegeven",
        tekening: tekeningBase64 || "",
        tekening_naam: tekeningFile?.name || "",
        templateId: "template_ezfzaao" // Nieuwe sjabloon ID voor offerteaanvragen
      });

      if (result.success) {
        toast.success("Bedankt voor uw aanvraag! We nemen zo spoedig mogelijk contact met u op.", {
          duration: 5000,
          position: 'top-center',
        });
        
        form.reset();
        setTekeningFile(null);
        setTekeningBase64(null);
        if (document.getElementById('bijlage-upload')) {
          (document.getElementById('bijlage-upload') as HTMLInputElement).value = '';
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
            name="naam"
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
          name="telefoon"
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
          name="diensten"
          render={() => (
            <FormItem>
              <FormLabel>Dienst(en)</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {SERVICES.map((service) => (
                  <FormField
                    key={service}
                    control={form.control}
                    name="diensten"
                    render={({ field }) => {
                      return (
                        <FormItem key={service} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(service)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, service])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== service
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {service}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="woonplaats"
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
          name="datum"
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
          name="bericht"
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
          <label htmlFor="bijlage-upload" className="block text-sm font-medium text-gray-700 mb-1">
            Upload tekeningen (optioneel, pdf/jpg/png, max 5MB)
          </label>
          <input
            id="bijlage-upload"
            name="bijlage"
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
